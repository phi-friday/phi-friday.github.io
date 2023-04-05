---
title: fastapi 튜토리얼 -3- sql 모델 정의
date: '2022-04-28T21:51:36.869+09:00'
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

## **cleanings** 모델 생성

### 모델 정의

작성 전 미리 전반적인 내용을 훑어보니, `repository`는 **`sqlmodel`** 사용시 딱히 의미가 없는 모듈이므로 제거하자.
또한, 지난 글에서 임시로 생성한 `models`의 위치가 `db`의 하위 모듈이 아닌 `app`의 하위 모듈로 결정됐기에 같이 수정한다.

```bash
❯ rm -rf backend/app/db/repositories
❯ mv backend/app/db/models backend/app/models
❯ touch backend/app/models/__init__.py
❯ mv backend/app/models/base.py backend/app/models/core.py
❯ mv backend/app/models/temp.py backend/app/models/cleaning.py
```

```python
# backend/app/models/core.py
from typing import Any, TypeVar, cast

from sqlmodel import Field, SQLModel, Table

_T = TypeVar("_T", bound=SQLModel)


class fix_parse_obj_model(SQLModel):
    """
    sqlmodel에서 parse_obj 리턴값 정상적으로 수정하기 전까지 사용
    """
    @classmethod
    def parse_obj(cls: type[_T], obj: Any, update: dict[str, Any] | None = None) -> _T:
        return cast(_T, super().parse_obj(obj, update))


class base_model(fix_parse_obj_model):
    @classmethod
    def get_table(cls) -> Table:
        if (table := getattr(cls, "__table__", None)) is None:
            raise ValueError("not table")
        return table


class id_model(fix_parse_obj_model):
    id: int | None = Field(None, primary_key=True)
```

```python
# backend/app/models/cleaning.py
from enum import Enum

from pydantic import condecimal
from sqlmodel import Field

from .core import base_model, id_model

price_decimal_type = condecimal(max_digits=10, decimal_places=2)


class cleaning_type_enum(str, Enum):
    dust_up = "dust_up"
    spot_clean = "spot_clean"
    full_clean = "full_clean"


class cleaning_base(base_model):
    name: str | None = None
    description: str | None = None
    cleaning_type: cleaning_type_enum = cleaning_type_enum.spot_clean
    price: price_decimal_type | None = None


class cleaning_create(cleaning_base):
    name: str
    price: price_decimal_type


class cleaning_update(cleaning_base):
    cleaning_type: cleaning_type_enum | None = None


class cleanings(id_model, cleaning_base, table=True):
    name: str = Field(index=True)
    cleaning_type: cleaning_type_enum = Field(
        cleaning_type_enum.spot_clean,
        sa_column_kwargs={"server_default": cleaning_type_enum.spot_clean},
    )
    price: price_decimal_type


class cleaning_public(id_model, cleaning_base):
    ...
```

```python
# backend/app/db/migrations/versions/f721febf752b_create_account_table.py
(...)

def create_cleanings_table() -> None:
    import sys
    from pathlib import Path
    sys.path.append(Path(__file__).resolve().parents[4].as_posix())
    from app.models.cleaning import cleanings

(...)
```

`get_table` 메소드가 정의된 `base_model`을 상속하는 5개 모델은 각 리소스에 사용될 패턴을 보여준다.

> - `cleaning_base`: 공유 속성
> - `cleaning_create`: 새로운 리소스를 생성 ~ **POST**
> - `cleaning_update`: 기존 리소스를 수정 ~ **PUT**
> - `cleaning`: 데이터베이스에 정의될 테이블이자 레코드 ~ **GET**, **POST**, **PUT**,...
> - `cleaning_public`: 레코드에 대한 반환 형태 ~ **GET**, **POST**, **PUT**,...

### `session` 모듈 정의

원 작성자인 **jeffastor**는 이후 `repository` 모듈을 생성하여 CRUD 과정에 필요한 프로세스를 구현했지만, **`sqlmodel`** 을 사용하기에 그러한 과정이 따로 필요하지 않다.
앱에서 사용할 `session`에 대해서만 따로 정의한다.

```bash
❯ touch backend/app/db/session.py
```

```python
# backend/app/db/session.py
from typing import AsyncIterator

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio.engine import AsyncEngine
from sqlmodel.ext.asyncio.session import AsyncSession


async def get_database(request: Request) -> AsyncEngine:
    if (engine := getattr(request.app.state, "_db", None)) is None:
        raise AttributeError("there is no database engine in request as state")
    return engine


async def get_session(
    engine: AsyncEngine = Depends(get_database),
) -> AsyncIterator[AsyncSession]:
    async with AsyncSession(engine, autoflush=False, autocommit=False) as session:
        yield session
```

