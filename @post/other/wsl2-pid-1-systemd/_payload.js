export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T){return {data:{"selected_data_/other/wsl2-pid-1-systemd":{_path:"\u002Fother\u002Fwsl2-pid-1-systemd",_dir:"other",_draft:w,_partial:w,_locale:o,_empty:w,title:"wsl2에서 pid 1을 systemd로 변경하기",description:"잘 만들어놓은 배포판을 가져다 쓰자",tags:["windows",s],page:p,date:"2022-08-14T22:13:27.850+09:00",publish:true,body:{type:E,children:[{type:a,tag:F,props:{id:"systemd로-인한-에러"},children:[{type:a,tag:h,props:{},children:[{type:b,value:x}]},{type:b,value:"로 인한 에러"}]},{type:a,tag:j,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:"wsl2"}]},{type:b,value:"(이하 "},{type:a,tag:h,props:{},children:[{type:b,value:s}]},{type:b,value:")를 그냥 실행할 경우, 다음과 같은 에러를 겪을 때가 있다."}]},{type:a,tag:i,props:{code:"System has not been booted with systemd as init system (PID 1). Can't operate.\n",language:q,meta:p},children:[{type:a,tag:r,props:{},children:[{type:a,tag:i,props:{__ignoreMap:o},children:[{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:"System"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"has"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"not"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"been"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"booted"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"with"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"as"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"init"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"system"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" ("}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:G}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"). "}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"Can't operate."}]}]}]}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"이는 pid 1번이 "},{type:a,tag:h,props:{},children:[{type:b,value:x}]},{type:b,value:" 가 아니어서 생기는 문제로, 해결하기 위해서는 "},{type:a,tag:t,props:{href:"https:\u002F\u002Fgithub.com\u002Farkane-systems\u002Fgenie",rel:[u]},children:[{type:b,value:"genie"}]},{type:b,value:"와 같은 별도의 프로그램을 실행해줘야 했다. 하지만 최근 처음부터 이를 해결한 상태로 wsl을 실행하는 프로젝트를 발견했는데, 바로 "},{type:a,tag:t,props:{href:"https:\u002F\u002Fgithub.com\u002Fnullpo-head\u002Fwsl-distrod",rel:[u]},children:[{type:b,value:y}]},{type:b,value:"다."}]},{type:a,tag:F,props:{id:"distrod를-사용하자"},children:[{type:a,tag:h,props:{},children:[{type:b,value:y}]},{type:b,value:"를 사용하자"}]},{type:a,tag:j,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:y}]},{type:b,value:"를 설치하는 방법은 크게 두가지로 나뉘는데,\n하나는 이미 해당 패치가 적용된 배포판을 사용하거나,\n기존에 사용하던 "},{type:a,tag:h,props:{},children:[{type:b,value:s}]},{type:b,value:"환경에 해당 패치를 적용하는 것이다."}]},{type:a,tag:z,props:{id:I},children:[{type:b,value:J}]},{type:a,tag:j,props:{},children:[{type:a,tag:t,props:{href:"https:\u002F\u002Fgithub.com\u002Fnullpo-head\u002Fwsl-distrod\u002Freleases\u002Flatest\u002Fdownload\u002Fdistrod_wsl_launcher-x86_64.zip",rel:[u]},children:[{type:b,value:"링크"}]},{type:b,value:"의 압축 파일을 해제하면, 단일 exe 파일이 존재하는데, 해당 실행 파일을 실행시키면 끝이다."}]},{type:a,tag:j,props:{},children:[{type:b,value:"굉장히 다양한 배포판(아치, 데비안, 젠투, 보이드 등)을 지원하기에, 대부분의 경우, 선택권을 제한당한다는 기분은 느끼지 못할 것이다."}]},{type:a,tag:z,props:{id:K},children:[{type:b,value:L}]},{type:a,tag:j,props:{},children:[{type:b,value:"이것 또한 아주 간단하다."}]},{type:a,tag:A,props:{},children:[{type:a,tag:B,props:{},children:[{type:b,value:"패치 스크립트를 다운로드 한 다음, 실행한다.(아직 적용되지 않았다.)"}]}]},{type:a,tag:i,props:{code:"curl -L -O \"https:\u002F\u002Fraw.githubusercontent.com\u002Fnullpo-head\u002Fwsl-distrod\u002Fmain\u002Finstall.sh\"\nchmod +x install.sh\nsudo .\u002Finstall.sh install\n",language:q,meta:p},children:[{type:a,tag:r,props:{},children:[{type:a,tag:i,props:{__ignoreMap:o},children:[{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:"curl"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"-L"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"-O"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"\"https:\u002F\u002Fraw.githubusercontent.com\u002Fnullpo-head\u002Fwsl-distrod\u002Fmain\u002Finstall.sh\""}]}]},{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:"chmod"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"+x"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"install.sh"}]}]},{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:"sudo"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:".\u002Finstall.sh"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"install"}]}]}]}]}]},{type:a,tag:A,props:{start:v},children:[{type:a,tag:B,props:{},children:[{type:b,value:"wsl이 처음 실행됐을 때, 다음 명령어를 관리자 권한으로 실행하던가,"}]}]},{type:a,tag:i,props:{code:"\u002Fopt\u002Fdistrod\u002Fbin\u002Fdistrod enable\n",language:q,meta:p},children:[{type:a,tag:r,props:{},children:[{type:a,tag:i,props:{__ignoreMap:o},children:[{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:N}]}]}]}]}]},{type:a,tag:A,props:{start:3},children:[{type:a,tag:B,props:{},children:[{type:b,value:"또는 다음 명령어로 윈도우 스케쥴러에 자동으로 해당 패치가 정상적으로 실행될 수 있도록 한다."}]}]},{type:a,tag:i,props:{code:"\u002Fopt\u002Fdistrod\u002Fbin\u002Fdistrod enable --start-on-windows-boot\n",language:q,meta:p},children:[{type:a,tag:r,props:{},children:[{type:a,tag:i,props:{__ignoreMap:o},children:[{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"--start-on-windows-boot"}]}]}]}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"이제 "},{type:a,tag:h,props:{},children:[{type:b,value:"ps -ef | head -n 2"}]},{type:b,value:"으로 확인해보면,"}]},{type:a,tag:i,props:{code:"UID          PID    PPID  C STIME TTY          TIME CMD\nroot           1       0  0 21:34 ?        00:00:00 \u002Fsbin\u002Finit systemd.setenv=WSL_DISTRO_NAME=Distrod systemd.setenv=WSL_INTEROP=\u002Frun\u002FWSL\u002F11_interop systemd.setenv=WSLENV=WT_SESSION::WT_PROFILE_ID --unit=multi-user.target\n",language:q,meta:p},children:[{type:a,tag:r,props:{},children:[{type:a,tag:i,props:{__ignoreMap:o},children:[{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:"UID"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:G}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"    "}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"PPID"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"C"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"STIME"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"TTY"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"TIME"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"CMD"}]}]},{type:a,tag:l,props:{class:m},children:[{type:a,tag:c,props:{class:k},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"           "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"       "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"21"}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"34"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"?"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"        "}]},{type:a,tag:c,props:{class:D},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:D},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:D},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"\u002Fsbin\u002Finit"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"systemd.setenv=WSL_DISTRO_NAME=Distrod"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"systemd.setenv=WSL_INTEROP=\u002Frun\u002FWSL\u002F11_interop"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:"systemd.setenv=WSLENV=WT_SESSION::WT_PROFILE_ID"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:f}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"--unit=multi-user.target"}]}]}]}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"위와 같이 "},{type:a,tag:h,props:{},children:[{type:b,value:Q}]},{type:b,value:"의 패치가 적용된 것을 확인할 수 있다."}]},{type:a,tag:z,props:{id:R},children:[{type:b,value:S}]},{type:a,tag:j,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:Q}]},{type:b,value:"의 기능 중, "},{type:a,tag:h,props:{},children:[{type:b,value:s}]},{type:b,value:"의 특정 포트를 외부로 포워딩 할 수 있는 "},{type:a,tag:h,props:{},children:[{type:b,value:"portproxy"}]},{type:b,value:"라는 서비스가 있는데, 윈도우 11에서는 정상적으로 작동하지 않는 "},{type:a,tag:t,props:{href:"https:\u002F\u002Fgithub.com\u002Fnullpo-head\u002Fwsl-distrod\u002Fblob\u002Fmain\u002Fdocs\u002Freferences.md#know-bugs",rel:[u]},children:[{type:b,value:"버그"}]},{type:b,value:"가 있다고 한다."}]},{type:a,tag:"style",children:[{type:b,value:".ct-a3256e{color:#CF222E}\n.ct-bd09ab{color:#0550AE}\n.ct-1af745{color:#0A3069}\n.ct-6ba6c6{color:#24292F}\n.ct-a5cc2a{color:#953800}\n.dark .ct-a5cc2a{color:#FFA657}\n.dark .ct-6ba6c6{color:#C9D1D9}\n.dark .ct-1af745{color:#A5D6FF}\n.dark .ct-bd09ab{color:#79C0FF}\n.dark .ct-a3256e{color:#FF7B72}"}]}],toc:{title:o,searchDepth:T,depth:T,links:[{id:I,depth:v,text:J},{id:K,depth:v,text:L},{id:R,depth:v,text:S}]}},_type:"markdown",_id:"content:other:wsl2에서 pid 1을 systemd로 변경하기.md",_source:"content",_file:"other\u002Fwsl2에서 pid 1을 systemd로 변경하기.md",_extension:"md"},"selected_surround_/other/wsl2-pid-1-systemd":[{_path:"\u002Fpython\u002Freturns0",title:"returns로 파이썬 타입을 명확하게 만들자 0",description:"파이썬 타입을 명확하게 만들면 vscode가 착해진다",date:"2022-09-09T02:10:44.645+09:00"},{_path:"\u002Fother\u002Fvim",title:"[Vim] Normal모드에서 영문 키보드로 자동 전환하기 (Windows)",description:"esc를 누르면 자동으로 영문 키보드가 된다.",date:"2022-08-06T20:00:32.948+09:00"}]},prerenderedAt:1680715384682}}("element","text","span","ct-6ba6c6","ct-1af745"," ","ct-bd09ab","code-inline","code","p","ct-a5cc2a","div","line","0","",null,"bash","pre","wsl","a","nofollow",2,false,"systemd","Distrod","h2","ol","li",":","ct-a3256e","root","h1","PID","1","신규-설치","신규 설치","기존-환경에-패치","기존 환경에 패치","\u002Fopt\u002Fdistrod\u002Fbin\u002Fdistrod","enable","          ","  ","distrod","윈도우11은-주의","윈도우11은 주의",5))