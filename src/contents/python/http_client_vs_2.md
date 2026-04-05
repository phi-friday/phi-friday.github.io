---
title: 'requests vs httpx vs aiohttp, 다시 해봤다'
tags:
  - python
  - requests
  - httpx
  - aiohttp
description: '이번엔 제대로 측정했다'
date: 2026-04-05T13:24:54.922+09:00
publish: true
---

## 이전 테스트의 문제점

[지난번 테스트](/python/http_client_vs)에서 "다음에 다시 한번 시도해보자"고 마무리했었는데, 이번에 실제로 다시 해봤다.

이전 코드를 다시 보니 측정 자체가 잘못된 부분이 있었다.

### 클라이언트 인스턴스를 여러 개 만들어서 큐에 넣는 방식

`httpx`와 `aiohttp`는 클라이언트 인스턴스 하나가 내부적으로 커넥션 풀을 관리한다. `max_connections=10`을 설정하면 그 안에서 최대 10개의 TCP 연결을 유지하고 재사용한다.

그런데 이전 코드는 클라이언트 인스턴스를 10개 만들어 큐에 넣고 순서대로 빌려 쓰는 방식을 썼다. 이렇게 하면 풀도 10개가 생겨서 라이브러리의 커넥션 재사용 로직이 제대로 동작하지 않는다.

### `Semaphore`와 `Queue`를 함께 쓴 것

클라이언트 큐 자체가 이미 동시성을 제한하는데, 같은 크기의 세마포어를 하나 더 두고 있었다. 이중 잠금이 벤치마크 외의 오버헤드를 추가했다.

### `aiohttp`만 응답 body를 읽지 않은 것

`requests`와 `httpx`는 기본적으로 응답 body를 전부 읽고 반환하지만, `aiohttp`의 `async with session.get(...) as resp:` 패턴에서 `raise_for_status()`만 호출하면 body를 소비하지 않는다. 세 라이브러리가 서로 다른 작업을 측정한 셈이다.

### warmup 없음

처음 연결을 맺을 때는 TCP 핸드셰이크와 TLS 핸드셰이크 비용이 포함된다. 이미 수립된 연결을 재사용하는 비용과는 다르다. 이전 테스트는 이 콜드 스타트 비용이 측정에 섞여 있었다.

## 이번 테스트 방식

세 라이브러리가 **동일한 작업**을 하도록 맞췄다.

- `GET` 요청 → 상태 코드 확인 → 응답 body 전체 소비
- `concurrency`개의 worker가 각자 루프를 돌며 요청
- 측정 전에 worker당 warmup 요청으로 연결 수립 비용을 분리

각 라이브러리별 구현 방식은 아래와 같다.

### `httpx`

`AsyncClient` 인스턴스 1개에 `Limits(max_connections=concurrency)`를 설정하고, `concurrency`개의 코루틴 worker가 동시에 요청을 보낸다. `client.get()`은 기본적으로 body를 전부 읽는다.

### `aiohttp`

`ClientSession` 인스턴스 1개에 `TCPConnector(limit=concurrency)`를 설정하고, 동일하게 `concurrency`개의 코루틴 worker를 사용한다. `async with session.get(...) as resp:` 블록 안에서 `await resp.read()`를 명시적으로 호출해 body를 소비했다.

### `requests`

`requests.Session`은 공식적으로 thread-safe를 보장하지 않기 때문에, `concurrency`개의 thread worker가 각자 Session을 소유하는 방식을 선택했다. 각 worker는 Session을 한 번 생성하고 그 안에서 요청을 반복한다.

## 테스트

### 테스트 코드

<details>
<summary>코드 보기</summary>

