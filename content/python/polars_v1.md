---
title: 'pandas를 대체하는 polars의 첫 major 업데이트'
tags:
  - python
  - rust
  - dateframe
description: 'api 변경점이 많아서 고칠게 많지만 그래도 좋다'
date: 2024-07-05T16:59:05.827+09:00
publish: true
---

## `polars>=1.0.0`이 출시되었습니다
그동안 `polars<=0.20.x`로 불안전하게 제공되던 `polars`가,
드디어 `1.0.0`을 [출시](https://github.com/pola-rs/polars/releases/tag/py-1.0.0)했습니다.

그동안 워낙 많은 api 변경점이 있기에,
바로 업데이트하기에는 다소 부담스럽긴 했지만,
그래도 이제는 이런 일이 적겠다는 생각으로 업데이트 했습니다.

`1.x.x`으로 업데이트 할 때 참고하면 좋은 마이그레이션 가이드는
[여기](https://docs.pola.rs/releases/upgrade/1/)서 확인할 수 있습니다.

## 업데이트 관련 기억나는 변경점

기존 코드를 수정하면서,
몇몇 기억나는 변경점을 작성했습니다.

### `.replace()` -> `.replace_strict()`

`.replace()` 메소드는 기존 타입을 유지합니다.
따라서 다음 코드는 에러가 발생합니다.
```python
pl.DataFrame(...).select(
    pl.col("a").replace({1: "q"}).alias("b")
)
```

이를 수정하기 위해서는 `return_dtype=pl.String()`을 추가하면 되지만,
이 변수 또한 지원 종료가 예정되어 있으며,
다음과 같이 `.replace_strict()` 메소드를 사용할 것을 권장하고 있습니다.
```python
pl.DataFrame(...).select(
    pl.col("a").replace_strict({1: "q"}, return_dtype=pl.String()).alias("b")
)
```

### `.pivot(..., colunms=...)` -> `.pivot(..., on=...)`
`.pivot()`에서 사용하던 `columns`변수가 `on`으로 변경되었습니다.
후술할 `.unpivot()`과 변수 명을 일치시키기 위한 것으로 보입니다.

다음 코드는 작동하지만, 지원 종료 경고를 발생시키며,
`mypy`나 `pyright`에서는 에러를 발생시킵니다.
```python
pl.DataFrame(...).pivot(
    columns=["column"], index=["index"], values=["value"], ...
)
```

다음과 같이 수정하여 사용합니다.
```python
pl.DataFrame(...).pivot(
    on=["column"], index=["index"], values=["value"], ...
)
```

### `.melt()` -> `.unpivot()`
`pandas`와 같은 형태로 지원했던 `.melt(...)`가 제거 될 예정입니다.
명명 규칙의 일관성 관련해서 토론이 있었던 것 같습니다.

다음 코드는 작동하지만 지원 종료 경고를 발생시킵니다.
```python
pl.DataFrame().melt(
    value_vars=["value"], id_vars=["index"], ...
)
```

다음과 같이 수정하여 사용합니다.
```python
pl.DataFrame().unpivot(
    on=["value"], index=["index"], ...
)
```

### `.is_not()` -> `.not_()`

`Expr` 객체의 `.is_not()` 메소드가 제거되었습니다.
꽤 예전부터 공지됐던 변경점인데, 이제서야 수정했습니다.
대신 `.not_()`을 사용하면 됩니다.

다음 코드는 런타임 중 에러가 발생합니다.
```python
pl.DataFrame(...).with_columns(
    pl.col("a").is_not().alias("b")
)
```

다음과 같이 수정하여 사용합니다.
```python
pl.DataFrame(...).with_columns(
    pl.col("a").not_().alias("b")
)
```

### `.list.get()` -> `.list.get(..., null_on_oob=True)`
이전에는 존재하지 않는 인덱스에 대해 null값을 반환했다면,
이제는 에러를 발생시킵니다.

이전과 동일하게 작동하려면 `null_on_oob=True`를 추가하면 됩니다.

다음 코드는 런타임 중 에러가 발생합니다.
```python
pl.DataFrame(
    {"a": [[], [1, 2]]}, schema_overrides={"a": pl.List(pl.Int64())}
).with_columns(pl.col("a").list.get(0).alias("b"))
```
다음과 같이 수정하여 사용합니다.
```python
pl.DataFrame(
    {"a": [[], [1, 2]]}, schema_overrides={"a": pl.List(pl.Int64())}
).with_columns(pl.col("a").list.get(0, null_on_oob=True).alias("b"))
```