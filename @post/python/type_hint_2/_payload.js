export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as){return {data:{"selected_data_with_surround_/python/type_hint_2":{article:{_path:"\u002Fpython\u002Ftype_hint_2",_dir:x,_draft:D,_partial:D,_locale:n,_empty:D,title:"[코드를 깔끔하게] black - 2",description:E,tags:[x,"formatter",q],page:"코드를_깔끔하게",date:"2023-02-21",publish:true,body:{type:"root",children:[{type:a,tag:K,props:{id:L},children:[{type:b,value:"1. 왜 "},{type:a,tag:j,props:{},children:[{type:b,value:q}]},{type:b,value:"을 사용해야 하는가"}]},{type:a,tag:o,props:{},children:[{type:b,value:"사람마다 선호하는 코딩 스타일이 존재한다. 괄호 위치에 따른 "},{type:a,tag:j,props:{},children:[{type:b,value:"Allman"}]},{type:b,value:"이나 "},{type:a,tag:j,props:{},children:[{type:b,value:"K&R"}]},{type:b,value:" 등이 있고, 변수명에 따른 "},{type:a,tag:j,props:{},children:[{type:b,value:"CamelCase"}]},{type:b,value:"나 "},{type:a,tag:j,props:{},children:[{type:b,value:"snake_case"}]},{type:b,value:" 등이 있다."}]},{type:a,tag:o,props:{},children:[{type:b,value:"혼자 작성하여 혼자 수정하고 혼자 사용하는 코드라면, 자신의 코딩 스타일로 일관성 있는 코드 작성이 가능하다. 하지만 다른 사람과 함께 협업할 때, 이러한 코딩 스타일이 혼재될 수 있고, 이는 가독성을 해치는 요소가 된다."}]},{type:a,tag:o,props:{},children:[{type:b,value:"따라서 원활한 협업을 위해 코딩 스타일이 사전에 설정할 필요가 있다. 이때 범용적으로 사용되는 툴에는 "},{type:a,tag:j,props:{},children:[{type:b,value:M}]},{type:b,value:"가 있다. 하지만 "},{type:a,tag:j,props:{},children:[{type:b,value:M}]},{type:b,value:"자체의 설정 값이 너무 다양하여, 하나씩 설정하는 것도 일이다."}]},{type:a,tag:o,props:{},children:[{type:b,value:"이런 일이 매번 반복되다 보니, 프로그래밍과 직접적인 연관이 없는 위와 같은 요소에 대한 고민을 하지 말자는 얘기가 나왔고, 이때 탄생한 것이 바로 "},{type:a,tag:j,props:{},children:[{type:b,value:q}]},{type:b,value:"이다."}]},{type:a,tag:o,props:{},children:[{type:a,tag:j,props:{},children:[{type:b,value:q}]},{type:b,value:"을 사용한다면 고민할 설정값은 한 줄당 최대 글자 수 위에는 없다고 봐도 좋다. 사용자는 어떤 포맷을 사용할지 고민할 필요가 없고, "},{type:a,tag:j,props:{},children:[{type:b,value:"black {filename}"}]},{type:b,value:"으로 실행하기만 하면 된다."}]},{type:a,tag:o,props:{},children:[{type:b,value:"다음 두 코드는 포맷을 제외하고 동일하다.\n(출처: "},{type:a,tag:F,props:{href:N,rel:[G]},children:[{type:b,value:N}]},{type:b,value:")"}]},{type:a,tag:l,props:{code:"def is_unique(\n            s\n            ):\n    s = list(s\n                )\n    s.sort()\n\n\n    for i in range(len(s) - 1):\n        if s[i] == s[i + 1]:\n            return 0\n    else:\n        return 1\n\n\nif __name__ == \"__main__\":\n    print(\n        is_unique(input())\n        )\n\n",language:x,meta:u},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:n},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:P},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            s"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            ):"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(s"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"                )"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:U}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:Y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aa}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ac}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:af}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ag}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:r}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:aj}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        is_unique("}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:al}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"())"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        )"}]}]}]}]}]},{type:a,tag:l,props:{code:"def is_unique(s):\n    s = list(s)\n    s.sort()\n\n    for i in range(len(s) - 1):\n        if s[i] == s[i + 1]:\n            return 0\n    else:\n        return 1\n\n\nif __name__ == \"__main__\":\n    print(is_unique(input()))\n\n",language:x,meta:u},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:n},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:P},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(s):"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(s)"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:U}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:Y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aa}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ac}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:af}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ag}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:r}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:aj}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(is_unique("}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:al}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"()))"}]}]}]}]}]},{type:a,tag:K,props:{id:am},children:[{type:b,value:"2. "},{type:a,tag:j,props:{},children:[{type:b,value:q}]},{type:b,value:"을 사용하는 방법"}]},{type:a,tag:H,props:{},children:[{type:a,tag:C,props:{},children:[{type:b,value:"CLI로 직접 실행하기"}]}]},{type:a,tag:l,props:{code:"❯ poetry run black {file or dir name}\nAll done! ✨ 🍰 ✨\n22 files left unchanged.\n",language:"console",meta:u},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:n},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{},children:[{type:b,value:"❯ poetry run black {file or dir name}\nAll done! ✨ 🍰 ✨\n22 files left unchanged."}]}]}]}]}]},{type:a,tag:H,props:{start:I},children:[{type:a,tag:C,props:{},children:[{type:b,value:"IDE 확장 설치\nex) vscode\n"},{type:a,tag:F,props:{href:an,rel:[G]},children:[{type:b,value:an}]}]},{type:a,tag:C,props:{},children:[{type:b,value:"CLI로 실행하기를 자동화하기\n"},{type:a,tag:F,props:{href:ao,rel:[G]},children:[{type:b,value:ao}]},{type:b,value:"\n위 확장을 설치한 다음 저장시 실행할 커맨드를 다음과 같이 설정"}]}]},{type:a,tag:l,props:{code:"{\n    \"emeraldwalk.runonsave\": {\n        \"commands\": [\n            {\n                \"match\": \"\\\\.pyi?$\",\n                \"isAsync\": false,\n                \"cmd\": \"poetry run black ${file}\"\n            }\n        ]\n    }\n}\n",language:ap,meta:u},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:n},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"{"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"emeraldwalk.runonsave\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:": {"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"commands\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:": ["}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            {"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"match\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\""}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\\\\"}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:".pyi?$\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aq}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"isAsync\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"false"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aq}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"cmd\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"\"poetry run black ${file}\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            }"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        ]"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    }"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"}"}]}]}]}]}]},{type:a,tag:H,props:{start:4},children:[{type:a,tag:C,props:{},children:[{type:b,value:"커밋시 자동으로 실행하기\n"},{type:a,tag:j,props:{},children:[{type:b,value:"pre-commit"}]},{type:b,value:"설치 후 다음과 같이 설정하기"}]}]},{type:a,tag:l,props:{code:"repos:\n  - hooks:\n      - id: black\n        # args:\n        #   - \"--check\"\n    rev: 22.3.0\n    repo: https:\u002F\u002Fgithub.com\u002Fpsf\u002Fblack\n",language:ap,meta:u},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:n},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:w},children:[{type:b,value:"repos"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"  - "}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"hooks"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"      - "}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"id"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:q}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:ar},children:[{type:b,value:"# args:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:ar},children:[{type:b,value:"#   - \"--check\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"rev"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"22.3.0"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"repo"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:k},children:[{type:b,value:"https:\u002F\u002Fgithub.com\u002Fpsf\u002Fblack"}]}]}]}]}]},{type:a,tag:o,props:{},children:[{type:b,value:"자동 수정이 아닌 확인만 하고 싶다면 주석을 해제하면 된다."}]},{type:a,tag:"style",children:[{type:b,value:".ct-c5c542{color:#6E7781}\n.ct-7608c9{color:#116329}\n.ct-db882f{color:#0A3069}\n.ct-7779de{color:#0550AE}\n.ct-020943{color:#8250DF}\n.ct-469281{color:#24292F}\n.ct-b9767e{color:#CF222E}\n.dark .ct-b9767e{color:#FF7B72}\n.dark .ct-469281{color:#C9D1D9}\n.dark .ct-020943{color:#D2A8FF}\n.dark .ct-7779de{color:#79C0FF}\n.dark .ct-db882f{color:#A5D6FF}\n.dark .ct-7608c9{color:#7EE787}\n.dark .ct-c5c542{color:#8B949E}"}]}],toc:{title:n,searchDepth:as,depth:as,links:[{id:L,depth:I,text:"1. 왜 black을 사용해야 하는가"},{id:am,depth:I,text:"2. black을 사용하는 방법"}]}},_type:"markdown",_id:"content:python:type_hint_2.md",_source:"content",_file:"python\u002Ftype_hint_2.md",_extension:"md"},surround:[{_path:"\u002Fpython\u002Ftype_hint_3",title:"[코드를 깔끔하게] isort - 3",description:E},{_path:"\u002Fpython\u002Ftype_hint_1",title:"[코드를 깔끔하게] type hint - 1",description:E}]}},prerenderedAt:1682432102035}}("element","text","span","ct-469281","div","line","ct-b9767e","ct-7779de"," ","code-inline","ct-db882f","code","    ","","p","        ","black","1",":",": ",null,"pre","ct-7608c9","python","(","if","==","return","li",false,"생산성 향상을 위해","a","nofollow","ol",2,"                ","h2","1-왜-black을-사용해야-하는가","prettier","https:\u002F\u002Fwww.geeksforgeeks.org\u002Fpython-code-formatting-using-black\u002F","def","ct-020943","is_unique","    s ","=","list","    s.sort()","for"," i ","in","range","len","(s) ","-","):"," s[i] "," s[i ","+","]:","            ","0","else","__name__","\"__main__\"","print","input","2-black을-사용하는-방법","https:\u002F\u002Fgithub.com\u002Fmicrosoft\u002Fvscode-black-formatter","https:\u002F\u002Fgithub.com\u002Femeraldwalk\u002Fvscode-runonsave","yaml",",","ct-c5c542",5))