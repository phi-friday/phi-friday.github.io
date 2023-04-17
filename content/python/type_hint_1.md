---
title: '[코드를 깔끔하게] type hint - 1'
tags:
  - python
  - typehint
page: 코드를_깔끔하게
description: 생산성 향상을 위해
date: '2023-02-13'
publish: true
---

## 1. 왜 타입힌트를 사용해야 하는가.
다음과 같이 간단한 함수를 정의할 수 있다.
```python
def add_2(value):
	return value + 2
```
개발자의 의도대로 사용한다면 `value`에 실수 값을 입력해서 `add_2`를 사용할 것이다. 하지만 개발자가 아닌 다른 사람이 사용한다면 __의도와 다르게 사용할 수도 있다.__ 그러한 상황을 미연에 방지하고자 다음과 같이 주석을 작성할 수 있다.
```python
def add_2(value):
    """Add 2 to value.

    Args:
        value: addable value

    Returns:
        Value with 2 added
    """
    return value + 2
```
위 주석은 `add_2`의 사용법을 명확하게 설명한다. 하지만 사람은 주석으로 함수의 사용법을 인지하지만, __ide는 이를 인지하지 못한다.__

__ide가 함수의 상세한 타입 명세를 파악하지 못하면__ 문제가 발생할 때가 많다. 단순히 `add_2`와 같은 함수를 사용한다면 상관없겠지만, 더 복잡하게 중첩된 경우, ide의 추론 기능을 활용하지 않으면 쓸데없이 __시간을 낭비하게 된다.__

따라서 타입힌트를 추가하여 사람도 ide도 파악할 수 있는 함수를 생성하는 것이 좋다. 다음은 타입힌트가 추가된 `add_2`함수다.
```python
def add_2(value: float) -> float:
    """Add 2 to value.

    Args:
        value: addable value

    Returns:
        Value with 2 added
    """
    return value + 2
```
이제 ide는 `add_2`가 `float`타입의 변수를 받아서 `float`타입의 값을 반환한다는 것을 인지할 수 있다. 이러한 타입힌트는 사용자가 함수를 잘못 사용하게 되는 경우를 줄이고, 가독성을 높여주며, ide의 추론 기능을 적극 사용할 수 있게 큰 도움을 준다. 즉, __생산성이 향상된다.__

## 2. 버전별 타입힌트의 차이
타입 힌트가 파이썬에 추가되고 많은 시간이 지났다. 버전이 올라갈수록 새로운 기능을 추가하며 보완하다보니, 버전별 차이가 많다.

기본적으로 제공하는 `typing`이라는 기본 라이브러리를 사용하여 타입힌트를 사용할 수 있으며, 상위 버전의 기능을 사용하기 위한 백포트로 `typing_extensions`를 설치해서 사용할 수도 있다. 다만 `typing_extensions`를 사용하더라도 __문법 자체에 변화가 생긴 경우가 있으니 주의할 필요가 있다.__

대표적으로 `list`, `dict` 등 빌트인 객체의 제네릭 적용 여부라던가, `Union`에 대한 문법 설탕 추가가 있다.

