---
title: "더 이상 GitHub Copilot을 쓸 이유가 없다"
tags:
  - github-copilot
  - codex
  - opencode
page: null
description: GitHub Copilot의 사용량 기반 과금 전환 이후, 더 이상 예전만큼 효율적인 선택이 아니게 된 이유
date: 2026-05-04T22:51:01.508+09:00
publish: true
---

## 수년간 GitHub Copilot을 사용하면서

GitHub Copilot은 베타로 제공되던 시절부터 계속 사용해 왔다.
초기에는 IDE 안에서 짧은 인라인 자동 완성을 제공하는 정도였지만, LLM 성능이 좋아지면서 Copilot도 빠르게 좋아졌다.
특히 작년까지만 해도 Copilot은 개발자가 사용할 수 있는 가장 효율적인 LLM 서비스 중 하나였다고 생각한다.

당시 Copilot의 장점은 단순했다.

- 월 10달러에서 39달러 정도로 OpenAI, Anthropic, Google의 상위 모델을 함께 사용할 수 있었다.
- 요청 하나가 얼마나 많은 토큰을 쓰는지와 관계없이 대부분은 프리미엄 요청 1회로 계산됐다.
- 에디터 자동 완성, 채팅, 에이전트 작업을 한 서비스 안에서 처리할 수 있었다.

특히 `opencode`에 GitHub 계정을 연동해서 사용할 때 만족도가 높았다.
주로 Opus를 사용하고, 상황에 따라 GPT와 Gemini를 섞어 쓰는 방식이었다.

> `oh-my-opencode-slim`도 꽤 쓸 만했고, 지금도 쓰고 있다.

Anthropic의 API 가격을 생각하면, GitHub Copilot은 정말 좋은 우회로였다.
적어도 내 사용 방식에서는 그랬다.

## 지난 몇 달간 조짐이 보였다

최근 몇 달 동안 Copilot 사용자 커뮤니티에는 불안한 분위기가 있었다.
GitHub가 기존에는 없던 사용량 제한을 조금씩 추가하기 시작했기 때문이다.
처음에는 단순히 프리미엄 요청 수를 조정하는 정도로 보였지만, 이후에는 일정 시간당 사용할 수 있는 할당량에 가까운 제한이 붙기 시작했다.

Opus 계열 모델의 요청 배수 변화도 신호였다.
Claude Opus 4.6은 3배수였고, Claude Opus 4.7은 처음부터 7배수로 들어왔다가 곧 15배수가 됐다.
프리미엄 요청이라는 이름은 그대로였지만, 실제로는 더 이상 **요청 횟수**가 아니라 Copilot 안에서만 쓰는 **화폐 단위**에 가까웠다.

이때부터는 예전처럼 "Copilot 하나면 충분하다"고 말하기 어려워졌다.

## 쐐기를 박은 GitHub의 공지

결정적인 변화는 GitHub의 공식 공지였다.
GitHub는 Copilot을 2026년 6월 1일부터 사용량 기반 청구로 전환한다고 발표했다.

