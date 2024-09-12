---
title: 'python의 비동기에 대한 얕은 이해'
tags:
  - python
  - async
description: 코드 중심으로 알아보는 비동기
date: 2023-07-31T18:51:28.303+09:00 
publish: True
---

## 파이썬의 비동기 라이브러리 `asyncio`
파이썬에서 비동기를 객체를 생성하는 가장 간단한 방법은 `async`와 `await`키워드를 사용하는 것이다.

이를 위해 기본 라이브러리로 제공되는 `asyncio`를 사용하자.
```python [main.py]
import asyncio


async def test() -> None:
    await asyncio.sleep(1)


async def main() -> None:
    await test()


if __name__ == "__main__":
    asyncio.run(main())
```

동기 함수와는 다르게 `asyncio.run`함수로 `main()` 코루틴을 실행하는 형태로 구성된다.

정말로 비동기로 작동하는지 확인하기 위해, 다음과 같이 새로 작성한 코드를 실행해보자.
```python [main2.py]
import asyncio
import logging
import random
import sys

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(sys.stdout))


async def test(x: int) -> None:
    logger.info("start: %d", x)
    await asyncio.sleep(random.random())
    logger.info("end: %d", x)


async def main() -> None:
    await asyncio.gather(*(test(x) for x in range(10)))


if __name__ == "__main__":
    asyncio.run(main())
```

여기서 사용된 `asyncio.gather`는 여러개의 코루틴을 동시에 대기할 수 있도록 한다.
::note
3.11부터는 TaskGroup을 사용할 것을 권장한다.
::

위 스크립트를 실행하면, 다음과 같이 비동기로 실행되는 것을 확인할 수 있다.

```bash
❯ poetry run python main2.py
start: 0
start: 1
start: 2
start: 3
start: 4
start: 5
start: 6
start: 7
start: 8
start: 9
end: 9
end: 8
end: 6
end: 3
end: 4
end: 0
end: 1
end: 2
end: 5
end: 7
```

### 왜 `asyncio.run`을 실행해야 하는가

`asnyc`, `await` 키워드를 사용한 함수가 실행되면, `Coroutine`(이하 코루틴)객체가 생성된다.

코루틴은 생성과 동시에 실행되는 객체가 아니며,
이벤트 루프에 예약된 상태도 아니다.

이러한 코루틴을 실행하기 위해 이벤트루프를 생성하고,
이벤트루프에 작업을 예약하고,
이벤트루트의 작업을 순차적으로 실행하는 일련의 과정을
`asyncio.run`이 담당한다고 볼 수있다.

## 대기할 수 있는 `Awaitable`객체

코루틴이 `await`키워드를 사용하여 대기할 수 있는 이유는,
코루틴에 `__await__`이라는 메소드가 정의되어 있기 때문이다.

이러한 객체를 `Awaitable` 객체라고 하며, `typing` 모듈에서도 확인할 수 있다.
정말 `__await__`만 있으면 가능한지 확인해보자.

```python [main3.py]
import asyncio
from typing import Any, Generator


class Await:
    def __await__(self) -> Generator[Any, None, int]:
        for num in range(5):
            print(num)
            yield None
        return 1


async def main() -> None:
    await Await()


if __name__ == "__main__":
    asyncio.run(main())

# ❯ poetry run python main3.py
# 0
# 1
# 2
# 3
# 4
```

::note
`Await`객체를 곧바로 `asyncio.run`에서 사용하지 않고,
`main`함수에서 생성하여 사용하는 이유는,
`asyncio.run`에서 코루틴이 아니면 에러를 발생시키기 때문이다.
::

즉, `async`, `await`은 사실 제너레이터를 활용한
컨텍스트 스위칭에 대한 문법 설탕이라는 것을 알 수 있다.

이러한 문법 설탕이 추가되기 전까지는,
제너레이터 문법인 `yield from`을 사용했다.

물론 이러한 사실은 알면 좋지만 별로 중요하지 않다.
대부분의 경우 `__await__`를 직접 정의하기는 커녕
`Future`와 `Task`도 구경하기 어려우며,
`async`와 `await`을 사용한 코루틴만 사용할 것이다.


