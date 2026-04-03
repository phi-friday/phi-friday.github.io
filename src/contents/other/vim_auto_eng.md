---
title: '[Vim] Normal모드에서 영문 키보드로 자동 전환하기 (Windows)'
tags:
  - windows
  - wsl
  - vim
page: null
description: esc를 누르면 자동으로 영문 키보드가 된다.
date: '2022-08-06T20:00:32.948+09:00'
publish: true
---

# 아래 글은 퍼온 글입니다.
출처는 다음과 같습니다.

[[Vim] Normal모드에서 영문 키보드로 자동 전환하기 (Windows)](https://rottk.tistory.com/entry/Vim-Normal%EB%AA%A8%EB%93%9C%EC%97%90%EC%84%9C-%EC%98%81%EB%AC%B8-%ED%82%A4%EB%B3%B4%EB%93%9C%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-Windows)

---

# Windows에서 `Vim`을 사용하는 경우 (`VSCode`의 `Vim Extension`, `WSL`에서의 `Vim`)
`Vim` 사용 시 흔히 겪는 문제가 한글로 주석 작성 후, Normal 모드로 전환하여 명령어를 입력하면 명령어가 적용되지 않는 문제가 있습니다.

예를 들어, 파일 저장을 위해 `ESC` + `:w` 를 입력하였으나, 실제로는 `ESC`, `:ㅈ`가 입력되어 저장이 되지 않는 경우입니다.

`Vim`에서 한글을 입력하는 경우는 코드에 주석을 넣는 경우 이외에는 없으므로, Normal 모드로 전환 시(즉, `ESC`를 누르면) 영문으로 자동전환이 되도록 설정하면 이러한 문제가 해결될 것입니다.

※ 간단히 IME에서 해당 기능을 제공해준다면 별도의 프로그램을 설치하지 않아도 되겠지만 아쉽게도 `Microsoft IME`는 설정 기능이 존재하지 않아 외부 프로그램(키 매크로)을 설치하여 도움을 받아야 합니다.
* 윈도에 [Auto HotKey](https://www.autohotkey.com/)를 설치합니다.
* 메모장에 `Script.ahk`를 만들어 아래의 Script를 작성합니다.
* 작성한 스크립트를 더블 클릭하여 실행합니다. 이후, `ESC`를 누르면 자동으로 영문 키보드로 전환됩니다.

```autohotkey
$Esc::
    if(IME_CHECK("A"))
        Send, {VK15}    ;영문이라면 한영전환 키를 입력해준다.
    Send, {Escape}
    return

/*
  IME check 
*/
IME_CHECK(WinTitle) {
  WinGet,hWnd,ID,%WinTitle%
  Return Send_ImeControl(ImmGetDefaultIMEWnd(hWnd),0x005,"")
}
Send_ImeControl(DefaultIMEWnd, wParam, lParam) {
  DetectSave := A_DetectHiddenWindows
  DetectHiddenWindows,ON
   SendMessage 0x283, wParam,lParam,,ahk_id %DefaultIMEWnd%
  if (DetectSave <> A_DetectHiddenWindows)
      DetectHiddenWindows,%DetectSave%
  return ErrorLevel
}
ImmGetDefaultIMEWnd(hWnd) {
  return DllCall("imm32\ImmGetDefaultIMEWnd", Uint,hWnd, Uint)
}
```

## Windows 실행시 자동으로 Script 시작하기
Script를 실행파일(.exe)로 변환합니다.

1. `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\AutoHotkey` 폴더로 이동합니다.
2. `Convert .ahk to .exe`를 더블클릭하여 실행합니다.
3. `Source`항목에서 앞서 작성한 `script.ahk`를 추가합니다.
4. `Convert` 를 클릭합니다.
5. 'Conversion complete' 팝업이 표시되면, .exe 파일이 스크립트와 같은 폴더에 생성됩니다.

실행파일을 윈도우즈 시작프로그램으로 추가합니다.

1. Windows 로고 키 + R을 누르고 `shell:startup`을 입력한 다음 확인을 선택합니다. 그러면 시작 폴더가 열립니다.
2. 앞서 변환한 실행파일(.exe)을 복사하여 시작 폴더에 붙여넣습니다.

# 출처
* [https://github.com/johngrib/simple_vim_guide/blob/master/md/with_korean.md](https://github.com/johngrib/simple_vim_guide/blob/master/md/with_korean.md)
* [https://www.autohotkey.com/](https://www.autohotkey.com/)
* [Windows 10에서 시작할 때 자동으로 실행되는 앱 추가](https://support.microsoft.com/ko-kr/windows/windows-10%EC%97%90%EC%84%9C-%EC%8B%9C%EC%9E%91%ED%95%A0-%EB%95%8C-%EC%9E%90%EB%8F%99%EC%9C%BC%EB%A1%9C-%EC%8B%A4%ED%96%89%EB%90%98%EB%8A%94-%EC%95%B1-%EC%B6%94%EA%B0%80-150da165-dcd9-7230-517b-cf3c295d89dd)
* [AHK Startup Under Windows 10](https://www.autohotkey.com/boards/viewtopic.php?t=15820)
