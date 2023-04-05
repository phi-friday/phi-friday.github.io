---
title: fastapi 튜토리얼 -2- sql 서버 연결
date: '2022-04-28T19:51:57.390+09:00'
tags:
  - fastapi
  - alembic
  - postgres
  - python
  - '@all'
page: fastapi 튜토리얼
summary: 'fastapi 사용법을 다시 공부할겸, 참고할만한 좋은 예제가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.'
---

**`fastapi`** 사용법을 다시 공부할겸, 참고할만한 좋은 [예제](https://www.jeffastor.com/blog/populating-cleaning-jobs-with-user-offers-in-fastapi)가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.
지난번처럼 어쩌다 그만둘 수도 있긴 하지만...

---

## `sql` 서버 연결을 위한 초기 설정

### `docker-compose` 설정

sql 서버는 **`postgres`** 를 사용하기로 한다. 따라서 필요한 파이썬 패키지를 추가로 설치하고, `docker-compose.yml` 파일을 수정한다.

```bash
❯ poetry add asyncpg sqlalchemy sqlmodel
❯ poetry export -f requirements.txt --output backend/requirements.txt --without-hashes
```

```yaml
# docker-compose.yml
# prettier-ignore
version: "3.8"
services:
  server:
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes:
      - ./backend/:/backend/
    command: uvicorn app.api.server:app --reload --workers 2 --host 0.0.0.0 --port 8000
    env_file:
      - ./backend/.env
    ports:
      - 8000:8000
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    volumes:
      - ./postgres_data:/var/lib/postgresql/data/
    env_file:
      - ./backend/.env
    ports:
      - 5432:5432
```

### `git` 구성

이유는 모르겠지만, **jeffastor**는 이전 글부터가 아닌, 이번 글 부터 **`git`** 으로 관리를 시작한다..

```bash
❯ touch .gitignore
```

```yaml
# .gitignore
# Byte-compiled files
__pycache__/
# Environment files
.env
```

```bash
❯ git init
❯ git add .
❯ git commit -m "Dockerized FastAPI app with postgres."
```

### 환경변수 설정

**`postgres`** 및 서버 전반적으로 사용할 환경변수를 설정한다.

```python
# backend/.env
SECRET_KEY=supersecret

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_SERVER=db
POSTGRES_PORT=5432
POSTGRES_DB=postgres
```

`SECRET_KEY`의 경우, 지금은 기본값으로 사용하지만 나중에 수정할거니 걱정하지 않아도 된다고 한다..

### `config.py` 설정

이제 서버에서 사용할 설정 파일을 생성한다.

```bash
❯ touch backend/app/core/config.py
```

```python
# backend/app/core/config.py
from sqlalchemy.engine.url import URL
from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

PROJECT_NAME = "jeffastor_tutor"
VERSION = "1.0.0"
API_PREFIX = "/api"

SECRET_KEY = config("SECRET_KEY", cast=Secret, default="CHANGEME")

POSTGRES_USER = config("POSTGRES_USER", cast=str)
POSTGRES_PASSWORD = config("POSTGRES_PASSWORD", cast=Secret)
POSTGRES_SERVER = config("POSTGRES_SERVER", cast=str, default="db")
POSTGRES_PORT = config("POSTGRES_PORT", cast=int, default=5432)
POSTGRES_DB = config("POSTGRES_DB", cast=str)

DATABASE_URL = config(
    "DATABASE_URL",
    cast=str,
    default=URL.create(
        drivername="postgresql+asyncpg",
        username=POSTGRES_USER,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_SERVER,
        port=POSTGRES_PORT,
        database=POSTGRES_DB,
    ).render_as_string(hide_password=False),
)
```

원 예제와 다르게, **`sqlmodel`** 을 사용할 예정이라 url을 다르게 설정했다.

> 설명에 따르면, 기본값이 없는 `config` 객체에 설정된 모든 값은 `.env`파일에서 값을 제공해야하고, 그렇지 않으면 에러가 발생한다고 한다.

## `sql` 서버 연결 스크립트 작성

이제 sql 서버와 연결하기 위한 모듈과 앱 시작/종료 이벤트와 관련한 작업 파일을 생성한다.

```bash
❯ mkdir backend/app/db
❯ touch backend/app/db/__init__.py backend/app/db/tasks.py backend/app/db/engine.py  backend/app/core/tasks.py
```

### 엔진 설정

```python
# backend/app/db/engine.py
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.pool import QueuePool

from ..core.config import DATABASE_URL

engine = create_async_engine(
    DATABASE_URL, pool_size=10, poolclass=QueuePool, pool_pre_ping=True
)
```

```python
# backend/app/db/tasks.py
import logging
from typing import cast

from fastapi import FastAPI
from sqlalchemy.ext.asyncio.engine import AsyncEngine

from .engine import engine

logger = logging.getLogger(__name__)


async def connect_to_db(app: FastAPI) -> None:
    try:
        async with engine.connect():
            logger.info(
                f"connected db: {engine.url.render_as_string(hide_password=True)}"
            )
        app.state._db = engine
    except Exception as e:
        logger.warning("--- DB CONNECTION ERROR ---")
        logger.warning(e)
        logger.warning("--- DB CONNECTION ERROR ---")


async def close_db_connection(app: FastAPI) -> None:
    engine = cast(AsyncEngine, app.state._db)
    try:
        await engine.dispose()
    except Exception as e:
        logger.warning("--- DB DISCONNECT ERROR ---")
        logger.warning(e)
        logger.warning("--- DB DISCONNECT ERROR ---")
```

```python
# backend/app/core/tasks.py
from typing import Any, Callable, Coroutine

from fastapi import FastAPI

from ..db.tasks import close_db_connection, connect_to_db


def create_start_app_handler(app: FastAPI) -> Callable[[], Coroutine[Any, Any, None]]:
    async def start_app() -> None:
        await connect_to_db(app)

    return start_app


def create_stop_app_handler(app: FastAPI) -> Callable[[], Coroutine[Any, Any, None]]:
    async def stop_app() -> None:
        await close_db_connection(app)

    return stop_app
```

`AsyncEngine` 인스턴스를 생성하고, 이 인스턴스를 이용해서 앱을 시작할 때와 종료할 때 실행할 두가지 핸들러를 정의했다.

> 기존 글에서는 엔진을 직접 만들기 보다 **`databases`** 를 이용하는데, 일단 이전에 사용한 적 있는 **`sqlmodel`** 로 진행한다.

이 핸들러는 sql 서버 연결이 정상적으로 이루어졌다면, 앱의 `state`에 `_db`라는 속성으로 `AsyncEngine` 인스턴스를 호출할 수 있게 한다.
그리고 종료할 때, 이 인스턴스와 연결된 모든 세션을 종료한다.
이제 이 핸들러를 적용한다.

```python
# backend/app/api/routes/server.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse

from ..core import config, tasks
from .routes import router as api_router


def get_application() -> FastAPI:
    app = FastAPI(
        title=config.PROJECT_NAME,
        version=config.VERSION,
        default_response_class=ORJSONResponse,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_event_handler("startup", tasks.create_start_app_handler(app))
    app.add_event_handler("shutdown", tasks.create_stop_app_handler(app))

    app.include_router(api_router, prefix=config.API_PREFIX)

    return app


app = get_application()
```

만약 **`docker`** 실행 시 정상적으로 작동한다면, sql 서버를 사용할 준비가 끝났다.

### `alembic`을 사용한 마이그레이션

이제 **`alembic`** 을 사용한 마이그레이션을 구성한다고 하는데.. 사용해본적이 한번도 없어서 생소한 라이브러리다. 그러니 일단 그대로 따라하는데 중점을 둔다.

```bash
❯ mkdir backend/app/db/migrations backend/app/db/repositories
❯ touch backend/app/db/migrations/script.py.mako backend/app/db/migrations/env.py backend/app/db/repositories/__init__.py backend/app/db/repositories/base.py backend/alembic.ini
```

> **`mako`** 확장자는 [Mako](https://www.makotemplates.org/) 템플릿이라고 한다.

```yaml
# backend/alembic.ini
# A generic, single database configuration.

[alembic]
# path to migration scripts
script_location = ./app/db/migrations

# template used to generate migration files
# file_template = %%(rev)s_%%(slug)s

# sys.path path, will be prepended to sys.path if present.
# defaults to the current working directory.
# prepend_sys_path = .

# timezone to use when rendering the date within the migration file
# as well as the filename.
# If specified, requires the python-dateutil library that can be
# installed by adding `alembic[tz]` to the pip requirements
# string value is passed to dateutil.tz.gettz()
# leave blank for localtime
# timezone =

# max length of characters to apply to the
# "slug" field
# truncate_slug_length = 40

# set to 'true' to run the environment during
# the 'revision' command, regardless of autogenerate
# revision_environment = false

# set to 'true' to allow .pyc and .pyo files without
# a source .py file to be detected as revisions in the
# versions/ directory
# sourceless = false

# version location specification; This defaults
# to test/versions.  When using multiple version
# directories, initial revisions must be specified with --version-path.
# The path separator used here should be the separator specified by "version_path_separator" below.
# version_locations = %(here)s/bar:%(here)s/bat:test/versions
version_locations = ./app/db/migrations/versions

# version path separator; As mentioned above, this is the character used to split
# version_locations. The default within new alembic.ini files is "os", which uses os.pathsep.
# If this key is omitted entirely, it falls back to the legacy behavior of splitting on spaces and/or commas.
# Valid values for version_path_separator are:
#
# version_path_separator = :
# version_path_separator = ;
# version_path_separator = space
# version_path_separator = os  # Use os.pathsep. Default configuration used for new projects.

# the output encoding used when revision files
# are written from script.py.mako
# output_encoding = utf-8

# sqlalchemy.url = driver://user:pass@localhost/dbname


[post_write_hooks]
# post_write_hooks defines scripts or Python functions that are run
# on newly generated revision scripts.  See the documentation for further
# detail and examples

# format using "black" - use the bash_scripts runner, against the "black" entrypoint
# hooks = black
# black.type = bash_scripts
# black.entrypoint = black
# black.options = -l 79 REVISION_SCRIPT_FILENAME

# Logging configuration
[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = bash

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = bash
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_bash]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
```

```python
# backend/app/db/migrations/script.py.mako
"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    ${upgrades if upgrades else "pass"}


def downgrade():
    ${downgrades if downgrades else "pass"}
```

각종 설정이 추가되는데, **`mako`** 템플릿 파일은 마이그레이션 스크립트를 생성하고, 그 과정을 로그로 남기는 것이라고 한다... 실제로 봐야 알 수 있을 듯.

이제 끝으로 `env.py`를 작성해야하는데, 이제보니 첫 과정에서 **`alembic`** 를 추가하지 않았기에, 그 과정을 함께한다.

```bash
❯ poetry add alembic
❯ poetry export -f requirements.txt --output backend/requirements.txt --without-hashes
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
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlalchemy.future.engine import Engine

sys.path.append(str(pathlib.Path(__file__).resolve().parents[3]))
from app.core.config import DATABASE_URL  # noqa

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
    # url = config.get_main_option("sqlalchemy.url")
    context.configure(
        # url=url,
        url=DATABASE_URL,
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
    config.set_main_option("sqlalchemy.url", DATABASE_URL)
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

이제 첫번째 마이그레이션을 **`docker`** 내부에서 실행하면 된다고 하는데...

```bash
root@bad23fe368a6:/backend# ls
Dockerfile  alembic.ini  app  requirements.txt  tests
root@bad23fe368a6:/backend# alembic revision -m "create account table"
  Generating
  /backend/app/db/migrations/versions/f721febf752b_create_account_table.py
  ...  done
```

마이그레이션이 정상적으로 진행됐다!
그리고 다음과 같은 파일을 확인할 수 있다.

```python
# backend/app/db/migrations/versions/f721febf752b_create_account_table.py
"""create account table

Revision ID: f721febf752b
Revises:
Create Date: 2022-04-27 17:21:25.945460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f721febf752b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
```

### 마이그레이션 테스트 모델 생성 및 확인

`env.py` 파일의

```python
# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = None
```

주석에 적혀있듯이, `autogenerate` 옵션을 사용하면 자동으로 모델 기반으로 생성해준다고 한다. 다만 이 기능이 완벽하지는 않은지, 원 작성자 **jeffastor**는 마이그레이션으로 작성된 스크립트에

```python
def create_cleanings_table() -> None:
    op.create_table(
        "cleanings",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.Text, nullable=False, index=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("cleaning_type", sa.Text, nullable=False, server_default="spot_clean"),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
    )
```

이라는 함수를 새로 작성해서 진행했다. **`sqlmodel`** 을 사용하는 만큼, 임시로 모델을 생성하고, 그 모델에서 자동으로 생성된 테이블에서 `Column`을 추출하는 방식으로 진행한다. 추후 모델을 정의할 파일 위치를 확인하면 옮기고 수정할 예정.

```bash
❯ mkdir backend/app/db/models
❯ touch backend/app/db/models/base.py backend/app/db/models/temp.py
```

```python
# touch backend/app/db/models/base.py
class base_model(SQLModel):
    @classmethod
    def get_table(cls) -> Table:
        if (table := getattr(cls, "__table__", None)) is None:
            raise ValueError("not table")
        return table
```

```python
# backend/app/db/models/temp.py
from pydantic import condecimal
from sqlmodel import Field

from .base import base_model


class cleanings(base_model, table=True):
    id: int | None = Field(None, primary_key=True)
    name: str = Field(index=True)
    description: str | None = None
    cleaning_type: str = Field(
        (_default_cleaning_type := "spot_clean"),
        sa_column_kwargs={"server_default": _default_cleaning_type},
    )
    price: condecimal(max_digits=10, decimal_places=2)  # type: ignore
```

이 튜토리얼은 청소 관련 주제로 작성되기에, 테이블 이름이 `cleanings`이다.

> - `id`: 각 항목에 대한 고유한 식별값.
> - `name`: 해당 항목에 대한 이름. `index=True` 옵션으로 인해 더 빠른 조회가 가능하다.
> - `description`: 해당 항목에 대한 설명이지만, `null`값(파이썬에서는 `None`값)이 가능하다.
> - `cleaning_type`: 해당 항목의 타입
> - `price`: 해당 항목의 가격

모델을 정의했으니, 이제 예제를 따라 함수를 정의한다.

```python
# backend/app/db/migrations/versions/f721febf752b_create_account_table.py
(...)

def create_cleanings_table() -> None:
    import sys
    from pathlib import Path
    sys.path.append(Path(__file__).resolve().parents[4].as_posix())
    from app.db.models.temp import cleanings

    table = cleanings.get_table()

    op.create_table(
        table.name,
        *table.columns
    )

def upgrade():
    create_cleanings_table()


def downgrade():
    op.drop_table('cleanings')
```

대부분의 경우 **`sqlmodel`** 의 `Field`의 변수로 가능하고, `server_default`에 대해서만 따로 `sa_column_kwargs`로 처리했다. 이렇게 하지 않아도 쿼리에 정상적으로 기본값이 적용되는 것으로 알고 있지만, 혹시 몰라서..

이제 마이그레이션을 진행한다.

```bash
root@9c425f594efa:/backend# alembic upgrade head
INFO  [alembic.env] Running migrations online
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> f721febf752b, create account table
```

테이블이 정상적으로 생성됐는지, `db` 컨테이너에서 **`psql`** 을 이용해 확인해본다.

```bash
bash-5.1# psql -h localhost -U postgres --dbname=postgres
psql (14.2)
Type "help" for help.

postgres=# select * from cleanings;
 id | name | description | cleaning_type | price
----+------+-------------+---------------+-------
(0 rows)
```

정상적으로 생성 된 것을 확인했다.
