---
title: 'gitea에서 ci/cd를 위한 action 사용하기'
tags:
  - gitea
  - pipeline
page: null
description: gihub action와 거의 비슷하다
date: '2023-04-21T23:33:09.854+09:00'
publish: false
---

## `gitea`란
[`gitea`](https://gitea.io/)는 `go`로 작성된 `git` 원격 서버다. 이와 비슷한 것으로 `gitlab`이 있는데, `gitea`는 `gitlab`에 비해서 아주 가볍고 빨라서, 라즈베리파이에서도 별다른 문제 없이 사용할 수 있다.

### `github`이 있는데 왜 `gitea`를 사용할까?
`github`이 사실상 업계 표준이고, 거의 모든 점에서 부족한 것이 없기에, 특별한 이유가 없다면 다른 서비스를 이용할 필요가 없다. 특히 `github`의 비공개 저장소가 무료로 전환된 이후에는 더욱 그렇다.

특별한 이유에는, 만에 하나라도 공개돼서는 안되는 소스가 있다던가, `github`의 유료 서비스를 사용하기에는 비용적인 부담이 있다, 등이 있다.

## `gitea`에서 파이프라인을 구축하려면 어떻게 해야하나
### 1.19 버전 이전
`gitea` 자체적인 파이프라인 도구는 없다. `jenkins`나 `woodpecker`같은 타사 파이프라인 도구를 구축해야 한다.
### 1.19 버전 이후
`gitea`에서 공식적으로 제공하는 파이프라인 도구 생겼다. `github`의 `action`과 같은 명칭의 `action`이라고 명명했다.

이름만 같은 것이 아니라, `github`의 `action` 설정 파일과 100% 호환을 목표로 한다.

다음 데모는 변수에서 `gitea`를 사용하는 것을 제외하고, `github`에서 동일하게 실행된다.
```yaml[demo.yaml]
name: Gitea Actions Demo
run-name: ${{ gitea.actor }} is testing out Gitea Actions
on: [push]
jobs:
  Explore-Gitea-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "The job was ... by a ${{ gitea.event_name }}..."
      - run: echo "This job is ... a ${{ runner.os }} server hosted by..."
      - run: echo "The ... ${{ gitea.ref }} ... ${{ gitea.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v3
      - run: echo "The ${{ gitea.repository }} repository has been cloned ..."
      - run: echo "The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ gitea.workspace }}          
      - run: echo "This job's status is ${{ gitea.status }}."
```

위 설정 파일은 `gitea`에서 다음과 같이 실행되는 것을 확인 할 수 있다.
![](/images/other/gitea-action/gitea-action-demo.png)

## 사용 후기
`jenkins`나 `devops`의 `pipeline`을 사용하다 `gitea`의 `action`을 사용해보면 속이 시원해진다. 

물론 아직 부족한 부분이 많긴 하지만 충분히 제 기능을 하는 것 같다. 아직 프리뷰인 것을 감안하면, 차고 넘친다.
::alert
1.20에서 정식 지원 예정이다.
::

특히 기본 이미지를 [이것](https://github.com/myoung34/docker-github-actions-runner)으로 설정하면, `setup-python`과 같은 스크립트도 정말 잘 실행된다!(추측하기로는 `ubuntu`, `node` 이 두가지 조건을 만족해야 하는데, 기본 제공 이미지는 `debian`이라 에러가 발생한다.)

다음 버전이 기다려지는 프로젝트다.

## 출처
[Hacking on Gitea Actions](https://blog.gitea.io/2023/03/hacking-on-gitea-actions/)