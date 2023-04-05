---
title: 'FastAPI, sqlmodel로 간단한 crud api 생성 4'
date: '2021-11-27T00:28:51.285+09:00'
tags:
  - crud
  - fastapi
  - python
  - sqlmodel
  - '@all'
page: 'FastAPI, sqlmodel로 간단한 crud api 생성'
summary: 이제 기존에 작성한 crud api를 보완해보겠습니다.
---

이제 기존에 작성한 `crud` api를 보완해보겠습니다.

## 유저를 추가할때 중복 확인

기존 작성된 `create` api는 입력받은 `body`를 그대로 db에 새로운 레코드로 추가하는 역할만 했습니다.
이제 `email`속성을 기준으로 중복을 확인 한 다음 레코드로 추가할 수 있게 코드를 수정하겠습니다.

```python
# api/scripts/routes/user/crud.py
(전략)

@app.post("/create_user", response_model=user.user)
async def create_user(data: user.user, *, session: AsyncSession = Depends(get_session)):
    user_email = await session.exec(select(user.user.email))  # type: ignore
    if data.email in user_email: # type: ignore
        raise HTTPException(status_code=400, detail="동일한 email 유저 있음")

    user_instance = user.user.from_orm(data)
    session.add(user_instance)
    await session.commit()
    await session.refresh(user_instance)

    return user_instance

(후략)
```

이제 중복된 유저 데이터를 입력하면 다음과 같은 400에러와 함께 다음과 같은 값을 반환합니다.

```json
{
  "detail": "동일한 email 유저 있음"
}
```

로그를 확인해보면 다음과 같이 에러를 반환하는 것을 확인할 수 있습니다.

```sql
INFO sqlalchemy.engine.Engine BEGIN (implicit)
INFO sqlalchemy.engine.Engine SELECT "user".email
FROM "user"
INFO sqlalchemy.engine.Engine [no key 0.00018s] ()
INFO:     10.0.2.100:43750 - "POST /user/create_user HTTP/1.1" 400 Bad Request
INFO sqlalchemy.engine.Engine ROLLBACK
```

만약 중복이 아닌 데이터를 입력하면, 다음과 같은 로그를 확인할 수 있습니다.

```sql
INFO sqlalchemy.engine.Engine BEGIN (implicit)
INFO sqlalchemy.engine.Engine SELECT "user".email
FROM "user"
INFO sqlalchemy.engine.Engine [no key 0.00016s] ()
INFO sqlalchemy.engine.Engine INSERT INTO "user" (name, email, registered_date) VALUES (%s, %s, %s) RETURNING "user".id
INFO sqlalchemy.engine.Engine [cached since 276.6s ago] ('test', 'test@example.com', datetime.datetime(--))
INFO sqlalchemy.engine.Engine COMMIT
INFO sqlalchemy.engine.Engine BEGIN (implicit)
INFO sqlalchemy.engine.Engine SELECT "user".id, "user".name, "user".email, "user".registered_date
FROM "user"
WHERE "user".id = %s
INFO sqlalchemy.engine.Engine [cached since 276.6s ago] (3,)
INFO:     10.0.2.100:43796 - "POST /user/create_user HTTP/1.1" 200 OK
INFO sqlalchemy.engine.Engine ROLLBACK
```

> 지금은 api 서버에서 처리하는 방법을 보이기 위해 이렇게 코드를 작성했습니다.
> 하지만 **더 간단하게 중복을 제외하는 방법**이 있습니다.
> `user.user` 모델을 정의할 때, `email` 필드에 `sa_column_kwargs={"unique": True}` 파라미터를 추가하면 됩니다.
> 그러면 api 서버가 아닌, db에서 중복을 확인하고, 에러를 반환할 것입니다.
> 다만, **이 에러에 대한 예외처리는 직접 해야합니다.**

## 유저 정보를 수정한 최종 일자 기록

기존 `user` 모델은 최초 입력 일자에 대한 정보만 보존하고, 수정한 일자에 대해서는 보존하지 않습니다. 이는 테이블에 새로운 필드를 추가해야 가능한 일이므로, `user`모델을 직접적으로 수정하겠습니다.

```python
# api/scripts/models/user/__init__.py
(전략)

class user(SQLModel, table=True):
    id: Optional[int] = Field(None, primary_key=True)
    name: str = Field(..., min_length=1, nullable=False)
    email: EmailStr = Field(..., nullable=False)
    registered_date: datetime = Field(default_factory=datetime.today)
    last_updated_date: datetime = Field(default_factory=datetime.today)
```

`last_updated_date` 필드만 추가하고 끝냈습니다.
지금 이상태 그대로 진행하면 `update` api를 수정하더라도, 에러를 반환할 것입니다. 기존에 db 생성한 `user`테이블에는 `last_updated_date` 필드가 없기 때문입니다.
sql의 `alter` 쿼리를 사용해도 되고, `sqlalchemy`의 `drop_all` 메소드를 사용해도 됩니다.
지금은 개발 초기중의 초기이므로 `drop_all`로 해결하겠습니다.

```python
# api/scripts/database/default.py
(전략)

async def create_model_table() -> None:
    async with engine.begin() as conn:
        if settings.debug:
            await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
```

기존에 없던 `await conn.run_sync(SQLModel.metadata.drop_all)`를 추가했습니다.
`create_model_table`함수가 이미 서버를 시작할때 실행되도록 설정돼 있기 때문에, 이제 서버를 시작하면 작성한 모델에 대응하는 테이블을 모두 `drop`하고 다시 `create`할 것입니다.
개발중에만 사용하자는 의미로 `settings.debug`를 확인하도록 했습니다. 실제로는 더 엄격하게 확인하는게 맞습니다.

