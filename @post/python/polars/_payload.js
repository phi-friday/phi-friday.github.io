export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE){return {data:{"selected_data_with_surround_/python/polars":{article:{_path:"\u002Fpython\u002Fpolars",_dir:G,_draft:W,_partial:W,_locale:X,_empty:W,title:"나중에는 pandas를 대체할지도 모르는 polars",description:"rust로 python의 한계를 넘어서자",tags:[G,z,ah,"dateframe"],date:"2023-04-17T11:57:17.459Z",publish:true,body:{type:"root",children:[{type:a,tag:ai,props:{id:Y},children:[{type:a,tag:g,props:{},children:[{type:b,value:q}]},{type:b,value:"란"}]},{type:a,tag:m,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:q}]},{type:b,value:aj},{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:"로 만들어진 "},{type:a,tag:g,props:{},children:[{type:b,value:"dataframe"}]},{type:b,value:" 라이브러리이다. 공식적으로 "},{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:j},{type:a,tag:g,props:{},children:[{type:b,value:G}]},{type:b,value:j},{type:a,tag:g,props:{},children:[{type:b,value:ah}]},{type:b,value:"를 지원하며, 거의 동일한 형태의 api를 사용하여 데이터프레임을 조작할 수 있다."}]},{type:a,tag:"alert",props:{},children:[{type:a,tag:m,props:{},children:[{type:b,value:"주로 파이썬을 사용하는 만큼, 파이썬위주로 작성된 글입니다."}]}]},{type:a,tag:Z,props:{id:ak},children:[{type:a,tag:g,props:{},children:[{type:b,value:q}]},{type:b,value:"의 특징"}]},{type:a,tag:"ul",props:{},children:[{type:a,tag:H,props:{},children:[{type:b,value:"완전히 "},{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:"로 작성됨"}]},{type:a,tag:H,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:"Apache Arrow"}]},{type:b,value:"의 "},{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:"구현체인 "},{type:a,tag:I,props:{href:"https:\u002F\u002Fgithub.com\u002Fjorgecarleitao\u002Farrow2",rel:[J]},children:[{type:a,tag:g,props:{},children:[{type:b,value:"Arrow2"}]}]},{type:b,value:" 기반으로 구축됨"}]},{type:a,tag:H,props:{},children:[{type:b,value:"지연 계산을 지원함"}]},{type:a,tag:H,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:z}]},{type:b,value:"기반의 멀티쓰레드를 사용하여 "},{type:a,tag:g,props:{},children:[{type:b,value:"GIL"}]},{type:b,value:"을 우회함"}]}]},{type:a,tag:Z,props:{id:K},children:[{type:b,value:K}]},{type:a,tag:m,props:{},children:[{type:a,tag:I,props:{href:"https:\u002F\u002Fh2oai.github.io\u002Fdb-benchmark\u002F",rel:[J]},children:[{type:b,value:al}]},{type:b,value:"에서 확인 가능하다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"요약하자면, "},{type:a,tag:g,props:{},children:[{type:b,value:r}]},{type:b,value:"대비 1\u002F5 ~ 1\u002F12의 시간을 소모하며, "},{type:a,tag:g,props:{},children:[{type:b,value:r}]},{type:b,value:"나 "},{type:a,tag:g,props:{},children:[{type:b,value:am}]},{type:b,value:j},{type:a,tag:g,props:{},children:[{type:b,value:an}]},{type:b,value:"에서는 처리할 수 없는 양의 데이터(\u003E=50GB, 1_000_000_000 레코드)를 처리할 수 있다."}]},{type:a,tag:Z,props:{id:ao},children:[{type:b,value:ap}]},{type:a,tag:m,props:{},children:[{type:a,tag:I,props:{href:"https:\u002F\u002Fgithub.com\u002Fpola-rs\u002Fpolars\u002Ftree\u002Fmain\u002Fpy-polars",rel:[J]},children:[{type:b,value:"출처"}]}]},{type:a,tag:aq,props:{code:"\u003E\u003E\u003E import polars as pl\n\u003E\u003E\u003E df = pl.DataFrame(\n...     {\n...         \"A\": [1, 2, 3, 4, 5],\n...         \"fruits\": [\"banana\", \"banana\", \"apple\", \"apple\", \"banana\"],\n...         \"B\": [5, 4, 3, 2, 1],\n...         \"cars\": [\"beetle\", \"audi\", \"beetle\", \"beetle\", \"beetle\"],\n...     }\n... )\n\n# embarrassingly parallel execution & very expressive query language\n\u003E\u003E\u003E df.sort(\"fruits\").select(\n...     \"fruits\",\n...     \"cars\",\n...     pl.lit(\"fruits\").alias(\"literal_string_fruits\"),\n...     pl.col(\"B\").filter(pl.col(\"cars\") == \"beetle\").sum(),\n...     pl.col(\"A\").filter(pl.col(\"B\") \u003E 2).sum().over(\"cars\").alias(\"sum_A_by_cars\"),\n...     pl.col(\"A\").sum().over(\"fruits\").alias(\"sum_A_by_fruits\"),\n...     pl.col(\"A\").reverse().over(\"fruits\").alias(\"rev_A_by_fruits\"),\n...     # pl.col(\"A\").sort_by(\"B\").over(\"fruits\").alias(\"sort_A_by_B_by_fruits\"),\n... )\nshape: (5, 8)\n┌──────────┬──────────┬──────────────┬─────┬─────────────┬─────────────┬─────────────┐\n│ fruits   ┆ cars     ┆ literal_stri ┆ B   ┆ sum_A_by_ca ┆ sum_A_by_fr ┆ rev_A_by_fr │\n│ ---      ┆ ---      ┆ ng_fruits    ┆ --- ┆ rs          ┆ uits        ┆ uits        │\n│ str      ┆ str      ┆ ---          ┆ i64 ┆ ---         ┆ ---         ┆ ---         │\n│          ┆          ┆ str          ┆     ┆ i64         ┆ i64         ┆ i64         │\n╞══════════╪══════════╪══════════════╪═════╪═════════════╪═════════════╪═════════════╡\n│ \"apple\"  ┆ \"beetle\" ┆ \"fruits\"     ┆ 11  ┆ 4           ┆ 7           ┆ 4           │\n│ \"apple\"  ┆ \"beetle\" ┆ \"fruits\"     ┆ 11  ┆ 4           ┆ 7           ┆ 3           │\n│ \"banana\" ┆ \"beetle\" ┆ \"fruits\"     ┆ 11  ┆ 4           ┆ 8           ┆ 5           │\n│ \"banana\" ┆ \"audi\"   ┆ \"fruits\"     ┆ 11  ┆ 2           ┆ 8           ┆ 2           │\n│ \"banana\" ┆ \"beetle\" ┆ \"fruits\"     ┆ 11  ┆ 4           ┆ 8           ┆ 1           │\n└──────────┴──────────┴──────────────┴─────┴─────────────┴─────────────┴─────────────┘\n",language:G,meta:null},children:[{type:a,tag:"pre",props:{},children:[{type:a,tag:aq,props:{__ignoreMap:X},children:[{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"import"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" polars "}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"as"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" pl"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" df "}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"="}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" pl.DataFrame("}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"     {"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ac}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ar}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"     }"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:as}]}]},{type:a,tag:h,props:{class:i},children:[]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:at},children:[{type:b,value:"# embarrassingly parallel execution & very expressive query language"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:l},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" df.sort("}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:").select("}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:au}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:au}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"     pl.lit("}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\"literal_string_fruits\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:T}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ac}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:av}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aw}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"=="}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:").sum(),"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:av}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ac}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aw}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"\u003E"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ax}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\"sum_A_by_cars\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:T}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ax}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\"sum_A_by_fruits\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:T}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:").reverse().over("}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\"rev_A_by_fruits\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:T}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:at},children:[{type:b,value:"# pl.col(\"A\").sort_by(\"B\").over(\"fruits\").alias(\"sort_A_by_B_by_fruits\"),"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:e},children:[{type:b,value:k}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:as}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"shape: ("}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:j}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:")"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"┌──────────┬──────────┬──────────────┬─────┬─────────────┬─────────────┬─────────────┐"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"│ fruits   ┆ cars     ┆ literal_stri ┆ B   ┆ sum_A_by_ca ┆ sum_A_by_fr ┆ rev_A_by_fr │"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"      ┆ ng_fruits    ┆ "}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" ┆ rs          ┆ uits        ┆ uits        │"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:af}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:af}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"          ┆ i64 ┆ "}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ay}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ay}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"         │"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"│          ┆          ┆ "}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:af}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"          ┆     ┆ i64         ┆ i64         ┆ i64         │"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"╞══════════╪══════════╪══════════════╪═════╪═════════════╪═════════════╪═════════════╡"}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:az}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:az}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ar}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"   ┆ "}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:C}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:D}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:s}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:e},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:F}]}]},{type:a,tag:h,props:{class:i},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"└──────────┴──────────┴──────────────┴─────┴─────────────┴─────────────┴─────────────┘"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"좀 더 상세한 가이드는 "},{type:a,tag:I,props:{href:"https:\u002F\u002Fpola-rs.github.io\u002Fpolars-book\u002Fuser-guide\u002F",rel:[J]},children:[{type:b,value:al}]},{type:b,value:"에서 확인할 수 있다."}]},{type:a,tag:ai,props:{id:aA},children:[{type:b,value:aB}]},{type:a,tag:m,props:{},children:[{type:b,value:"최근 "},{type:a,tag:g,props:{},children:[{type:b,value:r}]},{type:b,value:"의 새로운 메이저 버전인 "},{type:a,tag:g,props:{},children:[{type:b,value:"2.0.0"}]},{type:b,value:"이 정식으로 출시됐다.\n여러 변경점이 있지만, 그 중 하나는 "},{type:a,tag:g,props:{},children:[{type:b,value:B}]},{type:b,value:"를 정식 백엔드로 도입한 것이다."}]},{type:a,tag:m,props:{},children:[{type:a,tag:g,props:{},children:[{type:b,value:B}]},{type:b,value:aj},{type:a,tag:g,props:{},children:[{type:b,value:aC}]},{type:b,value:"대비 여러 이점이 있는데, 그 중 하나는 문자열과 "},{type:a,tag:g,props:{},children:[{type:b,value:"null"}]},{type:b,value:"값에 대한 처리를 예로 들 수 있다.\n"},{type:a,tag:g,props:{},children:[{type:b,value:aC}]},{type:b,value:"의 속도도 충분히 좋고 타입 힌트로 상대적으로 잘 돼있어 "},{type:a,tag:g,props:{},children:[{type:b,value:B}]},{type:b,value:"로 바로 넘어갈 필요는 없다.\n하지만 많은 라이브러리가 "},{type:a,tag:g,props:{},children:[{type:b,value:B}]},{type:b,value:"를 함께 지원하고 있는 모습을 보면, 이제 "},{type:a,tag:g,props:{},children:[{type:b,value:B}]},{type:b,value:"로 완전히 넘어갈 준비를 해도 좋다는 생각이 든다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"그런점에서 "},{type:a,tag:g,props:{},children:[{type:b,value:q}]},{type:b,value:"는 좋은 선택이다.\n"},{type:a,tag:g,props:{},children:[{type:b,value:B}]},{type:b,value:"기반으로 구축된 점과 더불어 지연 계산과 멀티쓰레드를 지원하고, 타입힌트 또한 우수하다.\n지연계산과 멀티쓰레드(멀티프로세싱) 측면에서 "},{type:a,tag:g,props:{},children:[{type:b,value:"vaex"}]},{type:b,value:j},{type:a,tag:g,props:{},children:[{type:b,value:am}]},{type:b,value:j},{type:a,tag:g,props:{},children:[{type:b,value:an}]},{type:b,value:"을 "},{type:a,tag:g,props:{},children:[{type:b,value:r}]},{type:b,value:"의 대체품으로 제시할 수 있다.\n하지만 이들 모두 타입힌트 측면에서 많이 부족하고, 성능상 "},{type:a,tag:g,props:{},children:[{type:b,value:q}]},{type:b,value:"가 훨씬 우수하기에, 굳이 "},{type:a,tag:g,props:{},children:[{type:b,value:q}]},{type:b,value:"말고 다른 라이브러리를 쓸 이유가 없어보인다.(차라리 그대로 "},{type:a,tag:g,props:{},children:[{type:b,value:r}]},{type:b,value:"를 쓰는게 낫다.)"}]},{type:a,tag:m,props:{},children:[{type:b,value:"다만 "},{type:a,tag:g,props:{},children:[{type:b,value:q}]},{type:b,value:"가 아직 만들어진지 얼마 되지 않은 신생 프로젝트라 기존 api에서 변경될 사항이 많을 것이기에, 당장 넘어가기는 힘들어 보인다.\n또한 문법이 간단하지만, 그럼에도 기존 "},{type:a,tag:g,props:{},children:[{type:b,value:r}]},{type:b,value:"와는 다른 방식이기에 학습곡선을 고려해야한다."}]},{type:a,tag:m,props:{},children:[{type:b,value:"빠르면 1년, 늦어도 3년이면 "},{type:a,tag:g,props:{},children:[{type:b,value:r}]},{type:b,value:"를 잊게 할 라이브러리가 되지 않을까? 기대가 된다."}]},{type:a,tag:"style",children:[{type:b,value:".ct-59e061{color:#82071E}\n.ct-889b79{color:#6E7781}\n.ct-4a21a8{color:#0A3069}\n.ct-6cdb6e{color:#0550AE}\n.ct-1489f9{color:#24292F}\n.ct-1a4579{color:#CF222E}\n.dark .ct-1a4579{color:#FF7B72}\n.dark .ct-1489f9{color:#C9D1D9}\n.dark .ct-6cdb6e{color:#79C0FF}\n.dark .ct-4a21a8{color:#A5D6FF}\n.dark .ct-889b79{color:#8B949E}\n.dark .ct-59e061{color:#FFA198}"}]}],toc:{title:X,searchDepth:aD,depth:aD,links:[{id:Y,depth:aE,text:Y,children:[{id:ak,depth:ag,text:"polars의 특징"},{id:K,depth:ag,text:K},{id:ao,depth:ag,text:ap}]},{id:aA,depth:aE,text:aB}]}},_type:"markdown",_id:"content:python:polars.md",_source:"content",_file:"python\u002Fpolars.md",_extension:"md"},surround:[{_path:"\u002Fother\u002Fgitea-action",title:"gitea에서 ci\u002Fcd를 위한 action 사용하기",description:"gihub action와 거의 비슷하다"},{_path:"\u002Fjs\u002Fnextjs-nuxtjs",title:"nextjs에서 nuxtjs로 변경",description:"쓰기 쉬운 nuxt content"}]}},prerenderedAt:1682432103057}}("element","text","span","ct-1489f9","ct-6cdb6e","ct-4a21a8","code-inline","div","line",", ","...","ct-1a4579","p","\"fruits\"","           ┆ ","\"beetle\"","polars","pandas","4","│ ","ct-59e061","--","-","  ┆ "," ┆ ","rust","\"banana\"","pyarrow","2","     ┆ ","11","           │","python","li","a","nofollow","벤치마크","         ","\"A\"",": [","5","],","\"apple\"","\"cars\"",").alias(","),","     pl.col(","8",false,"","polars란","h3","\u003E\u003E\u003E"," ","1","3","\"B\"","     ","      ┆ ","str",3,"js","h2","는 ","polars의-특징","이곳","dask","modin","사용-예시","사용 예시","code","\"audi\""," )","ct-889b79",",",").filter(pl.col(",") ",").sum().over(","         ┆ ","7","사용-후기","사용 후기","numpy",5,2))