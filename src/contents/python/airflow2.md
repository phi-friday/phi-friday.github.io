---
title: airflow에서 간단하게 Task를 스킵하는 방법
tags:
  - python
  - airflow
description: TaskFlow API를 사용한다면, `skip_if`와 `run_if`를 사용하자
date: 2024-08-09T17:40:32.711+09:00
publish: True
---

## airflow 2.10의 신기능 `skip_if`, `run_if`

최근 `skip_if`와 `run_if`에 대한 pr을 요청했고, 여러 검토를 거쳐서 수락됐다.
직접 작성하기도 했고, 2.10 출시와 함께 곧 사용 가능할 예정이므로,
이와 관련하여 간략하게 글을 작성하기로 했다.

### `skip_if`란

`skip_if`는 조건을 만족할 때, 지정한 `Task`를 스킵하도록 하는 데코레이터다.
사용 예시는 다음과 같다.
```python
@task.skip_if(lambda context: context["task_instance"].task_id == "skip")
@task.bash()
def echo() -> str:
    return "echo 'run'"
```

`Context`를 사용할 수 있으므로,
현재 실행중인 `DagRun` 또는 `TaskInstance`등을 참조하여 조건문을 실행할 수 있다.

### `run_if`란

`run_if`는 `skip_if`와 동일한 방식으로 사용하며,
조건을 만족하는 경우에만 `Task`를 실행하도록 한다. 
사용 예시는 다음과 같다.
```python
@task.run_if(lambda context: context["task_instance"].task_id == "run")
@task.bash()
def echo() -> str:
    return "echo 'run'"
```

### TaskFlow API가 아닌 경우

`skip_if`와 `run_if`는 TaskFlow API에서만 사용 할 수 있다.
그렇지 않을 경우 에러가 발생하도록 작성했다.

이 기능은 신기능이긴 하지만, 특수한 기능이라기 보다는 단순한 문법 설탕에 가깝기 때문이다.

`Operator`의 `pre_execute`를 사용하여 구현하였으니,
TaskFlow API가 아니라면, `pre_execute`를 사용하여 직접 구현 할 수 있다.

## 마치며

`airflow`같은 거대한 프로젝트에 신기능을 추가하는 pr이 수락된 경험은 처음이다.
이번 pr을 통과시키며 느낀 점이지만, 거대한 커뮤니티를 가진 프로젝트인 만큼, 굉장히 탄탄한 프로세스를 가지고 있는 것 같다.

이렇게 유지관리가 잘 되고, 빠른 속도로 발전하는 것을 보면, 특별한 문제가 없다면 `airflow`를 계속 사용하지 않을까.