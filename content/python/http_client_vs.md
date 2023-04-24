---
title: 'requests vs httpx vs aiohttp, 뭐가 더 빠를까'
tags:
  - python
  - requests
  - httpx
  - aiohttp
description: '그냥 편한거 쓰는게 제일 나은거 같은데?'
date: 2023-04-24T23:35:48.171+09:00 
publish: true
---

## 각 라이브러리 간략한 소개
### 가장 범용적인 `requests`
`python`의 `http` 클라이언트 라이브러리 중 가장 유명하다.

`requests`는 워낙 많이 알려졌고, 사용하는 사람, 참조하는 라이브러리가 많다. 따라서 레퍼런스를 찾기 쉽고, 그만큼 배우기 쉽고, 사용하기도 쉽다.

__동기 호출만__ 지원한다.. 따라서 여러 요청을 효율적으로 실행하려면 쓰레드가 필수적이다.(`greenlet`은 예외적인 경우)

### `requests`와 비슷한 `httpx`
`requests`의 대부분의 api와 호환되도록 작성된 라이브러리.

`requests`와 비슷하게 사용할 수 있어서 기존에 `requests`를 사용했다면 금방 적응할 수 있으며, `requests`에 비해서 좀 더 나은 현대적인 기능과 타입힌트를 제공한다.

__동기, 비동기 호출을 모두__ 지원한다.

### `asyncio`기반으로 처음 작성된 `aiohttp`
`asyncio` 프로젝트가 시작하고, `asyncio`기반으로 가장 먼저 작성된 `http` 서버 및 클라이언트 라이브러리다.

실제로 써본적은 없고, 몇몇 사용기를 보면 가볍고 빠르다고 한다.

`requests`와 api와 호환되지 않아서 사용법을 잘 숙지할 필요가 있다.

__비동기 호출만__ 지원한다.


## 실제 사용된 각 테스트 코드

모두 10개 세션을 유지하고 총 1000번 `GET` 요청을 실행했다.

`httpx`와 `aiohttp`는 비동기로 실행했고, `requests`는 그냥 사용하면 상대가 되지 않기 때문에, 최대 10개 작업이 가능한 쓰레드 풀을 생성하여 실행했다.

정리하자면,
- `httpx`: 10개 세션, 1000개 요청, 비동기
- `aiohttp`: 10개 세션, 1000개 요청, 비동기
- `requests`: 10개 세션, 10개 쓰레드, 1000개 요청, 동기

당연하지만 `requests` 쓰레드가 10개라고 해서 각 쓰레드별 10개 세션을 가진건 아니다. 10개의 세션을 가진 풀에서 세션 객체를 각 쓰레드가 가져와서 사용하는 방식으로 진행했다.

모든 테스트는 `python3.11`에서 실시했으며, 하는김에 3.11에 새로 추가된 `TaskGroup`을 사용해봤다.

<details>
<summary>httpx</summary>
 
```python [test_httpx.py]
import asyncio
import time
from contextlib import AsyncExitStack

import httpx

CLIENT_COUNT = 10
REQUEST_COUNT = 1000
URL = "https://jsonplaceholder.typicode.com/posts/1"
HEADER = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/112.0.0.0 Safari/537.36",
}
TIMEOUT = 10


async def _request_one(client: httpx.AsyncClient) -> None:
    response = await client.get(URL, headers=HEADER)
    response.raise_for_status()

async def _enter_and_put_client(
    stack: AsyncExitStack,
    queue: asyncio.Queue[httpx.AsyncClient],
) -> None:
    client = await stack.enter_async_context(httpx.AsyncClient(timeout=TIMEOUT))
    await queue.put(client)


async def _run_request(
    queue: asyncio.Queue[httpx.AsyncClient],
    semaphore: asyncio.Semaphore,
) -> None:
    async with semaphore:
        client = await queue.get()
        await _request_one(client)
        await queue.put(client)

async def _request_many(client_count: int, request_count: int) -> None:
    async with AsyncExitStack() as stack:
        queue: asyncio.Queue[httpx.AsyncClient] = asyncio.Queue(client_count)
        semaphore = asyncio.Semaphore(client_count)

        async with asyncio.TaskGroup() as tg:
            _ = [
                tg.create_task(_enter_and_put_client(stack, queue))
                for _ in range(client_count)
            ]

        async with asyncio.TaskGroup() as tg:
            _ = [
                tg.create_task(_run_request(queue, semaphore))
                for _ in range(request_count)
            ]


async def main():
    start = time.perf_counter()
    await _request_many(CLIENT_COUNT, REQUEST_COUNT)
    end = time.perf_counter()
    print(f"time={end - start}")


if __name__ == "__main__":
    asyncio.run(main())
```
</details>

