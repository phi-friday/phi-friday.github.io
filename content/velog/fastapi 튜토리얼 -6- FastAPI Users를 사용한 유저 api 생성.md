---
title: fastapi 튜토리얼 -6- FastAPI Users를 사용한 유저 api 생성
date: '2022-05-03T01:35:06.494+09:00'
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

## `cleanings`, `users` 모델 생성 및 수정

시작부터 마이그레이션을 진행하길래 어떤건가 했더니, 이전에 작성했던 `cleanings` 테이블에 시간 속성(생성, 수정)을 sql 서버에서 자동으로 처리하도록 하는 트리거를 생성하는 과정이 있었다. sql 서버에서 직접 처리하는게 가장 간단한 방법이라고 한다. 일단 무시.

이것과는 별개로, 이전에 마이그레이션 관련 코드 작성시 문제가 있는 형태로 작성한 것 같아서, 관련해서 조금 수정한다.

```python
# backend/app/db/migration/versions/f721febf752b_create_account_table.py
(...)

def create_cleanings_table() -> None:
    import sys
    from pathlib import Path

    sys.path.append(Path(__file__).resolve().parents[4].as_posix())
    from app.models.cleaning import cleanings

    table = cleanings.get_table()
    col_names = {"id", "name", "description", "cleaning_type", "price"}

    op.create_table(
        table.name, *[col for col in table.columns if col.name in col_names]
    )

(...)
```

이제 원 예제와 같이, 다운그레이드 후, 시간 속성부터 추가한 다음, 유저 관련 테이블을 설정하고 업그레이드를 실시한다. 원 예제와 순서를 맞춰가기 위해 약간 꼬인 느낌이 있는데, 지금 작성하는 유저 테이블은 **`fastapi-users`** 에서 작성하는 모델 형태를 따라간다.

```bash
root@c62cf3d05043:/backend# alembic downgrade base
INFO  [alembic.env] Running migrations online
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running downgrade f721febf752b -> , create account table
```

### 시간 속성 관련 코어 모델 추가

```python
# backend/app/models/core.py
from datetime import datetime

(...)

_D = TypeVar("_D", bound="datetime_model")

(...)

class datetime_model(fix_return_type_model):
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def update(self: _D) -> _D:
        self.updated_at = datetime.now()
        return self

    @classmethod
    @property
    def attrs(cls) -> set[str]:
        return set(cls.__fields__.keys())
```

### 시간 속성 추가로 인한 기존 모델 변경점 대응 수정

> 아래 내용은 단순히 시간 속성 추가로 인해 코드가 너무 나열돼있어서 접어놓고 싶지만 velog가 해당 기능을 지원하지 않는다.. velog에서 자동 생성된 목차를 선택해서 다음 항목으로 넘어갈 수 있다.

```python
# backend/app/models/cleaning.py
(...)

from .core import base_model, datetime_model, id_model

(...)

class cleanings(id_model, datetime_model, cleaning_base, table=True):
    name: str = Field(index=True)
    cleaning_type: cleaning_type_enum = Field(
        cleaning_type_enum.spot_clean,
        sa_column_kwargs={"server_default": cleaning_type_enum.spot_clean},
    )
    price: price_decimal_type

(...)
```

