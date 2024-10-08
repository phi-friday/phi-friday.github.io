---
title: returns로 파이썬 타입을 명확하게 만들자 0
tags:
  - python
  - returns
  - 함수형 프로그래밍
page: dry-python/returns
description: 파이썬 타입을 명확하게 만들면 vscode가 착해진다
date: '2022-09-09T02:10:44.645+09:00'
---

# 2% 부족한 `python`의 `type-hint`
`python`에서 `type-hint` 지원이 점점 강력해지고, 이를 반영한 라이브러리들이 늘어나다 보니, 나도 `type-hint`를 적용해가며 개발을 하고 있다.

하지만 아직 몇몇 아쉬운 부분이 보이는데,

특정 클래스 메소드의 리턴값을 그 클래스의 인스턴스로 나타내려 할 때, `TypeVar`를 사용해서 `bound`를 일일이 지정해줘서 나타내야 한다던가..
> 이전에는 `TypeVar`를 사용해야 했지만, 이제는 PEP 673이 반영된 `typing_extensions`의 `Self`를 사용하면 된다.
>
> 하지만 아직 많은 라이브러리가 `Self`를 사용하고 있지는 않다.(이미 `TypeVar`로 많은 부분이 작성되어 있으므로)

나중에 정의될 클래스를 `type-hint`로 사용하려면 문자열로 표현해야 한다던가..
> 3.11에서 수정될 예정이고, `__future__` 에서 `annotation` 모듈을 가져오면 미리 사용할 수 있다.

`TypeVar`로 정의된 값을 이용해서 상위 제네릭을 표현할 수 없다던가..
```python
from typing import TypeVar, Generic

_T = TypeVar("_T")
_Test = TypeVar("_Test", bound="Test")

class Test(Generic[_T]):
    def __init__(self, data: _T):
        self.data = data

def test(value: _T[int]) -> _T[int]:
    ...
# TypeError: 'TypeVar' object is not subscriptable
```

쓰다보니 뭔가 대부분 `TypeVar` 관련인데, 이 중에서 `TypeVar`를 사용한 상위 제네릭과 관련해서 좀 더 알아봤더니, 제한적으로나마 이를 해결한 라이브러리가 있었는데, 그게 바로 [returns](https://github.com/dry-python/returns)다.

> 앞서 상위 제네릭이라 표현한 것은, 일반적으로 __Higher Kinded Type__ 이라고 하는 것 같다.

# 함수형 프로그래밍에 적합한 `returns`
라이브러리 이름이 범용적으로 쓰이는 `return`과 너무 유사해서, 제대로 검색이 되지 않는다. 마치 구글의 `go`를 보는 듯 하다..

다행히 `returns` 자체 [문서](https://returns.readthedocs.io/en/latest/index.html)가 아주 잘 만들어져 있어서, 이해하는데 큰 문제는 없었다.

또한 라이브러리 기능이 간단하면서도 강력해서, `type-hint` 외에도 쓸데가 많아보인다. 특히, 함수형 프로그래밍을 하고자 한다면 꽤 유용하지 않을까, 싶었는데 `readme`에서 함수형 프로그래밍을 위해 만들어진 라이브러리라고 직접 소개하고 있다.
> _Brings functional programming to Python land_

처음에는 단순히 __Higher Kinded Type__ 를 위해 알아봤는데, 이제는 이 라이브러리를 어떻게 사용하면 잘 사용할 수 있을까 고민하게 됐다.

`returns`의 대표적인 기능 두가지만 미리 소개하자면,

## `Optional`을 대신 할 `Maybe`

```python
from returns.maybe import Maybe, maybe


@maybe
def one_or_none(value: int) -> int | None:
    if value == 1:
        return value
    return None


maybe_one0: Maybe[int] = one_or_none(1)
maybe_one1: Maybe[int] = one_or_none(2)
# or
# maybe_one0: Maybe[int] = Maybe.from_optional(1)
# maybe_one1: Maybe[int] = Maybe.from_optional(None)

maybe_str0 = maybe_one0.bind_optional(str)
maybe_str1 = maybe_one1.bind_optional(str)

assert maybe_str0.value_or("error") == "1"
assert maybe_str1.value_or("error") == "error"
```
원래라면 `if`문을 사용해서 `None` 타입 확인을 하고 진행했겠지만,

`Maybe`는 마치 `js`의 `some_object?.some_attr`과 같은 방식으로 전개할 수 있게 만들어준다.


## `try`, `except`를 대신할 `Result`
```python
from returns.converters import result_to_maybe
from returns.result import Result, safe


@safe
def div(left: float, right: float) -> float:
    # if right == 0:
    # raise ZeroDivisionError
    return left / right


result0: Result[float, Exception] = div(2, 3)
# or
# result0: Result[float, ZeroDivisionError]
# or
# from returns.result import ResultE
# result0: ResultE[float] = div(2, 3)
result1: Result[float, Exception] = div(4, 0)

assert (
    result_to_maybe(result0.map(lambda x: x**2).alt(str)).value_or("error")
) == 4 / 9

assert (
    result_to_maybe(result1.map(lambda x: x**2).alt(str)).value_or("error")
) == "error"
```

에러에 대해 미리 고민 할 필요 없이, 기본적으로 제공되는 `map`, `bind`, `alt`, `lash` 등의 메소드를 사용하면 된다.

올바른 타입이 아니라면 작동하지 않고, 추가적인 에러도 발생하지 않는다.

위 예시에서는 문자열 `error`를 표시했지만, 원한다면 그 에러를 발생시킬 수도 있다.

# 앞으로
시간이 될 때, `returns`의 공식 문서를 나름대로 정리해서 포스팅을 하고자 한다. 하지만 이것도 다른 것과 마찬가지로 하다가 중단될 수 있다..