## `cleanings` 모델 `api` 예시

### `cleanings` 레코드 추가 `POST` `api` 예시

이제 세션을 활용한 간단한 형태의 **POST** api를 생성한다.

```python
# backend/app/api/routes/cleanings.py
from fastapi import APIRouter, Body, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from starlette.status import HTTP_201_CREATED

from ...db.session import get_session
from ...models.cleaning import cleaning_create, cleaning_public, cleanings

router = APIRouter()


@router.get("/")
async def get_all_cleanings() -> list[dict]:
    cleanings = [
        {
            "id": 1,
            "name": "My house",
            "cleaning_type": "full_clean",
            "price_per_hour": 29.99,
        },
        {
            "id": 2,
            "name": "Someone else's house",
            "cleaning_type": "spot_clean",
            "price_per_hour": 19.99,
        },
    ]
    return cleanings


@router.post(
    "/",
    response_model=cleaning_public,
    name="cleanings:create-cleaning",
    status_code=HTTP_201_CREATED,
)
async def create_new_cleaning(
    new_cleaning: cleaning_create = Body(..., embed=True),
    session: AsyncSession = Depends(get_session),
) -> cleanings:
    # data = cleanings.from_orm(new_cleaning) 으로 해도 가능
    # exclude_none=True, exclude_unset=True 옵션을 위해 parse_obj 사용
    data = cleanings.parse_obj(
        new_cleaning.dict(
            exclude_none=True,
            exclude_unset=True,
        )
    )
    session.add(data)
    await session.flush()
    await session.commit()
    await session.refresh(data)

    return data
```

이제 **`docker`** 로 서비스를 실행하고, [http://localhost:8000/docs](http://localhost:8000/docs)에서 생성한 **POST** api가 정상적으로 작동하는지 확인한다.

`body`에 값을

```yaml
{
  'new_cleaning':
    { 'name': 'string', 'description': 'string', 'cleaning_type': 'asd', 'price': 0 },
}
```

이렇게 주면

```yaml
{
  'detail':
    [
      {
        'loc': ['body', 'new_cleaning', 'cleaning_type'],
        'msg': "value is not a valid enumeration member; permitted: 'dust_up', 'spot_clean', 'full_clean'",
        'type': 'type_error.enum',
        'ctx': { 'enum_values': ['dust_up', 'spot_clean', 'full_clean'] },
      },
    ],
}
```

이렇게 왜 에러(422)가 나는지 친절하게 설명도 해준다.
정상적인 값을 넣으면

```yaml
{
  'new_cleaning':
    { 'name': 'test', 'description': 'test', 'cleaning_type': 'dust_up', 'price': 123 },
}
```

설정한대로

```yaml
{
  'name': 'test',
  'description': 'test',
  'cleaning_type': 'dust_up',
  'price': 123,
  'id': 1,
}
```

`cleaning_public`의 스키마에 맞게 값을 반환(201)한다. 만약 `cleaning_public`가 `id_model`을 상속하도록 정의하지 않았다면 `id`속성은 생략된 채로 반환됐을 것이다.

> **`fastapi`** 가 위 **POST** api에서 실행한 과정
>
> 1. **`json`** 형태의 `body`를 읽는다.
> 2. `body`의 값을 검증한다. ~ **`pydantic`**
> 3. 검증 결과에 따라 에러를 반환하거나, 생성한 모델 객체로 계산한 결과를 반환한다.

### `FastAPI`의 `DI` 사용법

`Depends`로 변수를 처리하는 방식이 생소할 수 있다. 사용자의 요청을 처리하는 방식을 사전에 호출 가능한 형태로 정의하고, 그 과정을 한번에 실행한 결과를 파라미터로 받아서 사용할 수 있게 한다.

직전에 생성한 `session.py`에서 `get_database`가 `request`를 받고,
`get_session`이 `get_database`를 받고,
`create_new_cleaning`이 `get_session`을 받아서 `session`객체를 파라미터로 사용할 수 있게 한다.

마지막으로, sql 서버에서 정상적으로 레코드가 입력됐는지 확인해본다.

```bash
bash-5.1# psql -h localhost -U postgres --dbname=postgres
psql (14.2)
Type "help" for help.

postgres=# select * from cleanings;
 name | description | cleaning_type | price  | id
------+-------------+---------------+--------+----
 test | test        | dust_up       | 123.00 |  1
(1 row)
```

다음에는 **`pytest`** 를 활용한다.
**`alembic`** 처럼 사용해본적이 없기에 기대가 된다.
