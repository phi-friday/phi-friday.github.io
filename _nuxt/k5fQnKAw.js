const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./LZLRZnbP.js","./IDu1zFby.js","./CzTmpAoU.js","./entry.4uPfcvK_.css","./Dpd8loHj.js","./sfqQ1hVy.js"])))=>i.map(i=>d[i]);
import{a as y,c as k,o as d,e as l,i as m,j as C,h as s,ae as c,f as o,ap as B,aq as E,l as L,_ as N}from"./CzTmpAoU.js";import{_ as V}from"./IDu1zFby.js";import{a as p}from"./sfqQ1hVy.js";const z=L(()=>N(()=>import("./LZLRZnbP.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url).then(n=>n.default||n)),A={class:"wrapper"},D={class:"text-2xl font-semibold"},O={class:"flex-wrap article-tags"},P={class:"font-mono text-sm font-thin text-slate-400"},j=y({__name:"item",props:{article:{},post_prefix:{},tag_prefix:{},add_tag:{type:Boolean}},setup(n){var f;const r=n,e=r.article,u=/\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;if(!u.test(e.date))throw k({statusCode:400,statusMessage:`invalid date string: ${e.date}`});const x=(f=e.date.match(u))==null?void 0:f.at(0),g=[...new Set(e.tags)].sort((t,i)=>t.localeCompare(i)),h=(t,i,_=void 0)=>{let a=_;return a||(a=r.post_prefix),!t||!a?p(t??void 0):t.startsWith("/")?p(a+t):p(a+"/"+t)};return(t,i)=>{const _=z,a=V;return d(),l("div",null,[m(a,{to:h(o(e)._path)},{default:C(()=>[s("div",A,[s("header",null,[s("h1",D,c(o(e).title),1),s("p",null,c(o(e).description),1),s("ul",O,[(d(!0),l(B,null,E(o(g),(v,w)=>(d(),l("div",{key:w},[m(_,{tag:v,add_tag:r.add_tag,use_link:!1},null,8,["tag","add_tag"])]))),128))]),s("p",P," created at: "+c(o(x)),1)])])]),_:1},8,["to"])])}}});export{j as default};
