import{a as S,D as A,ag as b,r as C,b as o,K as N,ah as B,u as e,o as r,f as w,p as h,c as z,y as D,C as q,h as E,k as F}from"./entry.b6aa4e3c.js";import{u as H}from"./config.f69fae41.js";import{I as K,l as $}from"./Icon.vue.1e10c81e.js";const j=["width","height"],G=S({__name:"Icon",props:{name:{type:String,required:!0},size:{type:String,default:""}},async setup(f){var x;let c,v;const i=f,k=A(),s=H();(x=s==null?void 0:s.nuxtIcon)!=null&&x.aliases;const m=b("icons",()=>({})),p=C(!1),a=o(()=>{var t;return(((t=s.nuxtIcon)==null?void 0:t.aliases)||{})[i.name]||i.name}),_=o(()=>{var t;return(t=m.value)==null?void 0:t[a.value]}),l=o(()=>k.vueApp.component(a.value)),n=o(()=>{var d,g,I;if(!i.size&&typeof((d=s.nuxtIcon)==null?void 0:d.size)=="boolean"&&!((g=s.nuxtIcon)!=null&&g.size))return;const t=i.size||((I=s.nuxtIcon)==null?void 0:I.size)||"1em";return String(Number(t))===t?`${t}px`:t}),u=o(()=>{var t;return((t=s==null?void 0:s.nuxtIcon)==null?void 0:t.class)??"icon"});async function y(){var t;l.value||(t=m.value)!=null&&t[a.value]||(p.value=!0,m.value[a.value]=await $(a.value).catch(()=>{}),p.value=!1)}return N(()=>a.value,y),!l.value&&([c,v]=B(()=>y()),c=await c,v()),(t,d)=>e(p)?(r(),w("span",{key:0,class:h(e(u)),width:e(n),height:e(n)},null,10,j)):e(_)?(r(),z(e(K),{key:1,icon:e(_),class:h(e(u)),width:e(n),height:e(n)},null,8,["icon","class","width","height"])):e(l)?(r(),z(D(e(l)),{key:2,class:h(e(u)),width:e(n),height:e(n)},null,8,["class","width","height"])):(r(),w("span",{key:3,class:h(e(u)),style:E({fontSize:e(n),lineHeight:e(n),width:e(n),height:e(n)})},q(f.name),7))}}),O=F(G,[["__scopeId","data-v-e610b8e3"]]);export{O as default};