```python
# backend/tests/test_cleaning.py
from contextlib import suppress
from decimal import Decimal, InvalidOperation

import orjson
import pytest
from app.models.cleaning import cleaning_create, cleanings
from app.models.core import datetime_model
from fastapi import FastAPI
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlmodel.ext.asyncio.session import AsyncSession
from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

# decorate all tests with @pytest.mark.asyncio
pytestmark = pytest.mark.asyncio


@pytest.fixture
def new_cleaning():
    return cleaning_create.parse_obj(
        dict(
            name="test cleaning",
            description="test description",
            price=0.00,
            cleaning_type="spot_clean",
        )
    )


class TestCleaningsRoutes:
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.post(app.url_path_for("cleanings:create-cleaning"), json={})
        assert res.status_code != HTTP_404_NOT_FOUND

    async def test_invalid_input_raises_error(
        self, app: FastAPI, client: AsyncClient
    ) -> None:
        res = await client.post(app.url_path_for("cleanings:create-cleaning"), json={})
        assert res.status_code == HTTP_422_UNPROCESSABLE_ENTITY


class TestCreateCleaning:
    async def test_valid_input_creates_cleaning(
        self, app: FastAPI, client: AsyncClient, new_cleaning: cleaning_create
    ) -> None:
        res = await client.post(
            app.url_path_for("cleanings:create-cleaning"),
            json={"new_cleaning": orjson.loads(new_cleaning.json())},
        )
        assert res.status_code == HTTP_201_CREATED

        created_cleaning = cleaning_create(**res.json())
        assert created_cleaning == new_cleaning

    @pytest.mark.parametrize(
        "invalid_payload, status_code",
        (
            (None, 422),
            ({}, 422),
            ({"name": "test_name"}, 422),
            ({"price": 10.00}, 422),
            ({"name": "test_name", "description": "test"}, 422),
        ),
    )
    async def test_invalid_input_raises_error(
        self, app: FastAPI, client: AsyncClient, invalid_payload: dict, status_code: int
    ) -> None:
        res = await client.post(
            app.url_path_for("cleanings:create-cleaning"),
            json={"new_cleaning": invalid_payload},
        )
        assert res.status_code == status_code


@pytest.fixture
async def test_cleaning(engine: AsyncEngine) -> cleanings:
    new_cleaning_create = cleaning_create.parse_obj(
        dict(
            name="fake cleaning name",
            description="fake cleaning description",
            price=9.99,
            cleaning_type="spot_clean",
        )
    )
    new_cleaning = cleanings.validate(new_cleaning_create)
    async with AsyncSession(engine, autocommit=False) as session:
        session.add(new_cleaning)
        await session.commit()
        await session.refresh(new_cleaning)

    return new_cleaning


class TestGetCleaning:
    async def test_get_cleaning_by_id(
        self, app: FastAPI, client: AsyncClient, test_cleaning: cleanings
    ) -> None:
        res = await client.get(
            app.url_path_for("cleanings:get-cleaning-by-id", id=str(test_cleaning.id))
        )
        assert res.status_code == HTTP_200_OK
        cleaning = cleanings.validate(res.json())
        assert cleaning.dict(exclude=datetime_model.attrs) == test_cleaning.dict(
            exclude=datetime_model.attrs
        )

    @pytest.mark.parametrize(
        "id, status_code",
        (
            (500, 404),
            (-1, 422),
            (None, 422),
        ),
    )
    async def test_wrong_id_returns_error(
        self, app: FastAPI, client: AsyncClient, id: int, status_code: int
    ) -> None:
        res = await client.get(
            app.url_path_for("cleanings:get-cleaning-by-id", id=str(id))
        )
        assert res.status_code == status_code

    async def test_get_all_cleanings_returns_valid_response(
        self, app: FastAPI, client: AsyncClient, test_cleaning: cleanings
    ) -> None:
        res = await client.get(app.url_path_for("cleanings:get-all-cleanings"))
        assert res.status_code == HTTP_200_OK
        assert isinstance((json := res.json()), list)
        assert len(json) > 0
        all_cleanings = [
            cleanings.validate(l).dict(exclude=datetime_model.attrs) for l in json
        ]
        assert test_cleaning.dict(exclude=datetime_model.attrs) in all_cleanings


class TestPatchCleaning:
    @pytest.mark.parametrize(
        "attrs_to_change, values",
        (
            (["name"], ["new fake cleaning name"]),
            (["description"], ["new fake cleaning description"]),
            (["price"], [3.14]),
            (["cleaning_type"], ["full_clean"]),
            (
                ["name", "description"],
                [
                    "extra new fake cleaning name",
                    "extra new fake cleaning description",
                ],
            ),
            (["price", "cleaning_type"], [42.00, "dust_up"]),
        ),
    )
    async def test_update_cleaning_with_valid_input(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_cleaning: cleanings,
        attrs_to_change: list[str],
        values: list[str | int | float],
    ) -> None:
        update_cleaning = {"update_cleaning": dict(zip(attrs_to_change, values))}

        res = await client.patch(
            app.url_path_for(
                "cleanings:update-cleaning-by-id-as-patch",
                id=str(test_cleaning.id),
            ),
            json=update_cleaning,
        )
        assert res.status_code == HTTP_200_OK
        updated_cleaning = cleanings.validate(res.json())
        assert (
            updated_cleaning.id == test_cleaning.id
        )  # make sure it's the same cleaning
        # make sure that any attribute we updated has changed to the correct value
        for attr, value in zip(attrs_to_change, values):
            attr_to_change = getattr(updated_cleaning, attr)
            assert attr_to_change != getattr(test_cleaning, attr)
            if attr == "price":
                with suppress(InvalidOperation, ValueError):
                    value = Decimal(f"{float(value):.2f}")
            assert attr_to_change == value
        # make sure that no other attributes' values have changed
        for attr, value in updated_cleaning.dict().items():
            if attr not in attrs_to_change and attr not in datetime_model.attrs:
                assert getattr(test_cleaning, attr) == value

    @pytest.mark.parametrize(
        "id, payload, status_code",
        (
            (-1, {"name": "test"}, 422),
            (0, {"name": "test2"}, 422),
            (500, {"name": "test3"}, 404),
            (1, None, 422),
            (1, {"cleaning_type": "invalid cleaning type"}, 422),
            (1, {"cleaning_type": None}, 422),
        ),
    )
    async def test_update_cleaning_with_invalid_input_throws_error(
        self,
        app: FastAPI,
        client: AsyncClient,
        id: int,
        payload: dict,
        status_code: int,
    ) -> None:
        update_cleaning = {"update_cleaning": payload}
        res = await client.patch(
            app.url_path_for("cleanings:update-cleaning-by-id-as-patch", id=str(id)),
            json=update_cleaning,
        )
        assert res.status_code == status_code


class TestDeleteCleaning:
    async def test_can_delete_cleaning_successfully(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_cleaning: cleanings,
    ) -> None:
        # delete the cleaning
        res = await client.delete(
            app.url_path_for(
                "cleanings:delete-cleaning-by-id", id=str(test_cleaning.id)
            ),
        )
        assert res.status_code == HTTP_200_OK
        # ensure that the cleaning no longer exists
        res = await client.get(
            app.url_path_for("cleanings:get-cleaning-by-id", id=str(test_cleaning.id)),
        )
        assert res.status_code == HTTP_404_NOT_FOUND

    @pytest.mark.parametrize(
        "id, status_code",
        (
            (500, 404),
            (0, 422),
            (-1, 422),
            (None, 422),
        ),
    )
    async def test_delete_cleaning_with_invalid_input_throws_error(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_cleaning: cleanings,
        id: int,
        status_code: int,
    ) -> None:
        res = await client.delete(
            app.url_path_for("cleanings:delete-cleaning-by-id", id=str(id)),
        )
        assert res.status_code == status_code


class TestPutCleaning:
    @pytest.mark.parametrize(
        "attrs_to_change, values",
        (
            (
                ["name", "description", "price"],
                [
                    "new fake cleaning name",
                    "new fake cleaning description",
                    "123.1",
                ],
            ),
            (
                ["name", "price", "cleaning_type"],
                ["extra new fake cleaning name", 15555.51, "dust_up"],
            ),
            (
                ["name", "price"],
                ["extra new fake cleaning name", Decimal("2.12")],
            ),
        ),
    )
    async def test_update_cleaning_with_valid_input(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_cleaning: cleanings,
        attrs_to_change: list[str],
        values: list[str | int | float],
    ) -> None:
        update_cleaning = {"update_cleaning": dict(zip(attrs_to_change, values))}

        print(orjson.loads(orjson.dumps(update_cleaning, default=str)))
        res = await client.put(
            app.url_path_for(
                "cleanings:update-cleaning-by-id-as-put",
                id=str(test_cleaning.id),
            ),
            json=orjson.loads(orjson.dumps(update_cleaning, default=str)),
        )
        assert res.status_code == HTTP_200_OK
        updated_cleaning = cleanings.validate(res.json())
        assert updated_cleaning.id == test_cleaning.id

        for attr, value in update_cleaning["update_cleaning"].items():
            if attr == "price":
                with suppress(InvalidOperation, ValueError):
                    value = Decimal(f"{float(value):.2f}")
            assert value == getattr(updated_cleaning, attr)

        for attr, value in updated_cleaning.dict(exclude={"id"}).items():
            if attr not in attrs_to_change and attr not in datetime_model.attrs:
                assert value == cleanings.__fields__[attr].default

    @pytest.mark.parametrize(
        "id, payload, status_code",
        (
            (-1, {"name": "test"}, 422),
            (0, {"name": "test2", "price": 123}, 422),
            (500, {"name": "test3", "price": 33.3}, 404),
            (1, None, 422),
            (
                1,
                {
                    "name": "test5",
                    "price": "123.3",
                    "cleaning_type": "invalid cleaning type",
                },
                422,
            ),
            (1, {"name": "test6", "price": 123.3, "cleaning_type": None}, 422),
        ),
    )
    async def test_update_cleaning_with_invalid_input_throws_error(
        self,
        app: FastAPI,
        client: AsyncClient,
        id: int,
        payload: dict,
        status_code: int,
    ) -> None:
        update_cleaning = {"update_cleaning": payload}
        res = await client.patch(
            app.url_path_for("cleanings:update-cleaning-by-id-as-put", id=str(id)),
            json=update_cleaning,
        )
        assert res.status_code == status_code
```

