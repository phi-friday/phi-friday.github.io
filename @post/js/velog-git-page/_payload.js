export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E){return {data:{"selected_data_with_surround_/js/velog-git-page":{article:{_path:"\u002Fjs\u002Fvelog-git-page",_dir:w,_draft:i,_partial:i,_locale:x,_empty:i,title:"velog에서 git page로 블로그 이전",description:l,tags:[w,"ts",m,f,"github"],page:l,date:"2022-06-12T04:27:48.097+09:00",publish:g,body:{type:"root",children:[{type:b,tag:n,props:{id:"왜-옮겼나"},children:[{type:a,value:"왜 옮겼나?"}]},{type:b,tag:d,props:{},children:[{type:a,value:"지난 몇달간 "},{type:b,tag:c,props:{},children:[{type:a,value:f}]},{type:a,value:"에서 몇몇 포스트를 작성했다.\n잘 만들어진 구성이다 보니 별다른 불만 없이 잘 사용했다.\n하지만 지난 며칠간의 연습 끝에 "},{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:"로 블로그를 이전했다."}]},{type:b,tag:y,props:{id:z},children:[{type:a,value:"처음부터 "},{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:"를 쓰고 싶었다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"사실 이전부터 "},{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:"로 블로그를 만들고 싶었다.\n가장 많이 알려진 간단한 방법은 "},{type:b,tag:c,props:{},children:[{type:a,value:A}]},{type:a,value:"를 사용하는 것이다.\n하지만 "},{type:b,tag:c,props:{},children:[{type:a,value:j}]},{type:a,value:"로 작성된 엔진이다 보니 제대로 알아보는데 힘이 들었다.\n그렇다고 "},{type:b,tag:c,props:{},children:[{type:a,value:j}]},{type:a,value:"를 따로 배워보자니, 살면서 "},{type:b,tag:c,props:{},children:[{type:a,value:j}]},{type:a,value:"를 사용할 일이 얼마나 있을까 하는 생각이 문득 들었다.\n차라리 "},{type:b,tag:c,props:{},children:[{type:a,value:"go"}]},{type:a,value:"나 "},{type:b,tag:c,props:{},children:[{type:a,value:"rust"}]},{type:a,value:"라면 노력해보겠지만, "},{type:b,tag:c,props:{},children:[{type:a,value:j}]},{type:a,value:"라니.."}]},{type:b,tag:d,props:{},children:[{type:a,value:"그렇게 그냥 하지 말까? 하다가 알게된게 "},{type:b,tag:c,props:{},children:[{type:a,value:f}]},{type:a,value:"였다.\n"},{type:b,tag:c,props:{},children:[{type:a,value:f}]},{type:a,value:"는 내가 처음에 기대한 거의 모든 것을 만족했다."}]},{type:b,tag:o,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"마크다운을 이용한 포스팅"}]},{type:b,tag:e,props:{},children:[{type:a,value:"코드 블록 하이라이팅"}]},{type:b,tag:e,props:{},children:[{type:a,value:"실시간 포스팅 프리뷰"}]}]},{type:b,tag:d,props:{},children:[{type:a,value:"겨우 세가지지만 이 세가지를 만족하는 곳이 사실상 없다.\n그리고 따로 내가 레이아웃을 수정할 필요가 없다보니(사실 방법도 없다), 그냥 잘 만들어진 플랫폼에 글만 쓰면 내가 원하는게 다 됐다."}]},{type:b,tag:y,props:{id:B},children:[{type:b,tag:c,props:{},children:[{type:a,value:f}]},{type:a,value:"는 다 좋은데 이게 없다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"하지만 쓰다보니 역시 아쉬운게 보인다."}]},{type:b,tag:o,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"명확한 기준은 모르겠지만, 몇몇 양식에 대한 하이라이팅 미지원(log 등)"}]},{type:b,tag:e,props:{},children:[{type:a,value:"작성글 숨기기"}]}]},{type:b,tag:d,props:{},children:[{type:a,value:"그리고 무엇보다도.. 내가 직접 만든다는 성취감이 없었다.\n그래서 결국 직접 만들기로 했다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"다만 "},{type:b,tag:c,props:{},children:[{type:a,value:f}]},{type:a,value:"덕분에 카테고리가 무조건 있어야 한다는 고정관념에서 벗어날 수 있었다.\n태그를 추가하면, 태그가 기존의 카테고리처럼 사용될 수 있게 하면 된다.\n또한 특정 포스트간의 연결이 필요하다면, 따로 지정할 수 있는 기능이 있으면 된다."}]},{type:b,tag:d,props:{},children:[{type:b,tag:c,props:{},children:[{type:a,value:f}]},{type:a,value:"에서 얻은 소중한 경험을 토대로, "},{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:"에 블로그를 만들기 위한 준비를 했다."}]},{type:b,tag:n,props:{id:"어떻게-옮겼나"},children:[{type:a,value:"어떻게 옮겼나?"}]},{type:b,tag:d,props:{},children:[{type:a,value:"처음에는 그냥 익숙한 "},{type:b,tag:c,props:{},children:[{type:a,value:p}]},{type:a,value:"으로 작성하려 했다.\n"},{type:b,tag:c,props:{},children:[{type:a,value:"pelican"}]},{type:a,value:"이라는 라이브러리가 있어서, "},{type:b,tag:c,props:{},children:[{type:a,value:A}]},{type:a,value:"처럼 간단하게 정적 사이트를 배포할 수 있게 한다. 사용 언어가 "},{type:b,tag:c,props:{},children:[{type:a,value:p}]},{type:a,value:"이다 보니 관련 스크립트를 확인하며, 작동 방식을 파악하는 것도 할만했다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"하지만 반응형으로 작성해보려 하니, 결국 "},{type:b,tag:c,props:{},children:[{type:a,value:k}]},{type:a,value:"를 쓸 수 밖에 없었다.\n그리고 어차피 "},{type:b,tag:c,props:{},children:[{type:a,value:k}]},{type:a,value:"를 써야한다면.. 이번기회에 공부도 할 겸 완전히 "},{type:b,tag:c,props:{},children:[{type:a,value:k}]},{type:a,value:"로 작성해보자는 생각이 들었다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"여기서 "},{type:b,tag:c,props:{},children:[{type:a,value:"vue"}]},{type:a,value:"냐, "},{type:b,tag:c,props:{},children:[{type:a,value:q}]},{type:a,value:"냐 많은 고민이 있었고, 여러 시도가 있었는데, 결국 선택한건 "},{type:b,tag:c,props:{},children:[{type:a,value:q}]},{type:a,value:"다.\n그리고 "},{type:b,tag:c,props:{},children:[{type:a,value:q}]},{type:a,value:" 앱을 간단하게 작성하고 배포할 수 있는 프레임워크로 "},{type:b,tag:c,props:{},children:[{type:a,value:m}]},{type:a,value:"를 사용했다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"처음 생각은 "},{type:b,tag:c,props:{},children:[{type:a,value:k}]},{type:a,value:"였는데, "},{type:b,tag:c,props:{},children:[{type:a,value:p}]},{type:a,value:"의 타입 힌트를 이용한 "},{type:b,tag:c,props:{},children:[{type:a,value:"vscode"}]},{type:a,value:"의 자동완성 기능에 너무 익숙해져서 그런가, 코드 작성이 너무 불편했다.\n마침 "},{type:b,tag:c,props:{},children:[{type:a,value:m}]},{type:a,value:"가 "},{type:b,tag:c,props:{},children:[{type:a,value:r}]},{type:a,value:"를 지원하기도 해서, 약간의 수고가 있었지만 "},{type:b,tag:c,props:{},children:[{type:a,value:r}]},{type:a,value:"로 앱을 작성했다."}]},{type:b,tag:d,props:{},children:[{type:a,value:"많은 삽질끝에 그래도 "},{type:b,tag:c,props:{},children:[{type:a,value:h}]},{type:a,value:"에 배포할 수 있는 형태로 만드는데 성공했다.\n이제 부족한 몇몇 기능을 추가하고, 디자인을 손보기만 하면 된다.\n그러고보니... "},{type:b,tag:c,props:{},children:[{type:a,value:r}]},{type:a,value:"보다 "},{type:b,tag:c,props:{},children:[{type:a,value:"css"}]},{type:a,value:"가 더 어려운 것 같다..\n아무리 해도 예쁘게 보이지를 않는다.."}]},{type:b,tag:n,props:{id:"앞으로-추가할-기능"},children:[{type:a,value:"앞으로 추가할 기능"}]},{type:b,tag:o,props:{className:["contains-task-list"]},children:[{type:b,tag:e,props:{className:[s]},children:[{type:b,tag:t,props:{checked:i,disabled:g,type:u},children:[]},{type:a,value:" 다크모드 토글"},{type:b,tag:v,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:"사실 이미 기능 추가는 했지만, css 작성하기가 힘들어서 주석으로 놔둔 상태"}]}]}]},{type:b,tag:e,props:{className:[s]},children:[{type:b,tag:t,props:{checked:g,disabled:g,type:u},children:[]},{type:a,value:" 문단 제목 역링크"},{type:b,tag:v,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:C}]}]}]},{type:b,tag:e,props:{className:[s]},children:[{type:b,tag:t,props:{checked:g,disabled:g,type:u},children:[]},{type:a,value:" 코드 블럭 라인 하이라이트"},{type:b,tag:v,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:C}]}]}]}]}],toc:{title:x,searchDepth:D,depth:D,links:[{id:z,depth:E,text:"처음부터 git page를 쓰고 싶었다."},{id:B,depth:E,text:"velog는 다 좋은데 이게 없다."}]}},_type:"markdown",_id:"content:js:velog에서 git page로 블로그 이전.md",_source:"content",_file:"js\u002Fvelog에서 git page로 블로그 이전.md",_extension:"md"},surround:[{_path:"\u002Fother\u002Fvim",title:"[Vim] Normal모드에서 영문 키보드로 자동 전환하기 (Windows)",description:"esc를 누르면 자동으로 영문 키보드가 된다."},l]}},prerenderedAt:1680952688697}}("text","element","code-inline","p","li","velog",true,"git page",false,"ruby","javascript",null,"nextjs","h1","ul","python","react","typescript","task-list-item","input","checkbox","blockquote","js","","h2","처음부터-git-page를-쓰고-싶었다","jekyll","velog는-다-좋은데-이게-없다","nuxtjs로 넘어가면서 자연스럽게 완료",5,2))