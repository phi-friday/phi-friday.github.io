import{q as v,h as s,e as f,j as d,u as l}from"./query.b727c844.js";import{e as _,_ as g,a as h,as as y,b as w,ag as C,a4 as $,I as p,M as N}from"./entry.b6aa4e3c.js";import{w as c,s as P,a as b,b as j}from"./utils.94fba2a6.js";/* empty css                      *//* empty css                    *//* empty css                       *//* empty css                *//* empty css                      *//* empty css                 */import"./ContentSlot.941df907.js";/* empty css                  *//* empty css                  */import"./Icon.vue.1e10c81e.js";/* empty css                       *//* empty css                    *//* empty css                      *//* empty css                       *//* empty css                      *//* empty css                      *//* empty css                     *//* empty css                 *//* empty css                    *//* empty css                    *//* empty css                       *//* empty css                            *//* empty css                    *//* empty css                       *//* empty css                    *//* empty css                     *//* empty css                        *//* empty css                           *//* empty css                      *//* empty css                 *//* empty css                     *//* empty css                       *//* empty css                    *//* empty css                                     *//* empty css                                    *//* empty css                                *//* empty css                          *//* empty css                   *//* empty css                            *//* empty css                      *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                        *//* empty css                    *//* empty css                    */const T=async a=>{const{content:t}=_().public;typeof(a==null?void 0:a.params)!="function"&&(a=v(a));const o=a.params(),e=t.experimental.stripQueryParameters?c(`/navigation/${`${s(o)}.${t.integrity}`}/${f(o)}.json`):c(`/navigation/${s(o)}.${t.integrity}.json`);if(P())return(await g(()=>import("./client-db.a67bc99e.js"),["./client-db.a67bc99e.js","./entry.b6aa4e3c.js","./entry.928e0a3a.css","./utils.94fba2a6.js","./query.b727c844.js"],import.meta.url).then(r=>r.generateNavigation))(o);const i=await $fetch(e,{method:"GET",responseType:"json",params:t.experimental.stripQueryParameters?void 0:{_params:d(o),previewToken:b("previewToken").value}});if(typeof i=="string"&&i.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return i};const Dt=h({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(a){const{query:t}=y(a),o=w(()=>{var i;return typeof((i=t.value)==null?void 0:i.params)=="function"?t.value.params():t.value});if(!o.value&&C("dd-navigation").value){const{navigation:i}=j();return{navigation:i}}const{data:e}=await l(`content-navigation-${s(o.value)}`,()=>T(o.value));return{navigation:e}},render(a){const t=$(),{navigation:o}=a,e=r=>p(N,{to:r._path},()=>r.title),i=(r,m)=>p("ul",m?{"data-level":m}:null,r.map(n=>n.children?p("li",null,[e(n),i(n.children,m+1)]):p("li",null,e(n)))),u=r=>i(r,0);return t!=null&&t.default?t.default({navigation:o,...this.$attrs}):u(o)}});export{Dt as default};
