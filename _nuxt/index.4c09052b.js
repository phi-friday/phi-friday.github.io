import{a as d,ah as u,i as h,b as m,q as t,e as f,w as x,u as g,M as v,N as w,o as k,a4 as y,a5 as b,P as C,k as q,f as N}from"./entry.1bd2ff67.js";import{u as B,q as I}from"./query.9c6589dc.js";import{g as L}from"./query.f5aceab6.js";import{r as S}from"./data_type.9bdab8d3.js";import"./utils.13affbe6.js";const r=e=>(y("data-v-205b2ef8"),e=e(),b(),e),V={class:"main_content"},A={class:"grid grid-rows-2"},E=r(()=>t("h1",{class:"main_header"},[t("span",{class:"colorful"},"phi.log"),t("span",null," in github.io")],-1)),M={class:"enter_container"},j=r(()=>t("button",{class:"enter_button"},[C(" Enter "),t("svg",{class:"w-3.5 h-3.5 ml-2","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 10"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 5h12m0 0L9 1m4 4L9 9"})])],-1)),D=d({__name:"index",async setup(e){let s,a;const n=q(),_=L(),{data:c}=([s,a]=u(()=>B("last-article-only-path",()=>I(_).only(["_path"]).limit(1).skip(n.public.default_skip).findOne())),s=await s,a(),s),i=S(c),p=h(()=>{let o=n.public.post_prefix;return i.value._path.startsWith("/")||(o+="/"),v(o+i.value._path)});return(o,O)=>{const l=w;return k(),m("div",V,[t("div",A,[E,t("div",M,[f(l,{to:g(p)},{default:x(()=>[j]),_:1},8,["to"])])])])}}});const F=N(D,[["__scopeId","data-v-205b2ef8"]]);export{F as default};
