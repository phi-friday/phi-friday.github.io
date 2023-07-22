export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa){return {data:{"selected_data_with_surround_/python/type_hint_4":{article:{_path:"\u002Fpython\u002Ftype_hint_4",_dir:D,_draft:E,_partial:E,_locale:u,_empty:E,title:"[코드를 깔끔하게] ruff - 4",description:"생산성 향상을 위해",tags:[D,"linter",k],page:"코드를_깔끔하게",date:"2023-03-18",publish:true,body:{type:"root",children:[{type:a,tag:F,props:{id:M},children:[{type:b,value:"1. 왜 "},{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:"를 사용해야 하는가"}]},{type:a,tag:m,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:N},{type:a,tag:g,props:{},children:[{type:b,value:v}]},{type:b,value:"만 쓰러다도 충분히 일관성 있는 코드 컨벤션을 지킬 수 있다. 하지만 그 코드가 바람직한 형태가 아닐 수 있다. 다음 코드는 "},{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:N},{type:a,tag:g,props:{},children:[{type:b,value:v}]},{type:b,value:"를 통과했지만, 그리 좋은 코드가 아니다."}]},{type:a,tag:n,props:{code:"def test() -\u003E None:\n    a = True\n    b = []\n\n    if a == True:\n        print(\"a is true\")\n    else:\n        print(\"a is false\")\n\n    if len(b) \u003E 0:\n        print(\"a is boolean\")\n\n    if type(b) == list:\n        print(\"b is list\")\n\n    try:\n        raise ValueError(\"asd\")\n    except:\n        print(1)\n\n\n",language:D,meta:A},children:[{type:a,tag:B,props:{},children:[{type:a,tag:n,props:{__ignoreMap:u},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"def"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:"ct-2dbdbd"},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"() -\u003E "}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"None"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    a "}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    b "}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" []"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" a "}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:G}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"a is true\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"else"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"a is false\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"len"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"\u003E"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"0"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"a is boolean\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"type"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"list"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"b is list\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"try"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"raise"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"ValueError"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"asd\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"except"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"1"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"위 함수 "},{type:a,tag:g,props:{},children:[{type:b,value:O}]},{type:b,value:"에는 많은 문제점이 있는데,"}]},{type:a,tag:"ul",props:{},children:[{type:a,tag:r,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:G}]},{type:b,value:R},{type:a,tag:g,props:{},children:[{type:b,value:"False"}]},{type:b,value:" 비교에 "},{type:a,tag:g,props:{},children:[{type:b,value:I}]},{type:b,value:"를 사용한 것."}]},{type:a,tag:r,props:{},children:[{type:b,value:"객체의 타입을 확인할 때 "},{type:a,tag:g,props:{},children:[{type:b,value:"isinstance"}]},{type:b,value:"를 사용하지 않은 것."}]},{type:a,tag:r,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:"try ~ except"}]},{type:b,value:"를 사용할 때 에러 타입을 명시하지 않은 것."}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"등이 있다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"이러한 문제는 "},{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:"이나 "},{type:a,tag:g,props:{},children:[{type:b,value:v}]},{type:b,value:"같은 포맷터로 해결할 수 없기에, 린터를 사용할 수 밖에 없다. 파이썬에서 많이 쓰이는 대표적인 린터는 "},{type:a,tag:g,props:{},children:[{type:b,value:J}]},{type:b,value:"가 있다. "},{type:a,tag:g,props:{},children:[{type:b,value:J}]},{type:b,value:"는 많은 문제점을 확인할 수 있는 유용한 도구지만, 아쉽게도 많이 느리다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"하지만 "},{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:"는 빠르다. 생각보다 훨씬 빠르다. "},{type:a,tag:g,props:{},children:[{type:b,value:"FastAPI"}]},{type:b,value:"의 메인테이너인\nSebastián Ramírezs는 "},{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:"가 정말로 실행된 것인지 의심되어 고의로 에러가 발생하는 코드를 삽입한 적이 있다고 밝힌 적이 있을 정도이다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"즉, 500개 이상의 규칙을 지원하며, "},{type:a,tag:g,props:{},children:[{type:b,value:"pyproject.toml"}]},{type:b,value:"을 사용하여 간단하게 설정이 가능하고, 어떤 린트보다도 빠른 속도를 자랑하는 "},{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:"를 사용하지 않을 이유가 없다."}]},{type:a,tag:"blockquote",props:{},children:[{type:a,tag:m,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:" 개발자의 주장에 따르면, "},{type:a,tag:g,props:{},children:[{type:b,value:J}]},{type:b,value:"보다 100배 이상 빠르며, "},{type:a,tag:g,props:{},children:[{type:b,value:"Autoflake"}]},{type:b,value:"보다 10배 이상 빠르다."}]}]},{type:a,tag:F,props:{id:S},children:[{type:b,value:"2. "},{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:"와 "},{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:R},{type:a,tag:g,props:{},children:[{type:b,value:v}]},{type:b,value:"를 함께 사용하기"}]},{type:a,tag:m,props:{},children:[{type:b,value:"별다른 설정이 필요하지 않다. 만약 "},{type:a,tag:g,props:{},children:[{type:b,value:v}]},{type:b,value:"에 설정을 추가했다면, "},{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:"에서 구현한 "},{type:a,tag:g,props:{},children:[{type:b,value:v}]},{type:b,value:" 규칙과 맞추기 위해, 관련 설정값을 동일하게 추가하면 된다."}]},{type:a,tag:F,props:{id:T},children:[{type:b,value:"3. "},{type:a,tag:g,props:{},children:[{type:b,value:k}]},{type:b,value:"를 사용하는 방법"}]},{type:a,tag:K,props:{},children:[{type:a,tag:r,props:{},children:[{type:b,value:"CLI로 직접 실행하기"}]}]},{type:a,tag:n,props:{code:"❯ poetry run ruff {file or dir name} --fix\n",language:"console",meta:A},children:[{type:a,tag:B,props:{},children:[{type:a,tag:n,props:{__ignoreMap:u},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{},children:[{type:b,value:"❯ poetry run ruff {file or dir name} --fix"}]}]}]}]}]},{type:a,tag:K,props:{start:C},children:[{type:a,tag:r,props:{},children:[{type:b,value:"IDE 확장 설치\nex) vscode\n"},{type:a,tag:U,props:{href:V,rel:[W]},children:[{type:b,value:V}]}]},{type:a,tag:r,props:{},children:[{type:b,value:"CLI로 실행하기를 자동화하기\n"},{type:a,tag:U,props:{href:X,rel:[W]},children:[{type:b,value:X}]},{type:b,value:"\n위 확장을 설치한 다음 저장시 실행할 커맨드를 다음과 같이 설정"}]}]},{type:a,tag:n,props:{code:"{\n    \"emeraldwalk.runonsave\": {\n        \"commands\": [\n            {\n                \"match\": \"\\\\.pyi?$\",\n                \"isAsync\": false,\n                \"cmd\": \"poetry run ruff ${file} --fix\"\n            }\n        ]\n    }\n}\n",language:Y,meta:A},children:[{type:a,tag:B,props:{},children:[{type:a,tag:n,props:{__ignoreMap:u},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"{"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"emeraldwalk.runonsave\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:": {"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"commands\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:": ["}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            {"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"match\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\""}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"\\\\"}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:".pyi?$\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Z}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"isAsync\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"false"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Z}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"cmd\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"poetry run ruff ${file} --fix\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"            }"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        ]"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    }"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"}"}]}]}]}]}]},{type:a,tag:K,props:{start:4},children:[{type:a,tag:r,props:{},children:[{type:b,value:"커밋시 자동으로 실행하기\n"},{type:a,tag:g,props:{},children:[{type:b,value:"pre-commit"}]},{type:b,value:"설치 후 다음과 같이 설정하기"}]}]},{type:a,tag:n,props:{code:"repos:\n    - hooks:\n          - id: ruff\n            name: ruff\n            args:\n                - \"--fix\"\n      repo: https:\u002F\u002Fgithub.com\u002Fcharliermarsh\u002Fruff-pre-commit\n      rev: v0.0.256\n",language:Y,meta:A},children:[{type:a,tag:B,props:{},children:[{type:a,tag:n,props:{__ignoreMap:u},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:t},children:[{type:b,value:"repos"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    - "}]},{type:a,tag:c,props:{class:t},children:[{type:b,value:"hooks"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"          - "}]},{type:a,tag:c,props:{class:t},children:[{type:b,value:"id"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:t},children:[{type:b,value:"name"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:t},children:[{type:b,value:"args"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:l}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"                - "}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"\"--fix\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:t},children:[{type:b,value:"repo"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"https:\u002F\u002Fgithub.com\u002Fcharliermarsh\u002Fruff-pre-commit"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:t},children:[{type:b,value:"rev"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"v0.0.256"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"자동 수정이 아닌 확인만 하고 싶다면 "},{type:a,tag:g,props:{},children:[{type:b,value:"--fix"}]},{type:b,value:"를 제거하면 된다."}]},{type:a,tag:"style",children:[{type:b,value:".ct-ccc558{color:#116329}\n.ct-d88739{color:#0A3069}\n.ct-2787e1{color:#0550AE}\n.ct-2dbdbd{color:#8250DF}\n.ct-87fbf3{color:#24292F}\n.ct-3db13d{color:#CF222E}\n.dark .ct-3db13d{color:#FF7B72}\n.dark .ct-87fbf3{color:#C9D1D9}\n.dark .ct-2dbdbd{color:#D2A8FF}\n.dark .ct-2787e1{color:#79C0FF}\n.dark .ct-d88739{color:#A5D6FF}\n.dark .ct-ccc558{color:#7EE787}"}]}],toc:{title:u,searchDepth:aa,depth:aa,links:[{id:M,depth:C,text:"1. 왜 ruff를 사용해야 하는가"},{id:S,depth:C,text:"2. ruff와 black, isort를 함께 사용하기"},{id:T,depth:C,text:"3. ruff를 사용하는 방법"}]}},_type:"markdown",_id:"content:python:type_hint_4.md",_source:"content",_file:"python\u002Ftype_hint_4.md",_extension:"md"},surround:[{_path:"\u002Fjs\u002Fnextjs-nuxtjs",title:"nextjs에서 nuxtjs로 변경",description:"쓰기 쉬운 nuxt content"},{_path:"\u002Fpython\u002Fwhy_sqlachemy2",title:"sqlalchemy2.0는 무엇이 달라졌고, 왜 써야할까.",description:"더 빠르고 정확해진 orm"}]}},prerenderedAt:1690056939730}}("element","text","span","ct-87fbf3","div","line","code-inline","ct-d88739","ct-2787e1","ct-3db13d","ruff",":","p","code"," ","    ","        ","li",": ","ct-ccc558","","isort","(",")","print","black",null,"pre",2,"python",false,"h2","True","if","==","pylint","ol","                ","1-왜-ruff를-사용해야-하는가","과 ","test","=","(b) ",", ","2-ruff와-black-isort를-함께-사용하기","3-ruff를-사용하는-방법","a","https:\u002F\u002Fgithub.com\u002Fcharliermarsh\u002Fruff-vscode","nofollow","https:\u002F\u002Fgithub.com\u002Femeraldwalk\u002Fvscode-runonsave","yaml",",","            ","      ",5))