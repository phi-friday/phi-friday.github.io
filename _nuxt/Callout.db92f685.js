import m from"./ContentSlot.20a0f367.js";import d from"./Icon.097a2193.js";import{a as _,r as l,o as f,f as v,i as s,l as t,p as r,u as c,q as h,v as C,k as g}from"./entry.23441bf5.js";/* empty css                    */import"./utils.828f2156.js";import"./config.22b9a275.js";import"./Icon.vue.c03a051a.js";const y={class:"summary"},V={class:"content"},k=_({__name:"Callout",props:{type:{type:String,default:"info",validator(o){return["info","success","warning","danger","primary"].includes(o)}},modelValue:{required:!1,default:()=>l(!1)}},emits:["update:modelValue"],setup(o,{emit:u}){const e=l(o.modelValue),i=()=>{e.value=!e.value,u("update:modelValue",e.value)};return(a,S)=>{const n=m,p=d;return f(),v("div",{class:r(["callout",[o.type]])},[s("span",{class:"preview",onClick:i},[s("span",y,[t(n,{use:a.$slots.summary},null,8,["use"])]),t(p,{name:"heroicons-outline:chevron-right",class:r(["icon",[c(e)&&"rotate"]])},null,8,["class"])]),h(s("div",V,[t(n,{use:a.$slots.content},null,8,["use"])],512),[[C,c(e)]])],2)}}}),z=g(k,[["__scopeId","data-v-37e0bf51"]]);export{z as default};