```python
# backend/app/api/routes/cleanings.py
(...)

@router.patch(
    "/{id}",
    response_model=cleaning_public,
    name="cleanings:update-cleaning-by-id-as-patch",
)
async def update_cleaning_by_id_as_patch(
    id: int = Path(..., ge=1),
    update_cleaning: cleaning_update = Body(..., embed=True),
    session: AsyncSession = Depends(get_session),
) -> cleanings:
    if (cleaning := await session.get(cleanings, id)) is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="No cleaning found with that id."
        )

    # validate 관련 문제 해결 전까지는 이렇게..
    update_dict = update_cleaning.dict(exclude_unset=True)
    try:
        cleanings.validate(cleaning.dict() | update_dict)
    except ValidationError as exc:
        raise HTTPException(
            status_code=HTTP_422_UNPROCESSABLE_ENTITY, detail=orjson.loads(exc.json())
        )

    for attr, value in update_dict.items():
        setattr(cleaning, attr, value)

    session.add(cleaning.update())
    await session.flush()
    await session.commit()
    await session.refresh(cleaning)

    return cleaning

@router.put(
    "/{id}",
    response_model=cleaning_public,
    name="cleanings:update-cleaning-by-id-as-put",
)
async def update_cleaning_by_id_as_put(
    id: int = Path(..., ge=1),
    update_cleaning: cleaning_update = Body(..., embed=True),
    session: AsyncSession = Depends(get_session),
) -> cleanings:
    if (cleaning := await session.get(cleanings, id)) is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="No cleaning found with that id."
        )

    try:
        new_cleaning = cleanings.validate(update_cleaning.dict(exclude_unset=True))
    except ValidationError as exc:
        raise HTTPException(
            status_code=HTTP_422_UNPROCESSABLE_ENTITY, detail=orjson.loads(exc.json())
        )

    for attr, value in new_cleaning.dict(exclude={"id"}).items():
        setattr(cleaning, attr, value)

    session.add(cleaning.update())
    await session.flush()
    await session.commit()
    await session.refresh(cleaning)

    return cleaning
```

