---
title: fastapi 튜토리얼 -4- pytest 적용 및 실행
date: '2022-04-30T02:43:31.082+09:00'
tags:
  - fastapi
  - tdd
  - pytest
  - python
  - '@all'
page: fastapi 튜토리얼
summary: 'fastapi 사용법을 다시 공부할겸, 참고할만한 좋은 예제가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.'
---

**`fastapi`** 사용법을 다시 공부할겸, 참고할만한 좋은 [예제](https://www.jeffastor.com/blog/populating-cleaning-jobs-with-user-offers-in-fastapi)가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.
지난번처럼 어쩌다 그만둘 수도 있긴 하지만...

---

## `pytest`를 사용한 테스트 코드 작성 및 실행

테스트 코드를 작성하는게 도움이 된다 아니다로 많이 싸우지만, 적어도 **jeffastor** 자신은 이 과정 자체를 즐기고 있다고 밝히며, **`pytest`** 를 적용하는데 한 챕터를 할애한다.

### 패키지 설치

우선 테스트 코드 종속성 패키지부터 설치한다.

```bash
❯ poetry add --dev pytest pytest-asyncio httpx asgi-lifespan
```

> **`pytest-asyncio`** 는 비동기로 작성된 api를 테스트하는데 사용하고, **asgi-lifespan`** 은 앱을 실행하지 않고 테스트하기 위해 사용한다.

그리고 이제 **`pytest`** 가 **`docker`** 에서 실행될 수 있게, 개발용 종속성 패키지도 **`docker`** 이미지를 빌드과정에 추가한다.

```bash
❯ poetry export -f requirements.txt --output backend/requirements.txt --without-hashes --dev
❯ docker-compose build
```

### `pytest` 설정 파일 작성

이제 기본적인 테스트 코드를 작성한다.

```bash
❯ touch backend/tests/__init__.py backend/tests/conftest.py backend/tests/test_cleanings.py
```

```python
# backend/tests/conftest.py
import os
import warnings
from typing import AsyncIterator

import alembic
import pytest
from alembic.config import Config
from asgi_lifespan import LifespanManager
from fastapi import FastAPI
from httpx import AsyncClient
from sqlalchemy.ext.asyncio.engine import AsyncEngine
from sqlmodel.ext.asyncio.session import AsyncSession


# Apply migrations at beginning and end of testing session
@pytest.fixture(scope="session")
def apply_migrations():
    warnings.filterwarnings("ignore", category=DeprecationWarning)
    os.environ["TESTING"] = "1"
    config = Config("alembic.ini")

    alembic.command.upgrade(config, "head")  # type: ignore
    yield
    alembic.command.downgrade(config, "base")  # type: ignore


# Create a new application for testing
@pytest.fixture
def app(apply_migrations: None) -> FastAPI:
    from app.api.server import get_application

    return get_application()


# Grab a reference to our database when needed
@pytest.fixture
def engine(app: FastAPI) -> AsyncEngine:
    return app.state._db


@pytest.fixture
async def session(engine: AsyncEngine) -> AsyncSession:
    session = AsyncSession(engine, autoflush=False, autocommit=False)
    try:
        return session
    finally:
        await session.close()


# Make requests in our tests
@pytest.fixture
async def client(app: FastAPI) -> AsyncIterator[AsyncClient]:
    async with LifespanManager(app):
        async with AsyncClient(
            app=app,
            base_url="http://testserver",
            headers={"Content-Type": "application/json"},
        ) as client:
            yield client

```

[원문](https://www.jeffastor.com/blog/testing-fastapi-endpoints-with-docker-and-pytest)에 설명이 꽤 있으니 읽어보면 좋을듯.

### 테스트 데이터베이스 엔진 및 마이그레이션 설정

추가로 테스트 환경에서 정상적으로 작동하도록, 기존에 작성한 모듈을 수정한다.

```python
# backend/app/db/engine.py
from os import getenv

from sqlalchemy.engine.url import URL
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from sqlalchemy.pool import QueuePool

from ..core.config import DATABASE_URL


def is_test() -> bool:
    return (env_val := getenv("TESTING", None)) is not None and bool(env_val)


def get_test_url(url: URL) -> URL:
    if url.database is None:
        raise ValueError("database name is None")

    return url.set(database=f"{url.database}_test")


def get_test_engine(engine: AsyncEngine) -> AsyncEngine:
    if not is_test():
        return engine
    return create_engine_from_url(get_test_url(engine.url))


def create_engine_from_url(url: str | URL, **kwargs: Any) -> AsyncEngine:
    return create_async_engine(
        url, pool_size=10, poolclass=QueuePool, pool_pre_ping=True, **kwargs
    )


engine = create_engine_from_url(DATABASE_URL)
```

```python
# backend/app/db/tasks.py
(...)

from .engine import engine, get_test_engine

(...)

async def connect_to_db(app: FastAPI) -> None:
    _engine = get_test_engine(engine)

    try:
        async with _engine.connect():
            logger.info(
                f"connected db: {_engine.url.render_as_string(hide_password=True)}"
            )
        app.state._db = _engine
    except Exception as e:
        logger.warning("--- DB CONNECTION ERROR ---")
        logger.warning(e)
        logger.warning("--- DB CONNECTION ERROR ---")

(...)
```

```python
# backend/app/db/migrations/env.py
import asyncio
import logging
import pathlib
import sys
from logging.config import fileConfig
from typing import cast

from alembic import context
from sqlalchemy import engine_from_config, pool
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlalchemy.future.engine import Engine

sys.path.append(str(pathlib.Path(__file__).resolve().parents[3]))
from app.db.engine import engine, get_test_url, is_test

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)
logger = logging.getLogger("alembic.env")

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = None

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    if is_test():
        raise InvalidRequestError(
            "Running testing migrations offline currently not permitted."
        )

    # url = config.get_main_option("sqlalchemy.url")
    context.configure(
        # url=url,
        url=engine.url.render_as_string(hide_password=False),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    url = engine.url
    if is_test():
        from sqlalchemy import text

        url = get_test_url(url)
        async with engine.connect() as conn:
            conn = await conn.execution_options(isolation_level="AUTOCOMMIT")
            await conn.execute(text(f"drop database if exists {url.database}"))
            await conn.execute(text(f"create database {url.database}"))

    config.set_main_option("sqlalchemy.url", url.render_as_string(hide_password=False))
    connectable = AsyncEngine(
        cast(
            Engine,
            engine_from_config(
                config.get_section(config.config_ini_section),
                prefix="sqlalchemy.",
                poolclass=pool.NullPool,
                future=True,
            ),
        )
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    logger.info("Running migrations offline")
    run_migrations_offline()
else:
    logger.info("Running migrations online")
    asyncio.run(run_migrations_online())
```

이제 `TESTING`이라는 환경변수 값이 정상적으로 입력되어 있다면 테스트 DB를 사용한다. 또한, 마이그레이션시 테스트 DB가 이미 생성되어 있다면, 해당 DB를 지우고 새로 생성한다.

### 테스트 코드 작성

이제 이전에 작성한 라우터를 테스트 하는 테스트 코드를 작성한다.

```python
# backend/tests/test_cleanings.py
import pytest
from fastapi import FastAPI
from httpx import AsyncClient
from starlette.status import HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY


class TestCleaningsRoutes:
    @pytest.mark.asyncio
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.post(app.url_path_for("cleanings:create-cleaning"), json={})
        assert res.status_code != HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_invalid_input_raises_error(
        self, app: FastAPI, client: AsyncClient
    ) -> None:
        res = await client.post(app.url_path_for("cleanings:create-cleaning"), json={})
        assert res.status_code != HTTP_422_UNPROCESSABLE_ENTITY
```

이 테스트 코드는 우선 이전 챕터에서 작성한 `cleanings:create-cleaning` api가 존재하는지, 그리고 정상적으로 작동하는지 확인한다.

이전에 어떻게 사용되는지 몰랐던 `conftest.py`에서 `pytest.fixture`로 데코레이트된 함수 `app`, `client`가 여기서 사용된다. `TestCleaningsRoutes`의 각 메소드의 파라미터와 이름이 일치하는 함수를 호출하여, 리턴값을 파라미터로 사용한다.

`TestCleaningsRoutes.test_invalid_input_raises_error`에서 `json` 파라미터로 빈 딕셔너리를 제공했기에, 이전에 작성한 모델인 `cleaning_create`의 필수 값인 `name`과 `price`이 없어서 에러가 발생할 것으로 예상된다.

이제 실제로 테스트를 실행해본다.

```bash
root@3190a4d68f18:/backend# pytest -v
==================================================== test session starts =====================================================
platform linux -- Python 3.10.4, pytest-7.1.2, pluggy-1.0.0 -- /usr/local/bin/python
cachedir: .pytest_cache
rootdir: /backend
plugins: anyio-3.5.0, asyncio-0.18.3
asyncio: mode=legacy
collected 2 items

tests/test_cleanings.py::TestCleaningsRoutes::test_routes_exist PASSED                                                 [ 50%]
tests/test_cleanings.py::TestCleaningsRoutes::test_invalid_input_raises_error FAILED                                   [100%]
tests/test_cleanings.py::TestCleaningsRoutes::test_invalid_input_raises_error ERROR                                    [100%]

=========================================================== ERRORS ===========================================================
__________________________ ERROR at teardown of TestCleaningsRoutes.test_invalid_input_raises_error __________________________

    @pytest.fixture(scope="session")
    def apply_migrations():
        warnings.filterwarnings("ignore", category=DeprecationWarning)
        os.environ["TESTING"] = "1"
        config = Config("alembic.ini")

        alembic.command.upgrade(config, "head")  # type: ignore
        yield
>       alembic.command.downgrade(config, "base")  # type: ignore

tests/conftest.py:24:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

(...)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

>   ???
E   RuntimeError: Task <Task pending name='Task-20' coro=<run_migrations_online() running at /backend/./app/db/migrations/env.py:88> cb=[_run_until_complete_cb() at /usr/local/lib/python3.10/asyncio/base_events.py:184]> got Future <Future pending cb=[Protocol._on_waiter_completed()]> attached to a different loop

asyncpg/protocol/protocol.pyx:338: RuntimeError
-------------------------------------------------- Captured stderr teardown --------------------------------------------------
INFO  [alembic.env] Running migrations online
========================================================== FAILURES ==========================================================
____________________________________ TestCleaningsRoutes.test_invalid_input_raises_error _____________________________________

self = <tests.test_cleanings.TestCleaningsRoutes object at 0x7fc9e092b610>
app = <fastapi.applications.FastAPI object at 0x7fc9e0928eb0>, client = <httpx.AsyncClient object at 0x7fc9df873640>

    @pytest.mark.asyncio
    async def test_invalid_input_raises_error(
        self, app: FastAPI, client: AsyncClient
    ) -> None:
        res = await client.post(app.url_path_for("cleanings:create-cleaning"), json={})
>       assert res.status_code != HTTP_422_UNPROCESSABLE_ENTITY
E       assert 422 != 422
E        +  where 422 = <Response [422 Unprocessable Entity]>.status_code

tests/test_cleanings.py:18: AssertionError
====================================================== warnings summary ======================================================
../usr/local/lib/python3.10/site-packages/pytest_asyncio/plugin.py:191
  /usr/local/lib/python3.10/site-packages/pytest_asyncio/plugin.py:191: DeprecationWarning: The 'asyncio_mode' default value will change to 'strict' in future, please explicitly use 'asyncio_mode=strict' or 'asyncio_mode=auto' in pytest configuration file.
    config.issue_config_time_warning(LEGACY_MODE, stacklevel=2)

../usr/local/lib/python3.10/site-packages/pytest_asyncio/plugin.py:230
  /usr/local/lib/python3.10/site-packages/pytest_asyncio/plugin.py:230: DeprecationWarning: '@pytest.fixture' is applied to <fixture client, file=/backend/tests/conftest.py, line=42> in 'legacy' mode, please replace it with '@pytest_asyncio.fixture' as a preparation for switching to 'strict' mode (or use 'auto' mode to seamlessly handle all these fixtures as asyncio-driven).
    warnings.warn(

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
================================================== short test summary info ===================================================
FAILED tests/test_cleanings.py::TestCleaningsRoutes::test_invalid_input_raises_error - assert 422 != 422
ERROR tests/test_cleanings.py::TestCleaningsRoutes::test_invalid_input_raises_error - RuntimeError: Task <Task pending name...
====================================== 1 failed, 1 passed, 2 warnings, 1 error in 0.44s ======================================
sys:1: SAWarning: The garbage collector is trying to clean up connection <AdaptedConnection <asyncpg.connection.Connection object at 0x7fc9e082a6c0>>. This feature is unsupported on async dbapi, since no IO can be performed at this stage to reset the connection. Please close out all connections when they are no longer used, calling ``close()`` or using a context manager to manage their lifetime.
```

예상했던 첫번째와 달리, 두번째 에러가 당황스럽다. 확인해보니 비동기 엔진을 **`pytest`** 에서 사용할 때, 이벤트 루프 때문에 런타임 에러가 발생했다. **`pytest`** 에 익숙하지 않기에, 해결할 방법 또한 당장 알아내기가 어렵다. 급한대로 **`alembic`** 사용시 동기 엔진을 사용하기로 했다.

```bash
❯ poetry add --dev psycopg2-binary
❯ poetry export -f requirements.txt --output backend/requirements.txt --without-hashes --dev
❯ docker-compose build
```

```python
# backend/app/db/engine.py
from os import getenv
from typing import Any, Literal, overload

from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from sqlalchemy.future.engine import Engine
from sqlalchemy.pool import QueuePool

from ..core.config import DATABASE_URL


def is_test() -> bool:
    return (env_val := getenv("TESTING", None)) is not None and bool(env_val)


def get_test_url(url: URL) -> URL:
    if url.database is None:
        raise ValueError("database name is None")

    return url.set(database=f"{url.database}_test")


def get_engine_kwargs(**kwargs: Any) -> dict[str, Any]:
    return {
        "pool_size": 10,
        "poolclass": QueuePool,
        "pool_pre_ping": True,
        "future": True,
    } | kwargs


@overload
def get_test_engine(engine: AsyncEngine) -> AsyncEngine:
    ...


@overload
def get_test_engine(engine: AsyncEngine, is_sync: Literal[True] = ...) -> Engine:
    ...


@overload
def get_test_engine(engine: AsyncEngine, is_sync: Literal[False] = ...) -> AsyncEngine:
    ...


@overload
def get_test_engine(engine: AsyncEngine, is_sync: bool = ...) -> AsyncEngine | Engine:
    ...


def get_test_engine(engine: AsyncEngine, is_sync: bool = False) -> AsyncEngine | Engine:
    if is_test():
        engine = create_engine_from_url(
            get_test_url(engine.url), pool_pre_ping=pool_pre_ping
        )

    if is_sync:
        return convert_async_to_sync(engine)
    return engine


def convert_async_to_sync(engine: AsyncEngine, **kwargs: Any) -> Engine:
    return create_sync_engine_from_url(
        engine.url.set(drivername=engine.url.drivername.split("+")[0]), **kwargs
    )


def create_sync_engine_from_url(url: str | URL, **kwargs: Any) -> Engine:
    return create_engine(url, **get_engine_kwargs(**kwargs))


def create_engine_from_url(url: str | URL, **kwargs: Any) -> AsyncEngine:
    return create_async_engine(url, **get_engine_kwargs(**kwargs))


engine = create_engine_from_url(DATABASE_URL)
```

```python
# backend/app/db/migrations/env.py
import logging
import pathlib
import sys
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool
from sqlalchemy.exc import InvalidRequestError

sys.path.append(str(pathlib.Path(__file__).resolve().parents[3]))
from app.db.engine import engine, get_test_engine, is_test

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)
logger = logging.getLogger("alembic.env")

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = None

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    if is_test():
        raise InvalidRequestError(
            "Running testing migrations offline currently not permitted."
        )

    # url = config.get_main_option("sqlalchemy.url")
    context.configure(
        # url=url,
        url=engine.url.render_as_string(hide_password=False),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    _engine = get_test_engine(engine, is_sync=True)
    url = _engine.url

    if is_test():
        from sqlalchemy import text

        with _engine.connect() as conn:
            conn = conn.execution_options(isolation_level="AUTOCOMMIT")
            conn.execute(text(f"drop database if exists {url.database}"))
            conn.execute(text(f"create database {url.database}"))

    config.set_main_option("sqlalchemy.url", url.render_as_string(hide_password=False))
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        future=True,
    )

    with connectable.connect() as connection:
        do_run_migrations(connection)

    connectable.dispose()


if context.is_offline_mode():
    logger.info("Running migrations offline")
    run_migrations_offline()
else:
    logger.info("Running migrations online")
    run_migrations_online()
```

이제 다시 **`pytest`** 를 실행해보면

```bash
(...)

================================================== short test summary info ===================================================
FAILED tests/test_cleanings.py::TestCleaningsRoutes::test_invalid_input_raises_error - assert 422 != 422
================================================ 1 failed, 1 passed in 0.35s =================================================
```

정상적으로 2번째 메소드만 에러를 발생시킨다.
이제 이전에 작성한 **POST** api에 대한 테스트 코드를 작성해보자.

```python
# backend/app/models/cleaning.py
(...)

class cleaning_update(cleaning_base):
    cleaning_type: cleaning_type_enum | None = None

(...)
```

```python
# backend/tests/test_cleanings.py
import orjson
import pytest
from app.models.cleaning import cleaning_create
from fastapi import FastAPI
from httpx import AsyncClient
from starlette.status import (
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
```

`cleanings:create-cleaning` api가 의도한대로 데이터를 추가하고, 반환하는지 확인하는 코드가 추가됐다.

또한, 에러를 발생하는 `body`의 형태와, 그러한 `body`에 대해 기대하는 `status_code`를 지정해서 확인한다.

결과는 다음과 같이 정상적으로 나와야 한다.

```bash
==================================================== test session starts =====================================================
platform linux -- Python 3.10.4, pytest-7.1.2, pluggy-1.0.0 -- /usr/local/bin/python
cachedir: .pytest_cache
rootdir: /backend
plugins: anyio-3.5.0, asyncio-0.18.3
asyncio: mode=auto
collected 8 items

tests/test_cleanings.py::TestCleaningsRoutes::test_routes_exist PASSED                                                 [ 12%]
tests/test_cleanings.py::TestCleaningsRoutes::test_invalid_input_raises_error PASSED                                   [ 25%]
tests/test_cleanings.py::TestCreateCleaning::test_valid_input_creates_cleaning PASSED                                  [ 37%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[None-422] PASSED                          [ 50%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload1-422] PASSED              [ 62%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload2-422] PASSED              [ 75%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload3-422] PASSED              [ 87%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload4-422] PASSED              [100%]

===================================================== 8 passed in 0.54s ======================================================
```

## TDD 방법론에 따른 개발 연습

이제 **`pytest`** 를 사용하는 방식에 대해 어느정도 감이 잡히는 느낌이다.
**jeffastor**는 이러한 테스트 코드를 이용해서, **TDD**(테스트 주도 개발)을 권장하는 것 같다.
**TDD**는 다음의 3단계 프로세스를 따른다.

> 1. 실패를 확인할 수 있는 테스트 코드를 작성한다.
> 2. 테스트 코드를 통과할 수 있도록 코드를 작성한다.
> 3. 자신이 만족할 수준으로 코드를 수정, 테스트, 리팩토링, 모듈화 등을 실시한다.

### `GET` `api` 생성

위 프로세스를 따라서 **GET** api를 생성해보자.

```python
# backend/tests/test_cleanings.py
(...)

from app.models.cleaning import cleaning_create, cleanings
from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

(...)

class TestGetCleaning:
    async def test_get_cleaning_by_id(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.get(app.url_path_for("cleanings:get-cleaning-by-id", id="1"))
        assert res.status_code == HTTP_200_OK
        cleaning = cleanings(**res.json())
        assert cleaning.id == 1
```

작성한 테스트 코드의 `TestGetCleaning.test_get_cleaning_by_id` 메소드를 통과할 수 있도록, **GET** api를 작성해보자.

```python
# backend/app/api/routes/cleanings.py
from fastapi import APIRouter, Body, Depends, HTTPException, Path
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

(...)

@router.get(
    "/{id}", response_model=cleaning_public, name="cleanings:get-cleaning-by-id"
)
async def get_cleaning_by_id(
    id: int = Path(..., ge=1),
    session: AsyncSession = Depends(get_session),
) -> cleanings:
    if (cleaning := await session.get(cleanings, id)) is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="No cleaning found with that id."
        )
    return cleaning
```

확인해본 결과, 모두 잘 작동한다.
하지만 테스트 코드에 문제가 있다. `id=1`로 하드코딩된 상태이기 때문. 따라서 하드코딩을 제거하기 위한 새로운 `fixture`를 생성할 필요가 있다.

```python
# backend/tests/test_cleanings.py

(...)

from sqlmodel.ext.asyncio.session import AsyncSession

(...)

@pytest.fixture
async def test_cleaning(session: AsyncSession) -> cleanings:
    new_cleaning_create = cleaning_create.parse_obj(
        dict(
            name="fake cleaning name",
            description="fake cleaning description",
            price=9.99,
            cleaning_type="spot_clean",
        )
    )
    new_cleaning = cleanings.from_orm(new_cleaning_create)
    session.add(new_cleaning)
    await session.commit()
    await session.refresh(new_cleaning)

    return new_cleaning


class TestGetCleaning:
    async def test_get_cleaning_by_id(
        self, app: FastAPI, client: AsyncClient, test_cleaning: cleanings
    ) -> None:
        print(test_cleaning)
        res = await client.get(
            app.url_path_for("cleanings:get-cleaning-by-id", id=str(test_cleaning.id))
        )
        assert res.status_code == HTTP_200_OK
        cleaning = cleanings.parse_obj(res.json())
        assert cleaning == test_cleaning
```

`refresh` 메소드를 사용하여 정확한 id를 가지고 비교를 해서 에러가 없을거라 생각했는데,

```bash
================================================== short test summary info ===================================================
ERROR tests/test_cleanings.py::TestGetCleaning::test_get_cleaning_by_id - sqlalchemy.exc.OperationalError: (psycopg2.errors...
================================================= 9 passed, 1 error in 5.74s =================================================
sys:1: SAWarning: The garbage collector is trying to clean up connection <AdaptedConnection <asyncpg.connection.Connection object at 0x7fabadaffbc0>>. This feature is unsupported on async dbapi, since no IO can be performed at this stage to reset the connection. Please close out all connections when they are no longer used, calling ``close()`` or using a context manager to manage their lifetime.
```

**`pytest`** 에서 `fixture`를 생성할 때 연결한 `session`을 제대로 정리하지 않아서 에러가 발생했다. **`pytest`** 에서는 `NullPool`을 사용하고, **`pytest`** 에서 `session` 객체를 `fixture`로 사용하지 않도록 하자.

```python
from sqlalchemy.pool import AsyncAdaptedQueuePool, NullPool, QueuePool

(...)

def get_engine_kwargs(
    is_sync: bool, is_test: bool = False, **kwargs: Any
) -> dict[str, Any]:
    params: dict[str, Any] = {"pool_pre_ping": True, "future": True}

    if is_test:
        params["poolclass"] = NullPool
    else:
        params["pool_size"] = 10
        params["poolclass"] = QueuePool

    return params | kwargs


(...)

def get_test_engine(engine: AsyncEngine, is_sync: bool = False) -> AsyncEngine | Engine:
    if _is_test := is_test():
        engine = create_engine_from_url(get_test_url(engine.url), is_test=_is_test)

    if is_sync:
        return convert_async_to_sync(engine, is_test=_is_test)
    return engine

(...)
```

```python
# backend/tests/conftest.py
import os
import warnings
from typing import AsyncIterator

import alembic
import pytest
from alembic.config import Config
from asgi_lifespan import LifespanManager
from fastapi import FastAPI
from httpx import AsyncClient
from sqlalchemy.ext.asyncio.engine import AsyncEngine


# Apply migrations at beginning and end of testing session
@pytest.fixture(scope="session")
def apply_migrations():
    warnings.filterwarnings("ignore", category=DeprecationWarning)
    os.environ["TESTING"] = "1"
    config = Config("alembic.ini")

    alembic.command.upgrade(config, "head")  # type: ignore
    yield
    alembic.command.downgrade(config, "base")  # type: ignore


# Create a new application for testing
@pytest.fixture
def app(apply_migrations: None) -> FastAPI:
    from app.api.server import get_application

    return get_application()


# Grab a reference to our database when needed
@pytest.fixture
def engine(app: FastAPI) -> AsyncEngine:
    return app.state._db


# Make requests in our tests
@pytest.fixture
async def client(app: FastAPI) -> AsyncIterator[AsyncClient]:
    async with LifespanManager(app):
        async with AsyncClient(
            app=app,
            base_url="http://testserver",
            headers={"Content-Type": "application/json"},
        ) as client:
            yield client
```

```python
# backend/tests/test_cleanings.py
(...)

from sqlalchemy.ext.asyncio import AsyncEngine
from sqlmodel.ext.asyncio.session import AsyncSession

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
    new_cleaning = cleanings.from_orm(new_cleaning_create)
    async with AsyncSession(engine, autocommit=False) as session:
        session.add(new_cleaning)
        await session.commit()
        await session.refresh(new_cleaning)

    return new_cleaning

(...)
```

다시 **`pytest`** 를 실행했을 때, 정상적으로 잘 되는 것을 확인했다.

### `GET` `api`에 유효하지 않은 값에 대한 테스트 코드

이어서, 유효하지 않은 값에 대한 테스트 코드를 추가한다.
원 예제는 `id=-1`에 대해 404 에러 코드를 반환하지만, 이전에 **GET** api를 정의할 때 `id: int = Path(..., ge=1)` 으로 정의했기에 422에러가 반환된다. 따라서 그 부분만 수정했다.

```python
# backend/tests/test_cleanings.py
(...)

class TestGetCleaning:
    async def test_get_cleaning_by_id(
        self, app: FastAPI, client: AsyncClient, test_cleaning: cleanings
    ) -> None:
        print(test_cleaning)
        res = await client.get(
            app.url_path_for("cleanings:get-cleaning-by-id", id=str(test_cleaning.id))
        )
        assert res.status_code == HTTP_200_OK
        cleaning = cleanings.parse_obj(res.json())
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
```

테스트시, 별 문제 없이 통과한다.

```bash
root@5984264d864d:/backend# pytest -v --asyncio-mode=auto
==================================================== test session starts =====================================================
platform linux -- Python 3.10.4, pytest-7.1.2, pluggy-1.0.0 -- /usr/local/bin/python
cachedir: .pytest_cache
rootdir: /backend
plugins: anyio-3.5.0, asyncio-0.18.3
asyncio: mode=auto
collected 12 items

tests/test_cleanings.py::TestCleaningsRoutes::test_routes_exist PASSED                                                 [  8%]
tests/test_cleanings.py::TestCleaningsRoutes::test_invalid_input_raises_error PASSED                                   [ 16%]
tests/test_cleanings.py::TestCreateCleaning::test_valid_input_creates_cleaning PASSED                                  [ 25%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[None-422] PASSED                          [ 33%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload1-422] PASSED              [ 41%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload2-422] PASSED              [ 50%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload3-422] PASSED              [ 58%]
tests/test_cleanings.py::TestCreateCleaning::test_invalid_input_raises_error[invalid_payload4-422] PASSED              [ 66%]
tests/test_cleanings.py::TestGetCleaning::test_get_cleaning_by_id PASSED                                               [ 75%]
tests/test_cleanings.py::TestGetCleaning::test_wrong_id_returns_error[500-404] PASSED                                  [ 83%]
tests/test_cleanings.py::TestGetCleaning::test_wrong_id_returns_error[-1-422] PASSED                                   [ 91%]
tests/test_cleanings.py::TestGetCleaning::test_wrong_id_returns_error[None-422] PASSED                                 [100%]

===================================================== 12 passed in 0.86s =====================================================
```

다음 챕터는 CRUD api를 잘 생성하기 위한 작업으로 보인다.
