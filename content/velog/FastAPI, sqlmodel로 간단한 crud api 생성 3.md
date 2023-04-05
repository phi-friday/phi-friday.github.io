---
title: 'FastAPI, sqlmodel로 간단한 crud api 생성 3'
date: '2021-11-26T22:52:37.564+09:00'
tags:
  - crud
  - fastapi
  - python
  - sqlmodel
  - '@all'
page: 'FastAPI, sqlmodel로 간단한 crud api 생성'
summary: 'crud api를 보완하기 전, 구조를 적당히 변환'
---

이전 글에서 몇가지 의문점을 남겨놨습니다.

- 유저를 추가할때 중복을 확인하지 않는다.
- 유저를 수정한 일자가 없다.
- 왜 response_model은 user로 고정이지?
- etc...

**다음 글**에서, 이러한 부분들을 고쳐가겠습니다.

## 그 전에...

지난 글까지 작성한 스크립트는 모두 한 폴더에 모여있습니다. 이런 구조는 지금같이 간단한 수준일때는 문제가 없지만, 점점 개발을 힘들게 만듭니다.
그렇기 때문에, 간단한 형태로 구조화할 생각입니다.
**아직 많이 부족하여, 효율적인 구조일지는 장담할 수 없습니다..**

계획은 이렇습니다.

> 1. api 서버를 실행하는 스크립트를 최상위 폴더에 위치하고, `scripts` 폴더를 생성
> 2. `scripts` 폴더에 `config`, `database`, `models`, `routes` 폴더를 생성
>    > `config` : 환경설정과 관련된 스크립트를 모아놓습니다. **다른 경로의 스크립트를 참조하지 않습니다.** >> `database` : db와 관련된 기본적인 작업에 대한 스크립트를 모아놓습니다.
>    > `models` : 여러 api를 작성할 때 사용될 모델에 대한 스크립트를 모아놓습니다.
>    > `routes` : 여러 api에 대해 입맛에 맞게 구조화하여 배치합니다.
>
> ### 왜 최상위 폴더가 아닌 `scripts` 폴더에?
>
> 파이썬에는 상대참조와 절대참조가 있습니다.
> 아직 많이 부족하여, 정확히 이건 어떻고 저건 어떻다 말할 수준은 못되지만, **상대참조는 패키지로 구성된 스크립트에서만 가능하다고 알고 있습니다.**
> 그렇기에, `scripts`폴더를 최상위 경로에서 사용할 수 있는 로컬 패키지처럼 사용하기 위해 `scripts`폴더를 생성 후, 하위 경로로 다른 폴더를 위치하게 했습니다.

### 1. config

앞으로 사용할 `settings` 클래스를 정의할 스크립트인 `default.py`를 생성하겠습니다.

```python
# api/scripts/config/default.py
from typing import Any

from pydantic import BaseSettings, Field


class database(BaseSettings):
    drivername: str = "postgresql+asyncpg"
    host: str = "db"

    username: str = Field(..., env="POSTGRES_USER")
    password: str = Field(..., env="POSTGRES_PASSWORD")
    port: int = Field(..., env="POSTGRES_PORT")
    database: str = Field(..., env="POSTGRES_DB")

    query: dict[str, Any] = Field(default_factory=dict)


class settings(BaseSettings):
    debug: bool = Field(..., env="RESTAPI_DEBUG")

    run_port: int = Field(..., env="RESTAPI_PORT")
    access_port: int = Field(..., env="RESTAPI_OUT_PORT")

    database: database = database()
```

그리고 `__ init__.py`를 생성해서 `settings` 클래스의 인스턴스를 생성합니다.

```python
# api/scripts/config/__init__.py
from .default import settings

__all__ = ("settings",)

settings = settings()
```

이제 `scripts.config.settings`로 설정값에 접근할 수 있습니다.

### 2. database

`routes`에서 빈번하게 사용될 `get_session`과 같은 범용적인 db관련 스크립트를 작성합니다.

```python
# api/scripts/database/default.py
from typing import AsyncGenerator

from sqlalchemy.engine.url import URL
from sqlalchemy.ext.asyncio.engine import create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from ..config import settings

url = URL.create(**settings.database.dict())
engine = create_async_engine(url, echo=settings.debug)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine) as session:
        yield session


async def create_model_table() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
```

기존에 최상위 경로에 생성했던 `database.py`와 달라진 점은, **직접 환경변수를 불러오지 않고,** 이전에 작성한 `scripts.config.settings`를 불러와서 사용한다는 것입니다.

이어서 `__ init__.py`를 작성해서, 실제로 사용할 함수를 모아놓습니다.

```python
# api/scripts/database/__init__.py
from .default import create_model_table, get_session

__all__ = ("get_session", "create_model_table")
```

### 3. models

우선 `user`폴더를 생성한 다음, 그 폴더에 `__ init__.py`를 작성하겠습니다.

> 굳이 이렇게 하는 이유는

- 각 라우트 혹은 모델별로 다른 폴더에 관리하면 편했던 기억이 있어서 그렇고,
- 지금은 사용하지 않지만, `orjson`으로 `json`을 loads, dumps 할때, `pydantic`의 `BaseModel`을 상속한 새로운 모델을 만들어서 사용하는데, 그 모델을 `models.__init__.py`에 작성해두면 나중에 쓸때 편했기 때문입니다.

