---
title: 'FastAPI, sqlmodel로 간단한 crud api 생성'
date: '2021-11-25T22:13:02.346+09:00'
tags:
  - fastapi
  - python
  - sqlmodel
  - '@all'
page: 'FastAPI, sqlmodel로 간단한 crud api 생성'
summary: fastapi로 index만 구성하는 것 까지 진행
---

## 사용 라이브러리?프레임워크? 간단 소개

### [FastAPI](https://fastapi.tiangolo.com/ko/)

python type hint를 적극적으로 활용해서
`rest api`를 만들때 생산성이 아주 좋습니다.
`uvicorn`을 사용하기 때문에, `uvloop`로 성능도 준수해서 더욱 좋습니다.
공식 [document](https://fastapi.tiangolo.com/ko/tutorial/)가 아주 잘 작성돼서 혼자 공부하기도 좋습니다.

정말 좋으니까, `flask`를 써야할 일이 생긴다면 **꼭** `FastAPI`를 사용해보세요.

### [SQLModel](https://sqlmodel.tiangolo.com/)

`pydantic`과 `sqlalchemy`를 정교하게 섞어서 사용할 수 있도록 만든 라이브러리입니다.
`FastAPI`와 작성자가 같습니다.
`FastAPI`는 쿼리나 바디 등의 변수 타입 검증을 위해 `pydantic`을 사용하는데, `crud`용 테이블은 정작 `sqlalchemy`로 따로 작성해야해서 두번 작성하는 귀찮은 일이 많았습니다.
`SQLModel`을 사용하면 그런 일이 없으니 편합니다.
다만 아직 초기 개발 단계이고, 공식 [document](https://sqlmodel.tiangolo.com/tutorial/)도 그렇게 좋지는 않습니다.

## api 작성 전 초기작업

python 버전은 `3.9.9`를 사용합니다.
db는 `postgres`를 사용합니다.
간단하게 만들 생각이기 때문에, 많이 설치하지 않습니다.
`fastapi`, `uvicorn`, `email-validator`, `sqlmodel`, `asyncpg`
이렇게 5개만 설치하겠습니다.

`podman`를 간단하게나마 사용할 예정이기 때문에, `dockerfile`을 작성합니다.

> `podman`을 사용하지만 `dockerfile`을 사용하는 것 처럼, 그냥 `docker`를 사용하셔도 아무 문제가 없습니다.
>
> > 저는 zshrc에 `podman`과 `podman-compose`를 각각 `docker`와 `docker-compose`로 alias설정했습니다.

```
# dockerfile
FROM python:3.9-bullseye

WORKDIR /api

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
RUN ["chmod", "+x", "/wait-for-it.sh"]

COPY ./requirements.txt /requirements.txt
RUN pip install --no-cache-dir --upgrade -r /requirements.txt
```

처음에 추가한 `wait-for-it.sh`는 db가 정상적으로 생성되고, 연결이 가능한지 확인하기 위한 쉘스크립트입니다.

`wait-for-it.sh`를 다운로드 한 다음 실행권한을 주고,
로컬에 존재하는 `requirements.txt`를 가져와서 pip로 필요한 패키지를 설치하는 간단한 구성의 `dockerfile`입니다.

이어서 db와 api에서 사용할 환경변수를 `.env`파일로 작성합니다.

```bash
# .env
POSTGRES_USER=safeuser
POSTGRES_PASSWORD=s@fep@ssw0rd
POSTGRES_DB=restapi
POSTGRES_PORT=8081

RESTAPI_PORT=8000
RESTAPI_OUT_PORT=8000
RESTAPI_DEBUG=1
```

순서대로, sql에서 사용할 아이디, 비밀번호, database이름, 포트,
그리고 FastAPI가 실행될 포트, 도커 외부에서 api에 접속할 포트, 디버그 여부 플래그입니다.

그리고 `docker-compose.yml`을 작성합니다.

```yml
# docker-compose.yml
version: '3'

services:
  db:
    image: postgres:latest
    env_file:
      - .env
    command: -p ${POSTGRES_PORT}
    volumes:
      - ./db:/var/lib/postgresql/data

  api:
    build:
      context: .
      dockerfile: ./dockerfile
    image: restapi:latest
    env_file:
      - .env
    command:
      - bash
      - -c
      - |
        /wait-for-it.sh db:${POSTGRES_PORT} -t 10
        python main.py
    ports:
      - '${RESTAPI_OUT_PORT}:${RESTAPI_PORT}'
    depends_on:
      - db
    volumes:
      - ./api:/api
      - /etc/localtime:/etc/localtime:ro
```

컨테이너가 종료되더라도 db가 유지될 수 있게 로컬경로의 db폴더를 마운트 할 예정입니다. `docker volume`을 사용해도 되지만, 지금은 별로 중요한게 아닙니다.

빌드되는 이미지 명은 별 생각없이 restapi라고 했습니다.
api 컨테이너는 우선 db가 연결 가능한 상태인지 확인하고, 최대 10초간 대기합니다.
연결이 가능하거나, 10초가 지나면, 현재 폴더의 `main.py`를 실행하도록 했습니다.

volumes에 작성된 것 처럼, 로컬 경로의 api폴더를 컨테이너 내부의 /api에 마운트했습니다.
당연하게도, 로컬 경로의 api폴더에 FastAPI로 작성할 모든 결과물이 들어가게 됩니다.

끝으로 실제로 실행할 `main.py`를 작성합니다.

```python
# api/main.py
from os import environ

import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def index():
    return {"hello": "world"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(environ["RESTAPI_PORT"]),
        reload=bool(int(environ["RESTAPI_DEBUG"])),
    )
```

db를 생성하긴 하지만, 당장은 db와 관련된 작업을 하지 않겠습니다. 다음 글에서 이어서 하는걸로..

정상적으로 따라오셨다면, 다음과 같은 구조입니다.

```
.
├── .env
├── api
│   └── main.py
├── db
├── docker-compose.yml
├── dockerfile
└── requirements.txt
```

이제 실행해봅시다.
`docker-compose up`으로 실행이 가능합니다.

이제 http://localhost:8000 에 접속하면

```python
{"hello":"world"}
```

을 확인할 수 있습니다.

작성된 api를 확인하기 위해
http://localhost:8000/docs 에 접속하면
다음과 같이 확인할 수 있습니다.
![](/images/dbba2083-54d9-4406-89d2-dfc5b61cf360-docs.png)

다음에는 `SQLModel`을 사용해서 모델을 만들고,
그 모델을 이용한 간단한 형태의 `crud` api를 생성해보겠습니다.