- [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [요청 기반 청구 방식을 유지하는 연간 요금제의 모델 배수값](https://docs.github.com/ko/copilot/reference/copilot-billing/model-multipliers-for-annual-plans)

요약하면 다음과 같다.

| 구분 | 기존 방식 | 변경 이후 |
| --- | --- | --- |
| 과금 단위 | 프리미엄 요청 단위(PRU) | GitHub AI Credits |
| 계산 기준 | 모델별 요청 배수 | 입력·출력·캐시 토큰 사용량과 모델별 API 단가 |
| 월간 요금 | Copilot Pro 10달러, Pro+ 39달러 | 기본 요금은 유지 |
| 기본 포함량 | 플랜별 프리미엄 요청 | 플랜 가격에 대응하는 AI Credits |
| 소진 이후 | 일부 저비용 모델 fallback 가능 | 크레딧 및 예산 정책에 따라 제한 |

월간 구독자는 6월 1일부터 자동으로 사용량 기반 청구로 전환된다.
연간 구독자는 기존 구독 기간이 끝날 때까지 요청 기반 청구를 유지할 수 있지만, 6월 1일부터 모델 배수가 크게 오른다.
그리고 연간 플랜이 끝나면 자동으로 Copilot Free로 내려간다.

## 새 모델 배수가 의미하는 것

공식 문서에 공개된 연간 플랜용 새 모델 배수는 꽤 충격적이다.
몇 가지 주요 모델만 보면 다음과 같다.

| 모델 | 현재 배수 | 2026년 6월 1일 이후 배수 |
| --- | ---: | ---: |
| Claude Opus 4.5 | 3 | 15 |
| Claude Opus 4.6 | 3 | 27 |
| Claude Opus 4.7 | 15 | 27 |
| Claude Sonnet 4.6 | 1 | 9 |
| Gemini 3 Pro | 1 | 6 |
| GPT-5.4 | 1 | 6 |
| GPT-4.1 | 0 | 1 |
| GPT-4o | 0 | 0.33 |

기존에는 0배수였던 모델도 일부 비용을 쓰게 됐다.
코드 완성과 Next Edit Suggestions는 계속 포함된다고 하지만, 내가 Copilot을 쓰던 핵심 이유는 단순 자동 완성이 아니라 에이전트와 고성능 모델 사용이었다.
그 기준에서는 비용 구조가 완전히 달라진 셈이다.

> [!NOTE]
> 위 모델 배수는 사용량 기반 청구로 전환하지 않고, 기존 연간 플랜의 요청 기반 청구를 유지하는 사용자에게 적용되는 값이다.
> 사용량 기반 청구에서는 모델 배수가 아니라 토큰 사용량과 모델별 단가가 기준이 된다.

예전 Copilot의 가성비는 "프리미엄 요청 1회로 큰 작업을 맡길 수 있다"는 데 있었다.
하지만 앞으로는 토큰 사용량이 그대로 비용이 된다.
그렇다면 Copilot은 더 이상 특별히 저렴한 서비스가 아니라, 여러 모델을 묶어서 제공하는 또 하나의 LLM 플랫폼에 가까워진다.

## Claude Code를 쓰고 싶지만

여러 LLM 모델이 출시되면서 벤치마크도 많아졌다.
벤치마크만 보면 Anthropic 모델이 항상 압도적인 것은 아니다.
그럼에도 많은 개발자가 Opus를 선호하고, 나도 실제 개발 작업에서는 Opus가 가장 편하다고 느낄 때가 많다.

문제는 가격과 사용 방식이다.
Claude Code를 그대로 쓰면 좋겠지만, Anthropic의 가격 정책은 여전히 부담스럽다.
그리고 `opencode`에서 Claude Code용 모델을 사용하는 것도 현실적인 선택지가 아니다.

> `opencode`로 Claude Code의 모델을 우회해서 사용할 경우 부정 사용으로 차단될 수 있다.
> 결국 API로만 사용해야 하는데, 내 기준에서는 그냥 쓰지 말라는 말에 가깝다.

`opencode`에 익숙해졌고 앞으로도 이 생태계를 긍정적으로 보고 있는데, Anthropic이 이런 사용 방식을 사실상 막아 둔 점은 아쉽다.

Copilot이 Anthropic 모델을 저렴하게 사용할 수 있는 통로였던 시절에는 이 문제가 어느 정도 가려졌다.
하지만 Copilot이 사용량 기반 청구로 전환되면 그 장점도 줄어든다.

## 지금은 GPT가 가장 현실적인 선택이다

Opus의 요청 배수가 3배, 7배, 15배로 올라가는 동안 GPT 계열 모델을 조금씩 더 많이 써 봤다.
처음에는 아쉬운 부분이 있었지만, 최근 모델은 개발 작업에서도 꽤 안정적으로 사용할 수 있었다.
GitHub 공지를 확인한 뒤로는 여러 모델과 서비스를 다시 시험했고, 지금은 GPT만으로도 충분하다는 결론에 가까워졌다.

물론 비용은 더 든다.
OpenAI Pro를 기준으로 하면 월 약 16만 원 정도라서, 예전 Copilot Pro+보다도 비싸다.
하지만 비용 구조가 명확하고, 특정 플랫폼의 정책 변화에 덜 휘둘린다는 장점이 있다.

> GLM이나 Kimi 같은 중국 모델도 있지만, 회사 정책상 사용이 제한적이다.

사실 회사 업무에 사용하는 도구라면 가격에만 집착할 필요는 없다.
생산성이 충분히 오른다면 회사에서도 이 정도 투자는 납득할 수 있다.
다만 나는 개인적으로도 만족스럽게 지불할 수 있는 서비스인지 계속 따져보는 편이고, 그 기준에서는 Claude Code보다 OpenAI 쪽이 더 현실적이었다.

## 결론

내 기준에서 GitHub Copilot은 이제 예전만큼 매력적인 선택지가 아니다.
Copilot을 계속 쓸 이유가 완전히 사라졌다고까지 말할 수는 없지만, 적어도 내가 Copilot에 기대하던 장점은 크게 줄었다.

정리하면 다음과 같다.

- 단순 코드 완성과 IDE 통합이 중요하다면 Copilot은 여전히 쓸 만하다.
- 저렴한 오픈 코딩 모델을 쓰고 싶다면 OpenCode Go를, 더 넓은 모델 선택지가 필요하다면 OpenRouter를 쓰는 편이 낫다.
- GPT 계열 모델만으로 충분하다면 OpenAI를 직접 사용하는 편이 더 단순하다.
- Anthropic 모델이 꼭 필요하다면 Claude Code나 API 비용을 감수해야 한다.

GitHub의 입장도 이해는 된다.
에이전트 기반 사용량이 늘어나면 기존 프리미엄 요청 모델을 계속 유지하기 어렵다.
특히 고성능 모델은 공급보다 수요가 훨씬 빠르게 늘고 있으니, GitHub가 비용 구조를 바꾸는 것은 자연스러운 일이다.

다만 기존 구독 기간 동안은 동일한 조건을 보장했으면 어땠을까 하는 아쉬움은 남는다.
어느 정도 예상한 변화였지만, 이렇게 갑작스럽고 큰 폭으로 바뀔 줄은 몰랐다.
그래서 내 결론은 단순하다.

**GitHub Copilot은 이제 끝이다. 더 사용해야 할 이유를 찾기 어렵다.**

## 참고

- [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [Model multipliers for annual Copilot Pro and Copilot Pro+ subscribers](https://docs.github.com/copilot/reference/copilot-billing/model-multipliers-for-annual-plans)
- [Usage-based billing for GitHub Copilot](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals)
