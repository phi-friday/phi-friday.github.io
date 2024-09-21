import{v as N,x as D,y as z,z as F,A as O,B as G,C as A,D as B,k as C,s as y,a as U,E as T,r as $,q as V,o as I,e as W,F as j,f as S,G as J,H as Q,i as M,I as X,m as Y}from"./CzTmpAoU.js";async function Z(e,t){return await K(t).catch(i=>(console.error("Failed to get image meta for "+t,i+""),{width:0,height:0,ratio:0}))}async function K(e){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((t,r)=>{const i=new Image;i.onload=()=>{const s={width:i.width,height:i.height,ratio:i.width/i.height};t(s)},i.onerror=s=>r(s),i.src=e})}function E(e){return t=>t?e[t]||t:e.missingValue}function ee({formatter:e,keyMap:t,joinWith:r="/",valueMap:i}={}){e||(e=(o,a)=>`${o}=${a}`),t&&typeof t!="function"&&(t=E(t));const s=i||{};return Object.keys(s).forEach(o=>{typeof s[o]!="function"&&(s[o]=E(s[o]))}),(o={})=>Object.entries(o).filter(([n,c])=>typeof c<"u").map(([n,c])=>{const l=s[n];return typeof l=="function"&&(c=l(o[n])),n=typeof t=="function"?t(n):n,e(n,c)}).join(r)}function v(e=""){if(typeof e=="number")return e;if(typeof e=="string"&&e.replace("px","").match(/^\d+$/g))return Number.parseInt(e,10)}function te(e=""){if(e===void 0||!e.length)return[];const t=new Set;for(const r of e.split(" ")){const i=Number.parseInt(r.replace("x",""));i&&t.add(i)}return Array.from(t)}function ie(e){if(e.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function re(e){const t={};if(typeof e=="string")for(const r of e.split(/[\s,]+/).filter(i=>i)){const i=r.split(":");i.length!==2?t["1px"]=i[0].trim():t[i[0].trim()]=i[1].trim()}else Object.assign(t,e);return t}function se(e){const t={options:e},r=(s,o={})=>H(t,s,o),i=(s,o={},a={})=>r(s,{...a,modifiers:O(o,a.modifiers||{})}).url;for(const s in e.presets)i[s]=(o,a,n)=>i(o,a,{...e.presets[s],...n});return i.options=e,i.getImage=r,i.getMeta=(s,o)=>ne(t,s,o),i.getSizes=(s,o)=>de(t,s,o),t.$img=i,i}async function ne(e,t,r){const i=H(e,t,{...r});return typeof i.getMeta=="function"?await i.getMeta():await Z(e,i.url)}function H(e,t,r){var l,u;if(t&&typeof t!="string")throw new TypeError(`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`);if(!t||t.startsWith("data:"))return{url:t};const{provider:i,defaults:s}=oe(e,r.provider||e.options.provider),o=ae(e,r.preset);if(t=N(t)?t:D(t),!i.supportsAlias){for(const g in e.options.alias)if(t.startsWith(g)){const h=e.options.alias[g];h&&(t=z(h,t.slice(g.length)))}}if(i.validateDomains&&N(t)){const g=F(t).host;if(!e.options.domains.find(h=>h===g))return{url:t}}const a=O(r,o,s);a.modifiers={...a.modifiers};const n=a.modifiers.format;(l=a.modifiers)!=null&&l.width&&(a.modifiers.width=v(a.modifiers.width)),(u=a.modifiers)!=null&&u.height&&(a.modifiers.height=v(a.modifiers.height));const c=i.getImage(t,a,e);return c.format=c.format||n||"",c}function oe(e,t){const r=e.options.providers[t];if(!r)throw new Error("Unknown provider: "+t);return r}function ae(e,t){if(!t)return{};if(!e.options.presets[t])throw new Error("Unknown preset: "+t);return e.options.presets[t]}function de(e,t,r){var x,_,q,d,m;const i=v((x=r.modifiers)==null?void 0:x.width),s=v((_=r.modifiers)==null?void 0:_.height),o=re(r.sizes),a=(q=r.densities)!=null&&q.trim()?te(r.densities.trim()):e.options.densities;ie(a);const n=i&&s?s/i:0,c=[],l=[];if(Object.keys(o).length>=1){for(const f in o){const p=k(f,String(o[f]),s,n,e);if(p!==void 0){c.push({size:p.size,screenMaxWidth:p.screenMaxWidth,media:`(max-width: ${p.screenMaxWidth}px)`});for(const w of a)l.push({width:p._cWidth*w,src:P(e,t,r,p,w)})}}ce(c)}else for(const f of a){const p=Object.keys(o)[0];let w=p?k(p,String(o[p]),s,n,e):void 0;w===void 0&&(w={size:"",screenMaxWidth:0,_cWidth:(d=r.modifiers)==null?void 0:d.width,_cHeight:(m=r.modifiers)==null?void 0:m.height}),l.push({width:f,src:P(e,t,r,w,f)})}le(l);const u=l[l.length-1],g=c.length?c.map(f=>`${f.media?f.media+" ":""}${f.size}`).join(", "):void 0,h=g?"w":"x",b=l.map(f=>`${f.src} ${f.width}${h}`).join(", ");return{sizes:g,srcset:b,src:u==null?void 0:u.src}}function k(e,t,r,i,s){const o=s.options.screens&&s.options.screens[e]||Number.parseInt(e),a=t.endsWith("vw");if(!a&&/^\d+$/.test(t)&&(t=t+"px"),!a&&!t.endsWith("px"))return;let n=Number.parseInt(t);if(!o||!n)return;a&&(n=Math.round(n/100*o));const c=i?Math.round(n*i):r;return{size:t,screenMaxWidth:o,_cWidth:n,_cHeight:c}}function P(e,t,r,i,s){return e.$img(t,{...r.modifiers,width:i._cWidth?i._cWidth*s:void 0,height:i._cHeight?i._cHeight*s:void 0},r)}function ce(e){var r;e.sort((i,s)=>i.screenMaxWidth-s.screenMaxWidth);let t=null;for(let i=e.length-1;i>=0;i--){const s=e[i];s.media===t&&e.splice(i,1),t=s.media}for(let i=0;i<e.length;i++)e[i].media=((r=e[i+1])==null?void 0:r.media)||""}function le(e){e.sort((r,i)=>r.width-i.width);let t=null;for(let r=e.length-1;r>=0;r--){const i=e[r];i.width===t&&e.splice(r,1),t=i.width}}const ue=ee({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(e,t)=>A(e)+"_"+A(t)}),fe=(e,{modifiers:t={},baseURL:r}={},i)=>{t.width&&t.height&&(t.resize=`${t.width}x${t.height}`,delete t.width,delete t.height);const s=ue(t)||"_";return r||(r=z(i.options.nuxt.baseURL,"/_ipx")),{url:z(r,s,G(e))}},ge=!0,he=!0,me=Object.freeze(Object.defineProperty({__proto__:null,getImage:fe,supportsAlias:he,validateDomains:ge},Symbol.toStringTag,{value:"Module"})),L={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:[],alias:{},densities:[1,2],format:["webp"]};L.providers={ipxStatic:{provider:me,defaults:{}}};const R=()=>{const e=C(),t=B();return t.$img||t._img||(t._img=se({...L,nuxt:{baseURL:e.app.baseURL},runtimeConfig:e}))};function pe(e){var t;(t=performance==null?void 0:performance.mark)==null||t.call(performance,"mark_feature_usage",{detail:{feature:e}})}const ye={src:{type:String,required:!1},format:{type:String,required:!1},quality:{type:[Number,String],required:!1},background:{type:String,required:!1},fit:{type:String,required:!1},modifiers:{type:Object,required:!1},preset:{type:String,required:!1},provider:{type:String,required:!1},sizes:{type:[Object,String],required:!1},densities:{type:String,required:!1},preload:{type:[Boolean,Object],required:!1},width:{type:[String,Number],required:!1},height:{type:[String,Number],required:!1},alt:{type:String,required:!1},referrerpolicy:{type:String,required:!1},usemap:{type:String,required:!1},longdesc:{type:String,required:!1},ismap:{type:Boolean,required:!1},loading:{type:String,required:!1,validator:e=>["lazy","eager"].includes(e)},crossorigin:{type:[Boolean,String],required:!1,validator:e=>["anonymous","use-credentials","",!0,!1].includes(e)},decoding:{type:String,required:!1,validator:e=>["async","auto","sync"].includes(e)},nonce:{type:[String],required:!1}},ve=e=>{const t=y(()=>({provider:e.provider,preset:e.preset})),r=y(()=>({width:v(e.width),height:v(e.height),alt:e.alt,referrerpolicy:e.referrerpolicy,usemap:e.usemap,longdesc:e.longdesc,ismap:e.ismap,crossorigin:e.crossorigin===!0?"anonymous":e.crossorigin||void 0,loading:e.loading,decoding:e.decoding,nonce:e.nonce})),i=R(),s=y(()=>({...e.modifiers,width:v(e.width),height:v(e.height),format:e.format,quality:e.quality||i.options.quality,background:e.background,fit:e.fit}));return{options:t,attrs:r,modifiers:s}},we={...ye,placeholder:{type:[Boolean,String,Number,Array],required:!1},placeholderClass:{type:String,required:!1}},Se=["src"],be=U({__name:"NuxtImg",props:we,emits:["load","error"],setup(e,{emit:t}){const r=e,i=T(),s=t,o=!1,a=R(),n=ve(r),c=$(!1),l=$(),u=y(()=>a.getSizes(r.src,{...n.options.value,sizes:r.sizes,densities:r.densities,modifiers:{...n.modifiers.value,width:v(r.width),height:v(r.height)}})),g=y(()=>{const d={...n.attrs.value,"data-nuxt-img":""};return(!r.placeholder||c.value)&&(d.sizes=u.value.sizes,d.srcset=u.value.srcset),d}),h=y(()=>{let d=r.placeholder;if(d===""&&(d=!0),!d||c.value)return!1;if(typeof d=="string")return d;const m=Array.isArray(d)?d:typeof d=="number"?[d,d]:[10,10];return a(r.src,{...n.modifiers.value,width:m[0],height:m[1],quality:m[2]||50,blur:m[3]||3},n.options.value)}),b=y(()=>r.sizes?u.value.src:a(r.src,n.modifiers.value,n.options.value)),x=y(()=>h.value?h.value:b.value),q=B().isHydrating;return V(()=>{if(h.value){const d=new Image;b.value&&(d.src=b.value),r.sizes&&(d.sizes=u.value.sizes||"",d.srcset=u.value.srcset),d.onload=m=>{c.value=!0,s("load",m)},pe("nuxt-image");return}l.value&&(l.value.complete&&q&&(l.value.getAttribute("data-error")?s("error",new Event("error")):s("load",new Event("load"))),l.value.onload=d=>{s("load",d)},l.value.onerror=d=>{s("error",d)})}),(d,m)=>(I(),W("img",j({ref_key:"imgEl",ref:l,class:r.placeholder&&!c.value?r.placeholderClass:void 0},{...S(o)?{onerror:"this.setAttribute('data-error', 1)"}:{},...g.value,...S(i)},{src:x.value}),null,16,Se))}}),xe=U({__name:"prose_img",props:{src:{type:String,default:""},alt:{type:String,default:""},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0}},setup(e){const t=$(!1),r={position:"fixed",top:0,left:0,width:"100%",height:"100%","background-color":"rgba(0, 0, 0, 0.9)",display:"flex","justify-content":"center","align-items":"center","z-index":9999},i={width:"100%",height:"100%","object-fit":"contain"},s=y(()=>t.value?{...r,overflow:"hidden"}:{...r,overflow:"auto"}),o=e,a=y(()=>{let n=o.src;return n.startsWith("../../public/")&&(n=n.replace("../../public/","/")),n.startsWith("/")&&!n.startsWith("//")?J(n,C().app.baseURL):n});return(n,c)=>{const l=be;return I(),W("div",null,[S(t)?(I(),W("div",{key:0,style:Q(S(s))},[M(l,j({style:i},n.$attrs,{src:S(a),alt:e.alt,width:e.width,height:e.height,loading:"lazy",format:"webp",quality:"100",onClick:c[0]||(c[0]=u=>t.value=!1)}),null,16,["src","alt","width","height"])],4)):X("",!0),M(l,j(n.$attrs,{src:S(a),alt:e.alt,width:e.width,height:e.height,loading:"lazy",format:"webp",quality:"100",onClick:c[1]||(c[1]=u=>t.value=!0)}),null,16,["src","alt","width","height"])])}}}),_e=Y(xe,[["__scopeId","data-v-5ae0de63"]]);export{_e as default};
