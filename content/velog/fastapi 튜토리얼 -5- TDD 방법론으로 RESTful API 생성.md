---
title: fastapi 튜토리얼 -5- TDD 방법론으로 RESTful API 생성
date: '2022-05-02T20:47:43.741+09:00'
tags:
  - crud
  - fastapi
  - restful
  - tdd
  - python
  - '@all'
page: fastapi 튜토리얼
summary: 'fastapi 사용법을 다시 공부할겸, 참고할만한 좋은 예제가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.'
---

**`fastapi`** 사용법을 다시 공부할겸, 참고할만한 좋은 [예제](https://www.jeffastor.com/blog/populating-cleaning-jobs-with-user-offers-in-fastapi)가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.
지난번처럼 어쩌다 그만둘 수도 있긴 하지만...

---

아래 문제로 인해 해당 챕터를 진행하면서 이전 챕터의 글을 포함해서 수정하다 보니 제대로 수정이 된건지 아닌지 확인하기가 어렵다..
어쩌면 [이곳](https://github.com/phi-friday/jeffastor_tutor)에서 코드를 확인하는게 도움이 될 수 있다.

특히 이 챕터의 테스트 코드에 적용된 `Decimal`이나 `f-string`도 원래는 **TDD** 과정 중에서 적용한 것이지만, 이미 글 쓰는 흐름이 다 꼬여서 생략했다.

---

## `SQLModel`의 **validataion** 관련 해결

[링크](https://velog.io/@phi0friday/sqlmodel-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9%EC%8B%9C-%EC%A3%BC%EC%9D%98%EC%82%AC%ED%95%AD-validation)와 같은 이유로 인해, **`sqlmodel`** 로 생성한 모델에 대한 전반적인 수정이 필요하므로, 아래와 같이 수정을 진행했다.

```python
# backend/app/models/core.py
from typing import Any, TypeVar, cast

from sqlmodel import Field, SQLModel, Table

_T = TypeVar("_T", bound=SQLModel)


class fix_return_type_model(SQLModel):
    """
    sqlmodel에서 parse_obj 리턴값 정상적으로 수정하기 전까지 사용
    +
    validate 또한 같은 문제 있음
    """

    @classmethod
    def parse_obj(cls: type[_T], obj: Any, update: dict[str, Any] | None = None) -> _T:
        return cast(_T, super().parse_obj(obj, update))

    @classmethod
    def validate(cls: type[_T], value: Any) -> _T:
        return cast(_T, super().validate(value))


class base_model(fix_return_type_model):
    @classmethod
    def get_table(cls) -> Table:
        if (table := getattr(cls, "__table__", None)) is None:
            raise ValueError("not table")
        return table


class id_model(fix_return_type_model):
    id: int | None = Field(None, primary_key=True)
```

```python
# backend/app/api/routes/cleanings.py
(...)

@router.post(
    "",
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
    # sqlmodel table=True 관련 validation 문제로 인해 validate사용
    data = cleanings.validate(
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

```python
# backend/tests.py
(...)

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
        assert cleaning == test_cleaning

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
        all_cleanings = [cleanings.validate(l) for l in json]
        assert test_cleaning in all_cleanings
```

---

## `RESTful` `CRUD` `api` 생성

**RESTful** 표준에 따라, 다음과 같이 엔드포인트를 생성하고자 한다.

| 엔드포인트     | 메소드 | 설명                               |
| :------------- | :----- | :--------------------------------- |
| /cleaning      | POST   | 새로운 cleaning 레코드 생성        |
| /cleaning/{id} | GET    | id에 해당하는 cleaning 레코드 호출 |
| /cleaning      | GET    | 전체 cleaning 레코드 호출          |
| /cleaning/{id} | PATCH  | id에 해당하는 cleaning 레코드 수정 |
| /cleaning/{id} | PUT    | id에 해당하는 cleaning 레코드 교체 |
| /cleaning/{id} | DELET  | id에 해당하는 cleaning 레코드 제거 |

이전 챕터에서, 새로운 레코드를 생성하는 것과, 기존의 레코드를 `id`를 이용하여 호출하는, 두개의 엔드포인트를 생성했다. 다른 4가지 또한, **TDD** 방법론에 맞게 작성한다.

> 원 예제에서 **jeffastor**는 **PATCH** api를 작성하지 않고 **PUT** api만 작성했다. 그런데 작동 방식을 보면 **jeffastor**가 작성한 **PUT** api는 **PATCH** api처럼 작동한다. 이와 관련해 약간의 수정이 함께 진행된다.

### `GET` `api`

```python
# backend/tests/test_cleanings.py
(...)

    async def test_get_all_cleanings_returns_valid_response(
        self, app: FastAPI, client: AsyncClient, test_cleaning: cleanings
    ) -> None:
        res = await client.get(app.url_path_for("cleanings:get-all-cleanings"))
        assert res.status_code == HTTP_200_OK
        assert isinstance((json := res.json()), list)
        assert len(json) > 0
        all_cleanings = [cleanings.parse_obj(l) for l in json]    async def test_get_all_cleanings_returns_valid_response(
        self, app: FastAPI, client: AsyncClient, test_cleaning: cleanings
    ) -> None:
        res = await client.get(app.url_path_for("cleanings:get-all-cleanings"))
        assert res.status_code == HTTP_200_OK
        assert isinstance((json := res.json()), list)
        assert len(json) > 0
        all_cleanings = [cleanings.parse_obj(l) for l in json]
        assert test_cleaning in all_cleanings
        assert test_cleaning in all_cleanings
```

이제 **`pytest`** 를 **`docker`** 컨테이너 내부에서 실행하면, 다음과 같은 에러를 확인할 수 있다.

```bash
(...)

================================================= FAILURES ==================================================
_______________________ TestGetCleaning.test_get_all_cleanings_returns_valid_response _______________________

self = <tests.test_cleanings.TestGetCleaning object at 0x7feb2db9b370>
app = <fastapi.applications.FastAPI object at 0x7feb2b01fd90>
client = <httpx.AsyncClient object at 0x7feb2b01e6e0>
test_cleaning = cleanings(name='fake cleaning name', price=Decimal('9.99'), id=3, description='fake cleaning description', cleaning_type='spot_clean')

    async def test_get_all_cleanings_returns_valid_response(
        self, app: FastAPI, client: AsyncClient, test_cleaning: cleanings
    ) -> None:
>       res = await client.get(app.url_path_for("cleanings:get-all-cleanings"))

tests/test_cleanings.py:125:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
/usr/local/lib/python3.10/site-packages/starlette/applications.py:108: in url_path_for
    return self.router.url_path_for(name, **path_params)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <fastapi.routing.APIRouter object at 0x7feb2b01d180>, name = 'cleanings:get-all-cleanings'
path_params = {}, route = <fastapi.routing.APIRoute object at 0x7feb2b045480>

    def url_path_for(self, name: str, **path_params: str) -> URLPath:
        for route in self.routes:
            try:
                return route.url_path_for(name, **path_params)
            except NoMatchFound:
                pass
>       raise NoMatchFound()
E       starlette.routing.NoMatchFound

/usr/local/lib/python3.10/site-packages/starlette/routing.py:590: NoMatchFound

(...)
```

> 현재 설정으로는, `test_cleaning`을 사용할 때 마다 새로운 레코드를 생성하고 있다. 만약 `unique` 설정이 있다면 에러를 발생시킬 것이다. 이 문제는 이후 다룰 것이므로, 지금은 신경쓰지 않아도 된다고 **jeffastor**는 밝힌다.

이제 테스트를 통과할 수 있도록, 라우터를 수정합니다. 정말 연습해보기 위해, 이후 내용은 제대로 읽지 않고 직접 코드를 작성해봤습니다.

```python
# backend/app/api/routes/cleanings.py
(...)

from typing import cast
from sqlmodel import select

(...)

@router.get(
    "", response_model=list[cleaning_public], name="cleanings:get-all-cleanings"
)
async def get_all_cleanings(
    session: AsyncSession = Depends(get_session),
) -> list[cleanings]:
    # 아직 sqlmodel의 async session은 type hint와 관련해서 제대로 지원하지 않습니다.
    # 제대로 작성된게 맞는지 확인해보고 싶다면,
    # session.sync_session에서 type hint 관련해서만 확인해보면 됩니다.
    #
    # sync_session = session.sync_session
    # table = sync_session.exec(select(cleanings))
    # rows = table.all()
    table = await session.exec(select(cleanings))  # type: ignore
    rows = cast(list[cleanings], table.all())
    return rows

@router.post(
    "",
    response_model=cleaning_public,
    name="cleanings:create-cleaning",
    status_code=HTTP_201_CREATED,
)

(...)
```

테스트 결과 통과했습니다.

> 원 작성자 **jeffator**의 경우, **TDD**에 대해 익숙해지지 위해 처음에는 `None`을 반환하고, 그 다음에는 빈 리스트 `[]`를 반환하고, 그 다음에는 가짜 레코드 `[{ "id": 1, "name": "fake cleaning", "price": 0}]`를 반환하고, 끝으로 세션에 연결해서 레코드를 반환합니다.

### `PUT` `api`...? `PATCH` `api`

다음과 같이 테스트 코드를 추가합니다.

```python
# backend/tests/test_cleanings.py
from contextlib import suppress
from decimal import Decimal, InvalidOperation

(...)

class TestPutCleaning:
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

        res = await client.put(
            app.url_path_for(
                "cleanings:update-cleaning-by-id-as-put",
                id=str(
                    test_cleaning.id,
                ),
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
            if attr not in attrs_to_change:
                assert getattr(test_cleaning, attr) == value

    @pytest.mark.parametrize(
        "id, payload, status_code",
        (
            (-1, {"name": "test"}, 422),
            (0, {"name": "test2"}, 422),
            (500, {"name": "test3"}, 404),
            (1, None, 422),
            (1, {"cleaning_type": "invalid cleaning type"}, 422),
            (1, {"cleaning_type": None}, 400),
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
        res = await client.put(
            app.url_path_for("cleanings:update-cleaning-by-id-as-put", id=str(id)),
            json=update_cleaning,
        )
        assert res.status_code == status_code
```

첫번째는 **PUT** api가 의도한대로 작동하는지 확인하고, 두번째는 의도한대로 에러를 반환하는지 확인하는 메소드입니다.
이제 위 테스트 코드를 통과할 수 있도록 **PUT** 메소드를 작성합니다.

> 다만 위 테스트 코드에서 이해가 되지 않는 부분이 있는데,

```python
# make sure that no other attributes' values have changed
for attr, value in updated_cleaning.dict().items():
    if attr not in attrs_to_change:
        assert getattr(test_cleaning, attr) == value
```

> 이다. 이건 **PATCH** 아닌가? 일단 따라가본다.

```python
# backend/app/api/routes/cleanings.py
(...)

from pydantic import ValidationError
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

(...)

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
    try:
        cleanings.from_orm(update_cleaning)
    except ValidationError as exc:
        raise HTTPException(
            status_code=HTTP_422_UNPROCESSABLE_ENTITY, detail=exc.json()
        )

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
            status_code=HTTP_422_UNPROCESSABLE_ENTITY, detail=exc.json()
        )

    for attr, value in update_dict.items():
        setattr(cleaning, attr, value)
            status_code=HTTP_422_UNPROCESSABLE_ENTITY, detail=exc.json()
        )

    session.add(cleaning)
    await session.flush()
    await session.commit()
    await session.refresh(cleaning)

    return cleaning
```

`update_cleaning`이 정상적인 `cleanings` 레코드를 생성할 수 있는지 확인하고, `id`에 해당하는 `cleanings` 레코드를 호출 한 다음, 해당 레코드의 값을 수정하고 커밋했다.

테스트 실행결과 이상하다고 생각했던 부분이 맞았다.
**`pytest`** 에 익숙하지 않아 처음에 알아보지 못한 문제인데,

```python
attrs_to_change = ['cleaning_type']
values = ['full_clean']
```

다음과 같이 변수가 정의된다..
따라서, 위 예제를 모두 **PUT**에서 **PATCH**로 변경 후 다시 진행한다.

```python
# backend/tests/test_cleanings.py
(...)

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
                id=str(
                    test_cleaning.id,
                ),
            ),
            json=update_cleaning,
        )
        assert res.status_code == HTTP_200_OK
        updated_cleaning = cleanings.parse_obj(res.json())
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
            if attr not in attrs_to_change:
                assert getattr(test_cleaning, attr) == value

    @pytest.mark.parametrize(
        "id, payload, status_code",
        (
            (-1, {"name": "test"}, 422),
            (0, {"name": "test2"}, 422),
            (500, {"name": "test3"}, 404),
            (1, None, 422),
            (1, {"cleaning_type": "invalid cleaning type"}, 422),
            (1, {"cleaning_type": None}, 400),
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
            status_code=HTTP_422_UNPROCESSABLE_ENTITY, detail=exc.json()
        )

    for attr, value in update_dict.items():
        setattr(cleaning, attr, value)

    session.add(cleaning)
    await session.flush()
    await session.commit()
    await session.refresh(cleaning)

    return cleaning
```

기존에 작성한 **PUT** api는 제거하지 않고 놔둔다. 마지막에 다시 사용할 것이다.

테스트 결과 모두 정상적으로 통과했다.

### `DELETE` `api`

이어서 **DELETE** 테스트 코드와 api를 생성한다.

```python
# backend/tests/test_cleanings.py
(...)

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
```

```python
# backend/app/api/routes/cleanings.py
(...)

@router.delete("/{id}/", response_model=int, name="cleanings:delete-cleaning-by-id")
async def delete_cleaning_by_id(
    id: int = Path(..., ge=1, title="The ID of the cleaning to delete."),
    session: AsyncSession = Depends(get_session),
) -> int:
    if (cleaning := await session.get(cleanings, id)) is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="No cleaning found with that id."
        )

    await session.delete(cleaning)
    await session.flush()
    await session.commit()

    return id
```

테스트도 정상적으로 통과한다.

```bash
tests/test_cleanings.py::TestDeleteCleaning::test_can_delete_cleaning_successfully PASSED             [ 86%]
tests/test_cleanings.py::TestDeleteCleaning::test_delete_cleaning_with_invalid_input_throws_error[500-404] PASSED [ 90%]
tests/test_cleanings.py::TestDeleteCleaning::test_delete_cleaning_with_invalid_input_throws_error[0-422] PASSED [ 93%]
tests/test_cleanings.py::TestDeleteCleaning::test_delete_cleaning_with_invalid_input_throws_error[-1-422] PASSED [ 96%]
tests/test_cleanings.py::TestDeleteCleaning::test_delete_cleaning_with_invalid_input_throws_error[None-422] PASSED [100%]
```

> **DELETE**와 같은 api는 `status_code=204`와 함께 `contents`가 없는 `response`를 반환하는게 맞다고 한다. 현재는 적용하지 않는다.

### `PUT` api

원 예제는 여기서 끝이지만, 추가로 **PUT** api에 대해 직접 작성해본다.

```python
# backend/tests/test_cleanings.py
(...)

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
            if attr not in attrs_to_change:
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

    session.add(cleaning)
    await session.flush()
    await session.commit()
    await session.refresh(cleaning)

    return cleaning
```

나름 여러 과정을 거쳤는데, **`sqlmodel`** 관련 문제를 알아보다 보니 너무 꼬였다. 과정은 생략..

다음은 마이그레이션 진행 후 유저 관련 설정을 추가하는 것 같다. 유저 관련해서는 **`fastapi-users`** 라는 좋은 라이브러리가 있으니, 원 예제와 같은 흐름이지만 **`fastapi-user`** 를 쓰는 쪽으로 진행할 예정.