```python [http_test.py]
# /// script
# requires-python = ">=3.14"
# dependencies = [
#     "aiohttp==3.13.5",
#     "httpx==0.28.1",
#     "requests==2.33.1",
#     "uvloop==0.22.1",
# ]
# ///
import argparse
import asyncio
import math
import time

CONCURRENCY = 10
REQUEST_COUNT = 1000
WARMUP_COUNT = 10
URL = "https://jsonplaceholder.typicode.com/posts/1"
HEADERS: dict[str, str] = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/112.0.0.0 Safari/537.36"
    )
}
TIMEOUT = 10


def _distribute(total: int, parts: int) -> list[int]:
    q, r = divmod(total, parts)
    return [q + (1 if i < r else 0) for i in range(parts)]


def _print_stats(label: str, times: list[float]) -> None:
    mean = sum(times) / len(times)
    print(
        f"[{label}] "
        f"sum={sum(times):.4f}, "
        f"median={sorted(times)[len(times) // 2]:.4f}, "
        f"mean={mean:.4f}, "
        f"std={math.sqrt(sum((x - mean) ** 2 for x in times) / len(times)):.4f}"
    )


async def _run_httpx(concurrency: int, request_count: int, warmup_count: int) -> None:
    """
    - AsyncClient 1개 + 내장 커넥션 풀 (max_connections=concurrency)
    - concurrency개의 async worker가 각자 루프를 돌며 요청
    - httpx.get()은 기본적으로 response body 전체를 읽음
    """
    import httpx

    limits = httpx.Limits(
        max_connections=concurrency, max_keepalive_connections=concurrency
    )

    async def _worker(warmup_n: int, bench_n: int) -> list[float]:
        times: list[float] = []
        for _ in range(warmup_n):
            resp = await client.get(URL, headers=HEADERS)
            resp.raise_for_status()
        for _ in range(bench_n):
            start = time.perf_counter()
            resp = await client.get(URL, headers=HEADERS)
            resp.raise_for_status()
            times.append(time.perf_counter() - start)
        return times

    tasks: list[asyncio.Task[list[float]]] = []
    async with httpx.AsyncClient(limits=limits, timeout=TIMEOUT) as client:
        async with asyncio.TaskGroup() as tg:
            for wn, bn in zip(
                _distribute(warmup_count, concurrency),
                _distribute(request_count, concurrency),
            ):
                tasks.append(tg.create_task(_worker(wn, bn)))

    all_times = [t for task in tasks for t in task.result()]
    _print_stats("httpx", all_times)


async def _run_aiohttp(concurrency: int, request_count: int, warmup_count: int) -> None:
    """
    - ClientSession 1개 + TCPConnector(limit=concurrency)
    - concurrency개의 async worker가 각자 루프를 돌며 요청
    - resp.read()로 body를 명시적으로 소비 (httpx/requests와 동일한 조건)
    """
    import aiohttp

    connector = aiohttp.TCPConnector(limit=concurrency, limit_per_host=concurrency)
    timeout = aiohttp.ClientTimeout(total=TIMEOUT)

    async def _worker(warmup_n: int, bench_n: int) -> list[float]:
        times: list[float] = []
        for _ in range(warmup_n):
            async with session.get(URL, headers=HEADERS) as resp:
                resp.raise_for_status()
                await resp.read()
        for _ in range(bench_n):
            start = time.perf_counter()
            async with session.get(URL, headers=HEADERS) as resp:
                resp.raise_for_status()
                await resp.read()
            times.append(time.perf_counter() - start)
        return times

    tasks: list[asyncio.Task[list[float]]] = []
    async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
        async with asyncio.TaskGroup() as tg:
            for wn, bn in zip(
                _distribute(warmup_count, concurrency),
                _distribute(request_count, concurrency),
            ):
                tasks.append(tg.create_task(_worker(wn, bn)))

    all_times = [t for task in tasks for t in task.result()]
    _print_stats("aiohttp", all_times)


def _run_requests(concurrency: int, request_count: int, warmup_count: int) -> None:
    """
    - concurrency개의 thread worker가 각자 Session을 소유하며 루프를 돌며 요청
    - ThreadPoolExecutor가 동시성을 보장
    - session.get()은 기본적으로 response body 전체를 읽음
    """
    from concurrent.futures import ThreadPoolExecutor, wait

    import requests

    def _worker(warmup_n: int, bench_n: int) -> list[float]:
        times: list[float] = []
        session = requests.Session()
        try:
            for _ in range(warmup_n):
                resp = session.get(URL, headers=HEADERS, timeout=TIMEOUT)
                resp.raise_for_status()
            for _ in range(bench_n):
                start = time.perf_counter()
                resp = session.get(URL, headers=HEADERS, timeout=TIMEOUT)
                resp.raise_for_status()
                times.append(time.perf_counter() - start)
        finally:
            session.close()
        return times

    with ThreadPoolExecutor(max_workers=concurrency) as executor:
        futures = [
            executor.submit(_worker, wn, bn)
            for wn, bn in zip(
                _distribute(warmup_count, concurrency),
                _distribute(request_count, concurrency),
            )
        ]
        wait(futures)
        all_times = [t for future in futures for t in future.result()]

    _print_stats("requests", all_times)


def main() -> None:
    parser = argparse.ArgumentParser(description="HTTP client benchmark")
    parser.add_argument(
        "client",
        choices=["aiohttp", "httpx", "requests"],
        help="HTTP client to benchmark",
    )
    parser.add_argument(
        "--concurrency",
        type=int,
        default=CONCURRENCY,
        metavar="N",
        help=f"concurrent workers (default: {CONCURRENCY})",
    )
    parser.add_argument(
        "--requests",
        type=int,
        default=REQUEST_COUNT,
        metavar="N",
        help=f"total request count (default: {REQUEST_COUNT})",
    )
    parser.add_argument(
        "--warmup",
        type=int,
        default=WARMUP_COUNT,
        metavar="N",
        help=f"warmup requests per worker (default: {WARMUP_COUNT})",
    )
    parser.add_argument(
        "--uvloop",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="use uvloop event loop (async clients only, default: disabled)",
    )
    args = parser.parse_args()

    if args.client in ("httpx", "aiohttp") and args.uvloop:
        import uvloop

        uvloop.install()

    start = time.perf_counter()

    if args.client == "httpx":
        asyncio.run(_run_httpx(args.concurrency, args.requests, args.warmup))
    elif args.client == "aiohttp":
        asyncio.run(_run_aiohttp(args.concurrency, args.requests, args.warmup))
    else:
        _run_requests(args.concurrency, args.requests, args.warmup)

    print(f"total={time.perf_counter() - start:.4f}")


if __name__ == "__main__":
    main()
```

