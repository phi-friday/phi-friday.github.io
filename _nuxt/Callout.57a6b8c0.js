import p from"./ContentSlot.941df907.js";import d from"./Icon.106de67c.js";import{a as f,o as _,f as v,l as t,i as s,p as l,u as r,q as h,v as C,k as g}from"./entry.b6aa4e3c.js";/* empty css                    */import"./utils.94fba2a6.js";import"./config.f69fae41.js";import"./Icon.vue.1e10c81e.js";const y={class:"summary"},V={class:"content"},k=f({__name:"Callout",props:{type:{type:String,default:"info",validator(o){return["info","success","warning","danger","primary"].includes(o)}},modelValue:{required:!1,default:()=>ref(!1)}},emits:["update:modelValue"],setup(o,{emit:c}){const u=o,e=ref(u.modelValue),i=()=>{e.value=!e.value,c("update:modelValue",e.value)};return(a,w)=>{const n=p,m=d;return _(),v("div",{class:l(["callout",[o.type]])},[t("span",{class:"preview",onClick:i},[t("span",y,[s(n,{use:a.$slots.summary},null,8,["use"])]),s(m,{name:"heroicons-outline:chevron-right",class:l(["icon",[r(e)&&"rotate"]])},null,8,["class"])]),h(t("div",V,[s(n,{use:a.$slots.content},null,8,["use"])],512),[[C,r(e)]])],2)}}}),b=g(k,[["__scopeId","data-v-37e0bf51"]]);export{b as default};
