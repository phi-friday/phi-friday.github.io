import{g as f,i as d,j as m,I as l,o as x,c as h,b as v,w as y,d as C,t as k,q as s,v as w,y as B,s as g,e as b}from"./entry.CIMn9Ylj.js";const q=f({__name:"one",props:{page:{},count:{},add_page:{type:Boolean},do_select:{type:Boolean}},setup(_){const e=_,o=B(),n=e.add_page??!1,a=d(),p=m(()=>n?a.value.has(e.page):!1),i=()=>{n&&(p.value?g(new Set([...a.value].filter(c=>c!==e.page))):g(new Set([...a.value,e.page])))};let t;e.do_select??!1?t={path:l(o.public.page_prefix),query:{select:e.page}}:t={path:l(o.public.page_prefix)};const r=e.count??0>0?`${e.page} [${e.count}]`:e.page;return(c,N)=>{const u=b;return x(),h("li",{class:w(["tag",{select:s(p)}]),onClick:i},[v(u,{to:s(t)},{default:y(()=>[C(k(s(r)),1)]),_:1},8,["to"])],2)}}});export{q as _};
