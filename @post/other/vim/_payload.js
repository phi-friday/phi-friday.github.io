export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){return {data:{"selected_data_/other/vim":{_path:"\u002Fother\u002Fvim",_dir:"other",_draft:j,_partial:j,_locale:k,_empty:j,title:o,description:"esc를 누르면 자동으로 영문 키보드가 된다.",tags:["windows","wsl","vim"],page:l,date:"2022-08-06T20:00:32.948+09:00",publish:true,body:{type:"root",children:[{type:b,tag:m,props:{id:"아래-글은-퍼온-글입니다"},children:[{type:a,value:"아래 글은 퍼온 글입니다."}]},{type:b,tag:e,props:{},children:[{type:a,value:"출처는 다음과 같습니다."}]},{type:b,tag:e,props:{},children:[{type:b,tag:f,props:{href:"https:\u002F\u002Frottk.tistory.com\u002Fentry\u002FVim-Normal%EB%AA%A8%EB%93%9C%EC%97%90%EC%84%9C-%EC%98%81%EB%AC%B8-%ED%82%A4%EB%B3%B4%EB%93%9C%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-Windows",rel:[g]},children:[{type:a,value:o}]}]},{type:b,tag:"hr",props:{},children:[]},{type:b,tag:m,props:{id:"windows에서-vim을-사용하는-경우-vscode의-vim-extension-wsl에서의-vim"},children:[{type:a,value:"Windows에서 "},{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:"을 사용하는 경우 ("},{type:b,tag:c,props:{},children:[{type:a,value:"VSCode"}]},{type:a,value:"의 "},{type:b,tag:c,props:{},children:[{type:a,value:"Vim Extension"}]},{type:a,value:p},{type:b,tag:c,props:{},children:[{type:a,value:"WSL"}]},{type:a,value:"에서의 "},{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:")"}]},{type:b,tag:e,props:{},children:[{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:" 사용 시 흔히 겪는 문제가 한글로 주석 작성 후, Normal 모드로 전환하여 명령어를 입력하면 명령어가 적용되지 않는 문제가 있습니다."}]},{type:b,tag:e,props:{},children:[{type:a,value:"예를 들어, 파일 저장을 위해 "},{type:b,tag:c,props:{},children:[{type:a,value:i}]},{type:a,value:" + "},{type:b,tag:c,props:{},children:[{type:a,value:":w"}]},{type:a,value:" 를 입력하였으나, 실제로는 "},{type:b,tag:c,props:{},children:[{type:a,value:i}]},{type:a,value:p},{type:b,tag:c,props:{},children:[{type:a,value:":ㅈ"}]},{type:a,value:"가 입력되어 저장이 되지 않는 경우입니다."}]},{type:b,tag:e,props:{},children:[{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:"에서 한글을 입력하는 경우는 코드에 주석을 넣는 경우 이외에는 없으므로, Normal 모드로 전환 시(즉, "},{type:b,tag:c,props:{},children:[{type:a,value:i}]},{type:a,value:"를 누르면) 영문으로 자동전환이 되도록 설정하면 이러한 문제가 해결될 것입니다."}]},{type:b,tag:e,props:{},children:[{type:a,value:"※ 간단히 IME에서 해당 기능을 제공해준다면 별도의 프로그램을 설치하지 않아도 되겠지만 아쉽게도 "},{type:b,tag:c,props:{},children:[{type:a,value:"Microsoft IME"}]},{type:a,value:"는 설정 기능이 존재하지 않아 외부 프로그램(키 매크로)을 설치하여 도움을 받아야 합니다."}]},{type:b,tag:q,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:"윈도에 "},{type:b,tag:f,props:{href:n,rel:[g]},children:[{type:a,value:"Auto HotKey"}]},{type:a,value:"를 설치합니다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"메모장에 "},{type:b,tag:c,props:{},children:[{type:a,value:"Script.ahk"}]},{type:a,value:"를 만들어 아래의 Script를 작성합니다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"작성한 스크립트를 더블 클릭하여 실행합니다. 이후, "},{type:b,tag:c,props:{},children:[{type:a,value:i}]},{type:a,value:"를 누르면 자동으로 영문 키보드로 전환됩니다."}]}]},{type:b,tag:r,props:{code:"$Esc::\n    if(IME_CHECK(\"A\"))\n        Send, {VK15}    ;영문이라면 한영전환 키를 입력해준다.\n    Send, {Escape}\n    return\n\n\u002F*\n  IME check \n*\u002F\nIME_CHECK(WinTitle) {\n  WinGet,hWnd,ID,%WinTitle%\n  Return Send_ImeControl(ImmGetDefaultIMEWnd(hWnd),0x005,\"\")\n}\nSend_ImeControl(DefaultIMEWnd, wParam, lParam) {\n  DetectSave := A_DetectHiddenWindows\n  DetectHiddenWindows,ON\n   SendMessage 0x283, wParam,lParam,,ahk_id %DefaultIMEWnd%\n  if (DetectSave \u003C\u003E A_DetectHiddenWindows)\n      DetectHiddenWindows,%DetectSave%\n  return ErrorLevel\n}\nImmGetDefaultIMEWnd(hWnd) {\n  return DllCall(\"imm32\\ImmGetDefaultIMEWnd\", Uint,hWnd, Uint)\n}\n",language:"autohotkey",meta:l},children:[{type:b,tag:"pre",props:{},children:[{type:b,tag:r,props:{__ignoreMap:k},children:[{type:b,tag:"div",props:{class:"line"},children:[{type:b,tag:"span",props:{},children:[{type:a,value:"$Esc::\n    if(IME_CHECK(\"A\"))\n        Send, {VK15}    ;영문이라면 한영전환 키를 입력해준다.\n    Send, {Escape}\n    return\n\n\u002F*\n  IME check \n*\u002F\nIME_CHECK(WinTitle) {\n  WinGet,hWnd,ID,%WinTitle%\n  Return Send_ImeControl(ImmGetDefaultIMEWnd(hWnd),0x005,\"\")\n}\nSend_ImeControl(DefaultIMEWnd, wParam, lParam) {\n  DetectSave := A_DetectHiddenWindows\n  DetectHiddenWindows,ON\n   SendMessage 0x283, wParam,lParam,,ahk_id %DefaultIMEWnd%\n  if (DetectSave \u003C\u003E A_DetectHiddenWindows)\n      DetectHiddenWindows,%DetectSave%\n  return ErrorLevel\n}\nImmGetDefaultIMEWnd(hWnd) {\n  return DllCall(\"imm32\\ImmGetDefaultIMEWnd\", Uint,hWnd, Uint)\n}"}]}]}]}]}]},{type:b,tag:"h2",props:{id:s},children:[{type:a,value:t}]},{type:b,tag:e,props:{},children:[{type:a,value:"Script를 실행파일(.exe)로 변환합니다."}]},{type:b,tag:u,props:{},children:[{type:b,tag:d,props:{},children:[{type:b,tag:c,props:{},children:[{type:a,value:"C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\AutoHotkey"}]},{type:a,value:" 폴더로 이동합니다."}]},{type:b,tag:d,props:{},children:[{type:b,tag:c,props:{},children:[{type:a,value:"Convert .ahk to .exe"}]},{type:a,value:"를 더블클릭하여 실행합니다."}]},{type:b,tag:d,props:{},children:[{type:b,tag:c,props:{},children:[{type:a,value:"Source"}]},{type:a,value:"항목에서 앞서 작성한 "},{type:b,tag:c,props:{},children:[{type:a,value:"script.ahk"}]},{type:a,value:"를 추가합니다."}]},{type:b,tag:d,props:{},children:[{type:b,tag:c,props:{},children:[{type:a,value:"Convert"}]},{type:a,value:" 를 클릭합니다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"'Conversion complete' 팝업이 표시되면, .exe 파일이 스크립트와 같은 폴더에 생성됩니다."}]}]},{type:b,tag:e,props:{},children:[{type:a,value:"실행파일을 윈도우즈 시작프로그램으로 추가합니다."}]},{type:b,tag:u,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:"Windows 로고 키 + R을 누르고 "},{type:b,tag:c,props:{},children:[{type:a,value:"shell:startup"}]},{type:a,value:"을 입력한 다음 확인을 선택합니다. 그러면 시작 폴더가 열립니다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"앞서 변환한 실행파일(.exe)을 복사하여 시작 폴더에 붙여넣습니다."}]}]},{type:b,tag:m,props:{id:v},children:[{type:a,value:v}]},{type:b,tag:q,props:{},children:[{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:w,rel:[g]},children:[{type:a,value:w}]}]},{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:n,rel:[g]},children:[{type:a,value:n}]}]},{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:"https:\u002F\u002Fsupport.microsoft.com\u002Fko-kr\u002Fwindows\u002Fwindows-10%EC%97%90%EC%84%9C-%EC%8B%9C%EC%9E%91%ED%95%A0-%EB%95%8C-%EC%9E%90%EB%8F%99%EC%9C%BC%EB%A1%9C-%EC%8B%A4%ED%96%89%EB%90%98%EB%8A%94-%EC%95%B1-%EC%B6%94%EA%B0%80-150da165-dcd9-7230-517b-cf3c295d89dd",rel:[g]},children:[{type:a,value:"Windows 10에서 시작할 때 자동으로 실행되는 앱 추가"}]}]},{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:"https:\u002F\u002Fwww.autohotkey.com\u002Fboards\u002Fviewtopic.php?t=15820",rel:[g]},children:[{type:a,value:"AHK Startup Under Windows 10"}]}]}]}],toc:{title:k,searchDepth:x,depth:x,links:[{id:s,depth:2,text:t}]}},_type:"markdown",_id:"content:other:vim 영문 키보드 자동 전환.md",_source:"content",_file:"other\u002Fvim 영문 키보드 자동 전환.md",_extension:"md"},"selected_surround_/other/vim":[{_path:"\u002Fother\u002Fwsl2-pid-1-systemd",title:"wsl2에서 pid 1을 systemd로 변경하기",description:"잘 만들어놓은 배포판을 가져다 쓰자",date:"2022-08-14T22:13:27.850+09:00"},{_path:"\u002Fjs\u002Fvelog-git-page",title:"velog에서 git page로 블로그 이전",description:l,date:"2022-06-12T04:27:48.097+09:00"}]},prerenderedAt:1680715384726}}("text","element","code-inline","li","p","a","nofollow","Vim","ESC",false,"",null,"h1","https:\u002F\u002Fwww.autohotkey.com\u002F","[Vim] Normal모드에서 영문 키보드로 자동 전환하기 (Windows)",", ","ul","code","windows-실행시-자동으로-script-시작하기","Windows 실행시 자동으로 Script 시작하기","ol","출처","https:\u002F\u002Fgithub.com\u002Fjohngrib\u002Fsimple_vim_guide\u002Fblob\u002Fmaster\u002Fmd\u002Fwith_korean.md",5))