---
title: fastapi 튜토리얼 -1- 초기 설정
date: '2022-04-27T23:30:14.239+09:00'
tags:
  - fastapi
  - python
  - '@all'
page: fastapi 튜토리얼
summary: 'fastapi 사용법을 다시 공부할겸, 참고할만한 좋은 예제가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.'
---

**`fastapi`** 사용법을 다시 공부할겸, 참고할만한 좋은 [예제](https://www.jeffastor.com/blog/populating-cleaning-jobs-with-user-offers-in-fastapi)가 있어서 이 시리즈를 약간의 변경을 주고 따라가보려 한다.
지난번처럼 어쩌다 그만둘 수도 있긴 하지만...

---

## 초기 설정

### 파이썬 설정

우선 다음 명령어로 가상 파이썬 환경부터 잡아줬다.

```bash
❯ pyenv virtualenv 3.10.4 jeffastor_tutor
❯ pyenv local jeffastor_tutor
```

실제로는 **`docker`** 로 실행하겠지만, **`vscode`** 를 사용하면서 **`pylance`** 의 자동완성과 타입 추론 기능을 사용하기 위해, 따로 만들었다.

그리고 필수 패키지와 개인적으로 선호하는 **`orjson`** 을 설치한다.

```bash
❯ poetry init
❯ poetry add fastapi "uvicorn[standard]" orjson
❯ poetry add --dev black isort
❯ cat pyproject.toml
[tool.poetry]
name = "jeffastor_tutor"
version = "0.1.0"
description = ""
authors = ["phi <phi.friday@gmail.com>"]

[tool.poetry.dependencies]
python = "^3.10"
fastapi = "^0.75.2"
uvicorn = {extras = ["standard"], version = "^0.17.6"}
orjson = "^3.6.8"

[tool.poetry.dev-dependencies]
black = "^22.3.0"
isort = "^5.10.1"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

> - fastapi - 백엔드 구축에 사용할 프레임워크
> - uvicorn - fastapi 앱을 사용하기 위한 asgi 서버
> - orjson - 좀 더 빠르고, 정확하고, 다양하게 파이썬 객체를 json으로 변환해주는 라이브러리

### `fastapi` 기본 구성 설정

**JeffAstor**가 제시한 디렉토리/모듈 구성은 대부분 그대로 가져갈 생각이다.

```bash
❯ mkdir backend backend/app backend/tests
❯ mkdir backend/app/api backend/app/core
❯ touch backend/app/api/__init__.py backend/app/api/server.py
```

```python
# backend/app/api/server.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse


def get_application() -> FastAPI:
    app = FastAPI(title='jeffastor_tutor', default_response_class=ORJSONResponse)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app

app = get_application()
```

`CORSMiddleware`에 대해서는 지금 신경쓸 필요 없으며, 나중에 관련해서 자세히 설명하겠다고 한다.

`default_response_class`는 **`fastapi`** 의 `response`를 직렬화 할 때 **`orjson`** 을 사용하기 위해 `ORJSONResponse`를 지정했다.

### `docker` 설정

이제 서버를 실행할 **`docker`** 를 설정한다.

```bash
❯ poetry export -f requirements.txt --output backend/requirements.txt --without-hashes
❯ touch docker-compose.yml backend/Dockerfile backend/.env
```

```Dockerfile
# backend/Dockerfile
FROM python:3.10-slim-bullseye
WORKDIR /backend
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
# install system dependencies
# RUN apt-get update \
#   && apt-get -y install netcat gcc postgresql \
#   && apt-get clean
# install python dependencies
# RUN pip install --upgrade pip
COPY ./requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt
COPY . /backend
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
```

sql 서버는 다른 컨테이너로 관리할 예정이기에 주석처리했다.

이제 **`docker`** 를 실행해보자.

```bash
❯ docker-compose up --build

```

브라우저에서 `localhost:8000`에 접속해보면

```yaml
{ 'detail': 'Not Found' }
```

아직 아무런 라우터를 추가하지 않았기에 나오는 기본값이 출력된다.

## 기본 라우터 생성

서버를 중단하지 않고, 이어서 라우터를 추가한다.

```bash
❯ mkdir backend/app/api/routes
❯ touch backend/app/api/routes/__init__.py
❯ touch backend/app/api/routes/cleanings.py
```

```python
# backend/app/api/routes/cleanings.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_all_cleanings() -> list[dict]:
    cleanings = [
        {"id": 1, "name": "My house", "cleaning_type": "full_clean", "price_per_hour": 29.99},
        {"id": 2, "name": "Someone else's house", "cleaning_type": "spot_clean", "price_per_hour": 19.99}
    ]
    return cleanings
```

```python
# backend/app/api/routes/__init__.py
from fastapi import APIRouter

from .cleanings import router as cleanings_router

router = APIRouter()

router.include_router(cleanings_router, prefix="/cleanings", tags=["cleanings"])
```

원문은 절대참조로 작성했지만, **`docker`** 실행 환경에서는 정상적으로 작동하지만, 편집 환경에서는 **`pylance`** 가 정상적으로 인식하지 못하므로 상대참조로 변경했다.

끝으로 `get_application`함수를 수정한다.

```python
# backend/app/api/server.py
(...)
from .routes import router as api_router


def get_application() -> FastAPI:
    app = FastAPI(title='jeffastor_tutor', default_response_class=ORJSONResponse)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix='/api')

    return app
(...)
```

**`uvicorn`** 의 `reload` 옵션을 켰기 때문에, 별다른 조작 없이 수정사항이 반영된 상태로 서버가 다시 실행된다. [http://localhost:8000/api/cleanings/](http://localhost:8000/api/cleanings/)에서 다음과 같은 결과를 확인할 수 있다.

```yaml
[
  {
    'id': 1,
    'name': 'My house',
    'cleaning_type': 'full_clean',
    'price_per_hour': 29.99,
  },
  {
    'id': 2,
    'name': "Someone else's house",
    'cleaning_type': 'spot_clean',
    'price_per_hour': 19.99,
  },
]
```

다음 챕터에서는 sql 서버를 연결하고, **`pytest`** 를 이용하여 테스트를 진행한다.

참고로, **`docker`** 로 실행된 서버는

```bash
❯ docker-compose down
```

으로 종료가 가능하다.
