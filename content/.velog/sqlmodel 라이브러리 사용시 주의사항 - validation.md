---
title: sqlmodel 라이브러리 사용시 주의사항 - validation
date: '2022-05-02T18:53:19.408+09:00'
tags:
  - python
  - sqlmodel
  - '@all'
page: null
summary: >-
  sqlmodel에서 모델에 table=True 옵션을 주면 from_orm, parse_obj에서 validation 과정을 진행하지
  않는다.
---
`sqlmodel`은 `fastapi`의 개발자 `tiangolo`의 주도 하에 개발이 진행중인 `sql`관련 라이브러리입니다. `pydantic`의 모델과 `sqlalchemy`의 테이블을 한번의 정의로 같이 쓸 수 있다는 장점이 있어서, 다소 불안정한 부분이 있더라도 종종 쓰고 있습니다.

그런데 최근 아주 무서운 일을 확인했습니다.. `sqlmodel`로 정의한 모델에 `table=True`옵션을 주면 `pydantic`에서 자랑하는 검증 과정이 전혀 작동하지 않는다는 사실을..

`from_orm`, `parse_obj` 이 두 메소드 모두 정상적으로 작동하지 않으니, `validate` 메소드를 이용해서 레코드를 생성하면 정상적으로 사용할 수 있는 것 같습니다.
