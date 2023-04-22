export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y){return {data:{"selected_data_with_surround_/python/type_hint_3":{article:{_path:"\u002Fpython\u002Ftype_hint_3",_dir:r,_draft:z,_partial:z,_locale:l,_empty:z,title:"[코드를 깔끔하게] isort - 3",description:L,tags:[r,"formatter",m],page:"코드를_깔끔하게",date:"2023-02-28",publish:true,body:{type:"root",children:[{type:a,tag:A,props:{id:M},children:[{type:b,value:"1. 왜 "},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"를 사용해야 하는가"}]},{type:a,tag:q,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"만 쓰더라도 충분히 일관성 있는 코드 컨벤션을 지킬 수 있다. 하지만 "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"의 규칙에서 "},{type:a,tag:h,props:{},children:[{type:b,value:j}]},{type:b,value:" 순서는 지정되어 있지 않다. 따라서 다음의 두 코드는 "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"을 사용해도 수정되지 않는다."}]},{type:a,tag:i,props:{code:"import os\nfrom pathlib import Path\nfrom sys import modules\nfrom subprocess import run\n",language:r,meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:B}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:G}]}]}]}]}]},{type:a,tag:i,props:{code:"from sys import modules\nfrom subprocess import run\nfrom pathlib import Path\nimport os\n",language:r,meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:B}]}]}]}]}]},{type:a,tag:q,props:{},children:[{type:b,value:"다소 극단적인 예지만, 저 두가지 경우가 혼재된 패키지가 없다고 단정지을 수 있을까."}]},{type:a,tag:q,props:{},children:[{type:b,value:"이러한 문제를 해결하는데 "},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"를 많은 도움을 준다. 위 코드에 "},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"를 적용하면 다음과 같이 변환된다."}]},{type:a,tag:i,props:{code:"import os\nfrom pathlib import Path\nfrom subprocess import run\nfrom sys import modules\n",language:r,meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:B}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]}]}]}]},{type:a,tag:q,props:{},children:[{type:b,value:"어떻게 순서를 정렬하더라도, 특별한 설정을 추가하지 않는 이상, "},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"는 위 순서를 보장한다."}]},{type:a,tag:A,props:{id:N},children:[{type:b,value:"2. "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:O},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"를 함께 사용하기"}]},{type:a,tag:q,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:O},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"는 둘 다 유용하지만 함께 쓰기 위해서는 약간의 파라미터를 추가해야한다. 특정한 규칙이 두 라이브러리 사이에서 상충되기 때문인데, 그 예는 다음과 같다."}]},{type:a,tag:i,props:{code:"## black\nfrom subprocess import (\n    CalledProcessError,\n    CompletedProcess,\n    call,\n    check_call,\n    check_output,\n    run,\n)\n",language:r,meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:w},children:[{type:b,value:"## black"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" ("}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    CalledProcessError,"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    CompletedProcess,"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    call,"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    check_call,"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    check_output,"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    run,"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:")"}]}]}]}]}]},{type:a,tag:i,props:{code:"## isort\nfrom subprocess import (CalledProcessError, CompletedProcess, call, check_call,\n                        check_output, run)\n",language:r,meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:w},children:[{type:b,value:"## isort"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" (CalledProcessError, CompletedProcess, call, check_call,"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"                        check_output, run)"}]}]}]}]}]},{type:a,tag:q,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"은 콤마가 있다면 줄바꿈을 시도하지만, "},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"는 설정된 폭을 유지한다면 줄바꿈을 시도하지 않는다.\n이를 해결하는 방법은 간단한데, "},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"를 사용할 때, "},{type:a,tag:h,props:{},children:[{type:b,value:"--profile black"}]},{type:b,value:" 를 추가하면 된다."}]},{type:a,tag:q,props:{},children:[{type:b,value:"만약 "},{type:a,tag:h,props:{},children:[{type:b,value:"pyroject.toml"}]},{type:b,value:"로 패키지를 관리한다면 다음과 같이 설정값을 추가하면 된다."}]},{type:a,tag:i,props:{code:"[tool.isort]\nprofile = \"black\"\n",language:"js",meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"[tool.isort]"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"profile "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"="}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" "}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"black\""}]}]}]}]}]},{type:a,tag:A,props:{id:P},children:[{type:b,value:"3. "},{type:a,tag:h,props:{},children:[{type:b,value:m}]},{type:b,value:"를 사용하는 방법"}]},{type:a,tag:H,props:{},children:[{type:a,tag:x,props:{},children:[{type:b,value:"CLI로 직접 실행하기"}]}]},{type:a,tag:i,props:{code:"❯ poetry run isort {file or dir name}\n",language:"console",meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{},children:[{type:b,value:"❯ poetry run isort {file or dir name}"}]}]}]}]}]},{type:a,tag:H,props:{start:y},children:[{type:a,tag:x,props:{},children:[{type:b,value:"IDE 확장 설치\nex) vscode\n"},{type:a,tag:Q,props:{href:R,rel:[S]},children:[{type:b,value:R}]}]},{type:a,tag:x,props:{},children:[{type:b,value:"CLI로 실행하기를 자동화하기\n"},{type:a,tag:Q,props:{href:T,rel:[S]},children:[{type:b,value:T}]},{type:b,value:"\n위 확장을 설치한 다음 저장시 실행할 커맨드를 다음과 같이 설정"}]}]},{type:a,tag:i,props:{code:"{\n    \"emeraldwalk.runonsave\": {\n        \"commands\": [\n            {\n                \"match\": \"\\\\.pyi?$\",\n                \"isAsync\": false,\n                \"cmd\": \"poetry run isort ${file}\"\n            }\n        ]\n    }\n}\n",language:U,meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"{"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    "}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"emeraldwalk.runonsave\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:": {"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        "}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"commands\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:": ["}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            {"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"match\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\""}]},{type:a,tag:c,props:{class:J},children:[{type:b,value:"\\\\"}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:".pyi?$\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"isAsync\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:J},children:[{type:b,value:"false"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"cmd\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"poetry run isort ${file}\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            }"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        ]"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    }"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"}"}]}]}]}]}]},{type:a,tag:H,props:{start:4},children:[{type:a,tag:x,props:{},children:[{type:b,value:"커밋시 자동으로 실행하기\n"},{type:a,tag:h,props:{},children:[{type:b,value:"pre-commit"}]},{type:b,value:"설치 후 다음과 같이 설정하기"}]}]},{type:a,tag:i,props:{code:"repos:\n    - hooks:\n          - id: isort\n            name: isort (python)\n            # args:\n            #     - \"--check-only\"\n      repo: https:\u002F\u002Fgithub.com\u002Fpycqa\u002Fisort\n      rev: 5.12.0\n",language:U,meta:o},children:[{type:a,tag:p,props:{},children:[{type:a,tag:i,props:{__ignoreMap:l},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:u},children:[{type:b,value:"repos"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:W}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    - "}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:"hooks"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:W}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"          - "}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:"id"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:m}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:"name"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"isort (python)"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"# args:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"#     - \"--check-only\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:"repo"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"https:\u002F\u002Fgithub.com\u002Fpycqa\u002Fisort"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:"rev"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:J},children:[{type:b,value:"5.12.0"}]}]}]}]}]},{type:a,tag:q,props:{},children:[{type:b,value:"자동 수정이 아닌 확인만 하고 싶다면 주석을 해제하면 된다."}]},{type:a,tag:"style",children:[{type:b,value:".ct-02f29a{color:#116329}\n.ct-008666{color:#0550AE}\n.ct-2415cb{color:#0A3069}\n.ct-5fdbbd{color:#6E7781}\n.ct-98568f{color:#24292F}\n.ct-0d9299{color:#CF222E}\n.dark .ct-0d9299{color:#FF7B72}\n.dark .ct-98568f{color:#C9D1D9}\n.dark .ct-5fdbbd{color:#8B949E}\n.dark .ct-2415cb{color:#A5D6FF}\n.dark .ct-008666{color:#79C0FF}\n.dark .ct-02f29a{color:#7EE787}"}]}],toc:{title:l,searchDepth:Y,depth:Y,links:[{id:M,depth:y,text:"1. 왜 isort를 사용해야 하는가"},{id:N,depth:y,text:"2. black과 isort를 함께 사용하기"},{id:P,depth:y,text:"3. isort를 사용하는 방법"}]}},_type:"markdown",_id:"content:python:type_hint_3.md",_source:"content",_file:"python\u002Ftype_hint_3.md",_extension:"md"},surround:[{_path:"\u002Fpython\u002Fwhy_sqlachemy2",title:"sqlalchemy2.0는 무엇이 달라졌고, 왜 써야할까.",description:"더 빠르고 정확해진 orm"},{_path:"\u002Fpython\u002Ftype_hint_2",title:"[코드를 깔끔하게] black - 2",description:L}]}},prerenderedAt:1682148329588}}("element","text","span","ct-98568f","div","line","ct-0d9299","code-inline","code","import","ct-2415cb","","isort","from",null,"pre","p","python",": ","black","ct-02f29a"," subprocess ","ct-5fdbbd","li",2,false,"h2"," os"," pathlib "," Path"," sys "," modules"," run","ol","                ","ct-008666","            ","생산성 향상을 위해","1-왜-isort를-사용해야-하는가","2-black과-isort를-함께-사용하기","과 ","3-isort를-사용하는-방법","a","https:\u002F\u002Fgithub.com\u002Fmicrosoft\u002Fvscode-isort","nofollow","https:\u002F\u002Fgithub.com\u002Femeraldwalk\u002Fvscode-runonsave","yaml",",",":","      ",5))