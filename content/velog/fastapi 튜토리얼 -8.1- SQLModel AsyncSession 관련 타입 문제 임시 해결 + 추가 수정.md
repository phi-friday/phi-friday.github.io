---
title: fastapi 튜토리얼 -8.1- SQLModel AsyncSession 관련 타입 문제 임시 해결 + 추가 수정
date: '2022-05-07T22:08:12.781+09:00'
tags:
  - fastapi
  - python
  - sqlmodel
  - '@all'
page: fastapi 튜토리얼
summary: 'fastapi 사용법을 다시 공부할겸, 참고할만한 좋은 예제가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.'
---

**`fastapi`** 사용법을 다시 공부할겸, 참고할만한 좋은 [예제](https://www.jeffastor.com/blog/populating-cleaning-jobs-with-user-offers-in-fastapi)가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.
지난번처럼 어쩌다 그만둘 수도 있긴 하지만...

---

## `Session`의 코드를 그대로 복붙

이전까지 글에서 계속해서 `AsyncSession`의 타입 관련 문제가 발생하는게 너무 짜증나서, 임시로 땜빵용 클래스를 생성해서 사용하기로 했다.

````python
# backend/app/db/session.py
(...)

_TSelectParam = TypeVar("_TSelectParam")

class async_session(AsyncSession):
    # sqlmodel.orm.session.Session
    @overload
    async def exec(
        self,
        statement: Select[_TSelectParam],
        *,
        params: Optional[Union[Mapping[str, Any], Sequence[Mapping[str, Any]]]] = None,
        execution_options: Mapping[str, Any] = util.EMPTY_DICT,
        bind_arguments: Optional[Mapping[str, Any]] = None,
        _parent_execute_state: Optional[Any] = None,
        _add_event: Optional[Any] = None,
        **kw: Any,
    ) -> Result[_TSelectParam]:
        ...

    @overload
    async def exec(
        self,
        statement: SelectOfScalar[_TSelectParam],
        *,
        params: Optional[Union[Mapping[str, Any], Sequence[Mapping[str, Any]]]] = None,
        execution_options: Mapping[str, Any] = util.EMPTY_DICT,
        bind_arguments: Optional[Mapping[str, Any]] = None,
        _parent_execute_state: Optional[Any] = None,
        _add_event: Optional[Any] = None,
        **kw: Any,
    ) -> ScalarResult[_TSelectParam]:
        ...

    async def exec(
        self,
        statement: Union[
            Select[_TSelectParam],
            SelectOfScalar[_TSelectParam],
            Executable[_TSelectParam],
        ],
        *,
        params: Optional[Union[Mapping[str, Any], Sequence[Mapping[str, Any]]]] = None,
        execution_options: Mapping[str, Any] = util.EMPTY_DICT,
        bind_arguments: Optional[Mapping[str, Any]] = None,
        _parent_execute_state: Optional[Any] = None,
        _add_event: Optional[Any] = None,
        **kw: Any,
    ) -> Union[Result[_TSelectParam], ScalarResult[_TSelectParam]]:
        """
        sqlmodel.orm.session.Session
        """
        return await super().exec(
            statement,  # type: ignore
            params=params,
            execution_options=execution_options,
            bind_arguments=bind_arguments,
            _parent_execute_state=_parent_execute_state,
            _add_event=_add_event,
            **kw,
        )

    async def execute(
        self,
        statement: _Executable,
        params: Optional[Union[Mapping[str, Any], Sequence[Mapping[str, Any]]]] = None,
        execution_options: Optional[Mapping[str, Any]] = util.EMPTY_DICT,
        bind_arguments: Optional[Mapping[str, Any]] = None,
        _parent_execute_state: Optional[Any] = None,
        _add_event: Optional[Any] = None,
        **kw: Any,
    ) -> Result[Any]:
        """
        sqlmodel.orm.session.Session
        ***

        🚨 You probably want to use `session.exec()` instead of `session.execute()`.

        This is the original SQLAlchemy `session.execute()` method that returns objects
        of type `Row`, and that you have to call `scalars()` to get the model objects.

        For example:

        ```Python
        heroes = session.execute(select(Hero)).scalars().all()
        ```

        instead you could use `exec()`:

        ```Python
        heroes = session.exec(select(Hero)).all()
        ```
        """
        return await super().execute(  # type: ignore
            statement,
            params=params,
            execution_options=execution_options,
            bind_arguments=bind_arguments,
            _parent_execute_state=_parent_execute_state,
            _add_event=_add_event,
            **kw,
        )

    async def get(
        self,
        entity: Type[_TSelectParam],
        ident: Any,
        options: Optional[Sequence[Any]] = None,
        populate_existing: bool = False,
        with_for_update: Optional[Union[Literal[True], Mapping[str, Any]]] = None,
        identity_token: Optional[Any] = None,
    ) -> Optional[_TSelectParam]:
        """
        sqlmodel.orm.session.Session
        """
        return await super().get(
            entity,
            ident,
            options=options,
            populate_existing=populate_existing,
            with_for_update=with_for_update,
            identity_token=identity_token,
        )
````

주석을 보면 알겠지만, 그냥 `sqlmodel.orm.session.Session` 객체의 각 메소드의 타입 힌트를 그대로 가져왔다. 이에 맞춰서 다른 스크립트의 `AsyncSession`도 모두 `async_session`에 대한 스크립트로 변환해준다. 그리고 테스트 코드를 실행해보면 문제없이 실행되는 것을 확인할 수 있다.

---

## `datetime_model` 관련 문제 해결

`datetime_model`의 `datetime_attrs` 속성이 의도한대로 출려되지 않는 문제가 있어서 추가로 수정했다. `cls.__fields__.keys()` 를 `datetime_model.__fields__.keys()`로 수정한 것외에 모두 동일하다.

```python
# backend/app/models/core.py
(...)

class datetime_model(fix_return_type_model):
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def update(self: _D) -> _D:
        self.updated_at = datetime.now()
        return self

    @classmethod
    @property
    def datetime_attrs(cls) -> set[str]:
        return set(datetime_model.__fields__.keys())
```

## `id_model` 세분화

기존에 사용하던 `id_model`을 `int_id_model`과 `uuid_id_model`로 세분화해서 사용하기로 했다.

```python
# backend/app/models/core.py
from uuid import uuid4
from pydantic import UUID4

(...)

class id_model(fix_return_type_model):
    @classmethod
    @property
    def id_type(cls) -> Any:
        return cls.__fields__["id"].type_


class int_id_model(id_model):
    id: int | None = Field(None, primary_key=True)


class uuid_id_model(id_model):
    id: UUID4 | None = Field(default_factory=uuid4, primary_key=True)
```

## `dependencies` 모듈 생성

기존에 사용하던 `get_session`이나 `get_current_user`같은 `Depends`와 함께 사용하던 함수를 따로 관리하기로 했다.

```python
# backend/app/dependencies/database.py
from typing import AsyncIterator

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio.engine import AsyncEngine

from ..db.session import async_session


async def get_database(request: Request) -> AsyncEngine:
    if (engine := getattr(request.app.state, "_db", None)) is None:
        raise AttributeError("there is no database engine in request as state")
    return engine


async def get_session(
    engine: AsyncEngine = Depends(get_database),
) -> AsyncIterator[async_session]:
    async with async_session(engine, autoflush=False, autocommit=False) as session:
        yield session
```

```python
# backend/app/dependencies/auth.py
from ..services.authentication import fastapi_user_class

fastapi_user = fastapi_user_class.init()

get_current_user = fastapi_user.users.current_user(
    optional=False, active=True, verified=False, superuser=False
)
get_user_manager = fastapi_user.get_user_manager
get_backend = fastapi_user.get_backend
get_transport = fastapi_user.get_transport
get_strategy = fastapi_user.get_strategy
```

```python
# backend/app/services/authentication/authentication.py
(...)

@dataclass(frozen=True)
class fastapi_user_class:
    users: fastapi_users_class[user.user, user_id_type]
    named_backends: dict[str, auth_backend_type] = field(default_factory=dict)

    @classmethod
    def init(cls) -> "fastapi_user_class":
        users = create_fastapi_users(*create_backend())
        return cls(users=users)

    @property
    def backends(self) -> Sequence[auth_backend_type]:
        return self.users.authenticator.backends  # type: ignore

    @property
    def get_user_manager(self):
        return self.users.get_user_manager

    def find_backend(self, _val: str, /) -> auth_backend_type:
        for backend in self.backends:
            if backend.name == _val:
                return backend
        raise IndexError(f"there is not auth_backend name: {_val}")

    def get_backend(self, _val: int | str = 0, /) -> auth_backend_type:
        if isinstance(_val, int):
            return self.backends[_val]

        if (backend := self.named_backends.get(_val)) is None:
            backend = self.named_backends[_val] = self.find_backend(_val)
        return backend

    def get_transport(self, _val: int | str = 0, /) -> Transport:
        backend = self.get_backend(_val)
        return backend.transport

    def get_strategy(self, _val: int | str = 0, /):
        backend = self.get_backend(_val)
        return backend.get_strategy
```