이제 `update` api를 수정하겠습니다.

```python
# api/scripts/routes/user/crud.py

from datetime import datetime

from fastapi import Depends, HTTPException, Path
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from ...database import get_session
from ...models import user
from .app import app

(중략)

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

    user_instance.last_updated_date = datetime.today()

    session.add(user_instance)
    await session.commit()
    await session.refresh(user_instance)

    return user_instance

(후략)
```

`user_instance.last_updated_date = datetime.today()`가 추가됐습니다.
이제 정상적으로 `update` api가 실행되면, `last_update_date` 값이 변합니다.

실제로 실행해보면, 다음과 같은 결과를 반환받습니다.

```json
{
  "id": 1,
  "registered_date": "2021-11-26T23:59:37.359332",
  "last_updated_date": "2021-11-26T23:59:52.837064",
  "name": "aaa",
  "email": "user@example.com"
}
```

## 각 api의 `response_model`과 `body` 형태 수정

지금까지 작성된 `crud` api는 `delete`를 제외하고 `response_model=user.user` 파라미터를 가지고 있습니다. 이것은 반환한 값이 `user.user` 인스턴스이고, `user.user` 의 스키마로 데이터를 반환해라는 의미입니다.

하지만 모든 api에서 그렇게 하는 것은 **위험한 일**입니다.
지금은 따로 설정하지 않았지만 사용자의 **비밀번호**가 필드에 있을 수도 있고, **민감한 개인정보** 또한 가능합니다.

또한 입력받는 `body` 역시 `user.user`의 스키마로 구성된 데이터를 받습니다. 하지만 이것은 불필요한 일이고, 어쩌면 **오류를 발생시킬 수도 있습니다.**

사용자가 `user`를 추가할 때, `id`나 `registered_date`와 같이 레코드에 자동으로 입력되는 값은 **사용자가 입력한 값을 받을 필요도 없고, 받아선 안되는 값입니다.**

따라서, 사용자가 입력하는 값과, 사용자에게 반환할 값에 대한 새로운 스키마가 필요합니다. 이에 대한 모델을 새로 생성하면서, 기존의 모델을 정의하는데 있어서 **약간의 변화**를 주겠습니다.

```python
# api/scripts/models/user/__init__.py

(전략)

class user_base(SQLModel):
    name: str = Field(..., min_length=1, nullable=False)
    email: EmailStr = Field(..., nullable=False)


class user_create(user_base):
    pass


class user_read(user_base):
    id: int


class user_update(user_base):
    name: Optional[str] = Field(None, min_length=1)
    email: Optional[EmailStr] = None


class user(user_base, table=True):
    id: Optional[int] = Field(None, primary_key=True)
    registered_date: datetime = Field(default_factory=datetime.today)
    last_updated_date: datetime = Field(default_factory=datetime.today)
```

`user_base`를 기준으로 `create`, `read`, `update`에 대응하는 모델과 `user` 테이블에 해당하는 모델을 생성했습니다.

> `user_update`는 `user_base`에서 정의된 모든 필드를 덮어씌우지만, 그렇지 않은 경우도 있을 수 있으니 일단 상속했습니다.

이전에 `table=True` 파라미터가 있어야 db에 테이블이 생성된다고 한 적이 있습니다. 위 코드에서 확인할 수 있듯이, `user` 클래스만 `table=True` 파라미터를 가지고 있습니다. 따라서 `user` 클래스를 제외한 모델은 사실상 `pydantic`의 모델로 활용하게 됩니다.

이제 이 모델을 적용한 `crud` api를 수정합니다.

```python
# api/scripts/routes/user/crud.py

(전략)

@app.post("/create_user", response_model=user.user_read)
async def create_user(
    data: user.user_create, *, session: AsyncSession = Depends(get_session)
):
    user_email = await session.exec(select(user.user.email))  # type: ignore
    if data.email in user_email:  # type: ignore
        raise HTTPException(status_code=400, detail="동일한 email 유저 있음")

    user_instance = user.user.from_orm(data)
    session.add(user_instance)
    await session.commit()
    await session.refresh(user_instance)

    return user_instance


@app.get("/get_user/{user_id}", response_model=user.user_read)
async def get_user(
    user_id: int = Path(..., ge=1), *, session: AsyncSession = Depends(get_session)
):
    user_instance = await session.get(user.user, user_id)
    if not user_instance:
        raise HTTPException(status_code=404, detail=f"there is not {user_id=} user")

    return user_instance


@app.patch("/update_user/{user_id}", response_model=user.user_read)
async def update_user(
    data: user.user_update,
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

    user_instance.last_updated_date = datetime.today()

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

`reponse_model`을 `user.user_read`로 수정하고, `body`에 해당하는 `data`의 타입을 `user.user_create` 또는 `user.user_update`로 수정했습니다.
`response_model`을 `user.user_read`로 정했기 때문에, `user.user` 인스턴스를 반환하더라도, `user.user_read`의 스키마에 따라 값이 반환됩니다.
![](/images/9a191a49-09af-4cad-acf6-fe48c31b5fa5-docs.png)
docs에서 한 눈에 확인 가능합니다.

## 끝으로..

더 적고 싶은데, 더 적을게 뭐가 있을지 잘 모르겠어요.
일단 여기서 중단