### 콜백 형태의 `Future`
`asyncio`의 `Future`는 `concurrent.futures`의 `Future`를 본따 만들어졌다.

`concurrent.futures`의 `Future`는 쓰레드를 제어하기 위해 만들어졌고,
멀티쓰레드 환경의 비동기 제어가 싱글쓰레드 환경으로 확장된 것으로 볼 수도 있다.

앞서 말했듯이, 대부분의 경우 `Future`에 대해 알 필요가 없고,
구버전 파이썬을 사용한다면 모를까, 이제는 사용할 일도 없는 객체다.

### `Future`를 상속받는 `Task`
`Task`는 `Future`를 상속받아 구현한 `Awaitable`한 객체다.
`Task`는 `js`의 `Promise`처럼, 생성됐다면 이미 이벤트루프에 예약된 상태다.

::note
`Future`는 생성했지만, 이벤트루프에 예약되어 있지 않을 수 있다.
::

따라서 다음과 같은 코드는, 정상적으로 실행된다.

```python [main4.py]
import asyncio
import logging
import sys

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(sys.stdout))


async def test() -> None:
    logger.info("start")
    await asyncio.sleep(1)
    logger.info("done!")


async def main() -> None:
    coro = test()
    _ = asyncio.create_task(coro)
    logger.info("before sleep")
    await asyncio.sleep(2)
    logger.info("after sleep")


if __name__ == "__main__":
    asyncio.run(main())
#  ❯ poetry run python main4.py
#  before sleep
#  start
#  done!
#  after sleep
```

`await` 또는 `yield from` 또는 `__await__`메소드를 직업 호출하지 않았지만,
`test`로 정의된 비동기 함수는 정상적으로 실행됐다.
왜냐하면 신규 `Task`객체를 생성했고,
이후 `await asyncio.sleep(2)`를 통해 콘텍스트 스위칭을 유발했기 때문이다.

정리하자면 다음과 같다.

1. `test`함수를 실행하여 코루틴을 생성한다.
2. 생성한 코루틴을 `asyncio.create_task`함수를 사용하여, 이벤트루프에 예약한다.
3. `create_task`함수가 `Task`객체를 반환한다.(의도적으로 `_`를 사용하여 무시하였다.)
4. 아직 `main`함수가 콘텍스트를 점유중이므로, 앞서 생성한 `Task`는 실행되지 않았다.
5. `await asyncio.sleep(2)`를 통해, 콘텍스트 점유를 해제한다.
6. 앞서 생성한 `Task`로 콘텍스트가 변경된다.
7. 이하 생략

즉, `await`이 콘텍스트 스위칭에 대한 문법 설탕이자,
동시에 `Task`를 생성하는 문법 설탕인 것을 알 수 있다.

여기서 한가지 궁금한 점이 생긴다.
1. 한번 생성한 코루틴은, 한번만 `await`으로 대기할 수 있다.
2. 한번 생성한 코루틴은, `Task`를 생성할 수 있다.
3. `Task`는 `Awaitable`이므로 `await`으로 대기할 수 있다.

이전의 `main4.py` 스크립트에서 코루틴 `coro`는 `create_task`함수를 통해
이미 실행된 상태다.

이후 생성한 `Task`를 대기하는 것이 가능할까?
```python [main5.py]
import asyncio
import logging
import sys

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(sys.stdout))


async def test() -> int:
    logger.info("start")
    await asyncio.sleep(1)
    logger.info("done!")
    return 1


async def main() -> None:
    coro = test()
    task = asyncio.create_task(coro)

    logger.info("before sleep")

    queue = asyncio.Queue(1)
    task.add_done_callback(lambda task: queue.put_nowait(task.result()))

    value = await task

    logger.info("after sleep")

    result = task.result()
    queue_value = await queue.get()
    logger.info("value=%r, result=%r, queue_value=%r", value, result, queue_value)


if __name__ == "__main__":
    asyncio.run(main())
# ❯ poetry run python main5.py
# before sleep
# start
# done!
# after sleep
# value=1, result=1, queue_value=1
```

가능하다. `Task`는 코루틴을 이벤트 루프에 예약하는 객체지, 코루틴 그 자체가 아니기 때문이다.