</details>

### 테스트 환경

- Python 3.14
- `aiohttp==3.13.5`, `httpx==0.28.1`, `requests==2.33.1`, `uvloop==0.22.1`
- concurrency=10, requests=1000, warmup=10

### 테스트 결과

```bash
❯ uv run http_test.py aiohttp
[aiohttp] sum=49.6577, median=0.0474, mean=0.0497, std=0.0065
total=6.8395

❯ uv run http_test.py aiohttp --uvloop
[aiohttp] sum=47.0921, median=0.0449, mean=0.0471, std=0.0056
total=6.3216

❯ uv run http_test.py httpx           
[httpx] sum=46.6041, median=0.0460, mean=0.0466, std=0.0026
total=5.4323

❯ uv run http_test.py httpx --uvloop
[httpx] sum=46.8477, median=0.0459, mean=0.0468, std=0.0073
total=5.2796

❯ uv run http_test.py requests      
[requests] sum=48.8037, median=0.0470, mean=0.0488, std=0.0061
total=7.0758
```
## 결론

이번에도 결론은 크게 다르지 않다.

### 개별 요청 latency는 셋 다 거의 같다

`mean`과 `median`을 보면 모든 라이브러리가 요청 한 번에 약 45~50ms가 걸린다. 라이브러리가 바뀐다고 이 숫자가 크게 달라지지 않는다.

### 처리량은 `httpx`가 가장 효율적이다

개별 요청 시간이 비슷한데도 `total`은 라이브러리마다 다르다.

`concurrency=10`이면 이론적으로 `total == sum / 10`이 되어야 한다.

| 라이브러리 | sum | total | sum/10 | 오차 |
|:---:|:---:|:---:|:---:|:---:|
| httpx | 46.60s | 5.43s | 4.66s | +0.77s |
| httpx + uvloop | 46.85s | 5.28s | 4.68s | +0.60s |
| aiohttp + uvloop | 47.09s | 6.32s | 4.71s | +1.61s |
| aiohttp | 49.66s | 6.84s | 4.97s | +1.87s |
| requests | 48.80s | 7.08s | 4.88s | +2.20s |

오차가 작을수록 worker를 효율적으로 활용한 것이다. `httpx`가 가장 낮고, `requests`가 가장 높다.

### `uvloop` 효과

`aiohttp`는 `uvloop`를 붙이면 `total`이 약 7.5% 줄어든다. `httpx`는 약 2.8%로 효과가 작다. `httpx`가 기본 `asyncio` 이벤트 루프에서도 이미 효율적으로 동작한다는 뜻이다.

### 어떤 라이브러리를 쓸 것인가

코드 작성 편의성 기준으로는 여전히 `httpx`다. 동기, 비동기를 동일한 API로 쓸 수 있고, 성능도 셋 중 가장 낫다. 특별한 이유가 없다면 앞으로도 `httpx`를 계속 쓸 것 같다.
