---
title: returns로 파이썬 타입을 명확하게 만들자 1 - 주요 기능들
tags:
  - python
  - returns
  - 함수형 프로그래밍
page: dry-python/returns
description: 파이썬 타입을 명확하게 만들면 vscode가 착해진다
date: '2022-09-09T23:18:43.310+09:00'
publish: true
---

# `returns`의 주요 기능들

`returns`는 파이썬 스크립트가 실행되면서 생성하는 값을 `Container`로 감싸고, 이 값을 개발자가 주도적으로 관리할 수 있도록 유도한다.

기본적으로 완성된 형태로 제공되는 `Container`는 `Maybe`, `Result`, `IO`, `Future`, `RequiresContext`가 있고, 다음과 같은 경우 사용된다.

* `Maybe`: `None` 일 수 있는 값
* `Result`: 에러가 발생 할 수 있는 값
* `IO`: `IO` 작업과 관련된 값
* `Future`: 비동기 작업과 관련된 값
* `RequiresContext`: 함수의 의존성과 관련된 값

> `IOResult`, `RequiresContextFutureResult` 등 결합된 형태로 제공하기도 한다. 물론 개발자가 직접 새로운 `Container`를 정의할 수도 있다.

이러한 `Container`들은 `map`, `alt`, `bind`, `lash` 메소드를 이용하여 최종 결과물로 안전하게 도달하고, 개발자는 그 `Container`의 상태를 확인하고, 그 값을 사용하면 된다.

## `Container`의 내부 값에 영향을 미치는 `map`
설명보다는 코드를 직접 확인하는게 더 빠르다.
```python
from returns.maybe import Maybe, Nothing, Some
from returns.result import Failure, ResultE, Success


def div_3(value: float) -> float:
    return value / 3


dummy_exc = Exception("error")
success_value: ResultE[int] = ResultE.from_value(1)
maybe_value: Maybe[int] = Maybe.from_optional(1)
failure_value: ResultE[int] = ResultE.from_failure(dummy_exc)
maybe_non_value: Maybe[int] = Maybe.from_optional(None)

assert success_value == Success(1)
assert failure_value == Failure(dummy_exc)
assert maybe_value == Some(1)
assert maybe_non_value == Nothing

success_result = success_value.map(div_3)
failure_result = failure_value.map(div_3)
maybe_result = maybe_value.map(div_3)
maybe_non_result = maybe_non_value.map(div_3)

assert success_result == Success(div_3(1))
assert failure_result is failure_value
assert maybe_result == Some(div_3(1))
assert maybe_non_result is Nothing

assert success_result.unwrap() == div_3(1)
assert failure_result.failure() is dummy_exc
assert maybe_result.value_or(None) == div_3(1)
assert maybe_non_result.value_or("test") == "test"
```
`Container`의 내부 값을 사용하는 함수를 `map`메소드의 인수로 전달하면, 그 `Container`의 상태가 정상일 때만 작동하고, 그렇지 않다면 아무 일도 하지 않는다.

즉, `map`은 정상적인 상태인 `Container`의 값만 변화시키는 메소드다.

`map`에 사용되는 함수는 에러가 발생하지 않는 순수함수를 가정하고 사용되기에, 함수 실행중 에러가 발생하더라도 `Result` 객체로 감싸지지 않고 작동을 멈출 것이다.

그렇다면 비정상 상태의 `Container` 내부의 값을 변화시키려면 어떻게 해야할까? 그때는 `alt` 메소드를 사용하면 된다.

## `Container`의 상태를 변화시키는 `bind`
```python
from returns.maybe import Maybe, Nothing, Some, maybe
from returns.result import Failure, ResultE, Success, safe


def div_3_v1(value: int) -> ResultE[float]:
    try:
        return Success(3 / value)
    except Exception as exc:
        return Failure(exc)


@safe
def div_3_v2(value: int) -> float:
    return 3 / value


def div_3_v3(value: int) -> Maybe[float]:
    try:
        return Some(3 / value)
    except:
        return Nothing


@maybe
def div_3_v4(value: int) -> float | None:
    return 3 / value


dummy_exc = Exception("error")
success_value: ResultE[int] = ResultE.from_value(0)
maybe_value: Maybe[int] = Maybe.from_optional(1)
failure_value: ResultE[int] = ResultE.from_failure(dummy_exc)
maybe_non_value: Maybe[int] = Maybe.from_optional(None)

assert success_value == Success(0)
assert failure_value == Failure(dummy_exc)
assert maybe_value == Some(1)
assert maybe_non_value == Nothing

success_result = success_value.bind(div_3_v1)
failure_result = failure_value.bind(div_3_v2)
maybe_result = maybe_value.bind(div_3_v3)
maybe_non_result = maybe_non_value.bind(div_3_v4)

assert str(success_result) == "<Failure: division by zero>"
assert failure_result is failure_value
assert maybe_result == div_3_v4(1)
assert maybe_non_result is Nothing

assert repr(success_result.failure()) == "ZeroDivisionError('division by zero')"
assert failure_result.failure() is dummy_exc
assert maybe_result.value_or(None) == 3
assert maybe_non_result.value_or("test") == "test"
```
`bind`는 `Container`의 값을 사용하여 새로운 `Container`를 반환하는 함수를 받는다. 그 함수가 어떻게 정의됐는가에 따라 정상 상태의 `Container`를 반환할 수도 있고, 비정상 상태의 `Container`를 반환할 수도 있다.

즉, `bind`는 정상적인 상태인 Container의 값과 상태를 변화시키는 메소드다.

