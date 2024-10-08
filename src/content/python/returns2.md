---
title: returns로 파이썬 타입을 명확하게 만들자 2 - ROP
tags:
  - python
  - returns
  - 함수형 프로그래밍
page: dry-python/returns
description: 파이썬 타입을 명확하게 만들면 vscode가 착해진다
date: '2022-09-13T22:22:07.993+09:00'
---

# `ROP`
## `ROP`에 대한 간략한 설명
> 오개념이 있을 가능성이 높으니, 따로 더 검색해서 알아보기를 권장합니다.

`ROP`는 __Railway oriented programming__ 의 약어로, 직역하면 __철도 지향 프로그래밍__ 이다. 이름 그대로 `input`과 `output`를 적절한 철도(함수)로 이어준다.

전통적인 방식에서는, 각 철도(함수)마다 예외처리를 실시하여 에러에 대응하지만, 프로그램의 규모가 커질수록 유지보수에 어려움이 발생한다.

이를 해결하기 위해, 각 철도(함수)에서 발생하는 에러는 프로그램의 오작동을 유발하는 것이 아닌 적합한 `output`으로 간주하며, 다음 철도(함수)에서 `input`으로 활용한다.

즉, 각 철도(함수)의 `input`과 `output`은 개발자가 의도한 정상적인 값과 의도하지 않은 비정상적인 값(에러)으로 구분된다.

이렇게 작성된 프로그램은 각 철도(함수)별 예외처리가 없더라도, 각 철도(함수)별 `output`의 상태를 구분지을 수 있고, `output`은 단 두가지로 구분되므로, 다음 철도(함수)의 `input`으로 활용하는데 있어서 깔끔한 조작을 가능하게 한다. 

> 위 글을 포함한 이전 포스트까지 __정상__ 상태와 __비정상__ 상태로 구분지어 표현하였으나, `returns`의 `container`와 용어를 일치하기 위해, 이후 글 부터는 __성공__ 과 __실패__ 로 대신합니다.

## `returns`가 제시하는 `ROP`
`returns`에서 미리 정의된 `container`는 `alt`, `map`, `lash`, `bind` 메소드를 사용하여 함수(철도)를 잇게 한다.

* `alt`: __실패__ 를 사용하여, __실패__ 로 잇는다.
* `map`: __성공__ 을 사용하여, __성공__ 으로 잇는다. 
* `lash`: __실패__ 를 사용하여, __성공__ 또는 __실패__ 로 잇는다.
* `bind`: __성공__ 을 사용하여, __성공__ 또는 __실패__ 로 잇는다.

다만 모든 `container`가 위와 같은 메소드를 가지고 있는 것은 아니다. `returns.interfaces` 모듈에는 이러한 메소드에 대한 인터페이스가 정의되어 있고, 해당하는 인터페이스를 만족하는 `container`가 위와 같은 메소드를 사용할 수 있다.

> `map`과 `bind`에 대한 간략한 설명과 예제는 이전 포스트에 포함되어 있고, `alt`와 `lash`는 `input`의 상태에만 차이가 있으므로 생략한다.

# `container`에서 실제 값을 추출하는 방법
```python
from returns.maybe import Maybe
from returns.primitives.exceptions import UnwrapFailedError
from returns.result import ResultE

assert ResultE.from_value(1).unwrap() == 1
try:
    result = ResultE.from_failure(1).unwrap()
except Exception as exc:
    result = exc
assert isinstance(result, UnwrapFailedError)
assert ResultE.from_value(1).value_or(2) == 1
assert ResultE.from_failure(1).value_or(2) == 2

assert Maybe.from_optional(1).unwrap() == 1
try:
    result = Maybe.from_optional(None).unwrap()
except Exception as exc:
    result = exc
assert isinstance(result, UnwrapFailedError)
assert Maybe.from_optional(1).value_or(2) == 1
assert Maybe.from_optional(None).value_or(2) == 2
assert Maybe.from_optional(1).or_else_call(lambda: 2) == 1
assert Maybe.from_optional(None).or_else_call(lambda: 2) == 2
```
`Container`로 감싸진 내부의 값을 추출하기 위해서는 `unwrap` 또는 `value_or` 또는 `or_else_call` 메소드를 사용하면 된다.

* `unwrap` 메소드는 __성공__ 일 때만 정상적으로 추출이 가능하다.

* `value_or`는 __실패__ 일 때 처리가 가능하게 만든다.

* `or_else_call`는 __실패__ 일 때 반환할 값을 지연시킬 수 있다.
> `or_else_call` 메소드는 `Maybe`에는 있고 `Result`에는 없다. `Result`에서는 `alt`가 있기 때문이다.
>
> 또한 `unwrap`이 불가능한 경우도 있다. `IO`가 대표적이다.

# 원문
[Railway oriented programming](https://returns.readthedocs.io/en/latest/pages/railway.html)