---
title: '나중에는 pandas를 대체할지도 모르는 polars'
tags:
  - python
  - rust
  - js
  - polars
  - dateframe
description: 'rust로 python의 한계를 넘어서자'
date: 2023-04-17T20:57:17.459+09:00 
publish: true
---

## `polars`란
`polars`는 `rust`로 만들어진 `dataframe` 라이브러리이다. 공식적으로 `rust`, `python`, `js`를 지원하며, 거의 동일한 형태의 api를 사용하여 데이터프레임을 조작할 수 있다.
::alert
주로 파이썬을 사용하는 만큼, 파이썬위주로 작성된 글입니다.
::

### `polars`의 특징
- 완전히 `rust`로 작성됨
- `Apache Arrow`의 `rust`구현체인 [`Arrow2`](https://github.com/jorgecarleitao/arrow2) 기반으로 구축됨
- 지연 계산을 지원함
- `rust`기반의 멀티쓰레드를 사용하여 `GIL`을 우회함

### 벤치마크
[이곳](https://h2oai.github.io/db-benchmark/)에서 확인 가능하다.

요약하자면, `pandas`대비 1/5 ~ 1/12의 시간을 소모하며, `pandas`나 `dask`, `modin`에서는 처리할 수 없는 양의 데이터(>=50GB, 1_000_000_000 레코드)를 처리할 수 있다.

### 사용 예시
[출처](https://github.com/pola-rs/polars/tree/main/py-polars)
```python
>>> import polars as pl
>>> df = pl.DataFrame(
...     {
...         "A": [1, 2, 3, 4, 5],
...         "fruits": ["banana", "banana", "apple", "apple", "banana"],
...         "B": [5, 4, 3, 2, 1],
...         "cars": ["beetle", "audi", "beetle", "beetle", "beetle"],
...     }
... )

# embarrassingly parallel execution & very expressive query language
>>> df.sort("fruits").select(
...     "fruits",
...     "cars",
...     pl.lit("fruits").alias("literal_string_fruits"),
...     pl.col("B").filter(pl.col("cars") == "beetle").sum(),
...     pl.col("A").filter(pl.col("B") > 2).sum().over("cars").alias("sum_A_by_cars"),
...     pl.col("A").sum().over("fruits").alias("sum_A_by_fruits"),
...     pl.col("A").reverse().over("fruits").alias("rev_A_by_fruits"),
...     # pl.col("A").sort_by("B").over("fruits").alias("sort_A_by_B_by_fruits"),
... )
shape: (5, 8)
┌──────────┬──────────┬──────────────┬─────┬─────────────┬─────────────┬─────────────┐
│ fruits   ┆ cars     ┆ literal_stri ┆ B   ┆ sum_A_by_ca ┆ sum_A_by_fr ┆ rev_A_by_fr │
│ ---      ┆ ---      ┆ ng_fruits    ┆ --- ┆ rs          ┆ uits        ┆ uits        │
│ str      ┆ str      ┆ ---          ┆ i64 ┆ ---         ┆ ---         ┆ ---         │
│          ┆          ┆ str          ┆     ┆ i64         ┆ i64         ┆ i64         │
╞══════════╪══════════╪══════════════╪═════╪═════════════╪═════════════╪═════════════╡
│ "apple"  ┆ "beetle" ┆ "fruits"     ┆ 11  ┆ 4           ┆ 7           ┆ 4           │
│ "apple"  ┆ "beetle" ┆ "fruits"     ┆ 11  ┆ 4           ┆ 7           ┆ 3           │
│ "banana" ┆ "beetle" ┆ "fruits"     ┆ 11  ┆ 4           ┆ 8           ┆ 5           │
│ "banana" ┆ "audi"   ┆ "fruits"     ┆ 11  ┆ 2           ┆ 8           ┆ 2           │
│ "banana" ┆ "beetle" ┆ "fruits"     ┆ 11  ┆ 4           ┆ 8           ┆ 1           │
└──────────┴──────────┴──────────────┴─────┴─────────────┴─────────────┴─────────────┘
```

좀 더 상세한 가이드는 [이곳](https://pola-rs.github.io/polars-book/user-guide/)에서 확인할 수 있다.

## 사용 후기
최근 `pandas`의 새로운 메이저 버전인 `2.0.0`이 정식으로 출시됐다.
여러 변경점이 있지만, 그 중 하나는 `pyarrow`를 정식 백엔드로 도입한 것이다.

`pyarrow`는 `numpy`대비 여러 이점이 있는데, 그 중 하나는 문자열과 `null`값에 대한 처리를 예로 들 수 있다.
`numpy`의 속도도 충분히 좋고 타입 힌트로 상대적으로 잘 돼있어 `pyarrow`로 바로 넘어갈 필요는 없다.
하지만 많은 라이브러리가 `pyarrow`를 함께 지원하고 있는 모습을 보면, 이제 `pyarrow`로 완전히 넘어갈 준비를 해도 좋다는 생각이 든다.

그런점에서 `polars`는 좋은 선택이다.
`pyarrow`기반으로 구축된 점과 더불어 지연 계산과 멀티쓰레드를 지원하고, 타입힌트 또한 우수하다.
지연계산과 멀티쓰레드(멀티프로세싱) 측면에서 `vaex`, `dask`, `modin`을 `pandas`의 대체품으로 제시할 수 있다.
하지만 이들 모두 타입힌트 측면에서 많이 부족하고, 성능상 `polars`가 훨씬 우수하기에, 굳이 `polars`말고 다른 라이브러리를 쓸 이유가 없어보인다.(차라리 그대로 `pandas`를 쓰는게 낫다.)

다만 `polars`가 아직 만들어진지 얼마 되지 않은 신생 프로젝트라 기존 api에서 변경될 사항이 많을 것이기에, 당장 넘어가기는 힘들어 보인다.
또한 문법이 간단하지만, 그럼에도 기존 `pandas`와는 다른 방식이기에 학습곡선을 고려해야한다.

빠르면 1년, 늦어도 3년이면 `pandas`를 잊게 할 라이브러리가 되지 않을까? 기대가 된다.