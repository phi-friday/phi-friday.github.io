import V from"./ProseTh.y6rUfTM8.js";import $ from"./ProseTr.Ci0Bgwkw.js";import B from"./ProseThead.DbudR0zq.js";import C from"./ProseCodeInline.B35s9SCv.js";import g from"./ProseTd.DqjaeKum.js";import b from"./ProseTbody.BEkCJ4p7.js";import N from"./ProseTable.3Jgf48N-.js";import{_ as R,aq as F,o,V as d,w as e,b as s,d as l,N as r,c as S,F as x,x as A,t as c}from"./entry.CIMn9Ylj.js";const E=defineComponent({props:{of:{type:String,default:void 0},required:{type:Boolean,default:void 0},values:{type:Boolean,default:void 0},description:{type:Boolean,default:void 0},default:{type:Boolean,default:void 0}},async setup(t){const h=`/api/component-meta/${F(t.of)}`,{data:y}=await useAsyncData(t.of,()=>$fetch(h),"$oSoCJtWFoC"),i=computed(()=>y.value.props.filter(a=>{var n;return!((n=a.tags)!=null&&n.ignore.includes(a))})),k=computed(()=>{var a;return t.required!==void 0?t.required:(a=i.value)==null?void 0:a.find(n=>n.required!==void 0)}),w=computed(()=>{var a;return t.values!==void 0?t.values:(a=i.value)==null?void 0:a.find(n=>n.values)}),f=computed(()=>{var a;return t.description!==void 0?t.description:(a=i.value)==null?void 0:a.find(n=>n.description)}),m=computed(()=>{var a;return t.default!==void 0?t.default:(a=i.value)==null?void 0:a.find(n=>n.default)});return{meta:y,properties:i,showRequired:k,showValues:w,showDescription:f,showDefault:m}}});function I(t,h,y,i,k,w){var q,v,D;const f=V,m=$,a=B,n=C,_=g,P=b,T=N;return t.meta&&((q=t.meta)!=null&&q.props)&&((D=(v=t.meta)==null?void 0:v.props)!=null&&D.length)?(o(),d(T,{key:0},{default:e(()=>[s(a,null,{default:e(()=>[s(m,null,{default:e(()=>[s(f,null,{default:e(()=>[l("Prop")]),_:1}),s(f,null,{default:e(()=>[l("Type")]),_:1}),t.showRequired?(o(),d(f,{key:0},{default:e(()=>[l(" Required ")]),_:1})):r("",!0),t.showDefault?(o(),d(f,{key:1},{default:e(()=>[l(" Default ")]),_:1})):r("",!0),t.showValues?(o(),d(f,{key:2},{default:e(()=>[l(" Values ")]),_:1})):r("",!0),t.showDescription?(o(),d(f,{key:3},{default:e(()=>[l(" Description ")]),_:1})):r("",!0)]),_:1})]),_:1}),s(P,null,{default:e(()=>[(o(!0),S(x,null,A(t.properties,u=>(o(),d(m,{key:u.name},{default:e(()=>[s(_,null,{default:e(()=>[s(n,null,{default:e(()=>[l(c((u==null?void 0:u.name)||"?"),1)]),_:2},1024)]),_:2},1024),s(_,null,{default:e(()=>[s(n,null,{default:e(()=>[l(c((u==null?void 0:u.type)||"?"),1)]),_:2},1024)]),_:2},1024),t.showRequired?(o(),d(_,{key:0},{default:e(()=>[s(n,null,{default:e(()=>[l(c(u.required==="?"?"?":u.required?"Yes":"No"),1)]),_:2},1024)]),_:2},1024)):r("",!0),t.showDefault?(o(),d(_,{key:1},{default:e(()=>[u.default?(o(),d(n,{key:0},{default:e(()=>[l(c((u==null?void 0:u.default)||"?"),1)]),_:2},1024)):r("",!0)]),_:2},1024)):r("",!0),t.showValues?(o(),d(_,{key:2},{default:e(()=>[u.values?(o(),d(n,{key:0},{default:e(()=>[l(c((u==null?void 0:u.values)||"?"),1)]),_:2},1024)):(o(),d(n,{key:1},{default:e(()=>[l(" - ")]),_:1}))]),_:2},1024)):r("",!0),t.showDescription?(o(),d(_,{key:3},{default:e(()=>[s(n,null,{default:e(()=>[l(c(u.description),1)]),_:2},1024)]),_:2},1024)):r("",!0)]),_:2},1024))),128))]),_:1})]),_:1})):r("",!0)}const K=R(E,[["render",I]]);export{K as default};