<details>
<summary>aiohttp</summary>
 
```python [test_aiohttp.py]
import asyncio
import time
from contextlib import AsyncExitStack

import aiohttp

CLIENT_COUNT = 10
REQUEST_COUNT = 1000
URL = "https://jsonplaceholder.typicode.com/posts/1"
HEADER = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/112.0.0.0 Safari/537.36",
}
TIMEOUT = 10


async def _request_one(client: aiohttp.ClientSession) -> None:
    async with client.get(URL, headers=HEADER) as response:
        response.raise_for_status()


async def _enter_and_put_client(
    stack: AsyncExitStack,
    queue: asyncio.Queue[aiohttp.ClientSession],
) -> None:
    client = await stack.enter_async_context(
        aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=TIMEOUT)),
    )
    await queue.put(client)


async def _run_request(
    queue: asyncio.Queue[aiohttp.ClientSession],
    semaphore: asyncio.Semaphore,
) -> None:
    async with semaphore:
        client = await queue.get()
        await _request_one(client)
        await queue.put(client)

async def _request_many(client_count: int, request_count: int) -> None:
    async with AsyncExitStack() as stack:
        queue: asyncio.Queue[aiohttp.ClientSession] = asyncio.Queue(client_count)
        semaphore = asyncio.Semaphore(client_count)

        async with asyncio.TaskGroup() as tg:
            _ = [
                tg.create_task(_enter_and_put_client(stack, queue))
                for _ in range(client_count)
            ]

        async with asyncio.TaskGroup() as tg:
            _ = [
                tg.create_task(_run_request(queue, semaphore))
                for _ in range(request_count)
            ]


async def main():
    start = time.perf_counter()
    await _request_many(CLIENT_COUNT, REQUEST_COUNT)
    end = time.perf_counter()
    print(f"time={end - start}")


if __name__ == "__main__":
    asyncio.run(main())
```
</details>

</details>

<details>
<summary>requests</summary>
 
```python [test_requests.py]
import time
from concurrent.futures import ThreadPoolExecutor, wait
from queue import Queue
from threading import Semaphore

import requests

CLIENT_COUNT = 10
REQUEST_COUNT = 1000
URL = "https://jsonplaceholder.typicode.com/posts/1"
HEADER = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/112.0.0.0 Safari/537.36",
}
TIMEOUT = 10

def _request_one(client: requests.Session) -> None:
    response = client.get(URL, headers=HEADER, timeout=TIMEOUT)
    response.raise_for_status()

def _run_request(
    queue: Queue[requests.Session], semaphore: Semaphore,
) -> None:
    with semaphore:
        client = queue.get()
        _request_one(client)
        queue.put_nowait(client)


def _request_many(client_count: int, request_count: int) -> None:
    semaphore = Semaphore(client_count)
    queue: Queue[requests.Session] = Queue(maxsize=client_count)
    for _ in range(client_count):
        queue.put_nowait(requests.Session())
    with ThreadPoolExecutor(max_workers=client_count) as pool:
        future = [
            pool.submit(_run_request, queue, semaphore)
            for _ in range(request_count)
        ]
        wait(future, return_when="ALL_COMPLETED")

def main():
    start = time.perf_counter()
    _request_many(CLIENT_COUNT, REQUEST_COUNT)
    end = time.perf_counter()
    print(f"time={end - start}")


if __name__ == "__main__":
    main()
```
</details>

## 테스트 결과

```shell
❯ .../.venv/bin/python .../test_httpx.py
time=4.603886660999706
❯ .../.venv/bin/python .../test_aiohttp.py
time=4.555423996000172
❯ .../.venv/bin/python .../test_requests.py
time=4.501287121998757
```

### 기대와는 다른 결과
기대와는 전혀 다른 결과가 나왔다.

뭔가 뚜렷한 차이가 있을 것 같았지만, 셋 다 거기서 거기다.

혹시 실제로는 요청이 실행되지 않은건 아닌가 하고 확인해봤지만 정상이다.

### 내가 뭔가 잘못 작성한 것 같다
`aiohttp`에 익숙하지 않은 점과, 공통된 방식으로 요청을 실행하고자 욕심부린 것 때문에 `http` 요청과는 무관한 지점에서 지연이 발생하지 않았을까.

다음에 다시한번 시도해보자

## 어쨌든 나는 `httpx`를 사용한다

위 테스트가 정상적으로 실행 된 것이라는 가정 하에,

별 성능 차이가 없다면 동기, 비동기 모두 지원하고,
동기 비동기간 동일한 형태의 api로 사용할 수 있는 `httpx`가 가장 편하게 느껴진다.

아마 특별한 일이 없다면 `httpx`를 계속 사용하지 않을까.