```python
# backend/app/db/migration/versions/f721febf752b_create_account_table.py
(...)

def create_cleanings_table() -> None:
    import sys
    from pathlib import Path

    sys.path.append(Path(__file__).resolve().parents[4].as_posix())
    from app.models.cleaning import cleanings
    from app.models.core import datetime_model

    table = cleanings.get_table()
    col_names = {"id", "name", "description", "cleaning_type", "price"}.union(
        datetime_model.attrs
    )

    op.create_table(
        table.name, *[col for col in table.columns if col.name in col_names]
    )

(...)
```

이렇게 수정하면 추가, 수정 시간 속성을 문제없이 사용할 수 있다..
큰 문제가 없다면 그냥 트리거를 이용하자.

### `users` 모델 생성

```bash
❯ poetry add 'fastapi-users[sqlalchemy2]'
❯ poetry export -f requirements.txt --output backend/requirements.txt --without-hashes --dev
❯ touch backend/app/models/user.py
❯ docker-compose up --build
```

원 예제에서 **`JWT`** 를 사용하기에 따라간다.

```python
# backend/app/models/user.py
from uuid import uuid4

from fastapi_users import models
from pydantic import UUID4, EmailStr
from pydantic import Field as _Field
from sqlmodel import Field

from .core import base_model, datetime_model

min_name_length = 4
max_name_length = 20


class user_base(models.BaseUser, datetime_model):
    name: str = _Field(min_length=min_name_length, max_length=max_name_length)


class user_create(models.BaseUserCreate):
    name: str = _Field(min_length=min_name_length, max_length=max_name_length)


class user_update(models.BaseUserUpdate):
    name: str = _Field(min_length=min_name_length, max_length=max_name_length)


class user_read(user_base):
    ...


class user(user_base, models.BaseUserDB):
    ...


class user_model(base_model, datetime_model, table=True):
    __tablename__: str = "users"

    id: UUID4 = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(min_length=min_name_length, max_length=max_name_length)
    hashed_password: str = Field(max_length=2**10)
    email: EmailStr = Field(sa_column_kwargs={"unique": True})
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
```

