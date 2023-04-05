---
title: fastapi 튜토리얼 -7- FastAPI Users를 사용한 유저 api 생성 2
date: '2022-05-05T06:13:07.421+09:00'
tags:
  - fastapi
  - fastapi-users
  - python
  - '@all'
page: fastapi 튜토리얼
summary: 'fastapi 사용법을 다시 공부할겸, 참고할만한 좋은 예제가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.'
---

**`fastapi`** 사용법을 다시 공부할겸, 참고할만한 좋은 [예제](https://www.jeffastor.com/blog/populating-cleaning-jobs-with-user-offers-in-fastapi)가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.
지난번처럼 어쩌다 그만둘 수도 있긴 하지만...

---

## 시작하기 전 변경사항

이전 챕터에서 밝힌 것 처럼, 다소 난잡하다고 생각되는 부분 몇가지를 수정하자. 지금 수정한 부분이 나중에 원 예제에서 다른 방향으로 수정될 수도 있지만, 그때 가서 생각하자.

> ### backend/app/core/config.py
>
> $\rightarrow$ 1개 설정 변수 생성

```python
TOKEN_PREFIX = API_PREFIX + "/token"
```

> ### backend/app/db/engine.py

```python
from ..core.config import DATABASE_URL
```

$\rightarrow$ `core.config` 에서 값을 불러오는 방식으로

```python
from ..core import config
```

> ### backend/app/models/user.py

```python
class user_model(base_model, datetime_model, table=True):
    __tablename__: str = "users"
>
    id: UUID4 = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(min_length=min_name_length, max_length=max_name_length)
    hashed_password: str = Field(max_length=2**10)
    email: EmailStr = Field(sa_column_kwargs={"unique": True})
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
```

$\rightarrow$ `unique=True`대신 `index=True`로 변경

```python경
class user_model(base_model, datetime_model, table=True):
    __tablename__: str = "users"
>
    id: UUID4 = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(min_length=min_name_length, max_length=max_name_length)
    hashed_password: str = Field(max_length=2**10)
    email: EmailStr = Field(index=True)
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
```

> ### backend/app/services/authentication.py

```python
from ..core.config import SECRET_KEY
```

$\rightarrow$ `core.config` 에서 값을 불러오는 방식으로

```python
from ..core import config
```

---

```python
from ..models.user import user, user_base, user_create, user_model, user_update
```

$\rightarrow$ `models.user` 에서 모델을 불러오는 방식으로

```python
from ..models import user
```

---

```python
from pydantic import BaseModel
>
(...)
>
user_manager_type = BaseUserManager[user.user_create, user.user]
strategy_type = Strategy[user.user_create, user.user]
>
class token_model(BaseModel):
    access_token: str
    token_type: str = "bearer"
>
    @classmethod
    def from_token(cls, token: str) -> "token_model":
        return cls(access_token=token)
```

$\rightarrow$ 새로 정의

---

```python
def create_transport() -> Transport:
    return BearerTransport(tokenUrl="api/auth/token")
```

$\rightarrow$ `config.TOKEN_PREFIX` 설정 변수 참조

```python
def create_transport() -> Transport:
    return BearerTransport(tokenUrl=config.TOKEN_PREFIX)
```

---

```python
class UserManager(BaseUserManager[user.user_create, user.user]):
    user_db_model = user.user
    reset_password_token_secret = str(config.SECRET_KEY)
    verification_token_secret = str(config.SECRET_KEY)
>
    min_password_length: int = 10
    max_password_length: int = 30
    re_password_need_list: list[Pattern] = [
        re.compile(r"[a-zA-Z]"),
        re.compile(r"[0-9]"),
        re.compile(r"[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]"),
    ]
    re_password_deny_list: list[Pattern] = []
>
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
>
        for pattern in self.re_password_deny_list:
            if pattern.match(password):
                raise InvalidPasswordException(
                    reason=f"Password should not include {pattern.pattern}"
                )
>
        for pattern in self.re_password_need_list:
            if not pattern.match(password):
                raise InvalidPasswordException(
                    reason=f"Password must include {pattern.pattern}"
                )
```

$\rightarrow$ 비밀번호 유효성 검사 로직 추가

---

```python
@dataclass(frozen=True)
class fastapi_user:
    users: FastAPIUsers
    backends: list[AuthenticationBackend]
>
    @classmethod
    def init(cls) -> "fastapi_user":
        backends = create_backend()
        users = create_fastapi_users(*backends)
        return cls(users=users, backends=backends)
```

$\rightarrow$ 원래는 삭제하려 했으나, 특정 기능 추가 후 사용. 의존성이 마음에 들지 않지만, 사실상 설정용 객체라 일단 무시.

```python
@dataclass(frozen=True)
class fastapi_user_class:
    users: FastAPIUsers[user.user_base, user.user_create, user.user_update, user.user]
>
    @classmethod
    def init(cls) -> "fastapi_user_class":
        users = create_fastapi_users(*create_backend())
        return cls(users=users)
>
    @property
    def backends(self) -> Sequence[AuthenticationBackend[user.user_create, user.user]]:
        return self.users.authenticator.backends
>
    @property
    def user_manager_depends(self) -> user_manager_type:
        return Depends(self.users.get_user_manager)
>
    def strategy_depends(self, num: int = 0, /) -> strategy_type:
        backend = self.backends[num]
        return Depends(backend.get_strategy)
```

---

끝으로, **`fastapi-users`** 의 각 클래스가 제네릭인 것을 확인해서, 이전에 정의한 유저 모델을 이용해서 타입 힌트를 추가했다. 이하 스크립트 전문

```python
# backend/app/services/authentication.py
from dataclasses import dataclass
from typing import AsyncGenerator, Sequence
>
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
    Strategy,
    Transport,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from pydantic import BaseModel
from sqlmodel.ext.asyncio.session import AsyncSession
>
from ..core import config
from ..db.session import get_session
from ..models import user
>
user_manager_type = BaseUserManager[user.user_create, user.user]
strategy_type = Strategy[user.user_create, user.user]
>
>
class token_model(BaseModel):
    access_token: str
    token_type: str = "bearer"
>
    @classmethod
    def from_token(cls, token: str) -> "token_model":
        return cls(access_token=token)
>
>
async def get_user_db(session: AsyncSession = Depends(get_session)):
    yield SQLAlchemyUserDatabase(user.user, session, user.user_model)  # type: ignore
>
>
def create_transport() -> Transport:
    return BearerTransport(tokenUrl=config.TOKEN_PREFIX)
>
>
def create_strategy() -> Strategy[user.user_create, user.user]:
    return JWTStrategy(secret=str(config.SECRET_KEY), lifetime_seconds=3600)
>
>
def create_backend() -> list[AuthenticationBackend[user.user_create, user.user]]:
    transport = create_transport()
    return [
        AuthenticationBackend(
            name="bearer_jwt", transport=transport, get_strategy=create_strategy
        )
    ]
>
>
class UserManager(BaseUserManager[user.user_create, user.user]):
    user_db_model = user.user
    reset_password_token_secret = str(config.SECRET_KEY)
    verification_token_secret = str(config.SECRET_KEY)
>
    async def on_after_register(self, user: user.user, request: Request | None = None):
        print(f"User {user.id} has registered.")
>
    async def on_after_forgot_password(
        self, user: user.user, token: str, request: Request | None = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")
>
    async def on_after_request_verify(
        self, user: user.user, token: str, request: Request | None = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")
>
>
async def get_user_manager(
    user_db=Depends(get_user_db),
) -> AsyncGenerator[UserManager, None]:
    yield UserManager(user_db)
>
>
def create_fastapi_users(
    *backends: AuthenticationBackend[user.user_create, user.user],
) -> FastAPIUsers[user.user_base, user.user_create, user.user_update, user.user]:
    return FastAPIUsers(
        get_user_manager=get_user_manager,
        auth_backends=backends,
        user_model=user.user_base,
        user_create_model=user.user_create,
        user_update_model=user.user_update,
        user_db_model=user.user,
    )
>
>
@dataclass(frozen=True)
class fastapi_user_class:
    users: FastAPIUsers[user.user_base, user.user_create, user.user_update, user.user]
>
    @classmethod
    def init(cls) -> "fastapi_user_class":
        users = create_fastapi_users(*create_backend())
        return cls(users=users)
>
    @property
    def backends(self) -> Sequence[AuthenticationBackend[user.user_create, user.user]]:
        return self.users.authenticator.backends
>
    @property
    def user_manager_depends(self) -> user_manager_type:
        return Depends(self.users.get_user_manager)
>
    def strategy_depends(self, num: int = 0, /) -> strategy_type:
        backend = self.backends[num]
        return Depends(backend.get_strategy)
```

> ### backend/app/services/token.py

#### 위치 변경

`backend/app/services/token.py`
$\rightarrow$ `backend/app/api/routes/token.py`

---

```python
from ...services.authentication import fastapi_user as fastapi_user_class
```

$\rightarrow$ 클래스 이름 변경에 따른 수정

```python
from ...services.authentication import fastapi_user_class
```

---

```python
from starlette.status import HTTP_400_BAD_REQUEST
```

$\rightarrow$ `fastapi.status` 에서 값을 불러오는 방식으로

```pyhon
from fastapi import status
```

---

```python
from fastapi_users import models
>
@router.post("/token")
async def create_token(
    credentials: OAuth2PasswordRequestForm = Depends(),
    user_manager: BaseUserManager[models.UC, models.UD] = Depends(get_user_manager),
    strategy: Strategy[models.UC, models.UD] = Depends(
        fastapi_user.backends[0].get_strategy
    ),
) -> dict[str, str]:
    user = await user_manager.authenticate(credentials)
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=ErrorCode.LOGIN_BAD_CREDENTIALS,
        )
    if not user.is_verified:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=ErrorCode.LOGIN_USER_NOT_VERIFIED,
        )
>
    token = await strategy.write_token(user)
    return {"access_token": token, "token_type": "bearer"}
```

$\rightarrow$ 최상위 엔드포인트 사용 + `user_manager_type`, `strategy_type`, `token_model` 사용

```python
from ...services.authentication import strategy_type, token_model, user_manager_type
>
(...)
>
@router.post("", name="users:create-token")
async def create_token(
    credentials: OAuth2PasswordRequestForm = Depends(),
    user_manager: user_manager_type = fastapi_user.user_manager_depends,
    strategy: strategy_type = fastapi_user.strategy_depends(),
) -> token_model:
    get_user = await user_manager.authenticate(credentials)
    if get_user is None or not get_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorCode.LOGIN_BAD_CREDENTIALS,
        )
    if not get_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorCode.LOGIN_USER_NOT_VERIFIED,
        )
>
    token = await strategy.write_token(get_user)
    return token_model.from_token(token)
```

> ### backend/app/api/routes/cleanings.py

```python
from ...services.authentication import fastapi_user as fastapi_user_class
```

$\rightarrow$ 클래스 이름 변경에 따른 수정

```python
from ...services.authentication import fastapi_user_class
```

---

```python
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)
```

$\rightarrow$ `fastapi.status` 에서 값을 불러오는 방식으로

```python
from fastapi import status
```

---

```python
from ...models.cleaning import (
    cleaning_create,
    cleaning_public,
    cleaning_update,
    cleanings,
)
```

$\rightarrow$ `models.cleaning` 에서 모델을 불러오는 방식으로

```python
from ...models import cleaning
```

> ### backend/app/api/routes/\_\_init\_\_.py

```python
router.include_router(token_router, prefix="/auth", tags=["token"])
```

$\rightarrow$ `auth` 대신 `token`으로 단일화

```python
router.include_router(token_router, prefix="/token", tags=["token"])
```

> ### backend/tests/conftest.py

```python
@pytest.fixture(
    params=[pytest.param(("asyncio", {"use_uvloop": True}), id="asyncio+uvloop")]
)
def anyio_backend(request):
    return request.param
```

$\rightarrow$ **`pytest`** 백엔드로 **`anyio+uvloop`** 를 사용하기 위한 설정 추가

> ### backend/tests/test_cleanings.py

```python
pytestmark = pytest.mark.asyncio
```

$\rightarrow$ **`pytest`** 백엔드로 **`anyio+uvloop`** 를 사용하기 위한 설정 추가

```python
pytestmark = pytest.mark.anyio
```

---

```python
from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)
```

$\rightarrow$ `fastapi.status` 에서 값을 불러오는 방식으로

```python
from fastapi import status
```

> ### 신규 생성) backend/pytest.ini

```bash
❯ touch backend/pytest.ini
```

```yaml
[pytest]
filterwarnings =
    ignore::sqlalchemy.exc.SAWarning
```

$\rightarrow$ **`sqlalchemy`** 에서 보내는 경고를 **`pytest`** 에서 출력하지 않도록 설정

위 수정에서 확인할 수 있듯이, **`pytest`** 백엔드로 **`anyio`** 를 쓰기 때문에, **`pytest-asyncio`** 는 이제 필요가 없으므로 제거한다.

```bash
❯ poetry remove --dev pytest-asyncio
❯ poetry export -f requirements.txt --output backend/requirements.txt --without-hashes --dev
❯ docker-compose build
```

깜박하고 넘어간 경우가 있을텐데, 테스트 코드를 실행해보면 금방 수정할 수 있다.

## `TDD` 방법론에 따른 유저 생성 `api` 만들기

### 라우터 존재 확인

원 예제의 **jeffastor**는 회원가입 api에 요청을 보내고 에러 코드를 확인하는 방식으로 만들었지만, 최근에 **RESTful** api 생성과 관련해서 [좋은 글](https://sanghaklee.tistory.com/57)을 확인했기에, **OPTIONS** api로 대신하고자 한다.

```bash
❯ touch backend/tests/test_users.py
```

```python
# backend/tests/test_users.py
import pytest
from fastapi import FastAPI, status
from httpx import AsyncClient

pytestmark = pytest.mark.anyio


class TestUserRoutes:
    api_name = "users:get-allowed-methods"

    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.options(app.url_path_for(self.api_name))
        assert res.status_code == status.HTTP_204_NO_CONTENT
        assert not res.content
        headers = res.headers
        assert "Allow" in headers
        allowed_methods_str = headers["Allow"]
        allowed_methods = {
            method_str.strip().lower() for method_str in allowed_methods_str.split(",")
        }
        assert len(allowed_methods) > 0
        for method_str in ("post",):
            assert method_str in allowed_methods
```

테스트를 실행해보면 당연히 에러가 나온다.

```bash
root@90b2a10bcb6d:/backend# pytest --tb=short
============================================ test session starts ============================================
platform linux -- Python 3.10.4, pytest-7.1.2, pluggy-1.0.0
rootdir: /backend, configfile: pytest.ini
plugins: anyio-3.5.0
collected 40 items

tests/test_cleanings.py .......................................                                       [ 97%]
tests/test_users.py F                                                                                 [100%]

================================================= FAILURES ==================================================
_____________________________ TestUserRoutes.test_routes_exist[asyncio+uvloop] ______________________________
tests/test_users.py:10: in test_routes_exist
    res = await client.options(app.url_path_for("users:get-allowed-methods"))
/usr/local/lib/python3.10/site-packages/starlette/applications.py:108: in url_path_for
    return self.router.url_path_for(name, **path_params)
/usr/local/lib/python3.10/site-packages/starlette/routing.py:590: in url_path_for
    raise NoMatchFound()
E   starlette.routing.NoMatchFound
----------------------------------------- Captured stderr teardown ------------------------------------------
INFO  [alembic.env] Running migrations online
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
========================================== short test summary info ==========================================
FAILED tests/test_users.py::TestUserRoutes::test_routes_exist[asyncio+uvloop] - starlette.routing.NoMatchF...
======================================= 1 failed, 39 passed in 4.52s ========================================
```

이제 에러를 해결하기 위한 라우터를 생성한다.

```python
# backend/app/api/routes/users.py
from fastapi import APIRouter, Response, status

from ...services.authentication import fastapi_user_class

fastapi_user = fastapi_user_class.init()
router = APIRouter()


@router.options("", name="users:get-allowed-methods")
async def get_allowed_user_methods() -> Response:
    from functools import reduce

    method_sets = [getattr(route, "methods") for route in router.routes]
    all_methods = reduce(lambda left, right: left | right, method_sets, set())
    all_methods_str = ", ".join(all_methods)

    return Response(
        status_code=status.HTTP_204_NO_CONTENT, headers={"Allow": all_methods_str}
    )


@router.post("")
async def post_temp():
    ...
```

임시로 가짜 **POST** api를 정의했기에, 테스트를 실행해도 에러가 발생하지 않는다.

```bash
root@96deef95611e:/backend# pytest --tb=short
============================================ test session starts ============================================
platform linux -- Python 3.10.4, pytest-7.1.2, pluggy-1.0.0
rootdir: /backend, configfile: pytest.ini
plugins: anyio-3.5.0
collected 40 items

tests/test_cleanings.py .......................................                                       [ 97%]
tests/test_users.py .                                                                                 [100%]

============================================ 40 passed in 4.03s =============================================
```

### 회원가입

우선, 기존에 작성했던 유저 모델에 대해 이메일로 검색할 수 있는 메소드를 하나 생성한다. 관련해서 종종 쓰이기 때문.

```python
# backend/app/models/user.py
from typing import TypeVar, cast
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel.sql.expression import Select

(...)

_T = TypeVar("_T", bound="user_model")

(...)

class user(user_base, models.BaseUserDB):
    def to_model(self) -> "user_model":
        return user_model.validate(self)


class user_model(base_model, datetime_model, table=True):
    __tablename__: str = "users"

    id: UUID4 = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(min_length=min_name_length, max_length=max_name_length)
    hashed_password: str = Field(max_length=2**10)
    email: EmailStr = Field(index=True)
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    @classmethod
    async def get_from_email(
        cls: type[_T], session: AsyncSession, email: str
    ) -> _T | None:
        is_user_cur = await session.exec(
            cast(Select[_T], select(cls).where(cls.email == email))
        )
        return is_user_cur.first()
```

> 아직 **`sqlmodel`** 의 `async` 지원이 부족해서, `typing.cast`를 이용해서 `Select` 타입으로 강제해서 사용했다.

> `user`와 `user_model`을 하나로 합칠 수 있을 것 같은데, 이건 나중에 시간내서 확인해볼 생각.

이제 **`fastapi-users`** 를 사용할 때가 왔다. 우선 테스트 코드부터 작성한다.

```python
# backend/tests/test_users.py
from app.models import user
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlmodel.ext.asyncio.session import AsyncSession

(...)

class TestUserRegistration:
    api_name = "users:register-new-user"

    async def test_users_can_register_successfully(
        self, app: FastAPI, client: AsyncClient, engine: AsyncEngine
    ) -> None:
        new_user = {
            "email": "shakira@shakira.io",
            "name": "shakirashakira",
            "password": "chantaje@1",
        }
        # make sure user doesn't exist yet
        async with AsyncSession(engine, autocommit=False) as session:
            is_user = await user.user_model.get_from_email(
                session=session, email=new_user["email"]
            )
        assert is_user is None
        # send post request to create user and ensure it is successful
        res = await client.post(
            app.url_path_for(self.api_name), json={"new_user": new_user}
        )
        assert res.status_code == status.HTTP_201_CREATED
        # ensure that the user now exists in the db
        async with AsyncSession(engine, autocommit=False) as session:
            is_user = await user.user_model.get_from_email(
                session=session, email=new_user["email"]
            )
        assert is_user is not None
        assert is_user.email == new_user["email"]
        assert is_user.name == new_user["name"]
        # check that the user returned in the response is equal to the user in the database
        created_user = user.user_model.validate(
            res.json() | {"hashed_password": "whatever"}
        )
        exclude_attr_set = user.user_model.datetime_attrs | {"id", "hashed_password"}
        assert created_user.dict(exclude=exclude_attr_set) == is_user.dict(
            exclude=exclude_attr_set
        )

    @pytest.mark.parametrize(
        "attr, value, status_code",
        (
            ("email", "shakira@shakira.io", 400),
            ("name", "sha", 422),
            ("name", "shafasdfsdwerewfsdfxcvxcvxcv", 422),
            ("email", "invalid_email@one@two.io", 422),
            ("password", "short", 422),
            (
                "password",
                (
                    "longlonglonglonglonglonglonglonglonglonglonglong"
                    "longlonglonglonglonglonglonglonglonglonglonglong"
                    "longlonglonglonglonglonglonglonglonglonglonglong"
                ),
                422,
            ),
            ("password", "pattern@", 422),
            ("name", "shakira@#$%^<>", 422),
            ("name", "ab", 422),
        ),
    )
    async def test_user_registration_fails_when_credentials_are_taken(
        self,
        app: FastAPI,
        client: AsyncClient,
        attr: str,
        value: str,
        status_code: int,
    ) -> None:
        new_user = {
            "email": "nottaken@email.io",
            "name": "not_taken_username",
            "password": "freepassword@1",
        }
        new_user[attr] = value
        res = await client.post(
            app.url_path_for(self.api_name), json={"new_user": new_user}
        )
        assert res.status_code == status_code
```

이제 위 테스트 코드를 통과할 수 있을 것 같은 api를 생성한다.

```python
import re

import orjson
from fastapi import Body, HTTPException, Request
from fastapi_users.manager import InvalidPasswordException, UserAlreadyExists
from pydantic import ValidationError

from ...models import user
from ...services.authentication import user_manager_type

(...)

re_deny_name = re.compile(r"[^a-zA-Z0-9_-]")

(...)

@router.post(
    "",
    name="users:register-new-user",
    response_model=user.user_read,
    status_code=status.HTTP_201_CREATED,
)
async def register_new_user(
    request: Request,
    new_user: user.user_create = Body(..., embed=True),
    user_manager: user_manager_type = fastapi_user.user_manager_depends,
):
    if re_deny_name.search(new_user.name):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                "The name can only contain the following characters: "
                f"{re_deny_name.pattern.replace('^','')}"
            ),
        )

    try:
        return await user_manager.create(new_user, safe=True, request=request)
    except UserAlreadyExists as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "That email is already taken. "
                "Login with that email or register with another one."
            ),
        )
    except ValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=orjson.loads(exc.json()),
        )
    except InvalidPasswordException as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=exc.reason,
        )

```

> 따로 적지는 않았지만, **TDD** 방법론을 충실히 이행하면서 만들어진 테스트 코드와 api다.

위 코드를 기반으로 테스트를 실행해보면, 모두 정상적으로 실행되는 것을 확인할 수 있다.

### 토큰

**`fastapi-users`** 덕분에 토큰 등에 대한 별다른 작업 없이 깔끔하게 끝났지만, 원 예제에서는 토큰과 관련된 몇가지 작업이 진행된다. 해당 과정 중 해보면 좋을 것 같은 부분만 따라서 진행한다.

#### 토큰 관련 설정 수정 및 추가

초기에 대충 작성해놨던 `SECRET_KEY` 등의 값을 지정해준다. 이 값을 직접 작성하기 보다는 그냥 터미널 명령어로 생성된 임의의 값을 사용하는 것이 좋다.

```bash
❯ openssl rand -hex 32
```

이제 이 값을 `.env` 파일에 추가하면 된다. 이 외에도 몇몇 값을 추가로 더 설정하는데 각 값은 다음과 같다.

> `ACCESS_TOKEN_EXPIRE_SECONDS`: 토큰의 만료시간(초)
> `JWT_ALGORITHM`: 토큰 암호화 알고리즘
> `JWT_AUDIENCE`: 토큰 발급/수신 대상
> `JWT_TOKEN_PREFIX`: 토큰 타입?(얘는 확실하지 않음)

이제 `config.py`가 위 값을 잘 읽을 수 있게 수정한다.

```python
# backend/app/core/config.py
(...)

ACCESS_TOKEN_EXPIRE_MINUTES = config(
    "ACCESS_TOKEN_EXPIRE_MINUTES", cast=int, default=60 * 60
)
JWT_ALGORITHM = config("JWT_ALGORITHM", cast=str, default="HS256")
JWT_AUDIENCE = config("JWT_AUDIENCE", cast=str, default="phresh:auth")
JWT_TOKEN_PREFIX = config("JWT_TOKEN_PREFIX", cast=str, default="Bearer")

(...)
```

그리고 이 값을 잘 참조할 수 있도록 수정한다.

```python
# backend/app/services/authentication.py
(...)

class token_model(BaseModel):
    access_token: str
    token_type: str = config.JWT_TOKEN_PREFIX

    @classmethod
    def from_token(cls, token: str) -> "token_model":
        return cls(access_token=token)

(...)

def create_strategy() -> Strategy[user.user_create, user.user]:
    return JWTStrategy(
        secret=str(config.SECRET_KEY),
        lifetime_seconds=config.ACCESS_TOKEN_EXPIRE_SECONDS,
        token_audience=[config.JWT_AUDIENCE],
        algorithm=config.JWT_ALGORITHM,
    )

(...)
```

테스트 코드에서 사용할 `fixture`를 정의한다. 중복 이메일을 허용하지 않기에 주의해서 작성한다.

```python
# backend/tests/conftest.py
from app.models import user
from app.services.authentication import UserManager
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlmodel.ext.asyncio.session import AsyncSession

(...)

@pytest.fixture
async def test_user(engine: AsyncEngine) -> user.user_model:
    new_user = user.user_create.parse_obj(
        dict(
            email="lebron@james.io",
            name="lebronjames",
            password="heatcavslakers@1",
        )
    )

    async with AsyncSession(engine, autocommit=False) as session:
        db = SQLAlchemyUserDatabase(user.user, session, user.user_model)  # type: ignore
        manager = UserManager(db)

        try:
            new_user_db = await manager.get_by_email(new_user.email)
        except UserNotExists:
            new_user_db = await manager.create(new_user, safe=True)

    return new_user_db.to_model()
```

이제 이 `fixture`를 이용해서 토큰을 발급받고, 검증하는 테스트 코드를 작성한다.

> 2022.05.06. 아래 테스트 코드는 사실상 무의미하기에, 없어도 좋다. **TDD**에 익숙하지 않은 것도 있고, 원 예제의 내용과 다른 방식으로 api를 생성하다보니 헷갈려서 잘못 작성한 것 같다. 다음 챕터의 로그인 테스트 코드를 확인하자.

```python
class TestAuthTokens:
    api_name = "users:create-token"

    async def test_can_create_access_token_successfully(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_user: user.user_model,
        strategy: JWTStrategy,
        engine: AsyncEngine,
    ) -> None:
        access_token = await strategy.write_token(user=test_user)
        creds = decode_jwt(
            access_token,
            str(config.SECRET_KEY),
            [config.JWT_AUDIENCE],
            [config.JWT_ALGORITHM],
        )

        assert creds.get("user_id") is not None
        user_id = creds["user_id"]
        assert config.JWT_AUDIENCE in creds["aud"]

        async with AsyncSession(engine, autocommit=False) as session:
            user_model = await session.get(user.user_model, user_id)
        assert user_model is not None

        assert user_model.name == test_user.name

    async def test_token_missing_user_is_invalid(
        self, app: FastAPI, client: AsyncClient
    ) -> None:
        res = await client.post(
            url=app.url_path_for(self.api_name),
            data={"username": "unknown", "password": "testpassword@1"},
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
```

원 예제는 테스트 코드가 조금 더 풍부하지만, **`fastapi-users`** 를 사용중이기에, 불필요한 과정이라 생각됐다. 위 테스트 코드에서 `strategy`를 이용하여 직접 `access_token`을 생성해보기도 하고 복호화해보기도 하며, `access_token`로 부터 유저를 불러오기도 한다. 끝으로 이러한 과정이 진행되는 api를 호출해보기도 한다.

테스트는 문제없이 잘 진행됐다.

다음 챕터에서는 지금까지 만든 유저 api로 로그인 등을 시도한다. 참고로, 현재 선택한 전략으로는, 서버가 이미 발급한 토큰에 대해 처리가 불가능하므로, 로그아웃 기능을 생성할 수 없다.
