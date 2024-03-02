import D from"./Icon.CSq6TJ0Y.js";import{r as g,ap as F,a7 as G,a8 as J,q as A,j as T,m as H,l as K,a2 as Q,g as M,al as U,o as _,c as k,a as $,b as O,w as X,V as P,as as Y,v as L,p as Z,f as ee,_ as N,t as te,N as ne,J as oe}from"./entry.CIMn9Ylj.js";function W(e){return G()?(J(e),!0):!1}function S(e){return typeof e=="function"?e():A(e)}const C=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const ae=Object.prototype.toString,se=e=>ae.call(e)==="[object Object]",b=()=>{},ie=re();function re(){var e,t;return C&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&(/iP(ad|hone|od)/.test(window.navigator.userAgent)||((t=window==null?void 0:window.navigator)==null?void 0:t.maxTouchPoints)>2&&/iPad|Macintosh/.test(window==null?void 0:window.navigator.userAgent))}function ce(e){let t;function a(){return t||(t=e()),t}return a.reset=async()=>{const n=t;t=void 0,n&&await n},a}function ue(e,t,a={}){const{immediate:n=!0}=a,i=g(!1);let o=null;function l(){o&&(clearTimeout(o),o=null)}function c(){i.value=!1,l()}function d(...p){l(),i.value=!0,o=setTimeout(()=>{i.value=!1,o=null,e(...p)},S(t))}return n&&(i.value=!0,C&&d()),W(c),{isPending:F(i),start:d,stop:c}}function w(e){var t;const a=S(e);return(t=a==null?void 0:a.$el)!=null?t:a}const j=C?window:void 0,R=C?window.navigator:void 0;function h(...e){let t,a,n,i;if(typeof e[0]=="string"||Array.isArray(e[0])?([a,n,i]=e,t=j):[t,a,n,i]=e,!t)return b;Array.isArray(a)||(a=[a]),Array.isArray(n)||(n=[n]);const o=[],l=()=>{o.forEach(u=>u()),o.length=0},c=(u,m,s,r)=>(u.addEventListener(m,s,r),()=>u.removeEventListener(m,s,r)),d=H(()=>[w(t),S(i)],([u,m])=>{if(l(),!u)return;const s=se(m)?{...m}:m;o.push(...a.flatMap(r=>n.map(v=>c(u,r,v,s))))},{immediate:!0,flush:"post"}),p=()=>{d(),l()};return W(p),p}let B=!1;function le(e,t,a={}){const{window:n=j,ignore:i=[],capture:o=!0,detectIframe:l=!1}=a;if(!n)return b;ie&&!B&&(B=!0,Array.from(n.document.body.children).forEach(s=>s.addEventListener("click",b)),n.document.documentElement.addEventListener("click",b));let c=!0;const d=s=>i.some(r=>{if(typeof r=="string")return Array.from(n.document.querySelectorAll(r)).some(v=>v===s.target||s.composedPath().includes(v));{const v=w(r);return v&&(s.target===v||s.composedPath().includes(v))}}),u=[h(n,"click",s=>{const r=w(e);if(!(!r||r===s.target||s.composedPath().includes(r))){if(s.detail===0&&(c=!d(s)),!c){c=!0;return}t(s)}},{passive:!0,capture:o}),h(n,"pointerdown",s=>{const r=w(e);c=!d(s)&&!!(r&&!s.composedPath().includes(r))},{passive:!0}),l&&h(n,"blur",s=>{setTimeout(()=>{var r;const v=w(e);((r=n.document.activeElement)==null?void 0:r.tagName)==="IFRAME"&&!(v!=null&&v.contains(n.document.activeElement))&&t(s)},0)})].filter(Boolean);return()=>u.forEach(s=>s())}function de(){const e=g(!1),t=Q();return t&&K(()=>{e.value=!0},t),e}function V(e){const t=de();return T(()=>(t.value,!!e()))}function I(e,t={}){const{controls:a=!1,navigator:n=R}=t,i=V(()=>n&&"permissions"in n);let o;const l=typeof e=="string"?{name:e}:e,c=g(),d=()=>{o&&(c.value=o.state)},p=ce(async()=>{if(i.value){if(!o)try{o=await n.permissions.query(l),h(o,"change",d),d()}catch{c.value="prompt"}return o}});return p(),a?{state:c,isSupported:i,query:p}:c}function pe(e={}){const{navigator:t=R,read:a=!1,source:n,copiedDuring:i=1500,legacy:o=!1}=e,l=V(()=>t&&"clipboard"in t),c=I("clipboard-read"),d=I("clipboard-write"),p=T(()=>l.value||o),u=g(""),m=g(!1),s=ue(()=>m.value=!1,i);function r(){l.value&&E(c.value)?t.clipboard.readText().then(f=>{u.value=f}):u.value=z()}p.value&&a&&h(["copy","cut"],r);async function v(f=S(n)){p.value&&f!=null&&(l.value&&E(d.value)?await t.clipboard.writeText(f):q(f),u.value=f,m.value=!0,s.start())}function q(f){const y=document.createElement("textarea");y.value=f??"",y.style.position="absolute",y.style.opacity="0",document.body.appendChild(y),y.select(),document.execCommand("copy"),y.remove()}function z(){var f,y,x;return(x=(y=(f=document==null?void 0:document.getSelection)==null?void 0:f.call(document))==null?void 0:y.toString())!=null?x:""}function E(f){return f==="granted"||f==="prompt"}return{isSupported:p,text:u,copied:m,copy:v}}const fe=e=>(Z("data-v-0a12b65b"),e=e(),ee(),e),me=fe(()=>$("span",{class:"sr-only"},"Copy to clipboard",-1)),ve={class:"icon-wrapper"},ye=M({__name:"ProseCodeCopyButton",props:{content:{type:String,default:""},show:{type:Boolean,default:!1}},setup(e){const t=e,a=g(),{copy:n}=pe();le(a,()=>{o.value==="copied"&&(o.value="init")});const{prose:i}=U(),o=g("init"),l=c=>{n(t.content).then(()=>{o.value="copied"}).catch(d=>{console.warn("Couldn't copy to clipboard!",d)})};return(c,d)=>{const p=D;return _(),k("button",{ref_key:"copyButtonRef",ref:a,class:L([(e.show||o.value==="copied")&&"show"]),onClick:l},[me,$("span",ve,[O(Y,{name:"fade"},{default:X(()=>{var u,m;return[o.value==="copied"?(_(),P(p,{key:0,name:(u=A(i).copyButton)==null?void 0:u.iconCopied,size:"18",class:"copied"},null,8,["name"])):(_(),P(p,{key:1,name:(m=A(i).copyButton)==null?void 0:m.iconCopy,size:"18"},null,8,["name"]))]}),_:1})])],2)}}}),ge=N(ye,[["__scopeId","data-v-0a12b65b"]]),we={key:0,class:"filename"},_e=M({__name:"ProseCode",props:{code:{type:String,default:""},language:{type:String,default:null},filename:{type:String,default:null},highlights:{type:Array,default:()=>[]}},setup(e){const t=g(!1);return(a,n)=>{const i=ge;return _(),k("div",{class:L([[`highlight-${e.language}`],"prose-code"]),onMouseenter:n[0]||(n[0]=o=>t.value=!0),onMouseleave:n[1]||(n[1]=o=>t.value=!1)},[e.filename?(_(),k("span",we,te(e.filename),1)):ne("",!0),oe(a.$slots,"default",{},void 0,!0),O(i,{show:t.value,content:e.code,class:"copy-button"},null,8,["show","content"])],34)}}}),Se=N(_e,[["__scopeId","data-v-cafe2a2b"]]);export{Se as default};