위 스크립트에서 정의한 모델은, **`pydantic`** 의 `BaseModel`을 상속받는, **`fastapi-users`** 에서 정의된 모델을 상속받아서 정의한다. 기본적으로 가지고 있는 속성은 다음과 같다.

> `id` : `UUID`로 임의 생성
> `email`: `xxx@yyy.zz`의 형태로 구성된 문자열
> `is_active`: 해당 유저 레코드가 활성화된 상태인지 확인
> `is_superuser`: 해당 유저가 관리자인지 확인
> `is_verified`: 선택적으로 사용 가능한, 해당 유저에 대한 추가적인 검증 통과 여부를 확인. 흔히 이메일로 검증을 진행함.
> `password`: 해당 유저가 로그인시 사용하는 비밀번호로, 실제 데이터베이스에는 `hashed_password` 속성으로 암호화 후 저장된다.

추가적으로 필요한 속성이 있다던가, 제약사항이 있다면 위 스크립트와 같이 모델에 새로 정의를 해도 좋고, 이후 정의할 `UserManager` 클래스의 `on_after_register` 등의 메소드에 제약사항을 적용해도 된다.

그리고 추가된 모델을 마이그레이션 설정에 추가한다.

```python
# backend/app/db/migrations/versions/f721febf752b_create_account_table.py
"""create account table

Revision ID: f721febf752b
Revises:
Create Date: 2022-04-27 17:21:25.945460

"""
import sys
from pathlib import Path

import sqlalchemy as sa
from alembic import op

sys.path.append(Path(__file__).resolve().parents[4].as_posix())
from app.models.cleaning import cleanings
from app.models.core import datetime_model
from app.models.user import user_model

# revision identifiers, used by Alembic.
revision = "f721febf752b"
down_revision = None
branch_labels = None
depends_on = None

cleanings_table = cleanings.get_table()
users_table = user_model.get_table()


def create_cleanings_table() -> None:
    col_names = {"id", "name", "description", "cleaning_type", "price"}.union(
        datetime_model.attrs
    )

    op.create_table(
        cleanings_table.name,
        *[col for col in cleanings_table.columns if col.name in col_names]
    )


def create_user_table() -> None:
    col_names = {
        "id",
        "name",
        "hashed_password",
        "email",
        "is_active",
        "is_superuser",
        "is_verified",
    }.union(datetime_model.attrs)

    op.create_table(
        users_table.name, *[col for col in users_table.columns if col.name in col_names]
    )


def upgrade():
    create_cleanings_table()
    create_user_table()


def downgrade():
    op.drop_table(cleanings_table.name)
    op.drop_table(users_table.name)
```

이제 드디어 마이그레이션을 할 준비가 끝났다.

```bash
root@77f86a971288:/backend# alembic upgrade head
INFO  [alembic.env] Running migrations online
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> f721febf752b, create account table
```

## `FastAPI-Users`

원 예제에서는 이제 테스트 코드를 작성한다. 하지만 `fastapi-users`를 사용하기 위해서, 사전 작업이 몇가지 필요한데, 지금 진행하는 작업이 다음 챕터나 그 다음 챕터에 나오는 내용과 비슷할 수 있다..

### 간단한 설명

**`fastapi-users`** 의 설명에 따르면, **`fastapi-users`** 는 `Transport`와 `Strategy` 이 두가지를 조합해서 사용하는 방식이다. 지금 이 예제는 **`Bearer`** 와 **`JWT`** 를 조합해서 쓰는 방식이라고 생각할 수 있다.

