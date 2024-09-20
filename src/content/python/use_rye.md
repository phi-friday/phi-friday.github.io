---
title: 'poetry 대신 rye를 사용하자'
tags:
  - python
  - poetry
  - rye
  - uv
description: 생산성 향상을 위해
date: 2024-03-02T16:07:14.156+09:00
publish: true
---

::important
이제 `rye` 대신 [`uv`](https://github.com/astral-sh/uv)를 사용하세요.
자세한 내용은 [이곳](/@post/python/use_uv)을 확인하세요.
::

## `poetry`도 충분히 좋은 도구다. 하지만
지난 3년간 poetry는 내가 수행하고자 하는 바를 대부분 충족시켰다.
가상환경 관리를 포함한 의존성 관리 및, 파이썬 프로젝트 관리에 있어서 대부분 만족스러웠다.

하지만 몇가지 아쉬운 점이 있다.

### 표준 문법을 준수하지 않는다.
`poetry`는 [PEP621](https://peps.python.org/pep-0621/)로 정의된
[`pyproject.toml`](https://packaging.python.org/en/latest/specifications/pyproject-toml/#pyproject-toml-spec) 문법을 준수하지 않는다.

어떻게 보면 당연하다. `poetry`는 `PEP621`보다 먼저 탄생한 프로젝트다.

당시 문제되었던 의존성 문제를 해결하기 위한 자체 문법을 적용했고,
이제는 그 문법이 비표준이 된 것 뿐이다.
하지만 표준 문법이 정의된지 꽤 오랜 시간이 지났고,
표준 문법을 지원하는 다른 도구(`pdm`이나 `pip-tools`, `uv` 등)가 많이 탄생했다.

3년 전 부터 표준 준수에 대한 [요청](https://github.com/python-poetry/roadmap/issues/3)이 지속적으로 있었고,
이에 대한 [노력](https://github.com/python-poetry/poetry-core/pull/567)이 없었던 것은 아니지만,
아직 특별한 결실은 맺지 못했다.

기존에 `poetry`를 사용하던 많은 프로젝트가,
점진적으로 다른 도구로 이동하는 모습이 보이는 만큼, 빠른 대응이 필요한 순간이다.

### 외부 의존성을 필요로 한다.
`poetry`는 가상환경을 관리하기 위한 명령어를 제공한다.
하지만 `python` 버전에 대한 관리는 외부 도구를 사용해야만 한다.

대표적으로 `pyenv`가 있는데,
`pyenv`로 특정 버전의 `python`을 설치하고,
해당 `python`을 작업 영역의 인터프리터로 지정하고,
`poetry`에서 가상환경으로 사용할 인터프리터를 지정하면 된다..

쉽지만... 뭔가 뭔가다.

## all in one을 목표로 하는 `rye`

`rye`는 그러한 문제를 한번에 해결하고자 탄생한 프로젝트다.

프로젝트의 메인테이너인 [mitsuhiko](https://github.com/mitsuhiko)는
`flask`, `jinja`, `click` 등 이름만 들어도 바로 알 수 있는 프로젝트를 관리하고 있는,
검증된 개발자다.

::note
현재는 `ruff`를 개발한 [`astral-sh`](https://astral.sh/)의 지원을 받고 있다.
::

기존의 `venv`나 의존성 관리 등 파편화된 `python` 환경 관리 도구에 대해,
`rust`의 `cargo`와 같은 표준화된 도구가 필요하다고 느낀 것으로 보이는데,
이에 대한 [토론 결과](https://github.com/astral-sh/rye/discussions/6),
`rye`를 공개하고 유지하기로 결정했다.

### `python` 버전도 `rye`가 관리한다.

`pyproject.toml`에 정의된 `python` 버전을 확인하고,
조건에 맞는 `python` 버전을 사용한 가상환경을 생성하고 관리한다.

당연하게도, 사용자가 원한다면 특정한 버전을 지정하여 사용할 수도 있다.
```bash
rye pin 3.9.18
# pinned 3.9.18 in /Users/username/my-project
```

### 의존성 관리는 `pip-tools`나 `uv`를 사용한다.

다만 내부적으로 사용할 뿐, 대부분의 사용자는 이에 대해 신경쓸 필요가 없다.
`pip-tools`를 사용할지, `uv`를 사용할지 선택만 하면,
나머지는 알아서 설치하고 알아서 사용한다.

`pip-tools`는 안정적이지만 상대적으로 느리고,
`uv`는 아주 빠르지만 아직 안정화되지 않았다.

### 패키징은 `build`와 `twine`을 사용한다.

둘 다 [`PyPA`](https://www.pypa.io/en/latest/)에서 관리하는 표준 도구다.
`PyPA`에서 관리하는 다른 도구로는, `pip`와 `virtualenv`등이 있다.

당연하지만, 대부분의 사용자는 이에 대해 신경쓸 필요가 없다.

### `pipx`를 대신할 수도 있다.

`rye add`가 아닌 `rye install`로 패키지를 설치하면,
그 패키지는 독립된 환경에, 글로벌 환경에서 사용가능한 상태로 설치된다.

### 장점만 있는건 아니다.

한번에 모든 것을 관리하는 것은 좋지만, 장점만 있는 것은 아니다.
대표적으로 플랫폼 독립적인 lock 파일을 제공하지 않는다.

::note
`poetry`와 `pdm`은 플랫폼 독립적인 lock 파일을 제공한다.
::

이는 `pip-tools`와 `uv`를 사용하기 때문에 생긴 문제라고 볼 수도 있다.


## 써보면 확실히 좋다
직접 써보면 느끼겠지만,
기존 관리 툴에 비해서 표준을 준수하며, 편하고, 빠르다.

게다가 믿을 수 있는 메인테이너 주도 하에 관리되고 있다.

프로덕션 환경에 바로 적용하기는 어렵겠지만, 
나중에는 `poetry`를 대체할 단 하나의 표준이 될 수 있을수도.