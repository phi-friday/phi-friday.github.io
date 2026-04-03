---
title: wsl2에서 pid 1을 systemd로 변경하기
tags:
  - windows
  - wsl
page: null
description: 잘 만들어놓은 배포판을 가져다 쓰자
date: '2022-08-14T22:13:27.850+09:00'
---

# `systemd`로 인한 에러
`wsl2`(이하 `wsl`)를 그냥 실행할 경우, 다음과 같은 에러를 겪을 때가 있다.
```bash
System has not been booted with systemd as init system (PID 1). Can't operate.
```

이는 pid 1번이 `systemd` 가 아니어서 생기는 문제로, 해결하기 위해서는 [genie](https://github.com/arkane-systems/genie)와 같은 별도의 프로그램을 실행해줘야 했다. 하지만 최근 처음부터 이를 해결한 상태로 wsl을 실행하는 프로젝트를 발견했는데, 바로 [Distrod](https://github.com/nullpo-head/wsl-distrod)다.

# `Distrod`를 사용하자
`Distrod`를 설치하는 방법은 크게 두가지로 나뉘는데,
하나는 이미 해당 패치가 적용된 배포판을 사용하거나,
기존에 사용하던 `wsl`환경에 해당 패치를 적용하는 것이다.

## 신규 설치
[링크](https://github.com/nullpo-head/wsl-distrod/releases/latest/download/distrod_wsl_launcher-x86_64.zip)의 압축 파일을 해제하면, 단일 exe 파일이 존재하는데, 해당 실행 파일을 실행시키면 끝이다.

굉장히 다양한 배포판(아치, 데비안, 젠투, 보이드 등)을 지원하기에, 대부분의 경우, 선택권을 제한당한다는 기분은 느끼지 못할 것이다.

## 기존 환경에 패치
이것 또한 아주 간단하다. 
1. 패치 스크립트를 다운로드 한 다음, 실행한다.(아직 적용되지 않았다.)
```bash
curl -L -O "https://raw.githubusercontent.com/nullpo-head/wsl-distrod/main/install.sh"
chmod +x install.sh
sudo ./install.sh install
```

2. wsl이 처음 실행됐을 때, 다음 명령어를 관리자 권한으로 실행하던가,
```bash
/opt/distrod/bin/distrod enable
```
3. 또는 다음 명령어로 윈도우 스케쥴러에 자동으로 해당 패치가 정상적으로 실행될 수 있도록 한다.
```bash
/opt/distrod/bin/distrod enable --start-on-windows-boot
```

이제 ```ps -ef | head -n 2```으로 확인해보면,
```bash
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 21:34 ?        00:00:00 /sbin/init systemd.setenv=WSL_DISTRO_NAME=Distrod systemd.setenv=WSL_INTEROP=/run/WSL/11_interop systemd.setenv=WSLENV=WT_SESSION::WT_PROFILE_ID --unit=multi-user.target
```
위와 같이 `distrod`의 패치가 적용된 것을 확인할 수 있다.

## 윈도우11은 주의
`distrod`의 기능 중, `wsl`의 특정 포트를 외부로 포워딩 할 수 있는 `portproxy`라는 서비스가 있는데, 윈도우 11에서는 정상적으로 작동하지 않는 [버그](https://github.com/nullpo-head/wsl-distrod/blob/main/docs/references.md#know-bugs)가 있다고 한다.
