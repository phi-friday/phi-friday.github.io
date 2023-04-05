---
title: 'FastAPI, sqlmodel로 간단한 crud api 생성 2'
date: '2021-11-26T00:21:45.352+09:00'
tags:
  - crud
  - fastapi
  - python
  - sqlmodel
  - '@all'
page: 'FastAPI, sqlmodel로 간단한 crud api 생성'
summary: db와 연결 후 기초적인 형태의 crud api 생성
---

## db접속 모듈 생성

지난 글에서 db 컨테이너를 생성했지만 사용은 하지 않고 끝냈습니다. 이제 db를 연결하기 위한 작업을 진행하겠습니다.

> 저는 `fastapi`와 `sqlmodel`의 기능을 최대한 사용하기 위해 `Field`나 `Depends`, `Path` 등을 가능하다면 사용하지만, **사용하지 않아도 대부분의 경우 문제가 없습니다.** > `fastapi` 와 `sqlmodel`이 **알아서 해결합니다.**

`fastapi`는 `Depends`라는 재밌는 함수를 가지고 있습니다. 이걸 이용하면 코드를 깔끔하게 작성할 수 있는데, 이때 사용할 수 있는 형태로 database.py를 작성하겠습니다.

```python
# api/database.py
from os import environ
from typing import AsyncGenerator

from sqlalchemy.engine.url import URL
from sqlalchemy.ext.asyncio.engine import create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

database = dict(
    drivername="postgresql+asyncpg",
    username=environ["POSTGRES_USER"],
    password=environ["POSTGRES_PASSWORD"],
    host="db",
    port=environ["POSTGRES_PORT"],
    database=environ["POSTGRES_DB"],
)
url = URL.create(**database)
engine = create_async_engine(url, echo=bool(int(environ["RESTAPI_DEBUG"])))


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine) as session:
        yield session


async def create_model_table() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
```

db에서 비동기 세션을 사용할 계획이므로, `create_engine`대신 `create_async_engine`을 사용합니다.

`get_session`함수는 각 요청에서 사용할 session을 생성할때 사용하고,
`create_model_table`은 작성한 모델에 대응하는 테이블을 db에 생성하는 함수입니다. 나중에 모델을 생성하고 나면, fastapi가 시작할때 자동으로 실행되도록 할 계획입니다.

> 만약 동기 세션을 사용한다면, `from sqlmodel import create_engine`으로 엔진을 생성하고,
> `AsyncSession` 대신 `from sqlmodel import Session`으로 `Session`을 사용하면 됩니다.
> 물론 `get_session`을 작성할 때, `async with` 대신 `with`로 바꿔야 합니다.
> 그리고 `create_model_table` 내부에서 `with context`를 사용할 필요 없이, `create_all` 메소드를 실행하면 됩니다.

## db접속 모듈 테스트

작성한 함수가 잘 실행되는지 확인하기 위해 main.py에 간단한 `get` api를 생성하겠습니다.

```python
# api/main.py
from os import environ

import uvicorn
from fastapi import Depends, FastAPI
from sqlalchemy.sql import text
from sqlmodel.ext.asyncio.session import AsyncSession

from database import get_session

# 중략


@app.get("/session_test")
async def session_test(*, session: AsyncSession = Depends(get_session)):
    data = await session.exec(text("select 1"))  # type: ignore
    return data.all()


# 후략
```

> `# type: ignore`는 `vscode`의 확장 프로그램인 `pylance`가 해당 라인의 정적 타입 확인을 하지 않도록 합니다.
> 이유는 모르겠는데, `text`가 `excutable`한데도 `excutable`한 객체로 인정하지를 않습니다.
> 사실 `sqlalchemy`자체가 정적 타입 체크시 많은 에러를 뿜긴 합니다.

> `session`의 `exec` 메소드는 `sqlalchemy`에 없는 메소드입니다. 기존 실행 메소드인 `execute`를 사용해도 무방하지만, `exec`는 `execute`의 `wrapper`이면서 type hint가 잘 되어 있으므로, 정적 타입 체크나 `vscode`의 자동완성 등에서 상당한 편의를 얻을 수 있습니다.