그렇기에 단 한번 `await`으로 대기할 수 있다.
동시에 `Future`이기에, `result` 메소드를 사용하여 값을 가져올 수도 있으며
`add_done_callback` 메소드를 사용하여, 콜백을 추가할 수도 있다.

## `Future`와 `Task`는 언제 사용할까
`Future` 또는 `Task`는 대부분의 경우 직접 사용할 일이 없다.
하지만 저수준 api를 다뤄야 하거나, 효율적인 코드를 목표로 한다면,
필연적으로 다뤄야 하는 순간이 온다.

### `Task`가 필요한 상황

```python [main6.py]
from __future__ import annotations

import asyncio
import random
from typing import Awaitable


async def test(value: int) -> int:
    mod = value % 10
    rand = random.randint(1, 10)
    await asyncio.sleep(1)
    if mod > rand:
        error_msg = f"mod > {rand}"
        raise ValueError(error_msg)
    return mod


async def shield(coro: Awaitable[int]) -> int | None:
    try:
        return await asyncio.shield(coro)
    except ValueError:
        return None


async def main() -> None:
    coros = [test(int(random.random() * 100)) for _ in range(10)]
    result = await asyncio.gather(*(shield(coro) for coro in coros))
    print(result)


if __name__ == "__main__":
    asyncio.run(main())
# ❯ poetry run python main6.py
# [2, 1, None, 2, None, 3, 8, 2, 3, None]
```
위와 같은 상황이 있을 때,
`test`함수에서 에러가 발생하면 None값이 아닌 -1을 반환받고 싶다고 하자.

가장 간단한 방법은 `shield`를 수정하는 것이고,
그 다음으로는 `test`를 수정하는 것이다.

하지만 위 스크립트는 굉장히 간단하게 작성된 스크립트라 그런 것이고,
손대면 손댈수록 너무 복잡해져서 수정하기 힘들거나,
특수한 사정으로 인해 수정 자체가 불가능한 경우가 있다.

그럴때 `Task`에 콜백을 추가하여 문제를 해결할 수 있다.

```python [main6-2.py]
from __future__ import annotations

import asyncio
import random
from collections import deque
from functools import partial
from typing import Awaitable


async def test(value: int) -> int:
    mod = value % 10
    rand = random.randint(1, 10)
    await asyncio.sleep(1)
    if mod > rand:
        error_msg = f"mod > {rand}"
        raise ValueError(error_msg)
    return mod


async def shield(coro: Awaitable[int]) -> int | None:
    try:
        return await asyncio.shield(coro)
    except ValueError:
        return None


def add(task: asyncio.Task[int], queue: asyncio.Queue[int]) -> None:
    if task.exception():
        queue.put_nowait(-1)
        return
    queue.put_nowait(task.result())


async def main() -> None:
    queue = asyncio.Queue()
    add_in_queue = partial(add, queue=queue)
    coros = [test(int(random.random() * 100)) for _ in range(10)]
    tasks = deque()
    for coro in coros:
        task = asyncio.create_task(coro)
        task.add_done_callback(add_in_queue)
        tasks.append(task)

    await asyncio.gather(*(shield(task) for task in tasks))
    result = [queue.get_nowait() for _ in range(10)]
    print(result)


if __name__ == "__main__":
    asyncio.run(main())
# ❯ poetry run python main6-2.py
# [0, -1, 2, -1, 3, 1, 8, -1, -1, -1]
```

핵심 로직이라 할 수 있는 `test`와 `shield`를 수정하지 않고,
콜백을 사용하여 문제를 해결할 수 있다.

### `Future`가 필요한 상황
`Task`가 `Future`를 상속받았기에, 대부분의 경우 `Task`에서 문제가 해결된다.
`Future`와 `Task`의 결정적인 차이점은
`Future`는 이벤트루프에 예약되지 않은 상태가 존재한다는 것이다.

코루틴이 비동기 작업에 대한 정의라면
`Task`는 코루틴의 실재이고,
`Future`는 `Task`의 선물이다.
따라서 `Future`를 사용한다면, 비동기 작업이 선언 또는 실행되기 이전에
콜백을 정의하고 추가하여 제공할 수 있다.