## 3. 타입힌트 사용법
[공식문서](https://docs.python.org/3/library/typing.html)를 참조하여 타입힌트를 사용하는 방법에 대해 하나씩 알아보자.

하위 호환과 관련하여 주의하고 작성하겠지만, 그렇지 못한 경우가 있을 수 있다.

### `NewType`
```python
from typing import NewType

UserId = NewType("UserId", int)
some_id = UserId(524313)

assert some_id == 524313
assert isinstance(some_id, int)


def get_user_name(user_id: UserId) -> str:
    ...

## passes type checking
user_a = get_user_name(UserId(42351))

## fails type checking; an int is not a UserId
user_b = get_user_name(-1)
```
특정 타입과 같은 타입을 표현하지만, 마치 특별한 타입인 것 처럼 표현할 수 있다. 

`get_user_name`은 함수 내부에서 `int`타입 변수인 `user_id`를 사용하지만, `int`타입 변수를 받는 것이 아닌 `UserId`를 받는 것처럼 되어 있으므로, 유저에 대한 고유한 값이 아닌 별개의 값을 사용하는 것을 방지할 수 있다.

### `Callable`
```python
from typing import Awaitable, Callable


def feeder(get_next_item: Callable[[], str]) -> None:
    ...


def async_query(
    on_success: Callable[[int], None], on_error: Callable[[int, Exception], None]
) -> None:
    ...


async def on_update(value: str) -> None:
    ...


callback: Callable[[str], Awaitable[None]] = on_update
func: Callable[..., None] = feeder
func2: Callable[..., None] = async_query
```
호출 가능한 타입을 표현한다. 대표적으로 함수가 있으며, `__call__` 메소드가 정의된 클래스를 의미한다.

파라미터와 반환 값의 타입을 직접 지정할 수도 있고, `...`으로 생략할 수도 있다.(이 경우 ide는 파라미터에 대한 추론을 정확하게 하지 않는다)

현재 구조상 키워드 파라미터에 대해서는 타입힌트를 지원하지 않는다. 이를 사용하기 위해서는 `Protocol`을 사용해야 하는데, 이는 나중에 설명한다.

파라미터와 반환 값에 대한 제네릭 표현이 가능한데, 이는 `TypeVar`, `ParamSpec`, `Concatenate`와 같은 다른 클래스가 필요하므로 나중에 설명한다.

예시에는 `typing`에서 `Callable`을 가져왔지만 `ruff`와 같은 린팅 툴에서는 `collections.abc` 사용을 권장하니 참고하기 바란다.(버전별 차이가 있을 수 있음)


### `TypeVar`
```python
from collections.abc import Sequence
from typing import TypeVar

T = TypeVar("T")  ## Declare type variable


def first(values: Sequence[T]) -> T:  ## Generic function
    return values[0]


first([1, 2, 3, 4, 5])  ## int
first("abcde")  ## str
```
`TypeVar`는 임의의 변수를 나타낼 수 있게 한다. `bound` 파라미터를 사용하여 타입을 제한할 수도 있으며, `covariant` 또는 `contravariant` 파라미터를 사용하여 공변성을 변경할 수도 있다.

### `Generic`
```python
from typing import TypeVar, Generic
from logging import Logger, getLogger

T = TypeVar("T")
logger = getLogger()


class LoggedVar(Generic[T]):
    def __init__(self, value: T, name: str, logger: Logger) -> None:
        self.name = name
        self.logger = logger
        self.value = value

    def set(self, new: T) -> None:
        self.log("Set " + repr(self.value))
        self.value = new

    def get(self) -> T:
        self.log("Get " + repr(self.value))
        return self.value

    def log(self, message: str) -> None:
        self.logger.info("%s: %s", self.name, message)


vlogger: LoggedVar[int] = LoggedVar(1, "test", logger)

```
`Generic`은 제네릭 클래스를 생성할 수 있게 한다. 위 예시에서는 하나의 변수에 대해서만 작성했지만, 두개 이상을 사용해도 아무 문제가 없다. 중첩해서 사용하거나 상속받아 사용해도 아무 문제 없다.

### `ParamSpec`
```python
from typing import TypeVar, ParamSpec, Callable, Tuple

ParamT = ParamSpec("ParamT")
ValueT = TypeVar("ValueT")


def echo_params(func: Callable[ParamT, ValueT]) -> Callable[ParamT, ValueT]:
    def inner(*args: ParamT.args, **kwargs: ParamT.kwargs) -> ValueT:
        print(args, kwargs)
        return func(*args, **kwargs)

    return inner


@echo_params
def get_value(x: int, y: str, z: float) -> Tuple[int, str, float]:
    return (x, y, z)
```
`ParamSpec`은 호출 가능한 객체가 받는 파라미터에 대한 일반적인 표현을 가능하게 한다. 위 예제는 데코레이터를 표현하는 간단한 형태의 예제다. `Concatename`와 함께 사용한다면 더 강력한 표현이 가능하다.

3.10부터 사용할 수 있으므로 이전 버전에서는 `typing_extensions`이 필요하다.

### `Any`
```python
from typing import Any

a: Any = None
a = []  ## OK
a = 2  ## OK

s: str = ""
s = a  ## OK


def foo(item: Any) -> int:
    ## Passes type checking; 'item' could be any type,
    ## and that type might have a 'bar' method
    item.bar()
    ...
```
타입과 무관하게 작동하거나, 타입을 무시하고 싶을 때 사용할 수 있다. `typescript`의 `as any`와 같다고 볼 수 있다.
분명 필요하지만 남용하면 타입힌트를 쓰지 않은 것과 같으니 조절해서 사용해야한다.

### `LiteralString`
```python
from typing_extensions import LiteralString

def run_query(sql: LiteralString) -> ...
    ...

def caller(arbitrary_string: str, literal_string: LiteralString) -> None:
    run_query("SELECT * FROM students")  ## ok
    run_query(literal_string)  ## ok
    run_query("SELECT * FROM " + literal_string)  ## ok
    run_query(arbitrary_string)  ## type checker error
    run_query(  ## type checker error
        f"SELECT * FROM students WHERE name = {arbitrary_string}"
    )
```
3.11에 추가됐다. `Literal`을 사용하여 표현된 문자열을 나타낸다. `Literal` 변수를 그대로 사용하거나, `Literal`변수를 사용하여 만들어진 문자열을 허용하지만 단순한 문자열은 허용하지 않는다.

### `Never`
```python
from typing_extensions import Never


def never_call_me(arg: Never) -> None:
    pass


def int_or_str(arg: int | str) -> None:
    never_call_me(arg)  ## type checker error
    match arg:
        case int():
            print("It's an int")
        case str():
            print("It's a str")
        case _:
            never_call_me(arg)  ## ok, arg is of type Never
```
3.11에 추가됐다. 호출되면 안되는 함수를 표현할때 사용하라고 하는데, 개인적으로 의도를 잘 파악하기 힘들다. `NoReturn`과 비슷한 컨셉으로 만들어졌다고 하는데, `NoReturn`은 유용하지만 `Never`는 아직 잘 모르겠다.

### `NoReturn`
```python
from typing import NoReturn


def stop() -> NoReturn:
    raise RuntimeError("no way")

```
`NoReturn`은 함수의 반환 값을 표현할 때 사용된다. 그 함수가 어떠한 변수도 반환하지 않을 때(`None`을 반환하는 것은 `None`값을 반환하는 것이므로 `NoReturn`이 아니다.)를 나타내는 것으로, 에러 등의 비정상적인 상황이 발생하는 것이 분명할 때 사용된다.

### `Self`
```python
from typing_extensions import Self


class Foo:
    def return_self(self) -> Self:
        ...
        return self
```
3.11에 추가됐다. 클래스의 메소드가 자기 자신을 반환할 때 사용한다. 이전 버전에서도 다음과 같은 방식으로 구현이 가능했지만, `Self`를 사용하면 더 간결하다.
```python
from typing import TypeVar

Self = TypeVar("Self", bound="Foo")


class Foo:
    def return_self(self: Self) -> Self:
        ...
        return self

```

### `TypeAlias`
```python
from typing import Tuple
from typing_extensions import TypeAlias, TypeVar

ValueT = TypeVar("ValueT")
ErrorT = TypeVar("ErrorT", bound=BaseException)
Result: TypeAlias = Tuple[ValueT] | Tuple[ErrorT]
MaybeResult = Tuple[ValueT] | Tuple[ErrorT]

result: Result[int, Exception] = (1,)
error: Result[int, Exception] = (Exception("test"),)

result2: MaybeResult[int, Exception] = (1,)
error2: MaybeResult[int, Exception] = (Exception("test"),)
```
복잡하게 정의된 타입 힌트를 변수에 할당할 때, 이를 명시하기 위해 사용된다.
예시의 `MaybeResult`처럼 `TypeAlias`를 명시하지 않아도 ide에서 잘 추론하지만, 작성하는게 나중에 확인하기 좋다.

### `Tuple`
```python
from typing import Tuple

a: Tuple[int, str] = (1, "a")  ## correct
b: Tuple[int] = a  ## incorrect
c: Tuple[int, ...] = a  ## incorrect
d: Tuple[int, ...] = (1, 1, 1)  ## correct
```
`Tuple`은 튜플 타입의 각 위치별 타입을 명확하게 할 때 사용한다.

3.9부터 `Tuple`대신 빌트인의 `tuple`을 사용할 수 있다. `Tuple` 외에도 `List`나 `Dict`와 같은 빌트인 객체들에도 적용됐는데, 덕분에 훨씬 편해졌다.

### `Union`
```python
from typing import Union

Union[Union[int, str], float] == Union[int, str, float]
Union[int] == int  ## 문법상 에러가 발생하지만, 의미상 동일하다.
Union[int, str, int] == Union[int, str] == int | str  ## 3.10부터 |를 사용할 수 있다.
Union[int, str] == Union[str, int]

a: Union[int, str] = 1  ## correct
a = "asd"  ## correct
a = 0.3  ## incorrect
```
두개 이상의 타입을 함께 표현할 때 사용된다. 함수를 표현할 때, `nullable`한 파라미터를 표현할때 주로 사용한다.(`Optional`을 사용할 수도 있다.)

`Union`을 사용하는 것 보다 3.10에 추가된 `|` 문법을 사용하는 것이 훨씬 편하지만 하위 호환성을 고려하고 사용해야 한다.

### `Optional`
```python
from typing import Optional


def foo(arg: Optional[int] = None) -> None:
    ...

```
`Optional[int]`는 `Union[int, None]` 또는 `int | None`과 같다.

### `Concatenate`
```python
from collections.abc import Callable
from threading import Lock
from typing import Concatenate, ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")

## Use this lock to ensure that only one thread is executing a function
## at any time.
my_lock = Lock()


def with_lock(f: Callable[Concatenate[Lock, P], R]) -> Callable[P, R]:
    """A type-safe decorator which provides a lock."""

    def inner(*args: P.args, **kwargs: P.kwargs) -> R:
        ## Provide the lock as the first argument.
        return f(my_lock, *args, **kwargs)

    return inner


@with_lock
def sum_threadsafe(lock: Lock, numbers: list[float]) -> float:
    """Add a list of numbers together in a thread-safe manner."""
    with lock:
        return sum(numbers)


## We don't need to pass in the lock ourselves thanks to the decorator.
sum_threadsafe([1.1, 2.2, 3.3])
```
`ParamSpec`으로 함수의 파라미터를 표현할 수 있지만, 그 파라미터 각각의 타입을 명시하기 위해서는 `Concatenate`를 함께 사용해야 한다. 위 예시에서 작성된 코드를 ide에서 확인해보면 `sum_threadsafe`함수가 받는 파라미터에서 `lock`이 제거된 것을 확인할 수 있다.

키워드 파라미터에 대해서는 여전히 표현이 불가능하며, 필요하다면 `Protocol`을 사용해야 한다.

### Type
```python
from typing import Type


class User:
    ...


class BasicUser(User):
    ...


class ProUser(User):
    ...


class TeamUser(User):
    ...


## Accepts User, BasicUser, ProUser, TeamUser, ...
def make_new_user(user_class: Type[User]) -> User:
    ## ...
    return user_class()
```
인스턴스가 아닌 클래스에 대해 표현할 때 사용한다. 3.9버전부터 `type`으로 대체할 수 있다.

### `Literal`
```python
from typing import Literal, Any


def validate_simple(data: Any) -> Literal[True]:  ## always returns True
    ...


MODE = Literal["r", "rb", "w", "wb"]


def open_helper(file: str, mode: MODE) -> str:
    ...


open_helper("/some/path", "r")  ## Passes type check
open_helper("/other/path", "typo")  ## Error in type checker
```
특정한 값을 지정해야 할 때 사용한다. `str`이나 `bool` 외에도 `int`나 `float` 등 다른 타입도 가능하다.


### `ClassVar`
```python
from typing import ClassVar


class Starship:
    stats: ClassVar[dict[str, int]] = {}  ## class variable
    damage: int = 10  ## instance variable

    def __init__(self, value: int) -> None:
        self.damage = value


enterprise_d = Starship(3000)
enterprise_d.stats = {}  ## Error, setting class variable on instance
Starship.stats = {}  ## This is OK
```
클래스 변수와 인스턴스의 변수를 구분짓기 위해 사용된다. 런타임 중 제약이 생기는 것은 아니지만, 개발자에게 충분한 경고를 제시한다.

### `Final`
```python
from typing import Final

MAX_SIZE: Final[int] = 9000
MAX_SIZE += 1  ## Error reported by type checker


class Connection:
    TIMEOUT: Final[int] = 10


class FastConnector(Connection):
    TIMEOUT = 1  ## Error reported by type checker
```
불변 값을 표현할 때 사용한다. 예시의 `MAX_SIZE`는 `mypy`에서 정상적으로 인식하겠지만, 아쉽게도 `pylance`에서는 에러를 발생시키지 못했다..

### `Required`, `NotRequired`
```python
from typing import TypedDict
from typing_extensions import Required, NotRequired


class SomeDict(TypedDict):
    a: Required[int]
    b: NotRequired[int]


a: SomeDict = {}  ## incorrect
b: SomeDict = {"a": 1}  ## correct
c: SomeDict = {"a": 1, "b": 2}  ## correct
d: SomeDict = {"b": 2}  ## incorrect
```
`TypedDict`의 아이템 필수 여부를 표현하는데 사용한다.
3.11에서 새로 추가됐으므로 `typing_extensions`를 사용해야 할 수 있다.

### `Annotated`
> 파악중

### `TypeGuard`
```python
from typing import TypeGuard


def is_str_list(val: list[object]) -> TypeGuard[list[str]]:
    """Determines whether all objects in the list are strings"""
    return all(isinstance(x, str) for x in val)


def func1(val: list[object]):
    if is_str_list(val):
        ## Type of ``val`` is narrowed to ``list[str]``.
        print(" ".join(val))
    else:
        ## Type of ``val`` remains as ``list[object]``.
        print("Not a list of strings!")
```
`TypeGuard`가 `True`를 반환한 콘텍스트 내부에서 `val`에 해당하는 값의 타입은 `TypeGuard`가 보장하는(위 예시에서는 `list[str]`) 타입으로 표현된다.

빌트인 함수인 `isinstance`, `issubclass`와 비슷하지만 좀 더 자유롭게 구성할 수 있다.

### `TypeVarTuple`
```python
from typing import TypeVar, Generic
from typing_extensions import TypeVarTuple


T = TypeVar('T')
Ts = TypeVarTuple('Ts')

def move_first_element_to_last(tup: tuple[T, *Ts]) -> tuple[*Ts, T]:
    return (*tup[1:], tup[0])

## T is bound to int, Ts is bound to ()
## Return value is (1,), which has type tuple[int]
move_first_element_to_last(tup=(1,))

## T is bound to int, Ts is bound to (str,)
## Return value is ('spam', 1), which has type tuple[str, int]
move_first_element_to_last(tup=(1, 'spam'))

## T is bound to int, Ts is bound to (str, float)
## Return value is ('spam', 3.0, 1), which has type tuple[str, float, int]
move_first_element_to_last(tup=(1, 'spam', 3.0))

## This fails to type check (and fails at runtime)
## because tuple[()] is not compatible with tuple[T, *Ts]
## (at least one element is required)
move_first_element_to_last(tup=())

Shape = TypeVarTuple('Shape')
class Array(Generic[*Shape]):
    def __getitem__(self, key: tuple[*Shape]) -> float: ...
    def __abs__(self) -> "Array[*Shape]": ...
    def get_shape(self) -> tuple[*Shape]: ...
```
`tuple`에 대해 언팩을 표현하기 위한 것으로 보이는데, 3.11에 추가됐고 명확하게 어떻게 사용해야 할지 모르겠어서, 아직 사용해본 적이 없다.

3.11 이전 버전에서는 타입힌트에 대한 언팩 자체를 허용하지 않으므로 `Unpack`과 함께 사용해야 한다.

### `Unpack`
```python
## In older versions of Python, TypeVarTuple and Unpack
## are located in the `typing_extensions` backports package.
from typing_extensions import TypeVarTuple, Unpack

Ts = TypeVarTuple("Ts")
tup: tuple[*Ts]         ## Syntax error on Python <= 3.10!
tup: tuple[Unpack[Ts]]  ## Semantically equivalent, and backwards-compatible
```
3.11 미만의 버전에서 `tup: tuple[*Ts]`는 에러가 발생한다. 따라서 의미상 동일한 `tup: tuple[Unpack[Ts]]`를 사용해야 한다.


### `AnyStr`
```python
from typing import AnyStr


def concat(a: AnyStr, b: AnyStr) -> AnyStr:
    return a + b


concat("foo", "bar")  ## Ok, output has type 'unicode'
concat(b"foo", b"bar")  ## Ok, output has type 'bytes'
concat("foo", b"bar")  ## Error, cannot mix unicode and bytes
```
`str` 또는 `bytes`를 함께 표현하는데, 한 스코프 내에서 같이 쓰이는 경우, 그 변수들은 모두 `str`이거나 모두 `bytes`이어야 한다. 섞어서 쓸 수 없다.(`AnyStr = TypeVar('AnyStr', str, bytes)`로 정의되기 때문이다.)

### `Protocol`
```python
from typing import Protocol


class Test(Protocol):
    def __call__(self, x: int, *, y: str, z: int) -> tuple[int, str, int]:
        ...

```
`Protocol`은 특정 클래스의 내부 메소드 구현에 대해 명확하게 표현할 수 있게 한다. 앞서 설명한 `Callable`만으로 함수를 설명하기 어렵다면 `Protocol`로 대신할 수 있다. 그 외에도 많은 용례가 있다.

덕타이핑을 위해 종종 사용된다.

`~Generic`

### `NamedTuple`
```python
from typing import NamedTuple


class Employee(NamedTuple):
    name: str
    id: int = 3


employee = Employee("Guido")
assert employee.id == 3
assert employee[0] == "Guido"
assert isinstance(employee, tuple)
```
튜플을 정의 할 때 각 위치에 해당하는 값의 이름을 지정하여 속성처럼 사용할 수 있게 한다. 기존 튜플과 동일한 방식으로 사용할 수도 있다.

`Generic`을 사용할 수도 있지만, 3.11부터 가능하다.


### `TypedDict`
```python
from typing import TypedDict


class Point2D(TypedDict):
    x: int
    y: int
    label: str


a: Point2D = {"x": 1, "y": 2, "label": "good"}  ## OK
b: Point2D = {"z": 3, "label": "bad"}  ## Fails type check

assert Point2D(x=1, y=2, label="first") == dict(x=1, y=2, label="first")
```
딕셔너리의 키와 아이템을 명시적으로 표현하기 위해 사용한다. 앞서 설명한 `Required`와 `NotRequired`를 함께 사용하면 더 상세한 표현이 가능하다.

모든 값이 필수값이라면 클래스를 정의할 때 `total=True`파라미터를 함께 전달하면 된다.(그 반대는 `total=False`)

위 예시와 같이 클래스 정의 문법이 아닌 인스턴스 호출 문법으로도 사용할 수 있다.
```python
Point2D = TypedDict('Point2D', {'x': int, 'y': int, 'label': str})
```
클래스의 속성값의 첫 글자에 들어갈 수 없는 문자열(@, ## 등)을 포함하는 키값에 대해 정의할때 유용하다. 또한 하위 버전에서 호환되는 방식으로 작성하려면 이 방법뿐이다.

`Generic`을 사용할 수도 있지만, 3.11부터 가능하다.

`~dict`

### `Dict`
```python
from typing import Dict

def count_words(text: str) -> Dict[str, int]:
    ...
```
딕셔너리에 대한 표현. 3.9부터 `dict`로 바로 사용이 가능하다.

`~dict, MutableMapping[KT, VT]`

### `List`
```python
from typing import List, TypeVar, Sequence

T = TypeVar("T", int, float)


def vec2(x: T, y: T) -> List[T]:
    return [x, y]


def keep_positives(vector: Sequence[T]) -> List[T]:
    return [item for item in vector if item > 0]
```
리스트에 대한 표현. 3.9부터 `list`로 바로 사용이 가능하다.

`~list, MutableSequence[T]`

### `Set`, `FrozenSet`
셋에 대한 표현. 3.9부터 `set` 또는 `frozenset`으로 바로 사용이 가능하다.

`~set, MutableSet[T]`

`~frozenset, AbstractSet[T_co]`

### `DefaultDict`
`collections.defaultdict`에 대한 표현.
3.9부터 `collections.defaultdict`로 바로 사용이 가능하다.

`~collections.defaultdict, MutableMapping[KT, VT]`

### `OrderedDict`
`collections.OrderedDict`에 대한 표현.
3.9부터 `collections.OrderedDict`로 바로 사용이 가능하다.

`~collections.OrderedDict, MutableMapping[KT, VT]`

### `ChainMap`
`collections.ChainMap`에 대한 표현.
3.9부터 `collections.ChainMap`로 바로 사용이 가능하다.

`~collections.ChainMap, MutableMapping[KT, VT]`

### `Counter`
`collections.Counter`에 대한 표현.
3.9부터 `collections.Counter`로 바로 사용이 가능하다.

`~collections.Counter, Dict[T, int]`

### `Deque`
`collections.deque`에 대한 표현.
3.9부터 `collections.deque`로 바로 사용이 가능하다.

`~deque, MutableSequence[T]`

### `IO`, `TextIO`, `BinaryIO`
빌트인 함수인 `open`이 반환하는 스트림에 대한 표현. `TextIO`는 `IO[str]`와 같고, `BinaryIO`는 `IO[bytes]`와 같다.

### `Pattern`, `Match`
기본 라이브러리인 `re`에서 사용되는 정규식 또는 정규식 매칭 결과에 대한 표현.

### `Text`
`str`에 대한 별칭으로 `python2`와 호환을 위해 사용된다. 곧 지원 종료.

### `AbstractSet`
`collections.abc.Set`에 대한 표현.
3.9부터는 `collections.abc.Set`로 바로 사용이 가능하다.

`~Collection[T_co]`

### `ByteString`
`collections.abc.ByteString`에 대한 표현.
3.9부터는 `collections.abc.ByteString`로 바로 사용이 가능하다.

`~Sequence[int]`

### `Collection`
`collections.abc.Collection`에 대한 표현.
3.9부터는 `collections.abc.Collection`로 바로 사용이 가능하다.

`~Sized, Iterable[T_co], Container[T_co]`

### `Container`
`collections.abc.Container`에 대한 표현.
3.9부터는 `collections.abc.Container`로 바로 사용이 가능하다.

`~Generic[T_co]`

### `ItemView`
`collections.abc.ItemsView`에 대한 표현.
3.9부터는 `collections.abc.ItemsView`로 바로 사용이 가능하다.

`~MappingView, AbstractSet[tuple[KT_co, VT_co]]`

### `KeysView`
`collections.abc.KeysView`에 대한 표현.
3.9부터는 `collections.abc.KeysView`로 바로 사용이 가능하다.

`~MappingView, AbstractSet[KT_co]`

### `Mapping`
```python
from typing import Mapping

def get_position_in_index(word_list: Mapping[str, int], word: str) -> int:
    return word_list[word]
```
`collections.abc.Mapping`에 대한 표현.
3.9부터는 `collections.abc.Mapping`로 바로 사용이 가능하다.

`~Collection[KT], Generic[KT, VT_co]`

### `MappingView`
`collections.abc.MappingView`에 대한 표현.
3.9부터는 `collections.abc.MappingView`로 바로 사용이 가능하다.

`~Sized`

### `MutableMapping`
`collections.abc.MutableMapping`에 대한 표현.
3.9부터는 `collections.abc.MutableMapping`로 바로 사용이 가능하다.

`~Mapping[KT, VT]`

### `MutableSequence`
`collections.abc.MutableSequence`에 대한 표현.
3.9부터는 `collections.abc.MutableSequence`로 바로 사용이 가능하다.

`~Sequence[T]`

### `MutableSet`
`collections.abc.MutableSet`에 대한 표현.
3.9부터는 `collections.abc.MutableSet`로 바로 사용이 가능하다.

`~AbstractSet[T]`

### `Sequence`
`collections.abc.Sequence`에 대한 표현.
3.9부터는 `collections.abc.Sequence`로 바로 사용이 가능하다.

`~Reversible[T_co], Collection[T_co]`

### `ValuesView`
`collections.abc.ValuesView`에 대한 표현.
3.9부터는 `collections.abc.ValuesView`로 바로 사용이 가능하다.

`~MappingView, Collection[_VT_co]`

### `Iterable`
`collections.abc.Iterable`에 대한 표현.
3.9부터는 `collections.abc.Iterable`로 바로 사용이 가능하다.

`~Generic[T_co]`

### `Iterator`
`collections.abc.Iterator`에 대한 표현.
3.9부터는 `collections.abc.Iterator`로 바로 사용이 가능하다.

`~Iterable[T_co]`

### `Generator`
```python
from typing import Generator

def echo_round() -> Generator[int, float, str]:
    sent = yield 0
    while sent >= 0:
        sent = yield round(sent)
    return 'Done'
```
`Generator[yield로 주는 값, yield로 받는 값, return으로 반환하는 값]`을 표현.

`~Iterator[T_co], Generic[T_co, T_contra, V_co]`

### `Hashable`
`collections.abc.Hashable`에 대한 표현.

### `Reversible`
`collections.abc.Reversible`에 대한 표현.
3.9부터는 `collections.abc.Reversible`로 바로 사용이 가능하다.

`~Iterable[T_co]`

### `Sized`
`collections.abc.Sized`에 대한 표현.

### `Coroutine`
```python
from collections.abc import Coroutine

c: Coroutine[list[str], str, int]  ## Some coroutine defined elsewhere
x = c.send('hi')                   ## Inferred type of 'x' is list[str]

async def bar() -> None:
    y = await c                    ## Inferred type of 'y' is int
```
`collections.abc.Coroutine`에 대한 표현.
파이썬의 `Coroutine`구현이 `Generator`로 되어있으므로, `Generator`의 변수 표현에 대응한다.

`~Awaitable[V_co], Generic[T_co, T_contra, V_co]`

### `AsyncGenerator`
```python
from typing import AsyncGenerator


async def echo_round() -> AsyncGenerator[int, float]:
    sent = yield 0
    while sent >= 0.0:
        rounded = await round(sent)
        sent = yield rounded
```
`collections.abc.AsyncGenerator`에 대한 표현.
비동기 제너레이터에 대한 표현. 비동기 제너레이터는 반환 값이 없으므로 두개의 제네릭 변수만 가질 수 있다.
3.9부터는 `collections.abc.AsyncGenerator`로 바로 사용이 가능하다.

`~AsyncIterator[T_co], Generic[T_co, T_contra]`

### `AsyncIterable`
`collections.abc.AsyncIterable`에 대한 표현.
3.9부터는 `collections.abc.AsyncIterable`로 바로 사용이 가능하다.

`~Generic[T_co]`

### `AsyncIterator`
`collections.abc.AsyncIterator`에 대한 표현.
3.9부터는 `collections.abc.AsyncIterator`로 바로 사용이 가능하다.

`~AsyncIterable[T_co]`

### `Awaitable`
`collections.abc.Awaitable`에 대한 표현.
3.9부터는 `collections.abc.Awaitable`로 바로 사용이 가능하다.

`~Generic[T_co]`

### `ContextManager`
`contextlib.AbstractContextManager`에 대한 표현.
3.9부터는 `contextlib.AbstractContextManager`로 바로 사용이 가능하다.

`~Generic[T_co]`

### `AsyncContextManager`
`contextlib.AsyncContextManager`에 대한 표현.
3.9부터는 `contextlib.AsyncContextManager`로 바로 사용이 가능하다.

`~Generic[T_co]`

### `SupportsAbs`
`__abs__` 메소드가 구현된 객체

### `SupportsBytes`
`__bytes__` 메소드가 구현된 객체

### `SupportsComplex`
`__complex__` 메소드가 구현된 객체

### `SupportsFloat`
`__float__` 메소드가 구현된 객체

### `SupportsIndex`
`__index__` 메소드가 구현된 객체

### `SupportsInt`
`__int__` 메소드가 구현된 객체

### `SupportsRound`
`__round__ ` 메소드가 구현된 객체


## 4. 꼭 전부 사용할 필요는 없다
타입힌트를 사용하는 이유는 여러가지가 있겠지만, 저는 생산성 향상을 위해 사용하고 있습니다. 그러니 만약 타입힌트가 __생산성 향상에 오히려 악영향을 준다면 사용할 이유가 없습니다.__

설명하지 않은 `cast`를 사용하거나 `## type: ignore`또는 `## noqa`를 사용해서 오히려 타입 힌트를 왜곡해야 할 수도 있습니다. 어쩌면 도저히 위 방식의 타입힌트로 설명하기 힘들어서 스텁파일(`*.pyi`)을 생성할 수도 있습니다.

타입힌트가 주는 이점이 명확하지만, 그만큼 시간을 투자해야 할 수도 있으니, 이러한 점을 잘 인지하고 사용할 필요가 있습니다.