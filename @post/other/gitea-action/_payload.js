export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U){return {data:{"selected_data_with_surround_/other/gitea-action":{article:{_path:"\u002Fother\u002Fgitea-action",_dir:"other",_draft:v,_partial:v,_locale:p,_empty:v,title:"gitea에서 ci\u002Fcd를 위한 action 사용하기",description:"gihub action와 거의 비슷하다",tags:[l,E],page:w,date:"2023-04-21T23:33:09.854+09:00",publish:true,body:{type:"root",children:[{type:b,tag:q,props:{id:x},children:[{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:"란"}]},{type:b,tag:i,props:{},children:[{type:b,tag:y,props:{href:"https:\u002F\u002Fgitea.io\u002F",rel:[z]},children:[{type:b,tag:d,props:{},children:[{type:a,value:l}]}]},{type:a,value:F},{type:b,tag:d,props:{},children:[{type:a,value:"go"}]},{type:a,value:"로 작성된 "},{type:b,tag:d,props:{},children:[{type:a,value:"git"}]},{type:a,value:" 원격 서버다. 이와 비슷한 것으로 "},{type:b,tag:d,props:{},children:[{type:a,value:G}]},{type:a,value:"이 있는데, "},{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:F},{type:b,tag:d,props:{},children:[{type:a,value:G}]},{type:a,value:"에 비해서 아주 가볍고 빨라서, 라즈베리파이에서도 별다른 문제 없이 사용할 수 있다."}]},{type:b,tag:A,props:{id:H},children:[{type:b,tag:d,props:{},children:[{type:a,value:n}]},{type:a,value:"이 있는데 왜 "},{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:"를 사용할까?"}]},{type:b,tag:i,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:n}]},{type:a,value:"이 사실상 업계 표준이고, 거의 모든 점에서 부족한 것이 없기에, 특별한 이유가 없다면 다른 서비스를 이용할 필요가 없다. 특히 "},{type:b,tag:d,props:{},children:[{type:a,value:n}]},{type:a,value:"의 비공개 저장소가 무료로 전환된 이후에는 더욱 그렇다."}]},{type:b,tag:i,props:{},children:[{type:a,value:"특별한 이유에는, 만에 하나라도 공개돼서는 안되는 소스가 있다던가, "},{type:b,tag:d,props:{},children:[{type:a,value:n}]},{type:a,value:"의 유료 서비스를 사용하기에는 비용적인 부담이 있다, 등이 있다."}]},{type:b,tag:q,props:{id:I},children:[{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:"에서 파이프라인을 구축하려면 어떻게 해야하나"}]},{type:b,tag:A,props:{id:J},children:[{type:a,value:K}]},{type:b,tag:i,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:" 자체적인 파이프라인 도구는 없다. "},{type:b,tag:d,props:{},children:[{type:a,value:L}]},{type:a,value:M},{type:b,tag:d,props:{},children:[{type:a,value:"woodpecker"}]},{type:a,value:"같은 타사 파이프라인 도구를 구축해야 한다."}]},{type:b,tag:A,props:{id:N},children:[{type:a,value:O}]},{type:b,tag:i,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:"에서 공식적으로 제공하는 파이프라인 도구 생겼다. "},{type:b,tag:d,props:{},children:[{type:a,value:n}]},{type:a,value:r},{type:b,tag:d,props:{},children:[{type:a,value:s}]},{type:a,value:"과 같은 명칭의 "},{type:b,tag:d,props:{},children:[{type:a,value:s}]},{type:a,value:"이라고 명명했다."}]},{type:b,tag:i,props:{},children:[{type:a,value:"이름만 같은 것이 아니라, "},{type:b,tag:d,props:{},children:[{type:a,value:n}]},{type:a,value:r},{type:b,tag:d,props:{},children:[{type:a,value:s}]},{type:a,value:" 설정 파일과 100% 호환을 목표로 한다."}]},{type:b,tag:i,props:{},children:[{type:a,value:"다음 데모는 변수에서 "},{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:"를 사용하는 것을 제외하고, "},{type:b,tag:d,props:{},children:[{type:a,value:n}]},{type:a,value:"에서 동일하게 실행된다."}]},{type:b,tag:P,props:{code:"name: Gitea Actions Demo\nrun-name: ${{ gitea.actor }} is testing out Gitea Actions\non: [push]\njobs:\n  Explore-Gitea-Actions:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"The job was ... by a ${{ gitea.event_name }}...\"\n      - run: echo \"This job is ... a ${{ runner.os }} server hosted by...\"\n      - run: echo \"The ... ${{ gitea.ref }} ... ${{ gitea.repository }}.\"\n      - name: Check out repository code\n        uses: actions\u002Fcheckout@v3\n      - run: echo \"The ${{ gitea.repository }} repository has been cloned ...\"\n      - run: echo \"The workflow is now ready to test your code on the runner.\"\n      - name: List files in the repository\n        run: |\n          ls ${{ gitea.workspace }}          \n      - run: echo \"This job's status is ${{ gitea.status }}.\"\n",filename:"demo.yaml",language:"yaml",meta:w},children:[{type:b,tag:"pre",props:{},children:[{type:b,tag:P,props:{__ignoreMap:p},children:[{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:h},children:[{type:a,value:B}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"Gitea Actions Demo"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:h},children:[{type:a,value:"run-name"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"${{ gitea.actor }} is testing out Gitea Actions"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:"ct-2a19ba"},children:[{type:a,value:"on"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:": ["}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"push"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"]"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:h},children:[{type:a,value:"jobs"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:C}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:"  "}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:"Explore-Gitea-Actions"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:C}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:Q}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:"runs-on"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"ubuntu-latest"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:Q}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:"steps"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:C}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"echo \"The job was ... by a ${{ gitea.event_name }}...\""}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"echo \"This job is ... a ${{ runner.os }} server hosted by...\""}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"echo \"The ... ${{ gitea.ref }} ... ${{ gitea.repository }}.\""}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:B}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"Check out repository code"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:R}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:"uses"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"actions\u002Fcheckout@v3"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"echo \"The ${{ gitea.repository }} repository has been cloned ...\""}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"echo \"The workflow is now ready to test your code on the runner.\""}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:B}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"List files in the repository"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:R}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:"ct-743d34"},children:[{type:a,value:"|"}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:j},children:[{type:a,value:"          ls ${{ gitea.workspace }}          "}]}]},{type:b,tag:f,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:m}]},{type:b,tag:c,props:{class:h},children:[{type:a,value:o}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:k}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"echo \"This job's status is ${{ gitea.status }}.\""}]}]}]}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"위 설정 파일은 "},{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:"에서 다음과 같이 실행되는 것을 확인 할 수 있다.\n"},{type:b,tag:"img",props:{alt:p,src:"\u002Fimages\u002Fother\u002Fgitea-action\u002Fgitea-action-demo.png"},children:[]}]},{type:b,tag:q,props:{id:S},children:[{type:a,value:T}]},{type:b,tag:i,props:{},children:[{type:b,tag:d,props:{},children:[{type:a,value:L}]},{type:a,value:M},{type:b,tag:d,props:{},children:[{type:a,value:"devops"}]},{type:a,value:r},{type:b,tag:d,props:{},children:[{type:a,value:E}]},{type:a,value:"을 사용하다 "},{type:b,tag:d,props:{},children:[{type:a,value:l}]},{type:a,value:r},{type:b,tag:d,props:{},children:[{type:a,value:s}]},{type:a,value:"을 사용해보면 속이 시원해진다."}]},{type:b,tag:i,props:{},children:[{type:a,value:"물론 아직 부족한 부분이 많긴 하지만 충분히 제 기능을 하는 것 같다. 아직 프리뷰인 것을 감안하면, 차고 넘친다."}]},{type:b,tag:"alert",props:{},children:[{type:b,tag:i,props:{},children:[{type:a,value:"1.20에서 정식 지원 예정이다."}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"특히 기본 이미지를 "},{type:b,tag:y,props:{href:"https:\u002F\u002Fgithub.com\u002Fmyoung34\u002Fdocker-github-actions-runner",rel:[z]},children:[{type:a,value:"이것"}]},{type:a,value:"으로 설정하면, "},{type:b,tag:d,props:{},children:[{type:a,value:"setup-python"}]},{type:a,value:"과 같은 스크립트도 정말 잘 실행된다!(추측하기로는 "},{type:b,tag:d,props:{},children:[{type:a,value:"ubuntu"}]},{type:a,value:", "},{type:b,tag:d,props:{},children:[{type:a,value:"node"}]},{type:a,value:" 이 두가지 조건을 만족해야 하는데, 기본 제공 이미지는 "},{type:b,tag:d,props:{},children:[{type:a,value:"debian"}]},{type:a,value:"이라 에러가 발생한다.)"}]},{type:b,tag:i,props:{},children:[{type:a,value:"다음 버전이 기다려지는 프로젝트다."}]},{type:b,tag:q,props:{id:t},children:[{type:a,value:t}]},{type:b,tag:i,props:{},children:[{type:b,tag:y,props:{href:"https:\u002F\u002Fblog.gitea.io\u002F2023\u002F03\u002Fhacking-on-gitea-actions\u002F",rel:[z]},children:[{type:a,value:"Hacking on Gitea Actions"}]}]},{type:b,tag:"style",children:[{type:a,value:".ct-743d34{color:#CF222E}\n.ct-2a19ba{color:#0550AE}\n.ct-1e5a2d{color:#0A3069}\n.ct-12ad89{color:#24292F}\n.ct-f9eba4{color:#116329}\n.dark .ct-f9eba4{color:#7EE787}\n.dark .ct-12ad89{color:#C9D1D9}\n.dark .ct-1e5a2d{color:#A5D6FF}\n.dark .ct-2a19ba{color:#79C0FF}\n.dark .ct-743d34{color:#FF7B72}"}]}],toc:{title:p,searchDepth:U,depth:U,links:[{id:x,depth:u,text:x,children:[{id:H,depth:D,text:"github이 있는데 왜 gitea를 사용할까?"}]},{id:I,depth:u,text:"gitea에서 파이프라인을 구축하려면 어떻게 해야하나",children:[{id:J,depth:D,text:K},{id:N,depth:D,text:O}]},{id:S,depth:u,text:T},{id:t,depth:u,text:t}]}},_type:"markdown",_id:"content:other:gitea-action.md",_source:"content",_file:"other\u002Fgitea-action.md",_extension:"md"},surround:[w,{_path:"\u002Fpython\u002Fpolars",title:"나중에는 pandas를 대체할지도 모르는 polars",description:"rust로 python의 한계를 넘어서자"}]}},prerenderedAt:1682148330143}}("text","element","span","code-inline","ct-12ad89","div","line","ct-f9eba4","p","ct-1e5a2d",": ","gitea","      - ","github","run","","h2","의 ","action","출처",2,false,null,"gitea란","a","nofollow","h3","name",":",3,"pipeline","는 ","gitlab","github이-있는데-왜-gitea를-사용할까","gitea에서-파이프라인을-구축하려면-어떻게-해야하나","119-버전-이전","1.19 버전 이전","jenkins","나 ","119-버전-이후","1.19 버전 이후","code","    ","        ","사용-후기","사용 후기",5))