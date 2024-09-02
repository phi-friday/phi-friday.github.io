---
title: poetry, rye 대신 uv를 사용하자
tags:
  - python
description: rye 개발진이 넘어가래요
date: 2024-09-02T15:32:59.499+09:00
publish: true
---

## 그동안 `rye`를 잘 써왔는데..
[이전 글]("python/use_rye.md")에서 `poetry` 대신 `rye`를 사용하자고 얘기했다.
그때 `rye`가 내부적으로 `uv`를 사용하여 빠른 속도를 제공한다고 소개했다.

그런데 `astral`이 `rye`를 관리하고 난 뒤로, `uv`가 `rye`를 잡아먹었다.


기존 관리자, `astral`, 그리고 `rye` 사용자 커뮤니티의 의견을 취합한 결과 나온 것으로,
기존 `rye` 사용자가 자연스럽게 `uv`로 넘어갈 수 있는 환경을 만드는 것이 목표라고 한다.

::alert{type=info}
이와 관련하여 `rye` 사용자의 의견을 계속하여 묻고 있으니 관심있으면 [확인](https://github.com/astral-sh/rye/discussions/1342)해보자.
::

`rye`를 쓰면서 굉장히 편했기에 굳이 넘어가야 싶기도 했지만,
어차피 지는 해, 결국에는 넘어가야 하니까 기존 프로젝트를 모두 `uv`로 변경했다.
하면서 느낀거지만, 대부분의 명령어나 설정값이 `rye`와 `uv`가 호환되므로,
`pyproject.toml`의 `tool.rye`를 `tool.uv`로 변경하면 대부분 그대로 사용할 수 있을 것이다.

하지만 일부 항목은 그렇지 않았는데, 특히 `tool.rye.script`,
변경하면서 아직 `uv`가 대체하지 못한 일부 명령어에 대한 얘기와, 이에 대한 해결 방법을 공유하고자 한다.


## 자체 해결 가능한 문제
### build
기존에 `rye build`로 간단하게 해결됐던 명령어가 다소 복잡해졌다.
```bash
uvx --from build pyproject-build --installer uv
```
복잡해보이지만 결국 하는 일은 `python -m build ...`이다.

::alert{type=info}
곧 지원될 [예정](https://github.com/astral-sh/uv/pull/6895)이다.
::

### publish
기존에 `rye publish`로 간단하게 해결됐던 명령어가 다소 복잡해졌다.
```bash
uvx twine upload dist/* --username __token__ --password <pypi token>
```
복잡해보이지만 결국 하는 일은 `python -m twine upload ...`이다.

### tool.rye.virtual
`pyproject.toml`의 `build-system`항목을 입력하지 않으면 된다.

### requirements-dev.lock
원래 불가능했지만, `uv export` 기능이 추가되면서 해결됐다.

## 외부 라이브러리로 해결 가능한 문제
### tool.rye.script
[`poethepoet`](https://poethepoet.natn.io/)을 사용하여 해결할 수 있다.
`poetry`와 통합하여 사용할 수 있는 라이브러리인데,
`poetry`가 아니어도 독립적으로 사용가능하며,
`rye`에서 정의하는 `script`에서 약간만 수정하면 된다.

## 해결 불가능한 문제
### version
[기능 요청](https://github.com/astral-sh/uv/issues/6298)은 됐지만 아직 결정된 것이 없다.

외부라이브러리를 확인해봤지만, `rye version`처럼 직관적이고 명확한 사용법을 제공하지는 않는다.

## 예상은 했지만 이렇게 빠를줄은
장기적으로 `uv`와 통합된 것이라는 것은 이미 알고 있었다.
하지만 그래도 1년은 지난 다음 진행될 것이라 생각했는데,
벌써 준비 작업이 끝난 것은 예상 밖이었다.

그래도 생각보다 부족한 기능이 별로 없다.
CI/CD 과정을 생각하면 오히려 더 편해진 점도 있다.

`pip`에서 `poetry`, `rye`를 거쳐 `uv`까지 왔다.
이제는 좀 정착할 수 있기를.