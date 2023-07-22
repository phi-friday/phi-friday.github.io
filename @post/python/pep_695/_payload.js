export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE){return {data:{"selected_data_with_surround_/python/pep_695":{article:{_path:"\u002Fpython\u002Fpep_695",_dir:s,_draft:M,_partial:M,_locale:t,_empty:M,title:"더 편한 타입 힌트를 위한 PEP695",description:"python 3.12에 새롭게 추가\u002F변경되는 문법",tags:[s,"typehint"],date:"2023-07-22T18:48:21.115Z",publish:true,body:{type:"root",children:[{type:a,tag:N,props:{id:ac},children:[{type:b,value:ad}]},{type:a,tag:m,props:{},children:[{type:b,value:"PEP는 파이썬 커뮤니티에서 논의된 주제를 문서화 한 것이다.\n대표적으로 "},{type:a,tag:J,props:{href:"https:\u002F\u002Fpeps.python.org\u002Fpep-0020\u002F",rel:[K]},children:[{type:b,value:"PEP20"}]},{type:b,value:"과 "},{type:a,tag:J,props:{href:"https:\u002F\u002Fpeps.python.org\u002Fpep-0008\u002F",rel:[K]},children:[{type:b,value:"PEP8"}]},{type:b,value:"이 있다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"이번에 얘기하고자 하는 것은 PEP695다."}]},{type:a,tag:m,props:{},children:[{type:a,tag:J,props:{href:"https:\u002F\u002Fpeps.python.org\u002Fpep-0695\u002F",rel:[K]},children:[{type:b,value:"PEP695"}]},{type:b,value:"는\n기존의 타입힌트 작성 방식인 "},{type:a,tag:J,props:{href:"https:\u002F\u002Fpeps.python.org\u002Fpep-0484\u002F",rel:[K]},children:[{type:b,value:"PEP484"}]},{type:b,value:"에서\n다른 정적 언어와 유사한 형태로 변경하는 것으로,\npython 3.12에 적용 될 것으로 예정돼있다."}]},{type:a,tag:D,props:{id:ae},children:[{type:b,value:af}]},{type:a,tag:m,props:{},children:[{type:b,value:"PEP484는 타입힌트에 대해 가장 먼저 논의 된 것으로, 이 PEP를 기반으로 하여 여러 보완 PEP가 작성되었다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"많은 부분에서 발전이 있었지만, 여전히 아쉬운 부분은 바로 제네릭에 표현 방식이다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"PEP484의 제네릭 표현식은 다음과 같다."}]},{type:a,tag:l,props:{code:"from typing import Sequence, TypeVar\n\nValueT = TypeVar(\"ValueT\")\n\n\ndef first(seq: Sequence[ValueT]) -\u003E ValueT:\n    return seq[0]\n",language:s,meta:E},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" Sequence, TypeVar"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:G},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:A},children:[{type:b,value:"first"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(seq: Sequence[ValueT]) -\u003E ValueT:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"return"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" seq["}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"0"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"]"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"위와 같은 방식으로 변수를 정의하기에,\nCovariance와 Contravariance라는 다소 생소한 개념에 대해 알 필요가 있으며,\n이를 고려하고 사용해야한다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"이를 고려한 제네릭 표현식은 다음과 같다."}]},{type:a,tag:l,props:{code:"from typing import Generic, Iterable, Iterator, TypeVar\n\nValueT_co = TypeVar(\"ValueT_co\", covariant=True)\n\n\nclass ImmutableList(Generic[ValueT_co]):\n    def __init__(self, items: Iterable[ValueT_co]) -\u003E None:\n        ...\n\n    def __iter__(self) -\u003E Iterator[ValueT_co]:\n        ...\n\n\nclass Employee:\n    ...\n\n\nclass Manager(Employee):\n    ...\n\n\ndef dump_employees(emps: ImmutableList[Employee]) -\u003E None:\n    ...\n\n\nmgrs = ImmutableList([Manager()])  # type: ImmutableList[Manager]\ndump_employees(mgrs)  # OK\n",language:s,meta:E},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ag}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:G},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:aj}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:al}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self, items: Iterable[ValueT_co]) -\u003E "}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self) -\u003E Iterator[ValueT_co]:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:W}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:A},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Y}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:q},children:[{type:b,value:$}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:q},children:[{type:b,value:"# OK"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"만약 여기서 "},{type:a,tag:am,props:{},children:[{type:b,value:R}]},{type:b,value:" 옵션을 제거하면 다음과 같이 에러를 발생시킨다."}]},{type:a,tag:l,props:{code:"from __future__ import annotations\n\nfrom typing import Generic, Iterable, Iterator, TypeVar\n\nValueT = TypeVar(\"ValueT\")\n\n\nclass ImmutableList(Generic[ValueT]):\n    def __init__(self, items: Iterable[ValueT]) -\u003E None:\n        ...\n\n    def __iter__(self) -\u003E Iterator[ValueT]:\n        ...\n\n\nclass Employee:\n    ...\n\n\nclass Manager(Employee):\n    ...\n\n\ndef dump_employees(emps: ImmutableList[Employee]) -\u003E None:\n    ...\n\n\nmgrs = ImmutableList([Manager()])  # type: ImmutableList[Manager]\ndump_employees(mgrs)  # Error!\n# Argument of type \"ImmutableList[Manager]\" cannot be assigned to parameter\n#   \"emps\" of type \"ImmutableList[Employee]\" in function \"dump_employees\"\n#   \"ImmutableList[Manager]\" is incompatible with \"ImmutableList[Employee]\"\n#     TypeVar \"ValueT@ImmutableList\" is invariant\n#       \"Manager\" is incompatible with\n#       \"Employee\"PylancereportGeneralTypeIssues\n",language:s,meta:E},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:"__future__"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" annotations"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ag}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:G},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(Generic[ValueT]):"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self, items: Iterable[ValueT]) -\u003E "}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self) -\u003E Iterator[ValueT]:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:W}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:A},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Y}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:q},children:[{type:b,value:$}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:q},children:[{type:b,value:"# Error!"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:q},children:[{type:b,value:"# Argument of type \"ImmutableList[Manager]\" cannot be assigned to parameter"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:q},children:[{type:b,value:"#   \"emps\" of type \"ImmutableList[Employee]\" in function \"dump_employees\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:q},children:[{type:b,value:"#   \"ImmutableList[Manager]\" is incompatible with \"ImmutableList[Employee]\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:q},children:[{type:b,value:"#     TypeVar \"ValueT@ImmutableList\" is invariant"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:q},children:[{type:b,value:"#       \"Manager\" is incompatible with"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:q},children:[{type:b,value:"#       \"Employee\"PylancereportGeneralTypeIssues"}]}]}]}]}]},{type:a,tag:D,props:{id:an},children:[{type:b,value:ao}]},{type:a,tag:m,props:{},children:[{type:b,value:"PEP695는 PEP484에서 다소 아쉬웠던 제네릭 지원을,\n다른 정적 언어와 유사한 구문으로 변경하는 것이다."}]},{type:a,tag:N,props:{id:ap},children:[{type:b,value:aq}]},{type:a,tag:D,props:{id:ar},children:[{type:b,value:as}]},{type:a,tag:m,props:{},children:[{type:b,value:"앞서 에러를 발생시켰던 예시는 다음과 같이 변경하면 에러를 발생시키지 않게 된다."}]},{type:a,tag:l,props:{code:"from typing import Iterable, Iterator\n\nclass ImmutableList[T]:\n    def __init__(self, items: Iterable[T]) -\u003E None:\n        ...\n\n    def __iter__(self) -\u003E Iterator[T]:\n        ...\n\n\nclass Employee:\n    ...\n\n\nclass Manager(Employee):\n    ...\n\n\ndef dump_employees(emps: ImmutableList[Employee]) -\u003E None:\n    ...\n\n\nmgrs = ImmutableList([Manager()])  # type: ImmutableList[Manager]\ndump_employees(mgrs)  # Ok\n",language:s,meta:E},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" Iterable, Iterator"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" ImmutableList[T]:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self, items: Iterable[T]) -\u003E "}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self) -\u003E Iterator[T]:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:W}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:A},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Y}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:u}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:q},children:[{type:b,value:$}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:q},children:[{type:b,value:"# Ok"}]}]}]}]}]},{type:a,tag:D,props:{id:at},children:[{type:b,value:au}]},{type:a,tag:m,props:{},children:[{type:b,value:"타입의 범위를 좁히는 것 또한 다음과 같이 간결하게 변경되었다."}]},{type:a,tag:l,props:{code:"from typing import Generic, TypeVar\n\nValueT_co = TypeVar(\"ValueT_co\", covariant=True, bound=str)\n\n\nclass ClassA(Generic[ValueT_co]):\n    def method1(self) -\u003E ValueT_co:\n        ...\n",filename:av,language:s,meta:aw},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" Generic, TypeVar"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:G},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:aj}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:"bound"}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ax}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:p},children:[{type:b,value:"ClassA"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:al}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:A},children:[{type:b,value:ay}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self) -\u003E ValueT_co:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]}]}]}]},{type:a,tag:l,props:{code:"class ClassA[T: str]:\n    def method1(self) -\u003E T:\n        ...\n",filename:az,language:s,meta:aA},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" ClassA[T: "}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:ax}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"]:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:i}]},{type:a,tag:c,props:{class:A},children:[{type:b,value:ay}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self) -\u003E T:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:h},children:[{type:b,value:k}]}]}]}]}]},{type:a,tag:D,props:{id:aB},children:[{type:b,value:aC}]},{type:a,tag:m,props:{},children:[{type:b,value:"또한 "},{type:a,tag:am,props:{},children:[{type:b,value:"TypeAlias"}]},{type:b,value:"에 대한 새로운 구문이 추가되었다."}]},{type:a,tag:l,props:{code:"from typing import TypeAlias, TypeVar\n\nValueT = TypeVar(\"ValueT\")\n\nListOrSet: TypeAlias = list[ValueT] | set[ValueT]\n",filename:av,language:s,meta:aw},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" TypeAlias, TypeVar"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:G},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"ListOrSet: TypeAlias "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" list[ValueT] "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:aD}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" set[ValueT]"}]}]}]}]}]},{type:a,tag:l,props:{code:"type ListOrSet[T] = list[T] | set[T]\n",filename:az,language:s,meta:aA},children:[{type:a,tag:v,props:{},children:[{type:a,tag:l,props:{__ignoreMap:t},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:h},children:[{type:b,value:"type"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" ListOrSet[T] "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" list[T] "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:aD}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" set[T]"}]}]}]}]}]},{type:a,tag:N,props:{id:L},children:[{type:b,value:L}]},{type:a,tag:m,props:{},children:[{type:b,value:"python 3.12에 새롭게 적용될 PEP다 보니,\n실제로 이 문법을 적용하여 개발할 일은 상당히 먼 일이긴 하다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"그래도 내부적으로 사용할 몇몇 모듈정도는...?"}]},{type:a,tag:"style",children:[{type:b,value:".ct-d06374{color:#6E7781}\n.ct-49f1a2{color:#953800}\n.ct-e7f034{color:#0550AE}\n.ct-c9ffa5{color:#8250DF}\n.ct-64e5d4{color:#0A3069}\n.ct-73db0e{color:#24292F}\n.ct-75227b{color:#CF222E}\n.dark .ct-75227b{color:#FF7B72}\n.dark .ct-73db0e{color:#C9D1D9}\n.dark .ct-64e5d4{color:#A5D6FF}\n.dark .ct-c9ffa5{color:#D2A8FF}\n.dark .ct-e7f034{color:#79C0FF}\n.dark .ct-49f1a2{color:#FFA657}\n.dark .ct-d06374{color:#8B949E}"}]}],toc:{title:t,searchDepth:aE,depth:aE,links:[{id:ac,depth:ab,text:ad,children:[{id:ae,depth:I,text:af},{id:an,depth:I,text:ao}]},{id:ap,depth:ab,text:aq,children:[{id:ar,depth:I,text:as},{id:at,depth:I,text:au},{id:aB,depth:I,text:aC}]},{id:L,depth:ab,text:L}]}},_type:"markdown",_id:"content:python:pep_695.md",_source:"content",_file:"python\u002Fpep_695.md",_extension:"md"},surround:[E,{_path:"\u002Fpython\u002Fmojo",title:"python보다 3만배 빠른 mojo?",description:"정말 슈퍼셋이라면 기대해볼만 하다"}]}},prerenderedAt:1690054462976}}("element","text","span","ct-73db0e","div","line","ct-75227b","ct-e7f034"," ","    ","...","code","p","=","def","ct-49f1a2","ct-d06374","class","python","",":","pre","        ","from","import"," typing ","ct-c9ffa5","None","Employee","h3",null," TypeVar(","ct-64e5d4",")",3,"a","nofollow","여담",false,"h2","ValueT ","\"ValueT\"",", ","covariant","__init__","__iter__","Manager","(","):","dump_employees","(emps: ImmutableList[Employee]) -\u003E ","mgrs "," ImmutableList([Manager()])  ","# type: ImmutableList[Manager]","dump_employees(mgrs)  ",2,"pep란","PEP란","pep484란","PEP484란"," Generic, Iterable, Iterator, TypeVar","ValueT_co ","\"ValueT_co\"","True","ImmutableList","(Generic[ValueT_co]):","code-inline","pep695란","PEP695란","pep695에서-달라진-것","PEP695에서 달라진 것","자동화된-분산-추론","자동화된 분산 추론","간단한-타입-제한","간단한 타입 제한","old","[old]","str","method1","new","[new]","간단한-유형-별칭","간단한 유형 별칭","|",5))