이러한 방법은 `asyncio`의 내부 함수를 구현하는데 많이 사용되는데,
그 중 하나인 `wait_for`를 좀 더 알아보기 쉽게 나타내면 다음과 같다.


```python [main7.py]
from __future__ import annotations

import asyncio
import logging
import sys
from functools import partial
from typing import Any, Awaitable

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(sys.stdout))


def release(waiter: asyncio.Future[Any], *args: Any) -> None:
    if not waiter.done():
        waiter.set_result(None)


async def cancel(future: asyncio.Future[Any]) -> None:
    loop = asyncio.get_running_loop()
    waiter = loop.create_future()
    callback = partial(release, waiter)
    future.add_done_callback(callback)

    try:
        future.cancel()
        await waiter
    finally:
        future.remove_done_callback(callback)


async def wait_for(coro: Awaitable[Any]) -> None:
    logger.info("wait")

    loop = asyncio.get_running_loop()
    waiter = loop.create_future()
    callback = partial(release, waiter)
    future = asyncio.ensure_future(coro)
    future.add_done_callback(callback)

    try:
        await waiter
    except asyncio.CancelledError:
        if future.done():
            return
        future.remove_done_callback(callback)
        await cancel(future)
        raise

    if not future.done():
        future.remove_done_callback(callback)
        await cancel(future)
        raise RuntimeError


async def test() -> None:
    logger.info("start")
    await asyncio.sleep(3)
    logger.info("end")


async def main() -> None:
    coro = test()
    task = asyncio.create_task(coro)
    await asyncio.gather(task, wait_for(task), wait_for(task), wait_for(task))


if __name__ == "__main__":
    asyncio.run(main())
# ❯ poetry run python main7.py
# start
# wait
# wait
# wait
# end
```

`wait_for`의 실제 구현은 더 정교하지만, 읽기 쉽도록 일부 코드를 수정했다.
위와 같은 형태로 `wait_for`를 사용하지 않는다면, `task`를 2번 이상 실행하게 되고,
동일한 코루틴을 2번 이상 실행할 수 없다는 에러가 발생한다.

## 요약하자면
1. `async`, `await` 키워드로 비동기 함수를 정의하여 코루틴을 생성하고,
`asyncio.run`으로 실행한다.
2. `js`의 `Promise`와 비슷한 객체는 `Task`다.
3. `Future`를 사용하면 콜백을 활용할 수 있다.

### 추가하자면
기본 라이브러리인 `asyncio` 위주로 작성된 글이지만,
비동기 라이브러리는 `asyncio`만이 있는 것은 아니다.

`twisted`나 `curio`, `trio`등이 있으며,
`trio`의 로직을 `asyncio`에 적용한 `anyio`도 있다.
> `anyio`를 사용하면 비동기 로직 구현 후,
> `asyncio`와 `trio`중 어떤 것이든 선택하여 사용할 수 있다.
> 
> 2.x에서는 `curio`도 지원했지만,
> `curio`의 구현 방식에 따른 개발에 어려움이 있어서 3.x부터 제외됐다.
> 
> `twisted`는 `anyio`에서 사용하는 `sniffio`에서 지원하지 않아서
> `anyio`에서도 지원하지 않는다.

모든 라이브러리는 코루틴에 대해서는 공유하지만,
`Future`와 `Task`는 `asyncio`에 정의된 객체이므로,
따로 정의한 객체를 사용할 수 있다.
따라서 만약 다른 라이브러리를 사용한다면,
그 라이브러리에 맞는 방법을 잘 알아보고 사용해야 한다.

나는 `anyio`를 주로 사용하는데,
`TaskGroup`과 `CancelScope`가 마음에 들었기 때문이다.
특히 이 `TaskGroup`은 3.11부터는 `asyncio`에 적용된 개념이기도 하니,
만약 3.11이상의 버전을 사용한다면 `gather` 대신 `TaskGroup`을 사용하자.

왜 `TaskGroup`이 좋은지, 왜 사용해야 하는지는
[이 글](https://blog.lablup.com/posts/2022/03/29/PersistentTaskGroup/)에서 상세하게 설명해준다.