---
title: '[코드를 깔끔하게] ruff - 4'
tags:
  - python
  - linter
  - ruff
page: 코드를_깔끔하게
description: 생산성 향상을 위해
date: '2023-03-18'
publish: true
---

## 1. 왜 `ruff`를 사용해야 하는가

`black`과 `isort`만 쓰러다도 충분히 일관성 있는 코드 컨벤션을 지킬 수 있다. 하지만 그 코드가 바람직한 형태가 아닐 수 있다. 다음 코드는 `black`과 `isort`를 통과했지만, 그리 좋은 코드가 아니다.

::alert{type=warning}
이제 `isort`를 따로 사용하지 않습니다.
[`ruff`](https://docs.astral.sh/ruff/)만 사용해도 동일한 작동을 보장합니다.
::

```python
def test() -> None:
    a = True
    b = []

    if a == True:
        print("a is true")
    else:
        print("a is false")

    if len(b) > 0:
        print("a is boolean")

    if type(b) == list:
        print("b is list")

    try:
        raise ValueError("asd")
    except:
        print(1)


```
위 함수 `test`에는 많은 문제점이 있는데, 
- `True`, `False` 비교에 `==`를 사용한 것.
- 객체의 타입을 확인할 때 `isinstance`를 사용하지 않은 것.
- `try ~ except`를 사용할 때 에러 타입을 명시하지 않은 것.

등이 있다.

이러한 문제는 `black`이나 `isort`같은 포맷터로 해결할 수 없기에, 린터를 사용할 수 밖에 없다. 파이썬에서 많이 쓰이는 대표적인 린터는 `pylint`가 있다. `pylint`는 많은 문제점을 확인할 수 있는 유용한 도구지만, 아쉽게도 많이 느리다.

하지만 `ruff`는 빠르다. 생각보다 훨씬 빠르다. `FastAPI`의 메인테이너인 
Sebastián Ramírezs는 `ruff`가 정말로 실행된 것인지 의심되어 고의로 에러가 발생하는 코드를 삽입한 적이 있다고 밝힌 적이 있을 정도이다.

즉, 500개 이상의 규칙을 지원하며, `pyproject.toml`을 사용하여 간단하게 설정이 가능하고, 어떤 린트보다도 빠른 속도를 자랑하는 `ruff`를 사용하지 않을 이유가 없다.
> `ruff` 개발자의 주장에 따르면, `pylint`보다 100배 이상 빠르며, `Autoflake`보다 10배 이상 빠르다.

## 2. `ruff`와 `black`, `isort`를 함께 사용하기
별다른 설정이 필요하지 않다. 만약 `isort`에 설정을 추가했다면, `ruff`에서 구현한 `isort` 규칙과 맞추기 위해, 관련 설정값을 동일하게 추가하면 된다.

## 3. `ruff`를 사용하는 방법

1. CLI로 직접 실행하기
```console
❯ poetry run ruff {file or dir name} --fix
```

2. IDE 확장 설치
ex) vscode
https://github.com/charliermarsh/ruff-vscode

3. CLI로 실행하기를 자동화하기
https://github.com/emeraldwalk/vscode-runonsave
위 확장을 설치한 다음 저장시 실행할 커맨드를 다음과 같이 설정
```yaml
{
    "emeraldwalk.runonsave": {
        "commands": [
            {
                "match": "\\.pyi?$",
                "isAsync": false,
                "cmd": "poetry run ruff ${file} --fix"
            }
        ]
    }
}
```
4. 커밋시 자동으로 실행하기
`pre-commit`설치 후 다음과 같이 설정하기
```yaml
repos:
    - hooks:
          - id: ruff
            name: ruff
            args:
                - "--fix"
      repo: https://github.com/charliermarsh/ruff-pre-commit
      rev: v0.0.256
```
자동 수정이 아닌 확인만 하고 싶다면 `--fix`를 제거하면 된다.