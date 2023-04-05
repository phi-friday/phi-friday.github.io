---
title: fastapi 튜토리얼 -8- FastAPI Users를 사용한 유저 api 생성 3
date: '2022-05-06T06:26:51.932+09:00'
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

## 토큰 발행 방식 수정

### 기존 코드 수정

이전에 토큰 발행 api를 직접 작성했는데, 좀 더 알아보니, **`fastapi-users`** 에서 제공하는 `login` api와 동일하다. 따라서 토큰 발행과 관련해서 약간의 수정을 진행한다.

> #### backend/app/core/config.py
>
> 토큰 경로 수정

```python
TOKEN_PREFIX = API_PREFIX + "/token/login"
```

---

`AUTH_BACKEND_NAME` 추가

```python
AUTH_BACKEND_NAME = config(
    "AUTH_BACKEND_NAME", cast=str, default=f"{JWT_TOKEN_PREFIX}-jwt"
)
```

> #### backend/app/services/authentication.py
>
> 토큰 모델 제거

```python
# class token_model(BaseModel):
#     access_token: str
#     token_type: str = config.JWT_TOKEN_PREFIX
>
#     @classmethod
#     def from_token(cls, token: str) -> "token_model":
#         return cls(access_token=toke
```

---

`AUTH_BACKEND_NAME` 참조 추가

```python
def create_backend() -> list[AuthenticationBackend[user.user_create, user.user]]:
    transport = create_transport()
    return [
        AuthenticationBackend(
            name=config.AUTH_BACKEND_NAME,
            transport=transport,
            get_strategy=create_strategy,
        )
    ]
```

> #### backend/app/api/routes/token.py
>
> **`fastapi-users`** 라우터 추가
> 편의상 당분간 `requires_verification=False`로 한다.

```python
# name: auth:{backend.name}.login
router.include_router(
    fastapi_user.users.get_auth_router(
        fastapi_user.backends[0], requires_verification=False
    )
)
```

---

기존 api 제거

```python
# @router.post("", name="users:create-token")
# async def create_token(
#     credentials: OAuth2PasswordRequestForm = Depends(),
#     user_manager: user_manager_type = fastapi_user.user_manager_depends,
#     strategy: strategy_type = fastapi_user.strategy_depends(),
# ) -> token_model:
#     get_user = await user_manager.authenticate(credentials)
#     if get_user is None or not get_user.is_active:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail=ErrorCode.LOGIN_BAD_CREDENTIALS,
#         )
#     if not get_user.is_verified:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail=ErrorCode.LOGIN_USER_NOT_VERIFIED,
#         )
>
#     token = await strategy.write_token(get_user)
#     return token_model.from_token(token)
```

> #### backend/tests/test_users.py
>
> `api_name` 수정

```python
class TestAuthTokens:
    api_name = f"auth:{config.AUTH_BACKEND_NAME}.login"
```

### **`fastapi-users`** 가 제공하는 `api`의 검증 방식

> 현재 사용중인 **`fastapi-users`** 의 버전은 `9.3.1`이라는 것에 유의한다.

우선 이메일을 기준으로 유저를 조회 한 다음, 비밀번호를 검증한다.
그리고 해당 유저 레코드의 `is_active`가 `True`인지 확인하고, `requires_verification` 값에 따라 `is_verified`가 `True`인지 확인한다.

유저가 존재하지 않거나, `is_active=False`이거나, `requires_verification=True`이면서 `is_verified=False`인 경우 에러(400)을 반환한다.

## `TDD` 방법론에 따른 로그인 `api`

### 일반적인 로그인 방식

| 사용자                             | 프론트엔드                                    | 백엔드                         |
| ---------------------------------- | --------------------------------------------- | ------------------------------ |
| `name`, `password` 입력            |                                               |                                |
|                                    | `name`, `password` 백엔드로 전송              |                                |
|                                    |                                               | `name`, `password` 유효성 검사 |
|                                    |                                               | 토큰 생성                      |
|                                    |                                               | 토큰 프론트엔드로 전송         |
|                                    | 토큰 임시 저장                                |
| 로그인이 필요한 특정 페이지로 이동 |                                               |                                |
|                                    | 저장된 토큰(Authorization 헤더) 백엔드로 전송 |                                |
|                                    |                                               | 토큰 유효성 검사               |
|                                    |                                               | 컨텐츠 전송                    |
| ...                                | ...                                           | ...                            |

### 로그인 테스트 코드 작성

```python
# backend/tests/test_users.py
from app.services.authentication import UserManager
from fastapi_users.db import SQLAlchemyUserDatabase
(...)

class TestUserLogin:
    api_name = "users:login-email-and-password"

    async def test_user_can_login_successfully_and_receives_valid_token(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_user: user.user_model,
        strategy: JWTStrategy,
        engine: AsyncEngine,
    ) -> None:
        client.headers["content-type"] = "application/x-www-form-urlencoded"
        login_data = {"email": test_user.email, "password": "heatcavslakers@1"}
        res = await client.post(app.url_path_for(self.api_name), data=login_data)
        assert res.status_code == status.HTTP_200_OK
        # check that token exists in response and has user encoded within it
        token = res.json().get("access_token")

        async with AsyncSession(engine, autocommit=False) as session:
            db = SQLAlchemyUserDatabase(user.user, session, user.user_model)  # type: ignore
            manager = UserManager(db)

            read_user: user.user_model | None = await strategy.read_token(
                token, manager
            )
        assert read_user is not None
        assert read_user.name == test_user.name
        assert read_user.email == test_user.email
        # check that token is proper type
        assert "token_type" in res.json()
        assert res.json().get("token_type") == "bearer"

    @pytest.mark.parametrize(
        "credential, wrong_value, status_code",
        (
            ("email", "wrong@email.com", 401),
            ("email", None, 401),
            ("email", "notemail", 401),
            ("password", "wrongpassword@1", 401),
            ("password", None, 401),
        ),
    )
    async def test_user_with_wrong_creds_doesnt_receive_token(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_user: user.user_model,
        credential: str,
        wrong_value: str,
        status_code: int,
    ) -> None:
        client.headers["content-type"] = "application/x-www-form-urlencoded"
        user_data = test_user.dict()
        user_data["password"] = "heatcavslakers@1"
        user_data[credential] = wrong_value
        login_data = {
            "username": user_data["email"],
            "password": user_data["password"],  # insert password from parameters
        }
        res = await client.post(app.url_path_for(self.api_name), data=login_data)
        assert res.status_code == status_code
        assert "access_token" not in res.json()
```

