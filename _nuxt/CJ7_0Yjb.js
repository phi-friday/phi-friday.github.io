import{d as i,u as v,o as d,e as p,f as t,aw as g,i as h,k as m,r,m as w,n as x,K as y,as as u,ax as b,b as k,ay as B,az as K,aA as S,at as C,g as N}from"./BySKBGP4.js";const T=i({__name:"google",setup(_){const s=h();return v({script:[{defer:!0,src:s.public.google.search}]}),(a,n)=>(d(),p(g,null,[n[0]||(n[0]=t("div",{id:"google-searchbox-container",class:"flex items-center text-black"},[t("div",{class:"gcse-searchbox-only"})],-1))],1024))}}),A=m(T,[["__scopeId","data-v-a5c6a556"]]),E={class:"search-form"},I=["onKeydown"],M=i({__name:"wrap_google",setup(_){const s=r(""),a=r(null),n=r(null),c=()=>{var e;(e=n.value)==null||e.click()};return w(s,e=>{a.value&&(a.value.value=e)}),x(async()=>{var o,l;await y();const e=document.getElementById("google-searchbox-container");a.value=((o=e==null?void 0:e.getElementsByTagName("input"))==null?void 0:o[0])??null,n.value=((l=e==null?void 0:e.getElementsByTagName("button"))==null?void 0:l[0])??null}),(e,o)=>{const l=A;return d(),p(g,null,[t("div",null,[t("form",E,[o[2]||(o[2]=t("label",{for:"search-input",class:"sr-only"},"Search",-1)),u(t("input",{class:"search-form-input",type:"text",id:"search-input",placeholder:"Google Search",required:"","onUpdate:modelValue":o[0]||(o[0]=f=>B(s)?s.value=f:null),onKeydown:K(S(c,["prevent"]),["enter"])},null,40,I),[[b,k(s)]]),t("button",{class:"search-form-button",type:"button",onClick:c},o[1]||(o[1]=[t("svg",{class:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})],-1),t("span",{class:"sr-only"},"Search",-1)]))]),u(N(l,null,null,512),[[C,!1]])])],1024)}}}),G=m(M,[["__scopeId","data-v-6b80b5d9"]]);export{G as default};