`select 1` 쿼리를 실행하는 간단한 형태의 `get` api를 작성했습니다. 정상적으로 작성하셨다면

```json
[
  {
    "?column?": 1
  }
]
```

와 같은 결과를 받게 됩니다.
여기서 사용된 `Depends`는 단순히 `session`을 받는 용도지만, 이 외에도 많은 사용법이 있습니다.
관련 내용은 [여기](https://fastapi.tiangolo.com/tutorial/dependencies/)에서 확인할 수 있습니다.

> `fastapi`는 비동기 프로그래밍을 아주 잘 지원하기 때문에, **원한다면 그냥 `async def`를 사용하면 되고, 비동기가 아닌 io 작업이 있다면 그냥 `def`를 사용해도 됩니다. await 키워드를 사용하지 않더라도 async def를 사용해도 좋습니다. 어떻게 작성하든 `fastapi`가 알아서 잘 실행합니다.**

## 사용할 모델 및 테이블 생성

세션이 잘 붙은걸 확인했으니, 이제 사용할 모델을 생성하겠습니다.

```python
# api/model.py
from datetime import datetime
from typing import Optional

from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class user(SQLModel, table=True):
    id: Optional[int] = Field(None, primary_key=True)
    name: str = Field(..., min_length=1, nullable=False)
    email: EmailStr = Field(..., nullable=False)
    registered_date: datetime = Field(default_factory=datetime.today)
```

`user`라는 모델이자 테이블인 클래스를 정의했습니다.
`name`과 `email`은 필수값이고, `registered_date`는 자동으로 생성되도록 했습니다.

> `table=True` 파라미터는 `user` 클래스가 db에서 사용할 테이블이라는 것을 알려줍니다.
> 이 파라미터가 없으면, 이전에 작성한 `create_model_table` 함수를 실행해도 db에 테이블이 생성되지 않습니다.

pk로 지정한 `id`가 `Optional`이어서 의아할 수 있는데,
api 서버에서 우선 `id`를 지정하지 않은 상태로 `user`인스턴스를 생성하고, 그 인스턴스를 `session`을 통해 추가하면 `user` 테이블에서는 정상적으로 `id`가 들어가게 됩니다.
이후 api 서버에서 `id`를 확인하고 싶다면 `refresh`메소드를 사용하면 됩니다.

### 테이블에 레코드를 추가하는 `post` api 생성

이 과정을 담은 `post` api를 하나 생성하겠습니다.

```python
# api/main.py
from os import environ

import uvicorn
from fastapi import Depends, FastAPI
from sqlalchemy.sql import text
from sqlmodel.ext.asyncio.session import AsyncSession

from database import create_model_table, get_session
from model import user

app = FastAPI()
app.on_event("startup")(create_model_table)


# 중략


@app.post("/create_user", response_model=user)
async def create_user(data: user, *, session: AsyncSession = Depends(get_session)):
    user_instance = user.from_orm(data)
    session.add(user_instance)
    await session.commit()
    await session.refresh(user_instance)

    return user_instance


# 후략
```

기존에 작성했던 `create_model_table`함수를 `app.on_event(...)` 데코레이터를 이용해서 자동으로 실행되도록 했습니다.
현재 `main.py`에 `user` 클래스가 있으므로 api 서버가 실행될때 `user` 테이블이 db에 없다면 자동으로 생성됩니다.

`.env` 파일에 `RESTAPI_DEBUG=1`로 작성하셨다면, 다음과 같은 쿼리로 테이블이 생성됐다는 것을 로그에서 확인할 수 있습니다.

```sql
CREATE TABLE "user" (
        id SERIAL,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        registered_date TIMESTAMP WITHOUT TIME ZONE,
        PRIMARY KEY (id)
)
```

> 아직 문자열을 `nvarchar`로 간단하게 설정하는 방법은 `sqlmodel`에 없습니다. `sqlalchemy`의 `Column`을 직접 작성해서 `Field`에 대응하는 방식으로만 가능합니다.
> `type_` 파라미터를 사용할 수 있도록 PR된 상태이니, 다음 버전에서는 가능할 것 같습니다.

다음과 같은 `body`로 `post`를 요청하면

```json
{
  "name": "string",
  "email": "user@example.com"
}
```

다음과 같은 결과를 받게 됩니다.

```json
{
  "id": 1,
  "registered_date": "2021-11-25T23:51:26.156134",
  "name": "string",
  "email": "user@example.com"
}
```

### 레코드를 조회하는 `get` api 생성

이제 이 유저 정보를 조회하는 `get` api를 생성하겠습니다.

```python
# api/main.py
from os import environ

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Path
from sqlalchemy.sql import text
from sqlmodel.ext.asyncio.session import AsyncSession

from database import create_model_table, get_session
from model import user

# 중략


@app.get("/get_user/{user_id}", response_model=user)
async def get_user(
    user_id: int = Path(..., ge=1), *, session: AsyncSession = Depends(get_session)
):
    user_instance = await session.get(user, user_id)
    if not user_instance:
        raise HTTPException(status_code=404, detail=f"there is not {user_id=} user")

    return user_instance


# 후략
```

> 여기서 사용된 `Path`는 **없어도 아무 문제가 없습니다.**

`user_id`에 해당하는 `user`가 없을 경우 404에러를 반환하도록 했습니다.
`fastapi`에서 제공하는 `Path`를 이용해서, `user_id`는 1 이상의 값만 받도록 제한했습니다. 내부적으로 `pydantic`을 사용하기 때문에, 빠르고 정확합니다.

### 레코드를 수정하는 `patch` api 생성

이어서 유저 정보를 수정하는 `patch` api를 작성합니다.

```python
# api/main.py
from os import environ

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Path
from sqlalchemy.sql import text
from sqlmodel.ext.asyncio.session import AsyncSession

from database import create_model_table, get_session
from model import user

# 중략


@app.patch("/update_user/{user_id}", response_model=user)
async def update_user(
    data: user,
    user_id: int = Path(..., ge=1),
    *,
    session: AsyncSession = Depends(get_session),
):
    user_instance = await session.get(user, user_id)
    if not user_instance:
        raise HTTPException(status_code=404, detail=f"there is not {user_id=} user")

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user_instance, key, value)

    session.add(user_instance)
    await session.commit()
    await session.refresh(user_instance)

    return user_instance


# 후략
```

`data.dict` 메소드의 `exclude_unset=True` 파라미터는 `user` 클래스에 정의된 속성이면서 사용자가 `body`에 포함하지 않은 값을 제외한 딕셔너리를 반환하게 합니다.

`user_id=1`에 다음과 같은 `body`를 보내면

```json
{
  "name": "aaa",
  "email": "aaaa@example.com"
}
```

다음과 같은 `user`를 반환합니다.

```json
{
  "id": 1,
  "registered_date": "2021-11-25T23:51:26.156134",
  "name": "aaa",
  "email": "aaaa@example.com"
}
```

이전에 생성한 `get` api로 조회해보면, 정상적으로 수정된 것을 확인할 수 있습니다.

### 레코드를 제거하는 `delete` api 생성

마지막으로 `delete` api를 작성합니다.

```python
# api/main.py
from os import environ

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Path
from sqlalchemy.sql import text
from sqlmodel.ext.asyncio.session import AsyncSession

from database import create_model_table, get_session
from model import user

# 중략


@app.delete("/delete_user/{user_id}")
async def delete_user(
    user_id: int = Path(..., ge=1), *, session: AsyncSession = Depends(get_session)
):
    user_instance = await session.get(user, user_id)
    if not user_instance:
        raise HTTPException(status_code=404, detail=f"there is no {user_id=} user")

    await session.delete(user_instance)
    await session.commit()

    return user_id


# 후략
```

`user_id=1`로 `delete` api를 요청 한 다음 `get` api를 요청하면 다음과 같은 메세지를 보냅니다.

```json
{
  "detail": "there is no user_id=1 user"
}
```

기초적인 형태의 `crud` api를 작성하고, 정상적으로 실행되는지 확인했습니다.
몇몇 아쉬운 부분들이 눈에 띕니다.

- 유저를 추가할때 중복을 확인하지 않는다.
- 유저를 수정한 일자가 없다.
- 왜 `response_model`은 user로 고정이지?
- etc...

이러한 부분들은 다음 글에서 확인하겠습니다.
