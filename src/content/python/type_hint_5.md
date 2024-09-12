---
title: '[코드를 깔끔하게] ruff - 5'
tags:
  - python
  - linter
  - formatter
  - ruff
page: 코드를_깔끔하게
description: 생산성 향상을 위해
date: 2023-10-29T18:53:59.652+09:00
publish: true
---

## 포맷터가 추가된 `ruff`

`ruff`의 버전이 올라가면서, `format`이라는 새로운 기능이 추가됐다.
[의도적인 몇가지 차이점](https://docs.astral.sh/ruff/formatter/black/)을 제외하고, `black`과 99% 동일한 결과물을 보장한다.
::warning
[0.1.2](https://github.com/astral-sh/ruff/releases/tag/v0.1.2)부터 사용 가능하다.
::

## 프로덕션에서 사용해도 될까

`ruff formatter`는 아직 베타버전이다.
하지만 [개발진의 주장](https://astral.sh/blog/the-ruff-formatter#production-ready)에 따르면,
`Dagster`를 비롯하여 많은 알파버전 사용자가 프로덕션 환경에서 사용했고, 따라서 프로덕션에서 사용해도 문제가 없다고 한다.

::note
개인적으로 관심있게 지켜보는
[`fastapi`](https://github.com/tiangolo/fastapi/commit/2e14c69c311d89dde86e8c033df87773a3a50121)와
[`polars`](https://github.com/pola-rs/polars/pull/11996)에서
`ruff formatter`를 적용한 것을 확인했다.
::

## 아쉽게도 아직 프리뷰는 지원하지 않는다
`pyproject.toml`에서 프리뷰 옵션을 `true`로 지정할 수는 있지만, 아직 적용되지는 않는다.
다만 주요 목표에 프리뷰 옵션 적용이 들어있는 만큼, 빠른 시일 내에 추가 될 것으로 보인다.