import{u as f}from"./Cid-lLpT.js";import{a as m,r as d,ai as h,q as v,o as c,e as n,h as r,ap as b,aq as x,f as a,ad as g,ae as C,m as $}from"./CzTmpAoU.js";import"./WuPNt_re.js";import"./sfqQ1hVy.js";import"./BqB4qWRx.js";import"./BLJrl16Q.js";import"./DZ34X_XK.js";const k={class:"toc"},q={class:"toc-links"},A=["id","onClick"],B=["href"],E=m({__name:"side",setup(I){const s=f(),_=d(),i=d(null),l=h({root:_.value,threshold:.5});v(()=>{i.value=new IntersectionObserver(o=>{o.forEach(t=>{const e=t.target.getAttribute("id");e&&(t.isIntersecting?s.active_toc_ids.add(e):s.active_toc_ids.delete(e))})},l),document.querySelectorAll(s.toc_tags.map(o=>`.nuxt-content ${o}[id]`).join(", ")).forEach(o=>{var t;(t=i.value)==null||t.observe(o)})});const u=o=>`toc-${o}`,p=o=>{const t={};return t[`_${o.depth}`]=!0,t};return(o,t)=>(c(),n("nav",k,[t[0]||(t[0]=r("header",{class:"toc-header"},[r("h3",{class:"text-xl font-bold"},"Table of contents")],-1)),r("ul",q,[(c(!0),n(b,null,x(a(s).flatten_toc_links(a(s).toc_links),e=>(c(),n("li",{id:u(e.id),key:e.id,class:g(["toc-link",{...p(e),"font-bold":a(s).active_toc_ids.has(e.id)}]),onClick:S=>a(s).set_active_toc_id(e)},[r("a",{href:`#${e.id}`},C(e.text),9,B)],10,A))),128))])]))}}),L=$(E,[["__scopeId","data-v-9aa87b76"]]);export{L as default};
