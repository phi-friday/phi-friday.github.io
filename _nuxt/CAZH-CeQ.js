const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DKHxeENr.js","./DO3Dxyu_.js","./entry.4uPfcvK_.css","./BnkkRuNb.js"])))=>i.map(i=>d[i]);
import{L as T,W as m,i as D,X as j,Y as q,Z as I,$ as F,q as M,a0 as $,c as Q,f as V,a1 as H,a2 as K,O as N,v as g,E as U,G as z,a3 as A,A as G}from"./DO3Dxyu_.js";import{u as B,h as E}from"./BnkkRuNb.js";const W=e=>e==="defer"||e===!1;function se(...e){var b;const t=typeof e[e.length-1]=="string"?e.pop():void 0;typeof e[0]!="string"&&e.unshift(t);let[a,i,n={}]=e;if(typeof a!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof i!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");const s=T(),r=i,u=()=>m.value,l=()=>s.isHydrating?s.payload.data[a]:s.static.data[a];n.server=n.server??!0,n.default=n.default??u,n.getCachedData=n.getCachedData??l,n.lazy=n.lazy??!1,n.immediate=n.immediate??!0,n.deep=n.deep??m.deep,n.dedupe=n.dedupe??"cancel";const y=n.getCachedData(a,s),w=y!=null;if(!s._asyncData[a]||!n.immediate){(b=s.payload._errors)[a]??(b[a]=m.errorValue);const f=n.deep?D:j;s._asyncData[a]={data:f(w?y:n.default()),pending:D(!w),error:q(s.payload._errors,a),status:D("idle"),_default:n.default}}const o={...s._asyncData[a]};delete o._default,o.refresh=o.execute=(f={})=>{if(s._asyncDataPromises[a]){if(W(f.dedupe??n.dedupe))return s._asyncDataPromises[a];s._asyncDataPromises[a].cancelled=!0}if(f._initial||s.isHydrating&&f._initial!==!1){const d=f._initial?y:n.getCachedData(a,s);if(d!=null)return Promise.resolve(d)}o.pending.value=!0,o.status.value="pending";const p=new Promise((d,c)=>{try{d(r(s))}catch(_){c(_)}}).then(async d=>{if(p.cancelled)return s._asyncDataPromises[a];let c=d;n.transform&&(c=await n.transform(d)),n.pick&&(c=Y(c,n.pick)),s.payload.data[a]=c,o.data.value=c,o.error.value=m.errorValue,o.status.value="success"}).catch(d=>{if(p.cancelled)return s._asyncDataPromises[a];o.error.value=Q(d),o.data.value=V(n.default()),o.status.value="error"}).finally(()=>{p.cancelled||(o.pending.value=!1,delete s._asyncDataPromises[a])});return s._asyncDataPromises[a]=p,s._asyncDataPromises[a]},o.clear=()=>X(s,a);const P=()=>o.refresh({_initial:!0}),L=n.server!==!1&&s.payload.serverRendered;{const f=H();if(f&&!f._nuxtOnBeforeMountCbs){f._nuxtOnBeforeMountCbs=[];const c=f._nuxtOnBeforeMountCbs;I(()=>{c.forEach(_=>{_()}),c.splice(0,c.length)}),F(()=>c.splice(0,c.length))}L&&s.isHydrating&&(o.error.value||y!=null)?(o.pending.value=!1,o.status.value=o.error.value?"error":"success"):f&&(s.payload.serverRendered&&s.isHydrating||n.lazy)&&n.immediate?f._nuxtOnBeforeMountCbs.push(P):n.immediate&&P();const p=K();if(n.watch){const c=M(n.watch,()=>o.refresh());p&&$(c)}const d=s.hook("app:data:refresh",async c=>{(!c||c.includes(a))&&await o.refresh()});p&&$(d)}const C=Promise.resolve(s._asyncDataPromises[a]).then(()=>o);return Object.assign(C,o),C}function X(e,t){t in e.payload.data&&(e.payload.data[t]=void 0),t in e.payload._errors&&(e.payload._errors[t]=m.errorValue),e._asyncData[t]&&(e._asyncData[t].data.value=void 0,e._asyncData[t].error.value=m.errorValue,e._asyncData[t].pending.value=!1,e._asyncData[t].status.value="idle"),t in e._asyncDataPromises&&(e._asyncDataPromises[t]&&(e._asyncDataPromises[t].cancelled=!0),e._asyncDataPromises[t]=void 0)}function Y(e,t){const a={};for(const i of t)a[i]=e[i];return a}const O=(e,t)=>t.split(".").reduce((a,i)=>a&&a[i],e),v=(e,t)=>Object.keys(e).filter(t).reduce((a,i)=>Object.assign(a,{[i]:e[i]}),{}),ie=e=>t=>e&&e.length?v(t,a=>!e.includes(a)):t,oe=e=>t=>Array.isArray(t)?t.map(a=>e(a)):e(t),R=e=>{const t=[],a=[];for(const i of e)["$","_"].includes(i)?t.push(i):a.push(i);return{prefixes:t,properties:a}},ce=(e=[])=>t=>{if(e.length===0||!t)return t;const{prefixes:a,properties:i}=R(e);return v(t,n=>!i.includes(n)&&!a.includes(n[0]))},ue=(e=[])=>t=>{if(e.length===0||!t)return t;const{prefixes:a,properties:i}=R(e);return v(t,n=>i.includes(n)||a.includes(n[0]))},le=(e,t)=>{const a=new Intl.Collator(t.$locale,{numeric:t.$numeric,caseFirst:t.$caseFirst,sensitivity:t.$sensitivity}),i=Object.keys(t).filter(n=>!n.startsWith("$"));for(const n of i)e=e.sort((s,r)=>{const u=[O(s,n),O(r,n)].map(l=>{if(l!==null)return l instanceof Date?l.toISOString():l});return t[n]===-1&&u.reverse(),a.compare(u[0],u[1])});return e},fe=(e,t="Expected an array")=>{if(!Array.isArray(e))throw new TypeError(t)},h=e=>Array.isArray(e)?e:[void 0,null].includes(e)?[]:[e],k=["sort","where","only","without"];function J(e,t={}){const a={};for(const r of Object.keys(t.initialParams||{}))a[r]=k.includes(r)?h(t.initialParams[r]):t.initialParams[r];const i=(r,u=l=>l)=>(...l)=>(a[r]=u(...l),s),n=r=>{var u;return t.legacy?r!=null&&r.surround?r.surround:r&&(r!=null&&r.dirConfig&&(r.result={_path:(u=r.dirConfig)==null?void 0:u._path,...r.result,_dir:r.dirConfig}),r!=null&&r._path||Array.isArray(r)||!Object.prototype.hasOwnProperty.call(r,"result")?r:r==null?void 0:r.result):r},s={params:()=>({...a,...a.where?{where:[...h(a.where)]}:{},...a.sort?{sort:[...h(a.sort)]}:{}}),only:i("only",h),without:i("without",h),where:i("where",r=>[...h(a.where),...h(r)]),sort:i("sort",r=>[...h(a.sort),...h(r)]),limit:i("limit",r=>parseInt(String(r),10)),skip:i("skip",r=>parseInt(String(r),10)),find:()=>e(s).then(n),findOne:()=>e(i("first")(!0)).then(n),count:()=>e(i("count")(!0)).then(n),locale:r=>s.where({_locale:r}),withSurround:i("surround",(r,u)=>({query:r,...u})),withDirConfig:()=>i("dirConfig")(!0)};return t.legacy&&(s.findSurround=(r,u)=>s.withSurround(r,u).find().then(n)),s}function x(e){return JSON.stringify(e,Z)}function Z(e,t){return t instanceof RegExp?`--REGEX ${t.toString()}`:t}const ee=e=>{let t=x(e);return t=typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t),t=t.replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""),(t.match(/.{1,100}/g)||[]).join("/")},S=e=>N(e,g().public.content.api.baseURL),de=()=>{throw console.warn("useContent is only accessible when you are using `documentDriven` mode."),console.warn("Learn more by visiting: https://content.nuxt.com/document-driven"),new Error("useContent is only accessible when you are using `documentDriven` mode.")},te=()=>{const{experimental:e}=g().public.content;return e.clientDB?!0:B().isEnabled()},ae=()=>async e=>{const{content:t}=g().public,a=e.params(),i=t.experimental.stripQueryParameters?S(`/query/${`${E(a)}.${t.integrity}`}/${ee(a)}.json`):S(`/query/${E(a)}.${t.integrity}.json`);if(te())return(await G(()=>import("./DKHxeENr.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(r=>r.useContentDatabase())).fetch(e);const n=await $fetch(i,{method:"GET",responseType:"json",params:t.experimental.stripQueryParameters?void 0:{_params:x(a),previewToken:B().getPreviewToken()}});if(typeof n=="string"&&n.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return n};function he(e,...t){const{content:a}=g().public,i=J(ae(),{initialParams:typeof e!="string"?e:{},legacy:!0});let n;typeof e=="string"&&(n=U(z(e,...t)));const s=i.params;return i.params=()=>{var u,l,y;const r=s();return n&&(r.where=r.where||[],r.first&&(r.where||[]).length===0?r.where.push({_path:A(n)}):r.where.push({_path:new RegExp(`^${n.replace(/[-[\]{}()*+.,^$\s/]/g,"\\$&")}`)})),(u=r.sort)!=null&&u.length||(r.sort=[{_stem:1,$numeric:!0}]),a.locales.length&&((y=(l=r.where)==null?void 0:l.find(o=>o._locale))!=null&&y._locale||(r.where=r.where||[],r.where.push({_locale:a.defaultLocale}))),r},i}export{de as a,fe as b,h as c,le as d,ee as e,oe as f,O as g,ce as h,ue as i,x as j,J as k,ie as o,he as q,te as s,se as u,S as w};
