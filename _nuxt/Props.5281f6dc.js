import V from"./ProseTh.8ca5ea5a.js";import $ from"./ProseTr.8a84bd34.js";import B from"./ProseThead.595c5607.js";import C from"./ProseCodeInline.9fdc566f.js";import g from"./ProseTd.a2f8107a.js";import p from"./ProseTbody.c760cf26.js";import b from"./ProseTable.65a751c0.js";import{f as N,an as R,o as a,c as d,w as e,e as r,O as l,p as s,b as S,U as F,V as L,L as m}from"./entry.b5af832a.js";/* empty css                    *//* empty css                    *//* empty css                       *//* empty css                            *//* empty css                    *//* empty css                       */const A=defineComponent({props:{of:{type:String,default:void 0},required:{type:Boolean,default:void 0},values:{type:Boolean,default:void 0},description:{type:Boolean,default:void 0},default:{type:Boolean,default:void 0}},async setup(t){const h=`/api/component-meta/${R(t.of)}`,{data:y}=await useAsyncData(t.of,()=>$fetch(h),"$oSoCJtWFoC"),i=computed(()=>y.value.props.filter(o=>{var n;return!((n=o.tags)!=null&&n.ignore.includes(o))})),k=computed(()=>{var o;return t.required!==void 0?t.required:(o=i.value)==null?void 0:o.find(n=>n.required!==void 0)}),w=computed(()=>{var o;return t.values!==void 0?t.values:(o=i.value)==null?void 0:o.find(n=>n.values)}),f=computed(()=>{var o;return t.description!==void 0?t.description:(o=i.value)==null?void 0:o.find(n=>n.description)}),c=computed(()=>{var o;return t.default!==void 0?t.default:(o=i.value)==null?void 0:o.find(n=>n.default)});return{meta:y,properties:i,showRequired:k,showValues:w,showDescription:f,showDefault:c}}});function E(t,h,y,i,k,w){var q,v,D;const f=V,c=$,o=B,n=C,_=g,P=p,T=b;return t.meta&&((q=t.meta)!=null&&q.props)&&((D=(v=t.meta)==null?void 0:v.props)!=null&&D.length)?(a(),d(T,{key:0},{default:e(()=>[r(o,null,{default:e(()=>[r(c,null,{default:e(()=>[r(f,null,{default:e(()=>[l("Prop")]),_:1}),r(f,null,{default:e(()=>[l("Type")]),_:1}),t.showRequired?(a(),d(f,{key:0},{default:e(()=>[l(" Required ")]),_:1})):s("",!0),t.showDefault?(a(),d(f,{key:1},{default:e(()=>[l(" Default ")]),_:1})):s("",!0),t.showValues?(a(),d(f,{key:2},{default:e(()=>[l(" Values ")]),_:1})):s("",!0),t.showDescription?(a(),d(f,{key:3},{default:e(()=>[l(" Description ")]),_:1})):s("",!0)]),_:1})]),_:1}),r(P,null,{default:e(()=>[(a(!0),S(F,null,L(t.properties,u=>(a(),d(c,{key:u.name},{default:e(()=>[r(_,null,{default:e(()=>[r(n,null,{default:e(()=>[l(m((u==null?void 0:u.name)||"?"),1)]),_:2},1024)]),_:2},1024),r(_,null,{default:e(()=>[r(n,null,{default:e(()=>[l(m((u==null?void 0:u.type)||"?"),1)]),_:2},1024)]),_:2},1024),t.showRequired?(a(),d(_,{key:0},{default:e(()=>[r(n,null,{default:e(()=>[l(m(u.required==="?"?"?":u.required?"Yes":"No"),1)]),_:2},1024)]),_:2},1024)):s("",!0),t.showDefault?(a(),d(_,{key:1},{default:e(()=>[u.default?(a(),d(n,{key:0},{default:e(()=>[l(m((u==null?void 0:u.default)||"?"),1)]),_:2},1024)):s("",!0)]),_:2},1024)):s("",!0),t.showValues?(a(),d(_,{key:2},{default:e(()=>[u.values?(a(),d(n,{key:0},{default:e(()=>[l(m((u==null?void 0:u.values)||"?"),1)]),_:2},1024)):(a(),d(n,{key:1},{default:e(()=>[l(" - ")]),_:1}))]),_:2},1024)):s("",!0),t.showDescription?(a(),d(_,{key:3},{default:e(()=>[r(n,null,{default:e(()=>[l(m(u.description),1)]),_:2},1024)]),_:2},1024)):s("",!0)]),_:2},1024))),128))]),_:1})]),_:1})):s("",!0)}const X=N(A,[["render",E]]);export{X as default};
