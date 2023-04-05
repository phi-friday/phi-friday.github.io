export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az){return {data:{"selected_data_/python/returns2":{_path:"\u002Fpython\u002Freturns2",_dir:I,_draft:J,_partial:J,_locale:K,_empty:J,title:"returns로 파이썬 타입을 명확하게 만들자 2 - ROP",description:X,tags:[I,A,"함수형 프로그래밍"],page:"dry-python\u002Freturns",date:"2022-09-13T22:22:07.993+09:00",publish:true,body:{type:"root",children:[{type:b,tag:L,props:{id:"rop"},children:[{type:b,tag:e,props:{},children:[{type:a,value:B}]}]},{type:b,tag:Y,props:{id:Z},children:[{type:b,tag:e,props:{},children:[{type:a,value:B}]},{type:a,value:"에 대한 간략한 설명"}]},{type:b,tag:C,props:{},children:[{type:b,tag:k,props:{},children:[{type:a,value:"오개념이 있을 가능성이 높으니, 따로 더 검색해서 알아보기를 권장합니다."}]}]},{type:b,tag:k,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:B}]},{type:a,value:w},{type:b,tag:j,props:{},children:[{type:a,value:_}]},{type:a,value:" 의 약어로, 직역하면 "},{type:b,tag:j,props:{},children:[{type:a,value:"철도 지향 프로그래밍"}]},{type:a,value:" 이다. 이름 그대로 "},{type:b,tag:e,props:{},children:[{type:a,value:x}]},{type:a,value:M},{type:b,tag:e,props:{},children:[{type:a,value:y}]},{type:a,value:"를 적절한 철도(함수)로 이어준다."}]},{type:b,tag:k,props:{},children:[{type:a,value:"전통적인 방식에서는, 각 철도(함수)마다 예외처리를 실시하여 에러에 대응하지만, 프로그램의 규모가 커질수록 유지보수에 어려움이 발생한다."}]},{type:b,tag:k,props:{},children:[{type:a,value:"이를 해결하기 위해, 각 철도(함수)에서 발생하는 에러는 프로그램의 오작동을 유발하는 것이 아닌 적합한 "},{type:b,tag:e,props:{},children:[{type:a,value:y}]},{type:a,value:"으로 간주하며, 다음 철도(함수)에서 "},{type:b,tag:e,props:{},children:[{type:a,value:x}]},{type:a,value:"으로 활용한다."}]},{type:b,tag:k,props:{},children:[{type:a,value:"즉, 각 철도(함수)의 "},{type:b,tag:e,props:{},children:[{type:a,value:x}]},{type:a,value:M},{type:b,tag:e,props:{},children:[{type:a,value:y}]},{type:a,value:"은 개발자가 의도한 정상적인 값과 의도하지 않은 비정상적인 값(에러)으로 구분된다."}]},{type:b,tag:k,props:{},children:[{type:a,value:"이렇게 작성된 프로그램은 각 철도(함수)별 예외처리가 없더라도, 각 철도(함수)별 "},{type:b,tag:e,props:{},children:[{type:a,value:y}]},{type:a,value:"의 상태를 구분지을 수 있고, "},{type:b,tag:e,props:{},children:[{type:a,value:y}]},{type:a,value:"은 단 두가지로 구분되므로, 다음 철도(함수)의 "},{type:b,tag:e,props:{},children:[{type:a,value:x}]},{type:a,value:"으로 활용하는데 있어서 깔끔한 조작을 가능하게 한다."}]},{type:b,tag:C,props:{},children:[{type:b,tag:k,props:{},children:[{type:a,value:"위 글을 포함한 이전 포스트까지 "},{type:b,tag:j,props:{},children:[{type:a,value:"정상"}]},{type:a,value:" 상태와 "},{type:b,tag:j,props:{},children:[{type:a,value:"비정상"}]},{type:a,value:" 상태로 구분지어 표현하였으나, "},{type:b,tag:e,props:{},children:[{type:a,value:A}]},{type:a,value:"의 "},{type:b,tag:e,props:{},children:[{type:a,value:z}]},{type:a,value:"와 용어를 일치하기 위해, 이후 글 부터는 "},{type:b,tag:j,props:{},children:[{type:a,value:r}]},{type:a,value:" 과 "},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:" 로 대신합니다."}]}]},{type:b,tag:Y,props:{id:$},children:[{type:b,tag:e,props:{},children:[{type:a,value:A}]},{type:a,value:"가 제시하는 "},{type:b,tag:e,props:{},children:[{type:a,value:B}]}]},{type:b,tag:k,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:A}]},{type:a,value:"에서 미리 정의된 "},{type:b,tag:e,props:{},children:[{type:a,value:z}]},{type:a,value:w},{type:b,tag:e,props:{},children:[{type:a,value:D}]},{type:a,value:N},{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:N},{type:b,tag:e,props:{},children:[{type:a,value:P}]},{type:a,value:N},{type:b,tag:e,props:{},children:[{type:a,value:Q}]},{type:a,value:" 메소드를 사용하여 함수(철도)를 잇게 한다."}]},{type:b,tag:aa,props:{},children:[{type:b,tag:s,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:D}]},{type:a,value:t},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:ab},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:R}]},{type:b,tag:s,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:t},{type:b,tag:j,props:{},children:[{type:a,value:r}]},{type:a,value:ac},{type:b,tag:j,props:{},children:[{type:a,value:r}]},{type:a,value:" 으로 잇는다."}]},{type:b,tag:s,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:P}]},{type:a,value:t},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:ab},{type:b,tag:j,props:{},children:[{type:a,value:r}]},{type:a,value:E},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:R}]},{type:b,tag:s,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:Q}]},{type:a,value:t},{type:b,tag:j,props:{},children:[{type:a,value:r}]},{type:a,value:ac},{type:b,tag:j,props:{},children:[{type:a,value:r}]},{type:a,value:E},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:R}]}]},{type:b,tag:k,props:{},children:[{type:a,value:"다만 모든 "},{type:b,tag:e,props:{},children:[{type:a,value:z}]},{type:a,value:"가 위와 같은 메소드를 가지고 있는 것은 아니다. "},{type:b,tag:e,props:{},children:[{type:a,value:"returns.interfaces"}]},{type:a,value:" 모듈에는 이러한 메소드에 대한 인터페이스가 정의되어 있고, 해당하는 인터페이스를 만족하는 "},{type:b,tag:e,props:{},children:[{type:a,value:z}]},{type:a,value:"가 위와 같은 메소드를 사용할 수 있다."}]},{type:b,tag:C,props:{},children:[{type:b,tag:k,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:M},{type:b,tag:e,props:{},children:[{type:a,value:Q}]},{type:a,value:"에 대한 간략한 설명과 예제는 이전 포스트에 포함되어 있고, "},{type:b,tag:e,props:{},children:[{type:a,value:D}]},{type:a,value:"와 "},{type:b,tag:e,props:{},children:[{type:a,value:P}]},{type:a,value:w},{type:b,tag:e,props:{},children:[{type:a,value:x}]},{type:a,value:"의 상태에만 차이가 있으므로 생략한다."}]}]},{type:b,tag:L,props:{id:"container에서-실제-값을-추출하는-방법"},children:[{type:b,tag:e,props:{},children:[{type:a,value:z}]},{type:a,value:"에서 실제 값을 추출하는 방법"}]},{type:b,tag:ad,props:{code:"from returns.maybe import Maybe\nfrom returns.primitives.exceptions import UnwrapFailedError\nfrom returns.result import ResultE\n\nassert ResultE.from_value(1).unwrap() == 1\ntry:\n    result = ResultE.from_failure(1).unwrap()\nexcept Exception as exc:\n    result = exc\nassert isinstance(result, UnwrapFailedError)\nassert ResultE.from_value(1).value_or(2) == 1\nassert ResultE.from_failure(1).value_or(2) == 2\n\nassert Maybe.from_optional(1).unwrap() == 1\ntry:\n    result = Maybe.from_optional(None).unwrap()\nexcept Exception as exc:\n    result = exc\nassert isinstance(result, UnwrapFailedError)\nassert Maybe.from_optional(1).value_or(2) == 1\nassert Maybe.from_optional(None).value_or(2) == 2\nassert Maybe.from_optional(1).or_else_call(lambda: 2) == 1\nassert Maybe.from_optional(None).or_else_call(lambda: 2) == 2\n",language:I,meta:ae},children:[{type:b,tag:"pre",props:{},children:[{type:b,tag:ad,props:{__ignoreMap:K},children:[{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:S}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" returns.maybe "}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:T}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" Maybe"}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:S}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" returns.primitives.exceptions "}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:T}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" UnwrapFailedError"}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:S}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" returns.result "}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:T}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" ResultE"}]}]},{type:b,tag:h,props:{class:i},children:[]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:af}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ag}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:ah}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ai}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:F}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:aj}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ak}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:al}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:am}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:an}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ao}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:F}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ap}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:aq}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ar}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:af}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:H}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:aj}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:H}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]}]},{type:b,tag:h,props:{class:i},children:[]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:v}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ag}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:ah}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ai}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:F}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:v}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:U}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ak}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:al}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:am}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:an}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ao}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:F}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ap}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:aq}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ar}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:v}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:H}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:v}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:U}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:H}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:v}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:as}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:at}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:t}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:m}]}]},{type:b,tag:h,props:{class:i},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:n}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:v}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:U}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:as}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:at}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:t}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:l}]},{type:b,tag:c,props:{class:g},children:[{type:a,value:o}]}]}]}]}]},{type:b,tag:k,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Container"}]},{type:a,value:"로 감싸진 내부의 값을 추출하기 위해서는 "},{type:b,tag:e,props:{},children:[{type:a,value:V}]},{type:a,value:E},{type:b,tag:e,props:{},children:[{type:a,value:au}]},{type:a,value:E},{type:b,tag:e,props:{},children:[{type:a,value:W}]},{type:a,value:" 메소드를 사용하면 된다."}]},{type:b,tag:aa,props:{},children:[{type:b,tag:s,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:V}]},{type:a,value:av},{type:b,tag:j,props:{},children:[{type:a,value:r}]},{type:a,value:" 일 때만 정상적으로 추출이 가능하다."}]},{type:b,tag:s,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:au}]},{type:a,value:w},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:" 일 때 처리가 가능하게 만든다."}]},{type:b,tag:s,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:W}]},{type:a,value:w},{type:b,tag:j,props:{},children:[{type:a,value:p}]},{type:a,value:" 일 때 반환할 값을 지연시킬 수 있다."}]}]},{type:b,tag:C,props:{},children:[{type:b,tag:k,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:W}]},{type:a,value:av},{type:b,tag:e,props:{},children:[{type:a,value:"Maybe"}]},{type:a,value:"에는 있고 "},{type:b,tag:e,props:{},children:[{type:a,value:aw}]},{type:a,value:"에는 없다. "},{type:b,tag:e,props:{},children:[{type:a,value:aw}]},{type:a,value:"에서는 "},{type:b,tag:e,props:{},children:[{type:a,value:D}]},{type:a,value:"가 있기 때문이다."}]},{type:b,tag:k,props:{},children:[{type:a,value:"또한 "},{type:b,tag:e,props:{},children:[{type:a,value:V}]},{type:a,value:"이 불가능한 경우도 있다. "},{type:b,tag:e,props:{},children:[{type:a,value:"IO"}]},{type:a,value:"가 대표적이다."}]}]},{type:b,tag:L,props:{id:ax},children:[{type:a,value:ax}]},{type:b,tag:k,props:{},children:[{type:b,tag:"a",props:{href:"https:\u002F\u002Freturns.readthedocs.io\u002Fen\u002Flatest\u002Fpages\u002Frailway.html",rel:["nofollow"]},children:[{type:a,value:_}]}]},{type:b,tag:"style",children:[{type:a,value:".ct-27fd48{color:#0550AE}\n.ct-487fc7{color:#24292F}\n.ct-07e139{color:#CF222E}\n.dark .ct-07e139{color:#FF7B72}\n.dark .ct-487fc7{color:#C9D1D9}\n.dark .ct-27fd48{color:#79C0FF}"}]}],toc:{title:K,searchDepth:ay,depth:ay,links:[{id:Z,depth:az,text:"ROP에 대한 간략한 설명"},{id:$,depth:az,text:"returns가 제시하는 ROP"}]}},_type:"markdown",_id:"content:python:returns2.md",_source:"content",_file:"python\u002Freturns2.md",_extension:"md"},"selected_surround_/python/returns2":[ae,{_path:"\u002Fpython\u002Freturns1",title:"returns로 파이썬 타입을 명확하게 만들자 1 - 주요 기능들",description:X,date:"2022-09-09T23:18:43.310+09:00"}]},prerenderedAt:1680718237935}}("text","element","span","ct-487fc7","code-inline","ct-07e139","ct-27fd48","div","line","strong","p"," ","1","assert","2","실패","==","성공","li",": ",") "," Maybe.from_optional(","는 ","input","output","container","returns","ROP","blockquote","alt"," 또는 ","    result ","=",").value_or(","python",false,"","h1","과 ",", ","map","lash","bind"," 로 잇는다.","from","import","None","unwrap","or_else_call","파이썬 타입을 명확하게 만들면 vscode가 착해진다","h2","rop에-대한-간략한-설명","Railway oriented programming","returns가-제시하는-rop","ul"," 를 사용하여, "," 을 사용하여, ","code",null," ResultE.from_value(",").unwrap() ","try",":"," ResultE.from_failure(",").unwrap()","except","Exception","as"," exc:"," exc","isinstance","(result, UnwrapFailedError)",").or_else_call(","lambda","value_or"," 메소드는 ","Result","원문",5,2))