사용자가 `email`과 `password`를 올바르게 보냈을 때 얻게 되는 토큰으로 부터, **`fastapi_users`** 를 이용해서 불러온 유저 레코드가 `test_user`와 일치하는지 확인한다.

여기서 로그인의 경우 `json` 파라미터가 아닌 `data` 파라미터로 데이터를 전송하고, `content-type` 헤더로 `application/x-www-form-urlencoded`를 가지고 있어야 한다는 점에 유의한다.

### 로그인 `api` 작성

토큰 발행 api가 로그인 api이므로, 따로 작성할 필요가 없다.
만약 400에러가 아닌 401에러를 반환하고 싶다면, 이전 챕터처럼 직접 작성하면 된다.

### 인증 `Depends` 생성

이제 토큰을 발급받은 경우에만 사용이 가능한 api에 대한 인증 절차를 정의해야한다. **`fastapi`** 에서는 이러한 기능은 `Depends`를 사용해서 생성할 수 있다. 또한, **`fastapi-users`** 에서 관련된 함수를 이미 만들어서 제공하고 있다. 우선 테스트 코드부터 작성한다.

```python
# backend/tests/conftest.py
from app.services.authentication import create_strategy
from sqlmodel import select

(...)

@pytest.fixture
async def authorized_client(
    client: AsyncClient, test_user: user.user_model
) -> AsyncClient:
    from app.core import config

    strategy = create_strategy()
    access_token = await strategy.write_token(user=test_user)  # type: ignore

    client.headers["Authorization"] = f"{config.JWT_TOKEN_PREFIX} {access_token}"
    return client
```

방금 작성한 `authorized_client`를 이용해서 인증이 필요한 라우터에 접근이 가능하다.

> 쓰다보니 `user.user`와 `user.user_model`이 따로 있는게 너무 불편한데, 언제 한번 합치는 시도를 해봐야 할듯. `AsyncSession` 관련해서도 언제한번 해결을 해야할 것 같고..

```python
# backend/tests/test_users.py
(...)

class TestUserMe:
    api_name = "users:get-current-user"

    async def test_authenticated_user_can_retrieve_own_data(
        self,
        app: FastAPI,
        authorized_client: AsyncClient,
        test_user: user.user_model,
    ) -> None:
        res = await authorized_client.get(app.url_path_for(self.api_name))
        assert res.status_code == status.HTTP_200_OK
        res_dict: dict = res.json()
        res_dict["hashed_password"] = "testpassword@1"
        read_user = user.user_model.validate(res_dict)
        assert read_user.email == test_user.email
        assert read_user.name == test_user.name
        assert read_user.id == test_user.id

    async def test_user_cannot_access_own_data_if_not_authenticated(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_user: user.user_model,
    ) -> None:
        res = await client.get(app.url_path_for("users:get-current-user"))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    @pytest.mark.parametrize(
        "jwt_prefix",
        (
            ("",),
            ("value",),
            ("Token",),
            ("JWT",),
            ("Swearer",),
        ),
    )
    async def test_user_cannot_access_own_data_with_incorrect_jwt_prefix(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_user: user.user_model,
        strategy: JWTStrategy,
        jwt_prefix: str,
    ) -> None:
        token = await strategy.write_token(test_user)
        res = await client.get(
            app.url_path_for("users:get-current-user"),
            headers={"Authorization": f"{jwt_prefix} {token}"},
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED
```

위 테스트를 통과할 수 있는 api를 작성한다.

```python
from fastapi import Depends

(...)

get_current_user = fastapi_user.users.current_user(
    optional=False, active=True, verified=False, superuser=False
)

(...)

@router.get("/me", response_model=user.user_read, name="users:get-current-user")
async def get_currently_authenticated_user(
    current_user: user.user = Depends(get_current_user),
) -> user.user_model:
    return current_user.to_model()
```

`optional=False, active=True, verified=False, superuser=False`으로 값을 지정했기에, 해당 함수는 일치하는 유저가 없거나 `is_active` 값이 `False`이면 에러(401)을 반환한다.

테스트 통과도 잘되고, **`swagger`** 에서도 확인이 간단한 api가 생성됐다. 유저 인증 관련해서는 사실상 이게 끝이다. 코드를 조금 더 정리할 수는 있지만 핵심은 비슷할 것이다.

다음 챕터에서는 유저 프로필을 설정한다.
그 전에 앞에서 언급한 유저 모델과 관련된 수정을 진행할 수도 있다.
