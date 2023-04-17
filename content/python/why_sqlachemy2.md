---
title: 'sqlalchemy2.0는 무엇이 달라졌고, 왜 써야할까.'
tags:
  - python
  - orm
  - sqlalchemy
description: 더 빠르고 정확해진 orm
date: '2023-03-18'
publish: true
---

::alert
[What’s New in SQLAlchemy 2.0?](https://docs.sqlalchemy.org/en/20/changelog/whatsnew_20.html) 에서 필요하다 생각되는 내용을 각색해서 작성한 글입니다.
::

## 1. PEP-484 지원
기존의 `sqlalchemy`는 `sqlalchemy2-stubs`를 사용해서 타입 힌트를 제공했지만, 완전하지 않았습니다. 하지만 2.0에서는 이와 관련하여 유형이 있는 모든 요소에 대해 재작업되어, 선언부터 결과까지 확장됩니다. 실제 코드로 확인해봅시다.

```python
import sqlalchemy as sa

engine = sa.create_engine(sa.make_url("sqlite://"))

str_col = sa.column("a", sa.String)  # ColumnClause[str]
int_col = sa.column("a", sa.Integer)  # ColumnClause[int]

expr1 = str_col + "x"  # ColumnElement[str]
expr2 = int_col + 10  # ColumnElement[int]
expr3 = int_col == 15  # ColumnElement[bool]

# Select[Tuple[str, int]]
select_stmt = sa.select(str_col, int_col)
# ReturningInsert[Tuple[str, int]]
insert_stmt = sa.insert(sa.table("t")).returning(str_col, int_col)

with engine.connect() as conn:
    # CursorResult[Tuple[str, int]]
    result = conn.execute(select_stmt)
    # Row[Tuple[str, int]] | None
    row = result.first()

    if row is not None:
        # str, int = Tuple[str, int]
        str_val, int_val = row.tuple()

    # Sequence[str]
    data = conn.execute(sa.select(str_col)).scalars().all()
```

이러한 점은 선언적 모델 정의에서도 잘 확인할 수 있습니다.
```python
from __future__ import annotations

import sqlalchemy as sa
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    Session,
    aliased,
    mapped_column,
    relationship,
)

engine = sa.create_engine(sa.make_url("sqlite://"))


class Base(DeclarativeBase):
    ...


class User(Base):
    __tablename__ = "user_account"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    addresses: Mapped[list[Address]] = relationship()


class Address(Base):
    __tablename__ = "address"

    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(sa.ForeignKey("user_account.id"))


with Session(engine) as session:
    # Select[Tuple[User, Address]]
    stmt = sa.select(User, Address).join_from(User, Address)
    # Result[Tuple[User, Address]]
    result = session.execute(stmt)
    # User, Address = Tuple[User, Address]
    user, adderss = result.one().tuple()

    aliased_user = aliased(User)  # Type[User]
    # Select[Tuple[User, User, str]]
    stmt = sa.select(User, aliased_user, User.name).where(User.id == 5)
    # Result[Tuple[User, User, str]]
    result = session.execute(stmt)

    # User
    user = (
        session.execute(
            sa.select(User).limit(1),
        )
        .scalars()
        .one()
    )
    # Sequence[User]
    users = (
        session.execute(
            sa.select(User),
        )
        .scalars()
        .all()
    )
    # Iterator[User]
    user_iter = iter(
        session.execute(
            sa.select(User),
        ).scalars(),
    )
```

## 2. PEP-681 지원
선언적 모델 정의가 `dataclass`에서 강하게 영감을 받은 만큼, 모델은 그 자체로 `dataclass`가 될 수 있습니다.

```python
from __future__ import annotations

from typing import Annotated

import sqlalchemy as sa
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    MappedAsDataclass,
    mapped_column,
    relationship,
)

intpk = Annotated[int, mapped_column(primary_key=True)]
str30 = Annotated[str, mapped_column(sa.String(30))]
user_fk = Annotated[int, mapped_column(sa.ForeignKey("user_account.id"))]
engine = sa.create_engine(sa.make_url("sqlite://"))


class Base(MappedAsDataclass, DeclarativeBase):
    """subclasses will be converted to dataclasses"""


class User(Base):
    __tablename__ = "user_account"

    id: Mapped[intpk] = mapped_column(init=False)
    name: Mapped[str30]
    fullname: Mapped[str | None] = mapped_column(default=None)
    addresses: Mapped[list[Address]] = relationship(
        back_populates="user",
        default_factory=list,
    )


class Address(Base):
    __tablename__ = "address"

    id: Mapped[intpk] = mapped_column(init=False)
    email_address: Mapped[str]
    user_id: Mapped[user_fk] = mapped_column(init=False)
    user: Mapped[User] = relationship(back_populates="addresses", default=None)

# # Address(id=None, email_address='email@address', user_id=None, user=None)
address = Address(email_address="email@address")
# User(
#     id=None,
#     name="username",
#     fullname=None,
#     addresses=[
#         Address(id=None, email_address="email@address", user_id=None, user=...),
#     ],
# )
user = User(name="username", addresses=[address])

```

## 3. 최적화된 bulk insert(`MySQL` 제외, `MariaDB` 포함)
`RETURNING`을 지원하는 모든 백엔드에 대한 성능 향상이 이뤄졌는데 그 차이가 상당히 극적입니다.

벤치마크는 다음 코드로 진행됐습니다.
```python
@Profiler.profile
def test_flush_no_pk(n):
    """INSERT statements via the ORM (batched with RETURNING if available),
    fetching generated row id"""
    session = Session(bind=engine)
    for chunk in range(0, n, 1000):
        session.add_all(
            [
                Customer(
                    name="customer name %d" % i,
                    description="customer description %d" % i,
                )
                for i in range(chunk, chunk + 1000)
            ]
        )
        session.flush()
    session.commit()
```

벤치마크 결과는 다음과 같습니다.

|driver | sqlalchemy1.4(초) | sqlalchemy2.0(초)|
| :-: | :-: | :-: |
|sqlite+pysqlite2 (memory) | 6.204843 | 3.554856 |
|postgresql+psycopg2 (network) | 4.704876 | 4.699883 |
|postgresql+asyncpg (network) | 88.292285 | 4.561492 |
|oracle+cx_Oracle (network) | 92.603953 | 4.809520 |
|mssql+pyodbc (network) | 158.396667 | 4.825139 |
|mariadb+mysqldb (network) | 71.705197 | 4.075377 |

`RETURNING`을 지원하지 않는 `MySQL`과 2.0부터 지원하는 `psycopg3`의 벤치마크 결과는 다음과 같습니다.

|driver | sqlalchemy1.4(초) | sqlalchemy2.0(초)|
| :-: | :-: | :-: |
|postgresql+psycopg (network) | N/A (psycopg3) | 4.861368 |
|mysql+mysqldb (network) | 77.281997 | 76.132995 |

## 4. 향상된 `orm` 지원
### bulk insert
`Insert.returning`을 사용하거나 사용하지 않고 `Session.execute`를 사용할 수 있습니다. 이는 기존의 `Session.bulk_insert_mappings`와 동일합니다.

```python
>>> users = session.scalars(
...     insert(User).returning(User),
...     [
...         {"name": "spongebob", "fullname": "Spongebob Squarepants"},
...         {"name": "sandy", "fullname": "Sandy Cheeks"},
...         {"name": "patrick", "fullname": "Patrick Star"},
...         {"name": "squidward", "fullname": "Squidward Tentacles"},
...         {"name": "ehkrabs", "fullname": "Eugene H. Krabs"},
...     ],
... )
>>> print(users.all())
[User(name='spongebob', fullname='Spongebob Squarepants'),
 User(name='sandy', fullname='Sandy Cheeks'),
 User(name='patrick', fullname='Patrick Star'),
 User(name='squidward', fullname='Squidward Tentacles'),
 User(name='ehkrabs', fullname='Eugene H. Krabs')]
```

### bulk update
`Insert`와 같은 방법으로 사용가능합니다. 기존의 `Session.bulk_update_mappings`와 동일합니다. 단 `returning`은 지원하지 않습니다.

```python
>>> from sqlalchemy import update
>>> session.execute(
...     update(User),
...     [
...         {"id": 1, "fullname": "Spongebob Squarepants"},
...         {"id": 3, "fullname": "Patrick Star"},
...     ],
... )
```

### `synchronize_session`
`synchronize_session`의 기본값이 새로 추가된 `auto`로 변경됐습니다. `auto`는 우선 `evaluate`로 시도하고, 문제가 발생하면 `fetch`로 다시 시도합니다. `MySQL`과 `MariaDB`를 제외한 모든 백엔드에서 효율적입니다.


## 5. 그 외..
그 외에도 여러가지 변경 및 추가사항이 많습니다. 하지만 굳이 다 적을 필요가 없기에 생략합니다.
원문 링크는 본문 상단에 있습니다.

`sqlalchemy2.0`은, 기존에 `sqlalchemy`를 사용했다면, 사용하지 않을 이유가 없는 라이브러리입니다. 하지만 아쉽게도 아직 다른 라이브러리와 종속성 문제로 인해 사용하지 못하는 경우가 많겠습니다. `airflow`라던가 `pandas`(`read_sql`이나 `to_sql`같은 메소드를 사용하지 않으면 상관없습니다)같은 경우입니다.