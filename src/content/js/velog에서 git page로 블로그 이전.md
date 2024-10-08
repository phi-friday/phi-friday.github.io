---
title: velog에서 git page로 블로그 이전
tags:
  - js
  - ts
  - nextjs
  - velog
  - github
page: null
date: '2022-06-12T04:27:48.097+09:00'
description: null
publish: true
---

# 왜 옮겼나?

지난 몇달간 `velog`에서 몇몇 포스트를 작성했다.
잘 만들어진 구성이다 보니 별다른 불만 없이 잘 사용했다.
하지만 지난 며칠간의 연습 끝에 `git page`로 블로그를 이전했다.

## 처음부터 `git page`를 쓰고 싶었다.

사실 이전부터 `git page`로 블로그를 만들고 싶었다.
가장 많이 알려진 간단한 방법은 `jekyll`를 사용하는 것이다.
하지만 `ruby`로 작성된 엔진이다 보니 제대로 알아보는데 힘이 들었다.
그렇다고 `ruby`를 따로 배워보자니, 살면서 `ruby`를 사용할 일이 얼마나 있을까 하는 생각이 문득 들었다.
차라리 `go`나 `rust`라면 노력해보겠지만, `ruby`라니..

그렇게 그냥 하지 말까? 하다가 알게된게 `velog`였다.
`velog`는 내가 처음에 기대한 거의 모든 것을 만족했다.

- 마크다운을 이용한 포스팅
- 코드 블록 하이라이팅
- 실시간 포스팅 프리뷰

겨우 세가지지만 이 세가지를 만족하는 곳이 사실상 없다.
그리고 따로 내가 레이아웃을 수정할 필요가 없다보니(사실 방법도 없다), 그냥 잘 만들어진 플랫폼에 글만 쓰면 내가 원하는게 다 됐다.

## `velog`는 다 좋은데 이게 없다.

하지만 쓰다보니 역시 아쉬운게 보인다.

- 명확한 기준은 모르겠지만, 몇몇 양식에 대한 하이라이팅 미지원(log 등)
- 작성글 숨기기

그리고 무엇보다도.. 내가 직접 만든다는 성취감이 없었다.
그래서 결국 직접 만들기로 했다.

다만 `velog`덕분에 카테고리가 무조건 있어야 한다는 고정관념에서 벗어날 수 있었다.
태그를 추가하면, 태그가 기존의 카테고리처럼 사용될 수 있게 하면 된다.
또한 특정 포스트간의 연결이 필요하다면, 따로 지정할 수 있는 기능이 있으면 된다.

`velog`에서 얻은 소중한 경험을 토대로, `git page`에 블로그를 만들기 위한 준비를 했다.

# 어떻게 옮겼나?

처음에는 그냥 익숙한 `python`으로 작성하려 했다.
`pelican`이라는 라이브러리가 있어서, `jekyll`처럼 간단하게 정적 사이트를 배포할 수 있게 한다. 사용 언어가 `python`이다 보니 관련 스크립트를 확인하며, 작동 방식을 파악하는 것도 할만했다.

하지만 반응형으로 작성해보려 하니, 결국 `javascript`를 쓸 수 밖에 없었다.
그리고 어차피 `javascript`를 써야한다면.. 이번기회에 공부도 할 겸 완전히 `javascript`로 작성해보자는 생각이 들었다.

여기서 `vue`냐, `react`냐 많은 고민이 있었고, 여러 시도가 있었는데, 결국 선택한건 `react`다.
그리고 `react` 앱을 간단하게 작성하고 배포할 수 있는 프레임워크로 `nextjs`를 사용했다.

처음 생각은 `javascript`였는데, `python`의 타입 힌트를 이용한 `vscode`의 자동완성 기능에 너무 익숙해져서 그런가, 코드 작성이 너무 불편했다.
마침 `nextjs`가 `typescript`를 지원하기도 해서, 약간의 수고가 있었지만 `typescript`로 앱을 작성했다.

많은 삽질끝에 그래도 `git page`에 배포할 수 있는 형태로 만드는데 성공했다.
이제 부족한 몇몇 기능을 추가하고, 디자인을 손보기만 하면 된다.
그러고보니... `typescript`보다 `css`가 더 어려운 것 같다..
아무리 해도 예쁘게 보이지를 않는다..

# 앞으로 추가할 기능

- [ ]  다크모드 토글
  > 사실 이미 기능 추가는 했지만, css 작성하기가 힘들어서 주석으로 놔둔 상태
- [x]  문단 제목 역링크
  > nuxtjs로 넘어가면서 자연스럽게 완료
- [x]  코드 블럭 라인 하이라이트
  > nuxtjs로 넘어가면서 자연스럽게 완료