> - **`Bearer`** : `header`에 토큰을 저장
> - **`JWT`** : `JSON`형태의 토큰을 암호화 하여 저장(토큰 발행 이후 서버에서 무효화 불가능). 자세한 설명은 [여기](https://jwt.io/introduction)에서 확인할 수 있다.

### 인증 백엔드 설정

인증과 관련한 모듈을 저장할 경로를 생성하고 백엔드부터 앞에서 간략하게 설명한 인증 백엔드부터 생성한다.

```bash
❯ mkdir backend/app/services
❯ touch backend/app/services/__init__.py backend/app/services/authentication.py
```

```python
# backend/app/services/authentication.py
from dataclasses import dataclass

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
from sqlmodel.ext.asyncio.session import AsyncSession

from ..core.config import SECRET_KEY
from ..db.session import get_session
from ..models.user import user, user_base, user_create, user_model, user_update


async def get_user_db(session: AsyncSession = Depends(get_session)):
    yield SQLAlchemyUserDatabase(user, session, user_model)  # type: ignore


def create_transport() -> Transport:
    return BearerTransport(tokenUrl="api/auth/token")


def create_strategy() -> Strategy:
    return JWTStrategy(secret=str(config.SECRET_KEY), lifetime_seconds=3600)


def create_backend() -> list[AuthenticationBackend]:
    transport = create_transport()
    return [
        AuthenticationBackend(
            name="bearer_jwt", transport=transport, get_strategy=create_strategy
        )
    ]


class UserManager(BaseUserManager[user_create, user]):
    user_db_model = user
    reset_password_token_secret = str(SECRET_KEY)
    verification_token_secret = str(SECRET_KEY)

    async def on_after_register(self, user: user, request: Request | None = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: user, token: str, request: Request | None = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: user, token: str, request: Request | None = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


def create_fastapi_users(*backends: AuthenticationBackend) -> FastAPIUsers:
    return FastAPIUsers(
        get_user_manager=get_user_manager,
        auth_backends=backends,
        user_model=user_base,
        user_create_model=user_create,
        user_update_model=user_update,
        user_db_model=user,
    )


@dataclass(frozen=True)
class fastapi_user:
    users: FastAPIUsers
    backends: list[AuthenticationBackend]

    @classmethod
    def init(cls) -> "fastapi_user":
        backends = create_backend()
        users = create_fastapi_users(*backends)
        return cls(users=users, backends=backends)

```

뭔가 많이 적었지만 실제로 직접 작성했다고 할만한건 데이터클래스 **`fastapi_user`** 정도 밖에 없다. 전부 **`fastapi-users`** 레퍼런스에 있는 내용이다.

`UserManager` 와 `AuthenticationBackend` 인스턴스는 이후 계정과 관련된 작업을 할때 자주 사용된다.

### 토큰 `api` 생성

이제 토큰을 생성하는 api를 생성한다. 이 api의 엔드포인트는 `Transport`를 생성할 때 사용한 `tokenUrl`의 값과 일치해야한다.

```python
# backend/app/api/routes/token.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_users import models
from fastapi_users.authentication import Strategy
from fastapi_users.manager import BaseUserManager
from fastapi_users.router import ErrorCode
from starlette.status import HTTP_400_BAD_REQUEST

from .authentication import fastapi_user as fastapi_user_class
from .authentication import get_user_manager

fastapi_user = fastapi_user_class.init()
router = APIRouter()


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

    token = await strategy.write_token(user)
    return {"access_token": token, "token_type": "bearer"}
```

### 인증 백엔드 확인용 임시 `api` 생성

이어서 인증 백엔드 설정이 잘 됐는지 확인해볼 임시 라우터를 생성한다. 실제로 사용할 생각은 아니고, 말 그대로 임시 확인용이다.

```python
# backend/app/api/routes/users.py
from fastapi import APIRouter

from ...services.authentication import fastapi_user as fastapi_user_class

fastapi_user = fastapi_user_class.init()
router = APIRouter()


router.include_router(
    fastapi_user.users.get_auth_router(fastapi_user.backends[0]), prefix="/auth"
)
router.include_router(fastapi_user.users.get_register_router(), prefix="/auth")
router.include_router(fastapi_user.users.get_verify_router(), prefix="/auth")
```

```python
# backend/api/routes/__init__.py
from fastapi import APIRouter

from .cleanings import router as cleanings_router
from .token import router as token_router
from .users import router as users_router

router = APIRouter()

router.include_router(cleanings_router, prefix="/cleanings", tags=["cleanings"])
router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(token_router, prefix="/auth", tags=["token"])
```

이제 [http://localhost:8000/docs](http://localhost:8000/docs)에서 확인해보면 **`fastapi-users`** 에서 설정한 내용을 바탕으로 생성해놓은 유저 관련 api를 사용할 수 있다. 또한, 로그인시 생성되는 토큰을 헤더에 추가하면 **`swagger`** 에서 로그인을 시도해볼 수 있다.

다음은 이번에 작성한 내용을 좀 더 다듬고, 이전까지 했던 방식으로 **TDD** 방법론에 따라 api를 생성할 생각이다.
