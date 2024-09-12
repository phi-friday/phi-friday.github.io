---
title: '[코드를 깔끔하게] black - 2'
tags:
  - python
  - formatter
  - black
page: 코드를_깔끔하게
description: 생산성 향상을 위해
date: '2023-02-21'
publish: true
---

## 1. 왜 `black`을 사용해야 하는가
사람마다 선호하는 코딩 스타일이 존재한다. 괄호 위치에 따른 `Allman`이나 `K&R` 등이 있고, 변수명에 따른 `CamelCase`나 `snake_case` 등이 있다.

혼자 작성하여 혼자 수정하고 혼자 사용하는 코드라면, 자신의 코딩 스타일로 일관성 있는 코드 작성이 가능하다. 하지만 다른 사람과 함께 협업할 때, 이러한 코딩 스타일이 혼재될 수 있고, 이는 가독성을 해치는 요소가 된다.

따라서 원활한 협업을 위해 코딩 스타일이 사전에 설정할 필요가 있다. 이때 범용적으로 사용되는 툴에는 `prettier`가 있다. 하지만 `prettier`자체의 설정 값이 너무 다양하여, 하나씩 설정하는 것도 일이다.

이런 일이 매번 반복되다 보니, 프로그래밍과 직접적인 연관이 없는 위와 같은 요소에 대한 고민을 하지 말자는 얘기가 나왔고, 이때 탄생한 것이 바로 `black`이다.

`black`을 사용한다면 고민할 설정값은 한 줄당 최대 글자 수 위에는 없다고 봐도 좋다. 사용자는 어떤 포맷을 사용할지 고민할 필요가 없고, `black {filename}`으로 실행하기만 하면 된다.

다음 두 코드는 포맷을 제외하고 동일하다.
(출처: https://www.geeksforgeeks.org/python-code-formatting-using-black/)
```python
def is_unique(
			s
			):
	s = list(s
				)
	s.sort()


	for i in range(len(s) - 1):
		if s[i] == s[i + 1]:
			return 0
	else:
		return 1


if __name__ == "__main__":
	print(
		is_unique(input())
		)

```

```python
def is_unique(s):
	s = list(s)
	s.sort()

	for i in range(len(s) - 1):
		if s[i] == s[i + 1]:
			return 0
	else:
		return 1


if __name__ == "__main__":
	print(is_unique(input()))

```

## 2. `black`을 사용하는 방법

1. CLI로 직접 실행하기
```shell
❯ poetry run black {file or dir name}
All done! ✨ 🍰 ✨
22 files left unchanged.
```
2. IDE 확장 설치
ex) vscode
https://github.com/microsoft/vscode-black-formatter

3. CLI로 실행하기를 자동화하기
https://github.com/emeraldwalk/vscode-runonsave
위 확장을 설치한 다음 저장시 실행할 커맨드를 다음과 같이 설정
```yaml
{
    "emeraldwalk.runonsave": {
        "commands": [
            {
                "match": "\\.pyi?$",
                "isAsync": false,
                "cmd": "poetry run black ${file}"
            }
        ]
    }
}
```
4. 커밋시 자동으로 실행하기
`pre-commit`설치 후 다음과 같이 설정하기
```yaml
repos:
  - hooks:
      - id: black
        # args:
        #   - "--check"
    rev: 22.3.0
    repo: https://github.com/psf/black
```
자동 수정이 아닌 확인만 하고 싶다면 주석을 해제하면 된다.