이러한 함수를 `div_3_v1`이나 `div_3_v3`처럼 일일이 정의하는 것은 손이 많이 가는 작업이므로, 가능하다면 `div_3_v2`이나 `div_3_v4`처럼 `safe`나 `maybe`와 같은 데코레이터를 사용할 것을 권장한다.

`map`과 `alt`처럼 `bind`에도 대응하는 메소드가 있는데, 바로 `lash`다. `lash`는 비정상 상태의 컨테이너를 정상 상태의 컨테이너로 바꿀 수 있다. 물론 비정상 상태를 유지할 수도 있다.

## 여러개의 `Container`를 함께 사용하는 방법

`Container` 각각에 대해 `map`, `bind` 등을 사용하여 값과 상태를 관리하는 것은 알겠지만, 두개 이상의 `Container`를 복합적으로 사용하려면 어떻게 해야할까?

여러 방법이 있겠지만, 그 중 세가지만 알아보자.
> `returns`는 `mypy`를 사용한다고 가정하기에, `pylance`에서는 정상적으로 타입추론이 되지 않는 경우가 있다.
>
> 대부분의 경우 문제가 없었는데, 후술할 `curry`가 그러했다.
### 개별적으로 사용하는 방법
```python
from returns.curry import curry, partial
from returns.io import IO


def sum_v1(left: float, right: float) -> float:
    return left + right


sum_v2 = curry(sum_v1)

left: IO[float] = IO(1.0)
right: IO[float] = IO(2.0)

assert right.apply(left.apply(IO(sum_v2))) == IO(3.0) # pylance에서 문제 발생
assert right.apply(left.apply(IO(lambda x: partial(sum_v1, x)))) == IO(3.0)
assert right.apply(left.apply(IO(lambda x: lambda y: sum_v1(x, y)))) == IO(3.0)
assert sum_v2(1.0)(2.0) == 3 # pylance에서 문제 발생
```

`returns`에서 제공하는 `curry`를 사용하면, 여러개의 인자를 필요로 하는 함수에 인자를 전달할 때, 한번에 모두 전달하지 않아도 된다. 물론 `lambda`와 `partial`을 사용해서 직접 구현해도 문제 없다.

여기서 사용되는 `partial`은 `functools`와 같은 방식으로 사용된다. 차이가 있다면 `returns`의 `partial`은 좀 더 타입추론을 똑똑하게 해준다.

> 성능은 `lambda`로 직접 구현하는게 더 낫다고 한다..
### `Iterable`로 묶어서 사용하는 방법
```python
from typing import Callable

from returns.curry import partial
from returns.io import IO
from returns.iterables import Fold


def sum_v1(left: float, right: float) -> float:
    return left + right


def sum_v2(value: float) -> Callable[[float], float]:
    return partial(sum_v1, value)


def get_one() -> IO[float]:
    return IO(1)


assert Fold.loop([get_one() for _ in range(10)], IO(5), sum_v2) == IO(10 + 5)
assert Fold.loop([get_one() for _ in range(5)], IO(7), sum_v2) == IO(5 + 7)
```
`Fold.loop`는 `Iterable`로 묶여진 `Container`를 사용하는데 유용한 클래스메소드다. 내부 알고리즘은 단순하며, 다음과 같다.
> 1. `Iterable[Container[T]]`에서 `Container[T]` 하나를 선택한다.
> 
> 2. 선택한 `Container[T]`로 `Callable[[R], R]` 객체를 생성한다. (`T`가 아니다!)
>
> 3. 초기값으로 지정된 `Container[R]`를 사용하여 새로운 초기값 `Container[R]`을 생성한다.
>
> 4. 반복

### 여러개로 나눠진 `Container`를 하나로 합치는 방법
```python
from returns.converters import maybe_to_result
from returns.iterables import Fold
from returns.maybe import Maybe, Nothing, Some, maybe
from returns.result import Failure, Result, Success

init_data = dict(zip(list("abc"), range(3)))


@maybe
def get(key: str) -> int | None:
    return init_data.get(key)


values_abc: list[Maybe[int]] = [get(key) for key in "abc"]
values_abcd: list[Maybe[int]] = [get(key) for key in "abcd"]
result_abc: list[Result[int, None]] = [maybe_to_result(x) for x in values_abc]
result_abcd: list[Result[int, None]] = [maybe_to_result(x) for x in values_abcd]

assert Fold.collect(values_abc, Some(())) == Some((0, 1, 2))
assert Fold.collect(result_abc, Success(())) == Success((0, 1, 2))
assert Fold.collect(values_abc, Some((100,))) == Some((100, 0, 1, 2))
assert Fold.collect(result_abc, Success((200,))) == Success((200, 0, 1, 2))

assert Fold.collect(values_abcd, Some(())) is Nothing
assert Fold.collect(result_abcd, Success(())) == Failure(None)

assert Fold.collect_all(values_abcd, Some(())) == Some((0, 1, 2))
assert Fold.collect_all(result_abcd, Success(())) == Success((0, 1, 2))
assert Fold.collect_all(values_abcd, Some((10, 20))) == Some((10, 20, 0, 1, 2))
assert Fold.collect_all(result_abcd, Success((10, 20))) == Success((10, 20, 0, 1, 2))
```

`Fold.collect`를 사용하면, 모든 `Container`가 정상인 경우에 대해서만 수집을 진행하고,

`Fold.collect_all`를 사용하면, 비정상 상태의 `Container`를 제외하고 수집을 진행한다.

# 원문
[Container: the concept](https://returns.readthedocs.io/en/latest/pages/container.html)
