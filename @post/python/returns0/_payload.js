export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw){return {data:{"selected_data_/python/returns0":{_path:"\u002Fpython\u002Freturns0",_dir:q,_draft:M,_partial:M,_locale:x,_empty:M,title:"returns로 파이썬 타입을 명확하게 만들자 0",description:U,tags:[q,s,"함수형 프로그래밍"],page:"dry-python\u002Freturns",date:"2022-09-09T02:10:44.645+09:00",publish:true,body:{type:"root",children:[{type:a,tag:N,props:{id:"2-부족한-python의-type-hint"},children:[{type:b,value:"2% 부족한 "},{type:a,tag:h,props:{},children:[{type:b,value:q}]},{type:b,value:O},{type:a,tag:h,props:{},children:[{type:b,value:y}]}]},{type:a,tag:j,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:q}]},{type:b,value:"에서 "},{type:a,tag:h,props:{},children:[{type:b,value:y}]},{type:b,value:" 지원이 점점 강력해지고, 이를 반영한 라이브러리들이 늘어나다 보니, 나도 "},{type:a,tag:h,props:{},children:[{type:b,value:y}]},{type:b,value:"를 적용해가며 개발을 하고 있다."}]},{type:a,tag:j,props:{},children:[{type:b,value:"하지만 아직 몇몇 아쉬운 부분이 보이는데,"}]},{type:a,tag:j,props:{},children:[{type:b,value:"특정 클래스 메소드의 리턴값을 그 클래스의 인스턴스로 나타내려 할 때, "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"를 사용해서 "},{type:a,tag:h,props:{},children:[{type:b,value:V}]},{type:b,value:"를 일일이 지정해줘서 나타내야 한다던가.."}]},{type:a,tag:C,props:{},children:[{type:a,tag:j,props:{},children:[{type:b,value:"이전에는 "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"를 사용해야 했지만, 이제는 PEP 673이 반영된 "},{type:a,tag:h,props:{},children:[{type:b,value:"typing_extensions"}]},{type:b,value:O},{type:a,tag:h,props:{},children:[{type:b,value:W}]},{type:b,value:"를 사용하면 된다."}]},{type:a,tag:j,props:{},children:[{type:b,value:"하지만 아직 많은 라이브러리가 "},{type:a,tag:h,props:{},children:[{type:b,value:W}]},{type:b,value:"를 사용하고 있지는 않다.(이미 "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"로 많은 부분이 작성되어 있으므로)"}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"나중에 정의될 클래스를 "},{type:a,tag:h,props:{},children:[{type:b,value:y}]},{type:b,value:"로 사용하려면 문자열로 표현해야 한다던가.."}]},{type:a,tag:C,props:{},children:[{type:a,tag:j,props:{},children:[{type:b,value:"3.11에서 수정될 예정이고, "},{type:a,tag:h,props:{},children:[{type:b,value:"__future__"}]},{type:b,value:" 에서 "},{type:a,tag:h,props:{},children:[{type:b,value:"annotation"}]},{type:b,value:" 모듈을 가져오면 미리 사용할 수 있다."}]}]},{type:a,tag:j,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"로 정의된 값을 이용해서 상위 제네릭을 표현할 수 없다던가.."}]},{type:a,tag:u,props:{code:"from typing import TypeVar, Generic\n\n_T = TypeVar(\"_T\")\n_Test = TypeVar(\"_Test\", bound=\"Test\")\n\nclass Test(Generic[_T]):\n    def __init__(self, data: _T):\n        self.data = data\n\ndef test(value: _T[int]) -\u003E _T[int]:\n    ...\n# TypeError: 'TypeVar' object is not subscriptable\n",language:q,meta:P},children:[{type:a,tag:Q,props:{},children:[{type:a,tag:u,props:{__ignoreMap:x},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" typing "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" TypeVar, Generic"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"_T "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:"\"_T\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"_Test "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:"\"_Test\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:Y},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:"\"Test\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:"class"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:Y},children:[{type:b,value:"Test"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(Generic[_T]):"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"__init__"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(self, data: _T):"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"self"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:".data "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" data"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:z},children:[{type:b,value:"test"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(value: _T["}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"]) -\u003E _T["}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"]:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"..."}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:"# TypeError: 'TypeVar' object is not subscriptable"}]}]}]}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"쓰다보니 뭔가 대부분 "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:" 관련인데, 이 중에서 "},{type:a,tag:h,props:{},children:[{type:b,value:t}]},{type:b,value:"를 사용한 상위 제네릭과 관련해서 좀 더 알아봤더니, 제한적으로나마 이를 해결한 라이브러리가 있었는데, 그게 바로 "},{type:a,tag:_,props:{href:"https:\u002F\u002Fgithub.com\u002Fdry-python\u002Freturns",rel:[$]},children:[{type:b,value:s}]},{type:b,value:"다."}]},{type:a,tag:C,props:{},children:[{type:a,tag:j,props:{},children:[{type:b,value:"앞서 상위 제네릭이라 표현한 것은, 일반적으로 "},{type:a,tag:aa,props:{},children:[{type:b,value:ab}]},{type:b,value:" 이라고 하는 것 같다."}]}]},{type:a,tag:N,props:{id:"함수형-프로그래밍에-적합한-returns"},children:[{type:b,value:"함수형 프로그래밍에 적합한 "},{type:a,tag:h,props:{},children:[{type:b,value:s}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"라이브러리 이름이 범용적으로 쓰이는 "},{type:a,tag:h,props:{},children:[{type:b,value:G}]},{type:b,value:"과 너무 유사해서, 제대로 검색이 되지 않는다. 마치 구글의 "},{type:a,tag:h,props:{},children:[{type:b,value:"go"}]},{type:b,value:"를 보는 듯 하다.."}]},{type:a,tag:j,props:{},children:[{type:b,value:"다행히 "},{type:a,tag:h,props:{},children:[{type:b,value:s}]},{type:b,value:" 자체 "},{type:a,tag:_,props:{href:"https:\u002F\u002Freturns.readthedocs.io\u002Fen\u002Flatest\u002Findex.html",rel:[$]},children:[{type:b,value:"문서"}]},{type:b,value:"가 아주 잘 만들어져 있어서, 이해하는데 큰 문제는 없었다."}]},{type:a,tag:j,props:{},children:[{type:b,value:"또한 라이브러리 기능이 간단하면서도 강력해서, "},{type:a,tag:h,props:{},children:[{type:b,value:y}]},{type:b,value:" 외에도 쓸데가 많아보인다. 특히, 함수형 프로그래밍을 하고자 한다면 꽤 유용하지 않을까, 싶었는데 "},{type:a,tag:h,props:{},children:[{type:b,value:"readme"}]},{type:b,value:"에서 함수형 프로그래밍을 위해 만들어진 라이브러리라고 직접 소개하고 있다."}]},{type:a,tag:C,props:{},children:[{type:a,tag:j,props:{},children:[{type:a,tag:"em",props:{},children:[{type:b,value:"Brings functional programming to Python land"}]}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"처음에는 단순히 "},{type:a,tag:aa,props:{},children:[{type:b,value:ab}]},{type:b,value:" 를 위해 알아봤는데, 이제는 이 라이브러리를 어떻게 사용하면 잘 사용할 수 있을까 고민하게 됐다."}]},{type:a,tag:j,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:s}]},{type:b,value:"의 대표적인 기능 두가지만 미리 소개하자면,"}]},{type:a,tag:ac,props:{id:ad},children:[{type:a,tag:h,props:{},children:[{type:b,value:"Optional"}]},{type:b,value:"을 대신 할 "},{type:a,tag:h,props:{},children:[{type:b,value:ae}]}]},{type:a,tag:u,props:{code:"from returns.maybe import Maybe, maybe\n\n\n@maybe\ndef one_or_none(value: int) -\u003E int | None:\n    if value == 1:\n        return value\n    return None\n\n\nmaybe_one0: Maybe[int] = one_or_none(1)\nmaybe_one1: Maybe[int] = one_or_none(2)\n# or\n# maybe_one0: Maybe[int] = Maybe.from_optional(1)\n# maybe_one1: Maybe[int] = Maybe.from_optional(None)\n\nmaybe_str0 = maybe_one0.bind_optional(str)\nmaybe_str1 = maybe_one1.bind_optional(str)\n\nassert maybe_str0.value_or(\"error\") == \"1\"\nassert maybe_str1.value_or(\"error\") == \"error\"\n",language:q,meta:P},children:[{type:a,tag:Q,props:{},children:[{type:a,tag:u,props:{__ignoreMap:x},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" returns.maybe "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" Maybe, maybe"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:z},children:[{type:b,value:"@maybe"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:z},children:[{type:b,value:"one_or_none"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(value: "}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:af}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"|"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:S}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ag}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" value "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:S}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:G}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" value"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:G}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:R}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"maybe_one0: Maybe["}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"maybe_one1: Maybe["}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:T}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:"# maybe_one0: Maybe[int] = Maybe.from_optional(1)"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:"# maybe_one1: Maybe[int] = Maybe.from_optional(None)"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"maybe_str0 "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" maybe_one0.bind_optional("}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"maybe_str1 "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" maybe_one1.bind_optional("}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" maybe_str0.value_or("}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:"\"1\""}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" maybe_str1.value_or("}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:w}]}]}]}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"원래라면 "},{type:a,tag:h,props:{},children:[{type:b,value:ag}]},{type:b,value:"문을 사용해서 "},{type:a,tag:h,props:{},children:[{type:b,value:R}]},{type:b,value:" 타입 확인을 하고 진행했겠지만,"}]},{type:a,tag:j,props:{},children:[{type:a,tag:h,props:{},children:[{type:b,value:ae}]},{type:b,value:"는 마치 "},{type:a,tag:h,props:{},children:[{type:b,value:"js"}]},{type:b,value:O},{type:a,tag:h,props:{},children:[{type:b,value:"some_object?.some_attr"}]},{type:b,value:"과 같은 방식으로 전개할 수 있게 만들어준다."}]},{type:a,tag:ac,props:{id:aj},children:[{type:a,tag:h,props:{},children:[{type:b,value:"try"}]},{type:b,value:p},{type:a,tag:h,props:{},children:[{type:b,value:"except"}]},{type:b,value:"를 대신할 "},{type:a,tag:h,props:{},children:[{type:b,value:"Result"}]}]},{type:a,tag:u,props:{code:"from returns.converters import result_to_maybe\nfrom returns.result import Result, safe\n\n\n@safe\ndef div(left: float, right: float) -\u003E float:\n    # if right == 0:\n    # raise ZeroDivisionError\n    return left \u002F right\n\n\nresult0: Result[float, Exception] = div(2, 3)\n# or\n# result0: Result[float, ZeroDivisionError]\n# or\n# from returns.result import ResultE\n# result0: ResultE[float] = div(2, 3)\nresult1: Result[float, Exception] = div(4, 0)\n\nassert (\n    result_to_maybe(result0.map(lambda x: x**2).alt(str)).value_or(\"error\")\n) == 4 \u002F 9\n\nassert (\n    result_to_maybe(result1.map(lambda x: x**2).alt(str)).value_or(\"error\")\n) == \"error\"\n",language:q,meta:P},children:[{type:a,tag:Q,props:{},children:[{type:a,tag:u,props:{__ignoreMap:x},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" returns.converters "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" result_to_maybe"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" returns.result "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" Result, safe"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:z},children:[{type:b,value:"@safe"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:z},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(left: "}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:", right: "}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:af}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:S}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"# if right == 0:"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"# raise ZeroDivisionError"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:r}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:G}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" left "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" right"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"result0: Result["}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:al}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:am}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"3"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:T}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:"# result0: Result[float, ZeroDivisionError]"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:T}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:"# from returns.result import ResultE"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:"# result0: ResultE[float] = div(2, 3)"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"result1: Result["}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:al}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:am}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:an}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"0"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ao}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    result_to_maybe(result0.map("}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ap}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aq}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ar}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:as}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:at}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:an}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"9"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ao}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"    result_to_maybe(result1.map("}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ap}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aq}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:ar}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:as}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:at}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:n},children:[{type:b,value:w}]}]}]}]}]},{type:a,tag:j,props:{},children:[{type:b,value:"에러에 대해 미리 고민 할 필요 없이, 기본적으로 제공되는 "},{type:a,tag:h,props:{},children:[{type:b,value:"map"}]},{type:b,value:p},{type:a,tag:h,props:{},children:[{type:b,value:"bind"}]},{type:b,value:p},{type:a,tag:h,props:{},children:[{type:b,value:"alt"}]},{type:b,value:p},{type:a,tag:h,props:{},children:[{type:b,value:"lash"}]},{type:b,value:" 등의 메소드를 사용하면 된다."}]},{type:a,tag:j,props:{},children:[{type:b,value:"올바른 타입이 아니라면 작동하지 않고, 추가적인 에러도 발생하지 않는다."}]},{type:a,tag:j,props:{},children:[{type:b,value:"위 예시에서는 문자열 "},{type:a,tag:h,props:{},children:[{type:b,value:"error"}]},{type:b,value:"를 표시했지만, 원한다면 그 에러를 발생시킬 수도 있다."}]},{type:a,tag:N,props:{id:au},children:[{type:b,value:au}]},{type:a,tag:j,props:{},children:[{type:b,value:"시간이 될 때, "},{type:a,tag:h,props:{},children:[{type:b,value:s}]},{type:b,value:"의 공식 문서를 나름대로 정리해서 포스팅을 하고자 한다. 하지만 이것도 다른 것과 마찬가지로 하다가 중단될 수 있다.."}]},{type:a,tag:"style",children:[{type:b,value:".ct-ce4dff{color:#6E7781}\n.ct-fc289c{color:#8250DF}\n.ct-f685fe{color:#0550AE}\n.ct-587780{color:#953800}\n.ct-b76448{color:#0A3069}\n.ct-f39932{color:#24292F}\n.ct-6eb1a1{color:#CF222E}\n.dark .ct-6eb1a1{color:#FF7B72}\n.dark .ct-f39932{color:#C9D1D9}\n.dark .ct-b76448{color:#A5D6FF}\n.dark .ct-587780{color:#FFA657}\n.dark .ct-f685fe{color:#79C0FF}\n.dark .ct-fc289c{color:#D2A8FF}\n.dark .ct-ce4dff{color:#8B949E}"}]}],toc:{title:x,searchDepth:av,depth:av,links:[{id:ad,depth:aw,text:"Optional을 대신 할 Maybe"},{id:aj,depth:aw,text:"try, except를 대신할 Result"}]}},_type:"markdown",_id:"content:python:returns0.md",_source:"content",_file:"python\u002Freturns0.md",_extension:"md"},"selected_surround_/python/returns0":[{_path:"\u002Fpython\u002Freturns1",title:"returns로 파이썬 타입을 명확하게 만들자 1 - 주요 기능들",description:U,date:"2022-09-09T23:18:43.310+09:00"},{_path:"\u002Fother\u002Fwsl2-pid-1-systemd",title:"wsl2에서 pid 1을 systemd로 변경하기",description:"잘 만들어놓은 배포판을 가져다 쓰자",date:"2022-08-14T22:13:27.850+09:00"}]},prerenderedAt:1680718238714}}("element","text","span","ct-f39932","div","line","ct-6eb1a1","code-inline","ct-f685fe","p"," ","ct-ce4dff","=","ct-b76448",")",", ","python","    ","returns","TypeVar","code","int","\"error\"","","type-hint","ct-fc289c","==","float","blockquote","from","import","def","return","] ","2","str","assert",") ",false,"h1","의 ",null,"pre","None",":","# or","파이썬 타입을 명확하게 만들면 vscode가 착해진다","bound","Self"," TypeVar(","ct-587780","        ","a","nofollow","strong","Higher Kinded Type","h2","optional을-대신-할-maybe","Maybe",") -\u003E ","if","1"," one_or_none(","try-except를-대신할-result","\u002F","Exception"," div(","4"," (","lambda"," x: x","**",").alt(",")).value_or(","앞으로",5,2))