import{a as i,am as f,b as m,o as d,f as x,l as h,y as C,C as k,E as y,u as s,p as v,e as B,ak as c,L as b}from"./entry.d799b109.js";const S=i({__name:"one",props:{page:null,count:null,add_page:{type:Boolean},do_select:{type:Boolean}},setup(u){const e=u,o=B(),n=e.add_page??!1,a=f(),p=m(()=>n?a.value.has(e.page):!1),g=()=>{n&&(p.value?c(new Set([...a.value].filter(l=>l!==e.page))):c(new Set([...a.value,e.page])))};let t;e.do_select??!1?t={path:o.public.page_prefix,query:{select:e.page}}:t={path:o.public.page_prefix};const r=e.count??0>0?`${e.page} [${e.count}]`:e.page;return(l,w)=>{const _=b;return d(),x("li",{class:v(["tag",{select:s(p)}]),onClick:g},[h(_,{to:s(t)},{default:C(()=>[k(y(s(r)),1)]),_:1},8,["to"])],2)}}});export{S as _};
