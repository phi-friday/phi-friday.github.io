---
title: '[코드를 깔끔하게] isort - 3'
tags:
  - python
  - formatter
  - isort
page: 코드를_깔끔하게
description: 생산성 향상을 위해
date: '2023-02-28'
publish: true
---

::alert{type=warning}
이제 `isort`를 따로 사용하지 않습니다.
[`ruff`](/@post/python/type_hint_4)만 사용해도 동일한 작동을 보장합니다.
::

## 1. 왜 `isort`를 사용해야 하는가

`black`만 쓰더라도 충분히 일관성 있는 코드 컨벤션을 지킬 수 있다. 하지만 `black`의 규칙에서 `import` 순서는 지정되어 있지 않다. 따라서 다음의 두 코드는 `black`을 사용해도 수정되지 않는다.

```python
import os
from pathlib import Path
from sys import modules
from subprocess import run
```
```python
from sys import modules
from subprocess import run
from pathlib import Path
import os
```
다소 극단적인 예지만, 저 두가지 경우가 혼재된 패키지가 없다고 단정지을 수 있을까.

이러한 문제를 해결하는데 `isort`를 많은 도움을 준다. 위 코드에 `isort`를 적용하면 다음과 같이 변환된다.
```python
import os
from pathlib import Path
from subprocess import run
from sys import modules
```
어떻게 순서를 정렬하더라도, 특별한 설정을 추가하지 않는 이상, `isort`는 위 순서를 보장한다.

## 2. `black`과 `isort`를 함께 사용하기
`black`과 `isort`는 둘 다 유용하지만 함께 쓰기 위해서는 약간의 파라미터를 추가해야한다. 특정한 규칙이 두 라이브러리 사이에서 상충되기 때문인데, 그 예는 다음과 같다.
```python
## black
from subprocess import (
    CalledProcessError,
    CompletedProcess,
    call,
    check_call,
    check_output,
    run,
)
```
```python
## isort
from subprocess import (CalledProcessError, CompletedProcess, call, check_call,
                        check_output, run)
```
`black`은 콤마가 있다면 줄바꿈을 시도하지만, `isort`는 설정된 폭을 유지한다면 줄바꿈을 시도하지 않는다.
이를 해결하는 방법은 간단한데, `isort`를 사용할 때, `--profile black` 를 추가하면 된다.

만약 `pyroject.toml`로 패키지를 관리한다면 다음과 같이 설정값을 추가하면 된다.
```js
[tool.isort]
profile = "black"
```

## 3. `isort`를 사용하는 방법

1. CLI로 직접 실행하기
```console
❯ poetry run isort {file or dir name}
```
2. IDE 확장 설치
ex) vscode
https://github.com/microsoft/vscode-isort

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
                "cmd": "poetry run isort ${file}"
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
          - id: isort
            name: isort (python)
            # args:
            #     - "--check-only"
      repo: https://github.com/pycqa/isort
      rev: 5.12.0
```
자동 수정이 아닌 확인만 하고 싶다면 주석을 해제하면 된다.