---
title: 새로운 문법으로 Airflow DAG 생성하기
tags:
  - python
  - airflow
description: TaskFlow API를 사용하자
date: 2023-09-17T20:53:22.051+09:00
publish: True
---

## 아직도 이렇게 `DAG`을 생성해?
많은 `airflow` 관련 문서에서 다음과 같이 `DAG`을 생성한다.
```python
from __future__ import annotations

import json

import pendulum
from airflow import DAG
from airflow.models.param import Param
from airflow.operators.python import PythonOperator

with DAG(
    "tutorial_dag",
    schedule=None,
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    params={
        "tic": Param(1, type="integer"),
        "toc": Param(2, type="integer"),
    },
    catchup=False,
    tags=["example"],
) as dag:

    def extract(**kwargs) -> None:
        ti = kwargs["ti"]
        params = kwargs["params"]
        data_string = (
            f'{{"1001": {301.27 + params["tic"]}, "1002": 433.21, "1003": 502.22}}'
        )
        ti.xcom_push("order_data", data_string)

    def transform(**kwargs) -> None:
        ti = kwargs["ti"]
        extract_data_string = ti.xcom_pull(
            task_ids="extract",
            key="order_data",
        )
        order_data = json.loads(extract_data_string)

        total_order_value = 0
        for value in order_data.values():
            total_order_value += value

        total_value = {"total_order_value": total_order_value}
        total_value_json_string = json.dumps(total_value)
        ti.xcom_push("total_order_value", total_value_json_string)

    def load(**kwargs) -> None:
        ti = kwargs["ti"]
        params = kwargs["params"]
        total_value_string = ti.xcom_pull(
            task_ids="transform",
            key="total_order_value",
        )
        total_order_value = json.loads(total_value_string)
        total_order_value += params["toc"]

        print(total_order_value)

    extract_task = PythonOperator(
        task_id="extract",
        python_callable=extract,
    )
    transform_task = PythonOperator(
        task_id="transform",
        python_callable=transform,
    )
    load_task = PythonOperator(
        task_id="load",
        python_callable=load,
    )
    extract_task >> transform_task >> load_task
```

위 `DAG`이 하는 일은 단순하다.
1. `extract`: 데이터를 생성한다.
2. `transform`: `extract`에서 생성한 값을 변환한다.
3. `load`: `transform`에서 생성한 값을 표준 출력에 출력한다. 

아주 간단한 작업이지만, 중복된 코드로 인해 스크립트가 길어졌다.
작업이 늘어나고, 복잡도가 올라갈 수록 DAG은 점점 더 읽기 힘들어진다.

## 새로운 작성 방식 `TaskFlow`

앞서 작성한 `DAG`을, `TaskFlow` 형태로 작성하면 다음과 같다.

```python
from __future__ import annotations

import json
from typing import Any

import pendulum
from airflow.decorators import dag, task


@dag(
    schedule=None,
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    catchup=False,
    tags=["example"],
)
def tutorial_dag(tic: int = 1, toc: int = 2) -> None:
    @task.python()
    def extract(tic: int) -> Any:
        data_string = f'{{"1001": {301.27 + tic}, "1002": 433.21, "1003": 502.22}}'
        return json.loads(data_string)

    @task.python(multiple_outputs=True)
    def transform(order_data_dict: dict[str, float]) -> dict[str, float]:
        total_order_value = 0

        for value in order_data_dict.values():
            total_order_value += value

        return {"total_order_value": total_order_value}

    @task.python()
    def load(toc: int, total_order_value: float) -> None:
        total_order_value += toc
        print(f"Total order value is: {total_order_value:.2f}")

    order_data = extract(tic)
    order_summary = transform(order_data)
    load(toc, order_summary["total_order_value"])


tutorial_dag()
```

::alert{type=info}
`TaskFlow`는 `airflow>=2.0.0`부터 사용할 수 있다.
::
::alert{type=info}
`airflow>=2.4.0`부터 ```from airflow import DAG```이 없어도 dag을 인식한다.
::


훨씬 간결하고, 읽기 쉬워졌다.
`XComArg`를 사용하여 직접 변수를 사용할 수 있고, `params`를 따로 정의하지 않아도, 알아서 추론하여 사용할 수 있게 `DAG`을 생성한다.
::alert{type=info}
`params`로 직접 정의하지 않은 경우, 런타임중 `DagParam`으로 치환되며, 실제 `Task`가 실행될 때 값으로 치환된다.
::
::alert{type=warning}
간단하지 않은 스키마를 가진 경우에는 `json` 스키마로 기존 문법과 같이 사용한다.
::

## 모든 `Operator`를 바꿀 수는 없다
아쉽게도 모든 `Operator`에 대응하지는 않는다.

`PythonOperator`, `PythonVirtualenvOperator`, `ExternalPythonOperator`, `BranchPythonOperator`, `ShortCircuitOperator`, `PythonSensor`에 대응하는 데코레이터는 기본 제공하고 있지만, 그 외에는 `provider` 라이브러리에서 `decorator`모듈을 제공하고 있는 경우에 사용할 수 있다.
