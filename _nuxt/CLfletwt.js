import{u as p}from"./BxhKf7yt.js";import{d as v,r as d,ai as h,n as m,o as c,a as n,f as a,ap as b,aq as x,ad as g,b as r,ae as C,k as $}from"./BySKBGP4.js";import"./DaSufskL.js";const k={class:"toc"},A={class:"toc-links"},B=["id","onClick"],E=["href"],I=v({__name:"side",setup(S){const o=p(),_=d(),i=d(null),l=h({root:_.value,threshold:.5});m(()=>{i.value=new IntersectionObserver(s=>{s.forEach(t=>{const e=t.target.getAttribute("id");e&&(t.isIntersecting?o.active_toc_ids.add(e):o.active_toc_ids.delete(e))})},l),document.querySelectorAll(o.toc_tags.map(s=>`.nuxt-content ${s}[id]`).join(", ")).forEach(s=>{var t;(t=i.value)==null||t.observe(s)})});const u=s=>`toc-${s}`,f=s=>{const t={};return t[`_${s.depth}`]=!0,t};return(s,t)=>(c(),n("nav",k,[t[0]||(t[0]=a("header",{class:"toc-header"},[a("h3",{class:"text-xl font-bold"},"Table of contents")],-1)),a("ul",A,[(c(!0),n(b,null,x(r(o).flatten_toc_links(r(o).toc_links),e=>(c(),n("li",{id:u(e.id),key:e.id,class:g(["toc-link",{...f(e),"font-bold":r(o).active_toc_ids.has(e.id)}]),onClick:j=>r(o).set_active_toc_id(e)},[a("a",{href:`#${e.id}`},C(e.text),9,E)],10,B))),128))])]))}}),w=$(I,[["__scopeId","data-v-9aa87b76"]]);export{w as default};