**`api/scripts/models/user/__init__.py`는 기존 `model.py`와 같으므로 생략합니다.**

### 4. routes

기존에 `main.py`에 있던 `crud` api를 옮깁니다.
이것도 `models`와 같이, `user`폴더를 생성 한 다음 해당 폴더에 스크립트를 작성합니다.

우선 `main.py`에 정의된 `app`에 연결할 라우터를 정의할 `app.py`부터 작성합니다.

```python
# api/scripts/routes/user/app.py
from fastapi import APIRouter

app = APIRouter()
```

굳이 이렇게 따로 뺀 이유는 순환 참조 오류를 방지하기 위해서 입니다.

여기서 `tags`와 `prefix`를 설정할 수도 있지만, 개인적으로 `main.py`에서 일괄적으로 확인하고 수정할 수 있는게 편해서 지금은 하지 않았습니다.

다음으로 이전에 작성한 `crud` api를 모아놓은 `crud.py`를 작성합니다.

```python
# api/scripts/scripts/routes/user/crud.py
from fastapi import Depends, HTTPException, Path
from sqlmodel.ext.asyncio.session import AsyncSession

from ...database import get_session
from ...models import user
from .app import app


@app.post("/create_user", response_model=user.user)
async def create_user(data: user.user, *, session: AsyncSession = Depends(get_session)):
    user_instance = user.user.from_orm(data)
    session.add(user_instance)
    await session.commit()
    await session.refresh(user_instance)

    return user_instance


@app.get("/get_user/{user_id}", response_model=user.user)
async def get_user(
    user_id: int = Path(..., ge=1), *, session: AsyncSession = Depends(get_session)
):
    user_instance = await session.get(user.user, user_id)
    if not user_instance:
        raise HTTPException(status_code=404, detail=f"there is not {user_id=} user")

    return user_instance


@app.patch("/update_user/{user_id}", response_model=user.user)
async def update_user(
    data: user.user,
    user_id: int = Path(..., ge=1),
    *,
    session: AsyncSession = Depends(get_session),
):
    user_instance = await session.get(user.user, user_id)
    if not user_instance:
        raise HTTPException(status_code=404, detail=f"there is not {user_id=} user")

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user_instance, key, value)

    session.add(user_instance)
    await session.commit()
    await session.refresh(user_instance)

    return user_instance


@app.delete("/delete_user/{user_id}")
async def delete_user(
    user_id: int = Path(..., ge=1), *, session: AsyncSession = Depends(get_session)
):
    user_instance = await session.get(user.user, user_id)
    if not user_instance:
        raise HTTPException(status_code=404, detail=f"there is not {user_id=} user")

    await session.delete(user_instance)
    await session.commit()

    return user_id
```

여기서 사용되는 `app`은 `main.py`의 `app`이 아닌, 같은 폴더의 `app.py`의 `app`입니다.

마지막으로 `__ init__.py`를 작성합니다.

```python
# api/scripts/routes/user/__init__.py
from .crud import app
```

여기서 불러온 앱은 `crud` api가 기억된 상태로, 나중에 `main.py`에서 불러옵니다.

이제 `main.py`를 정리합니다.

```python
# api/main.py
import uvicorn
from fastapi import Depends, FastAPI
from sqlalchemy.sql import text
from sqlmodel.ext.asyncio.session import AsyncSession

from scripts.config import settings
from scripts.database import create_model_table, get_session
from scripts.routes import user

app = FastAPI()
app.on_event("startup")(create_model_table)
app.include_router(user.app, prefix="/user", tags=["user"])


@app.get("/")
def index():
    return {"hello": "world"}


@app.get("/session_test")
async def session_test(*, session: AsyncSession = Depends(get_session)):
    data = await session.exec(text("select 1"))  # type: ignore
    return data.all()


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.run_port,
        reload=settings.debug,
    )
```

`api`폴더는 최상위 폴더이므로, `scripts`를 패키지처럼 다루면 됩니다.
`user` 라우터는 `prefix="user"`, `tags=["user"]`로 파라미터를 줬습니다. 나중에 docs에서 확인해보면 차이를 알 수 있습니다.
이제는 사용하지 않는 기존 `api/database.py`, `api/model.py`를 제거합니다.
정상적으로 진행했다면, 다음과 같은 구조를 가지게 됩니다.

```
.
├── .env
├── api
│   ├── main.py
│   └── scripts
│       ├── config
│       │   ├── __init__.py
│       │   └── default.py
│       ├── database
│       │   ├── __init__.py
│       │   └── default.py
│       ├── models
│       │   └── user
│       │       └── __init__.py
│       └── routes
│           └── user
│               ├── __init__.py
│               ├── app.py
│               └── crud.py
├── db [error opening dir]
├── docker-compose.yml
├── dockerfile
└── requirements.txt
```

`db`폴더에 접근이 불가능 한 것은, 컨테이너 내부에서 관리자 권한으로 작성됐기 때문입니다.
이제 `docker-compose up`으로 실행해서 docs를 확인해봅시다.
![](/images/80800d72-874a-4bc0-afd5-80792cf91bef-docs.png)
api 경로에 `user`가 추가됐고,
각 api가 사전에 설정한 `tags`를 기준으로 나뉘어 진 것을 확인할 수 있습니다.
