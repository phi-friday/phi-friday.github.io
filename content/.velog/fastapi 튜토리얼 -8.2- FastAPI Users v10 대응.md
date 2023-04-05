---
title: fastapi 튜토리얼 -8.2- FastAPI Users v10 대응
date: '2022-05-07T23:00:58.369+09:00'
tags:
  - fastapi
  - fastapi-users
  - python
  - sqlmodel
  - '@all'
page: fastapi 튜토리얼
summary: 'fastapi 사용법을 다시 공부할겸, 참고할만한 좋은 예제가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.'
---

**`fastapi`** 사용법을 다시 공부할겸, 참고할만한 좋은 [예제](https://www.jeffastor.com/blog/populating-cleaning-jobs-with-user-offers-in-fastapi)가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.
지난번처럼 어쩌다 그만둘 수도 있긴 하지만...

---

## `Breaking` `changes`

이틀전 **`fastapi-users`** 에 큰 변화가 생겼다. `v10` 릴리즈가 공개됐는데, `db` 모델과 여러 제네릭 타입에 대한 변화가 생겨서, `v10`을 이용하려면 대응 패치가 필수적인 상황..

아래는 해당 릴리즈에 대한 전문이다.

> ### [Breaking changes](https://github.com/fastapi-users/fastapi-users/releases/tag/v10.0.0)
>
> Version 10 marks important changes in how we manage User models and their ID.
>
> Before, we were relying only on Pydantic models to work with users. In particular the current_user dependency would return you an instance of UserDB, a Pydantic model. This proved to be quite problematic with some ORM if you ever needed to retrieve relationship data or make specific requests.
>
> Now, FastAPI Users is designed to always return you a native object for your ORM model, whether it's an SQLAlchemy model or a Beanie document. Pydantic models are now only used for validation and serialization inside the API.
>
> Before, we were forcing the use of UUID as primary key ID; a consequence of the design above. This proved to be quite problematic on some databases, like MongoDB which uses a special ObjectID format by default. Some SQL folks also prefer to use traditional auto-increment integers.
>
> Now, FastAPI Users is designed to use generic ID type. It means that you can use any type you want for your user's ID. By default, SQLAlchemy adapter still use UUID; but you can quite easily switch to another thing, like an integer. Beanie adapter for MongoDB will use native ObjectID by default, but it also can be overriden.

### 유저 모델 생성 및 수정

기존 `fastapi_users.models` 에서 `fastapi_users.schemas`로 바뀐 것 외에 크게 달라진 것은 없다. 사실 이전에 얘기했던 `user` 와 `user_model`을 통합하는 작업을 이미 한 다음 `v10` 릴리즈를 확인했기에 더욱 그렇게 느껴졌다...

```python
# backend/app/models/user.py
from typing import TypeVar

from fastapi_users import schemas
from pydantic import EmailStr
from pydantic import Field as _Field
from sqlmodel import Field, select

from ..db.session import async_session
from .core import base_model, datetime_model, uuid_id_model

min_name_length = 4
max_name_length = 20


_T = TypeVar("_T", bound="user")
id_model = uuid_id_model
user_id_type = id_model.id_type


class user(id_model, datetime_model, base_model, table=True):
    __tablename__: str = "users"

    name: str = Field(min_length=min_name_length, max_length=max_name_length)
    hashed_password: str = Field(max_length=2**10)
    email: EmailStr = Field(index=True)
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    @classmethod
    async def get_from_email(
        cls: type[_T], session: async_session, email: str
    ) -> _T | None:
        is_user_cur = await session.exec(select(cls).where(cls.email == email))
        return is_user_cur.first()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.validate(self)


class user_read(schemas.BaseUser[user_id_type], datetime_model):
    name: str = _Field(min_length=min_name_length, max_length=max_name_length)


class user_create(schemas.BaseUserCreate):
    name: str = _Field(min_length=min_name_length, max_length=max_name_length)


class user_update(schemas.BaseUserUpdate):
    name: str = _Field(min_length=min_name_length, max_length=max_name_length)
```

### 인증 모듈 제네릭 타입 덮어씌우기

**`fastapi-users`** 에서 원하는 형태는 `SQLAlchemyBaseUserTable`를 상속한 클래스를 사용하는 것이지만, **`sqlmodel`** 도 그대로 사용하고 **`fastapi-users`** 의 타입 힌트도 그대로 사용하고 싶기에, 두 라이브러리를 엮어줄 새로운 제네릭 클래스를 생성한다.
`# type: ignore`를 남발하기에 그다지 좋은 모습이라고 생각되지 않지만, 이거 외에 당장 생각나는 방법이 없기에 일단 넘어가자.

```bash
❯ mkdir backend/app/services/authentication
❯ mv backend/app/services/authentication.py backend/app/services/authentication/authentication.py
❯ touch backend/app/services/authentication/__init__.py backend/app/services/authentication/convert.py
```

```python
# backend/app/services/authentication/__init__.py
from .authentication import *
```

```python
# backend/app/services/authentication/convert.py
from typing import Generic, TypeVar

from fastapi_users import BaseUserManager, FastAPIUsers
from fastapi_users.authentication import AuthenticationBackend, JWTStrategy, Strategy
from fastapi_users.db import SQLAlchemyUserDatabase

from ...models.core import base_model
from ...models.user import user

user_id_type = user.id_type
_T = TypeVar("_T", bound=base_model)
_D = TypeVar("_D")

# fmt: off
class user_db_class(SQLAlchemyUserDatabase[_T, _D], Generic[_T, _D]): ... # type: ignore
class strategy_class(Strategy[_T, _D], Generic[_T, _D]): ... # type: ignore
class jwt_strategy_class(JWTStrategy[_T, _D], Generic[_T, _D]): ... # type: ignore
class auth_backend_class(AuthenticationBackend[_T, _D], Generic[_T, _D]): ... # type: ignore
class user_manager_class(BaseUserManager[_T, _D], Generic[_T, _D]): ...  # type: ignore
class fastapi_users_class(FastAPIUsers[_T, _D], Generic[_T, _D]): ...  # type: ignore
# fmt: on


user_manager_type = user_manager_class[user, user_id_type]
strategy_type = strategy_class[user, user_id_type]
```

### 변경점 인증 모듈에 적용

```python
# backend/app/services/authentication/authentication.py
import re
from dataclasses import dataclass
from re import Pattern
from typing import AsyncGenerator, Sequence

from fastapi import Depends, Request
from fastapi_users import IntegerIDMixin, InvalidPasswordException
from fastapi_users.authentication import BearerTransport, Transport

from ...core import config
from ...db.session import async_session, get_session
from ...models import user
from .convert import (
    auth_backend_class,
    fastapi_users_class,
    jwt_strategy_class,
    strategy_class,
    strategy_type,
    user_db_class,
    user_id_type,
    user_manager_class,
    user_manager_type,
)


async def get_user_db(
    session: async_session = Depends(get_session),
) -> AsyncGenerator[user_db_class[user.user, user_id_type], None]:
    yield user_db_class(session, user.user)


def create_transport() -> Transport:
    return BearerTransport(tokenUrl=config.TOKEN_PREFIX)


def create_strategy() -> strategy_class[user.user, user_id_type]:
    return jwt_strategy_class(  # type: ignore
        secret=str(config.SECRET_KEY),
        lifetime_seconds=config.ACCESS_TOKEN_EXPIRE_SECONDS,
        token_audience=[config.JWT_AUDIENCE],
        algorithm=config.JWT_ALGORITHM,
    )


def create_backend() -> list[auth_backend_class[user.user, user_id_type]]:
    transport = create_transport()
    return [
        auth_backend_class(
            name=config.AUTH_BACKEND_NAME,
            transport=transport,
            get_strategy=create_strategy,
        )
    ]


class UserManager(IntegerIDMixin, user_manager_class[user.user, user_id_type]):
    reset_password_token_secret = str(config.SECRET_KEY)
    verification_token_secret = str(config.SECRET_KEY)

    min_password_length: int = 10
    max_password_length: int = 30
    re_password_need_list: list[Pattern] = [
        re.compile(r"[a-zA-Z]"),
        re.compile(r"[0-9]"),
        re.compile(r"[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]"),
    ]
    re_password_deny_list: list[Pattern] = []

    async def validate_password(
        self, password: str, user: user.user_create | user.user
    ) -> None:
        if len(password) < self.min_password_length:
            raise InvalidPasswordException(
                reason=f"Password should be at least {self.min_password_length} characters"
            )
        elif len(password) > self.max_password_length:
            raise InvalidPasswordException(
                reason=f"Password should be at most {self.max_password_length} characters"
            )

        for pattern in self.re_password_deny_list:
            if pattern.search(password):
                raise InvalidPasswordException(
                    reason=f"Password should not include {pattern.pattern}"
                )

        for pattern in self.re_password_need_list:
            if not pattern.search(password):
                raise InvalidPasswordException(
                    reason=f"Password must include {pattern.pattern}"
                )

    async def on_after_register(self, user: user.user, request: Request | None = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: user.user, token: str, request: Request | None = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: user.user, token: str, request: Request | None = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(
    user_db=Depends(get_user_db),
) -> AsyncGenerator[UserManager, None]:
    yield UserManager(user_db)


def create_fastapi_users(
    *backends: auth_backend_class[user.user, user_id_type],
) -> fastapi_users_class[user.user, user_id_type]:
    return fastapi_users_class(
        get_user_manager=get_user_manager, auth_backends=backends
    )


@dataclass(frozen=True)
class fastapi_user_class:
    users: fastapi_users_class[user.user, user_id_type]

    @classmethod
    def init(cls) -> "fastapi_user_class":
        users = create_fastapi_users(*create_backend())
        return cls(users=users)

    @property
    def backends(self) -> Sequence[auth_backend_class[user.user, user_id_type]]:
        return self.users.authenticator.backends  # type: ignore

    @property
    def user_manager_depends(self) -> user_manager_type:
        return Depends(self.users.get_user_manager)

    def strategy_depends(self, num: int = 0, /) -> strategy_type:
        backend = self.backends[num]
        return Depends(backend.get_strategy)
```

꽤 많이 바뀌긴 했지만, 실제로 사용할때는 이름정도만 바뀌지 사용법 자체는 변한게 없다. 바뀐 이름에 맞춰서 라우터와 테스트 코드를 수정해주면, 정상적으로 작동하는 것을 확인할 수 있다.

이번 기회에 테스트 코드가 얼마나 좋은건지 알게됐다.. 긴가민가할때 `pytest --tb=short` 한방이면 의문이 해결된다.

사실 변경할게 하나 더 남긴 했지만, 이거 아직 시도해보지 않았다.
현재 헤더를 사용한 인증 방식인데, 쿠키를 사용하고, `access-token`과 `refresh-token`을 사용한 방식으로 변경해보려 한다. 다만 **`fastapi-users`** 자체적으로는 지원하지 않기에, 직접 작성할 필요가 있어서 약간 고민이 필요할듯.
