function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,_=g.trustedTypes,m=_?_.emptyScript:"",f=g.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,f?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,k=w.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,H=`<${P}>`,M=document,U=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,N="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,V=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,J=M.createTreeWalker(M,129);function X(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=L;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,l=0;for(;l<i.length&&(o.lastIndex=l,h=o.exec(i),null!==h);)l=o.lastIndex,o===L?"!--"===h[1]?o=R:void 0!==h[1]?o=z:void 0!==h[2]?(V.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=j):void 0!==h[3]&&(o=j):o===j?">"===h[0]?(o=r??L,c=-1):void 0===h[1]?c=-2:(c=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?j:'"'===h[3]?D:B):o===D||o===B?o=j:o===R||o===z?o=L:(o=j,r=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===L?i+H:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[X(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[h,c]=G(t,e);if(this.el=K.createElement(h,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[n++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),J.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);J.currentNode=s;let r=J.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=J.nextNode(),n++)}return J.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Z(this,s[i+o],e,o),a===q&&(a=this._$AH[o]),n||=!O(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===q)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(K,Q),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let at=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ht=ot.litElementPolyfillSupport;ht?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},dt=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}const gt={title:"Standing Desk",min_height:60,max_height:125};function _t(t){return t.split(".")[0]}async function mt(t,e,i,s,r){if(t?.callService)try{await t.callService(e,i,{entity_id:s,...r})}catch(t){console.error(`desk-card: ${e}.${i} failed for ${s}`,t)}}const ft={button:"press",input_button:"press",automation:"trigger",script:"turn_on",scene:"turn_on",switch:"turn_on",input_boolean:"turn_on"},vt=Object.keys(ft);function $t(t,e,i){if(!e)return;mt(t,"cover","up"===i?"open_cover":"down"===i?"close_cover":"stop_cover",e)}function yt(t,e){e&&mt(t,_t(e),"toggle",e)}function bt(t,e){const i=t?.states?.[e];return i?"unavailable"===i.state||"unknown"===i.state?null:function(t){const e=parseFloat(t);return Number.isNaN(e)?null:e}(i.state):null}function xt(t,e){const i=e?t?.states?.[e]?.attributes?.unit_of_measurement:void 0;return"string"==typeof i?i:""}function wt(t){return String(Math.round(10*t)/10)}const At=o`
  :host {
    /* Handoff design tokens mapped to Home Assistant theme variables so the
       card follows the active HA theme (light or dark) automatically. */
    --dc-p: var(--primary-color);
    --dc-onp: var(--text-primary-color, #fff);
    --dc-text: var(--primary-text-color);
    --dc-text2: var(--secondary-text-color);
    --dc-divider: var(--divider-color);
    --dc-btn: var(--secondary-background-color);
    --dc-danger: var(--error-color);
    /* Light-theme tint opacities (see :host([dark]) for dark). */
    --dc-track: color-mix(in srgb, var(--primary-text-color) 14%, transparent);
    --dc-dangerBg: color-mix(in srgb, var(--error-color) 10%, transparent);
    --dc-accentBg: color-mix(in srgb, var(--primary-color) 13%, transparent);
  }

  :host([dark]) {
    /* Handoff specifies stronger tints in dark mode (otherwise ~36% too dim). */
    --dc-track: color-mix(in srgb, var(--primary-text-color) 22%, transparent);
    --dc-dangerBg: color-mix(in srgb, var(--error-color) 16%, transparent);
    --dc-accentBg: color-mix(in srgb, var(--primary-color) 22%, transparent);
  }

  ha-card {
    overflow: hidden;
    color: var(--dc-text);
    font-family: Roboto, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ha-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 14px 10px;
  }
  .icon-badge {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--dc-accentBg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
  .icon-badge ha-icon {
    color: var(--dc-p);
    --mdc-icon-size: 20px;
  }
  .title-area {
    flex: 1;
    min-width: 0;
  }
  .title {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status {
    font-size: 12px;
    margin-top: 1px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--dc-text2);
  }
  .status.moving {
    color: var(--dc-p);
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex: none;
    background: var(--dc-text2);
    opacity: 0.6;
  }
  .status.moving .status-dot {
    background: var(--dc-p);
    opacity: 1;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dc-p) 18%, transparent);
  }
  .status.locked .status-dot {
    background: var(--dc-danger);
    opacity: 1;
  }

  /* Gauge */
  .gauge {
    padding: 2px 16px 14px;
  }
  /* Current-height readout floats above the bar, centered over the fill edge. */
  .gauge-top {
    position: relative;
    height: 34px;
    margin-bottom: 12px;
  }
  .gauge-value {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 34px;
    font-weight: 300;
    line-height: 1;
    letter-spacing: -1px;
    white-space: nowrap;
    transition: left 0.09s linear;
  }
  .gauge-value .unit {
    font-size: 15px;
    font-weight: 400;
    color: var(--dc-text2);
    margin-left: 4px;
  }
  /* Bar wrapper is the pointer hit area; it's taller than the visible track. */
  .bar {
    position: relative;
    padding: 8px 0;
  }
  .bar.interactive {
    cursor: pointer;
    touch-action: none; /* let drag work without the page scrolling */
  }
  .track {
    height: 8px;
    border-radius: 5px;
    background: var(--dc-track);
    overflow: hidden;
  }
  .fill {
    height: 100%;
    background: var(--dc-p);
    border-radius: 5px;
    transition: width 0.09s linear;
  }
  .handle {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--dc-p);
    border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%);
    transition: left 0.09s linear;
  }
  .bar.interactive .handle {
    cursor: grab;
  }
  .handle.dragging {
    cursor: grabbing;
    transition: none;
    transform: translate(-50%, -50%) scale(1.15);
  }
  .scale {
    display: flex;
    justify-content: space-between;
    font-size: 10.5px;
    color: var(--dc-text2);
    margin-top: 5px;
  }

  /* Controls row */
  .controls {
    display: flex;
    gap: 12px;
    padding: 0 16px 14px;
    align-items: flex-start;
  }
  .presets {
    flex: 1;
    min-width: 0;
    display: grid;
    gap: 8px;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(var(--preset-cols), minmax(0, 1fr));
  }
  /* Preset count drives column layout and row height. 4 presets wrap to a
     2×2 grid (taller); 1–3 sit in a single row. */
  .presets,
  .manual {
    height: var(--preset-h);
  }
  .controls {
    --preset-cols: 1;
    --preset-h: 150px;
  }
  .controls[data-count='2'] {
    --preset-cols: 2;
  }
  .controls[data-count='3'] {
    --preset-cols: 3;
  }
  .controls[data-count='4'] {
    --preset-cols: 2;
    --preset-h: 176px;
  }
  .preset {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 6px;
    border-radius: 10px;
    border: 1.5px solid transparent;
    background: var(--dc-btn);
    color: var(--dc-text);
    cursor: pointer;
    overflow: hidden;
    min-height: 0;
    box-sizing: border-box;
    font-family: inherit;
    transition: background 0.15s, border-color 0.15s;
  }
  .preset.active {
    border-color: var(--dc-p);
    background: var(--dc-accentBg);
    color: var(--dc-p);
  }
  .preset.disabled {
    opacity: 0.45;
    cursor: default;
  }
  .preset ha-icon {
    --mdc-icon-size: 21px;
  }
  .preset-name {
    font-size: 13.5px;
    font-weight: 500;
    margin-top: 4px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .preset-target {
    font-size: 11px;
    opacity: 0.65;
    margin-top: 1px;
  }

  /* Manual column */
  .manual {
    width: 62px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .manual button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    background: var(--dc-btn);
    color: var(--dc-text);
    transition: background 0.15s;
  }
  .manual button.active {
    background: var(--dc-p);
    color: var(--dc-onp);
  }
  .manual button.stop {
    background: var(--dc-dangerBg);
    color: var(--dc-danger);
  }
  .manual button.disabled {
    opacity: 0.45;
    cursor: default;
  }
  .manual .updown {
    --mdc-icon-size: 32px;
  }
  .manual .stop ha-icon {
    --mdc-icon-size: 22px;
  }

  /* Footer toggles */
  .footer {
    border-top: 1px solid var(--dc-divider);
    padding: 2px 4px;
    display: flex;
    align-items: center;
  }
  .toggle-row {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .toggle-row ha-icon {
    color: var(--dc-text2);
    --mdc-icon-size: 17px;
    margin-right: 9px;
    flex: none;
  }
  .toggle-label {
    flex: 1;
    font-size: 12.5px;
  }
  .toggle {
    position: relative;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    border: 0;
    padding: 0;
    flex: none;
    cursor: pointer;
    background: var(--dc-track);
    transition: background 0.2s;
  }
  .toggle.on {
    background: var(--dc-p);
  }
  .knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s;
  }
  .toggle.on .knob {
    transform: translateX(16px);
  }
  .v-divider {
    width: 1px;
    height: 22px;
    background: var(--dc-divider);
    flex: none;
  }
`;let kt=class extends at{constructor(){super(...arguments),this._height=null,this._dir="none",this._held="none",this._childLock=!1,this._alarm=!1,this._minH=gt.min_height,this._maxH=gt.max_height,this._dragValue=null,this._dragging=!1,this._presetSig="",this.dark=!1,this._holdEnd=()=>{this._config?.hold_to_move&&"none"!==this._held&&this._stop()},this._onBarDown=t=>{this._interactive&&(t.currentTarget.setPointerCapture(t.pointerId),this._dragging=!0,this._dragValue=this._barValue(t))},this._onBarMove=t=>{this._dragging&&(this._dragValue=this._barValue(t))},this._onBarUp=()=>{var t,e,i;this._dragging&&(this._dragging=!1,null!==this._dragValue&&(t=this._hass,e=this._config.set_height_entity,i=this._dragValue,e&&mt(t,"number","set_value",e,{value:i})))},this._onBarCancel=()=>{this._dragging&&(this._dragging=!1,this._dragValue=null)}}static get styles(){return At}static getConfigElement(){return document.createElement("desk-card-editor")}static getStubConfig(){return{height_sensor:"sensor.desk_height",cover_entity:"cover.desk",min_height:gt.min_height,max_height:gt.max_height,presets:[{entity:""},{entity:""}]}}setConfig(t){const e=function(t){return{...gt,...t}}(t),i=function(t){if(!t||"object"!=typeof t)return"Configuration is missing";const e=t;if("string"!=typeof e.type||!e.type.endsWith("desk-card"))return"Invalid card type";if("string"!=typeof e.height_sensor||!e.height_sensor)return"height_sensor is required";if("string"!=typeof e.cover_entity||!e.cover_entity)return"cover_entity is required";if("number"!=typeof e.min_height||"number"!=typeof e.max_height)return"min_height and max_height must be numbers";if(e.min_height>=e.max_height)return"min_height must be less than max_height";if(void 0!==e.hold_to_move&&"boolean"!=typeof e.hold_to_move)return"hold_to_move must be true or false";if(!Array.isArray(e.presets)||e.presets.length<1||e.presets.length>4)return"presets must be a list of 1 to 4 items";for(const t of e.presets){if(!t||"string"!=typeof t.entity||!t.entity)return"Each preset needs an entity";if(void 0!==t.height&&!Number.isFinite(t.height))return"Preset height must be a number"}return null}(e);if(i)throw new Error(i);this._config=e}set hass(t){if(this._hass=t,!t||!this._config)return;const e=this._config;this._height=bt(t,e.height_sensor),null!==this._dragValue&&!this._dragging&&null!==this._height&&Math.abs(this._height-this._dragValue)<1&&(this._dragValue=null);const i=t.states?.[e.cover_entity],s=i?.state,r="opening"===s||i?.attributes?.opening,n="closing"===s||i?.attributes?.closing;this._dir=r?"up":n?"down":"none",this._childLock=!!e.child_lock_entity&&"on"===t.states?.[e.child_lock_entity]?.state,this._alarm=!!e.alarm_entity&&"on"===t.states?.[e.alarm_entity]?.state,this.dark=!!t.themes?.darkMode,this._minH=e.min_height,this._maxH=e.max_height;const o=e.presets.map(e=>{const i=t.states?.[e.entity],s=i?.attributes;return`${e.entity}:${i?.state}:${s?.friendly_name}:${s?.icon}`}).join("|");o!==this._presetSig&&(this._presetSig=o,this.requestUpdate())}get hass(){return this._hass}getCardSize(){return 5}_fmt(t){return{value:wt(t),unit:xt(this._hass,this._config?.height_sensor)}}_presetHeight(t){return Number.isFinite(t.height)?t.height:null}_presetName(t){const e=this._hass;let i=e?.states?.[t.entity]?.attributes?.friendly_name||t.entity||"Preset";const s=e?.entities?.[t.entity]?.device_id;if(s){const t=e.devices?.[s],r=t?.name_by_user||t?.name;r&&i.startsWith(r+" ")&&(i=i.slice(r.length+1))}return i}get _activeDir(){return"none"!==this._held?this._held:this._dir}get _moving(){return"none"!==this._activeDir}_activePreset(){if(this._moving||null===this._height||!this._config)return;const t=this._height;return this._config.presets.find(e=>{const i=this._presetHeight(e);return null!==i&&Math.abs(t-i)<1})}get _shownHeight(){return this._dragValue??this._height}get _interactive(){return!!this._config?.set_height_entity&&!this._childLock}_progressPercent(){const t=this._shownHeight;if(null===t)return 0;const e=(t-this._minH)/(this._maxH-this._minH)*100;return Math.max(0,Math.min(100,e))}_status(t){return this._childLock?{text:"Locked",cls:"locked"}:"up"===this._activeDir?{text:"Raising…",cls:"moving"}:"down"===this._activeDir?{text:"Lowering…",cls:"moving"}:null===this._height?{text:"Unavailable",cls:""}:t?{text:`At ${this._presetName(t)}`,cls:""}:{text:"Custom",cls:""}}render(){const t=this._config;if(!t)return W;const e=this._activePreset(),i=this._status(e),s=t.presets,r=null===this._shownHeight?{value:"—",unit:""}:this._fmt(this._shownHeight),n=this._fmt(this._minH),o=this._fmt(this._maxH),a=this._progressPercent(),h=`clamp(28px, ${a}%, calc(100% - 46px))`,c=!!t.child_lock_entity,l=!!t.alarm_entity;return I`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:desk"></ha-icon></div>
          <div class="title-area">
            <div class="title">${t.title}</div>
            <div class="status ${i.cls}">
              <span class="status-dot"></span><span>${i.text}</span>
            </div>
          </div>
        </div>

        <div class="gauge">
          <div class="gauge-top">
            <div class="gauge-value" style="left:${h}">${r.value}<span class="unit">${r.unit}</span></div>
          </div>
          <div
            class="bar ${this._interactive?"interactive":""}"
            @pointerdown=${this._onBarDown}
            @pointermove=${this._onBarMove}
            @pointerup=${this._onBarUp}
            @pointercancel=${this._onBarCancel}
          >
            <div class="track"><div class="fill" style="width:${a}%"></div></div>
            ${null!==this._shownHeight?I`<div class="handle ${this._dragging?"dragging":""}" style="left:${a}%"></div>`:W}
          </div>
          <div class="scale">
            <span>${n.value} ${n.unit}</span><span>${o.value} ${o.unit}</span>
          </div>
        </div>

        <div class="controls" data-count=${s.length}>
          <div class="presets">
            ${s.map(t=>this._renderPreset(t,t===e))}
          </div>
          <div class="manual">
            ${this._renderMove("up","mdi:chevron-up","Raise")}
            <button class="stop" title="Stop" aria-label="Stop" @click=${this._onStop}>
              <ha-icon icon="mdi:stop"></ha-icon>
            </button>
            ${this._renderMove("down","mdi:chevron-down","Lower")}
          </div>
        </div>

        ${c||l?I`<div class="footer">
              ${c?I`<div class="toggle-row">
                    <ha-icon icon=${this._childLock?"mdi:lock":"mdi:lock-open-variant"}></ha-icon>
                    <span class="toggle-label">Child lock</span>
                    <button
                      class="toggle ${this._childLock?"on":""}"
                      role="switch"
                      aria-label="Child lock"
                      aria-checked=${this._childLock}
                      @click=${this._onToggleLock}
                    >
                      <span class="knob"></span>
                    </button>
                  </div>`:W}
              ${c&&l?I`<div class="v-divider"></div>`:W}
              ${l?I`<div class="toggle-row">
                    <ha-icon icon=${this._alarm?"mdi:bell-outline":"mdi:bell-off-outline"}></ha-icon>
                    <span class="toggle-label">Alarm</span>
                    <button
                      class="toggle ${this._alarm?"on":""}"
                      role="switch"
                      aria-label="Alarm"
                      aria-checked=${this._alarm}
                      @click=${this._onToggleAlarm}
                    >
                      <span class="knob"></span>
                    </button>
                  </div>`:W}
            </div>`:W}
      </ha-card>
    `}_renderPreset(t,e){const i=this._presetHeight(t),s=`preset ${e?"active":""} ${this._childLock?"disabled":""}`,r=null!==i?this._fmt(i):null;return I`
      <button
        class=${s}
        aria-pressed=${e}
        aria-disabled=${this._childLock}
        @click=${()=>this._onPreset(t)}
      >
        <ha-state-icon .hass=${this._hass} .stateObj=${this._hass?.states?.[t.entity]}></ha-state-icon>
        <span class="preset-name">${this._presetName(t)}</span>
        <span class="preset-target">${r?`${r.value} ${r.unit}`:""}</span>
      </button>
    `}_renderMove(t,e,i){const s=`updown ${this._activeDir===t?"active":""} ${this._childLock?"disabled":""}`;return I`
      <button
        class=${s}
        title=${i}
        aria-label=${i}
        aria-disabled=${this._childLock}
        @click=${()=>this._tapMove(t)}
        @pointerdown=${()=>this._holdStart(t)}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
      >
        <ha-icon icon=${e}></ha-icon>
      </button>
    `}_onPreset(t){this._childLock||function(t,e){if(!t||!e)return;const i=_t(e),s=ft[i];s?mt(t,i,s,e):console.warn(`desk-card: preset entity "${e}" domain "${i}" is not supported.`)}(this._hass,t.entity)}_tapMove(t){this._config?.hold_to_move||this._startMove(t)}_holdStart(t){this._config?.hold_to_move&&this._startMove(t)}_startMove(t){this._childLock||(this._held=t,$t(this._hass,this._config.cover_entity,t))}_onStop(){this._stop()}_stop(){this._held="none",$t(this._hass,this._config.cover_entity,"stop")}_barValue(t){const e=t.currentTarget.getBoundingClientRect(),i=e.width?(t.clientX-e.left)/e.width:0,s=Math.max(0,Math.min(1,i));return Math.round(10*(this._minH+s*(this._maxH-this._minH)))/10}_onToggleLock(){this._config?.child_lock_entity&&yt(this._hass,this._config.child_lock_entity)}_onToggleAlarm(){this._config?.alarm_entity&&yt(this._hass,this._config.alarm_entity)}};t([ut()],kt.prototype,"_config",void 0),t([ut()],kt.prototype,"_height",void 0),t([ut()],kt.prototype,"_dir",void 0),t([ut()],kt.prototype,"_held",void 0),t([ut()],kt.prototype,"_childLock",void 0),t([ut()],kt.prototype,"_alarm",void 0),t([ut()],kt.prototype,"_minH",void 0),t([ut()],kt.prototype,"_maxH",void 0),t([ut()],kt.prototype,"_dragValue",void 0),t([pt({type:Boolean,reflect:!0})],kt.prototype,"dark",void 0),kt=t([ct("desk-card")],kt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et=1,St=3,Ct=4;class Pt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht={},Mt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Pt{constructor(t){if(super(t),t.type!==St&&t.type!==Et&&t.type!==Ct)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===q||e===W)return e;const i=t.element,s=t.name;if(t.type===St){if(e===i[s])return q}else if(t.type===Ct){if(!!e===i.hasAttribute(s))return q}else if(t.type===Et&&i.getAttribute(s)===e+"")return q;return((t,e=Ht)=>{t._$AH=e;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),e}}),Ut=[{name:"title",selector:{text:{}}}],Ot=[{name:"child_lock_entity",selector:{entity:{domain:["switch","input_boolean"]}}},{name:"alarm_entity",selector:{entity:{domain:["switch","input_boolean"]}}}],Tt={title:"Title",height_sensor:"Height sensor",cover_entity:"Cover entity",set_height_entity:"Set-height number entity (optional) — enables the draggable bar",hold_to_move:"Hold Raise/Lower to move (release to stop)",child_lock_entity:"Child lock entity (optional)",alarm_entity:"Alarm entity (optional)",min_height:"Minimum height",max_height:"Maximum height"};let Nt=class extends at{constructor(){super(...arguments),this._loaded=!1,this._error=!1,this._computeLabel=t=>Tt[t.name]??t.name}static get styles(){return o`
      :host {
        display: block;
        width: 100%;
      }
      .msg {
        padding: 16px;
        color: var(--secondary-text-color);
        font-size: 14px;
      }
      .section-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin: 20px 0 8px;
      }
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin: -4px 0 10px;
      }
      .preset-row {
        display: flex;
        gap: 8px;
        align-items: center;
        width: 100%;
        margin-bottom: 8px;
      }
      .preset-row ha-entity-picker {
        flex: 1;
        min-width: 0;
      }
      .preset-row .height {
        width: 92px;
        flex: none;
        box-sizing: border-box;
        padding: 10px 8px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 14px;
      }
      .preset-row .height:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      .remove {
        border: 0;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        flex: none;
      }
      .remove:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .add {
        width: 100%;
        margin-top: 8px;
        padding: 10px;
        border: 1.5px dashed var(--divider-color);
        border-radius: 10px;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        font: inherit;
      }
      ha-alert {
        display: block;
        margin: -2px 0 10px;
      }
    `}setConfig(t){JSON.stringify(t)!==JSON.stringify(this._config)&&(this._config=t)}connectedCallback(){super.connectedCallback(),this._loaded||this._error||this._ensureLoaded()}async _ensureLoaded(){try{const t=window.loadCardHelpers;if("function"==typeof t)try{const e=await t();e?.createCardElement?.({type:"entities",entities:[]})}catch{}let e;const i=new Promise(t=>{e=setTimeout(t,3e3,!1)}),s=await Promise.race([customElements.whenDefined("ha-entity-picker").then(()=>!0),i]);if(clearTimeout(e),!this.isConnected)return;this._loaded=s,this._error=!s}catch{if(!this.isConnected)return;this._error=!0}}render(){if(!this._config)return W;if(this._error)return I`<div class="msg">Editor failed to load — edit this card in YAML.</div>`;if(!this._loaded)return I`<div class="msg">Loading editor…</div>`;const t=this._config.presets??[],e=xt(this.hass,this._config.height_sensor),i=e?` (${e})`:"",s=t=>I`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._scalarsChanged}
      ></ha-form>
    `;return I`
      <div class="section-label">General</div>
      ${s(Ut)}

      <div class="section-label">Height adjustment</div>
      ${s((t=>[{name:"cover_entity",selector:{entity:{domain:"cover"}}},{name:"height_sensor",selector:{entity:{domain:"sensor"}}},{name:"set_height_entity",selector:{entity:{domain:"number"}}},{name:"hold_to_move",selector:{boolean:{}}},{name:"",type:"grid",schema:[{name:"min_height",selector:{number:{mode:"box",min:0,unit_of_measurement:t}}},{name:"max_height",selector:{number:{mode:"box",min:0,unit_of_measurement:t}}}]}])(e))}

      <div class="section-label">Presets (1–4)</div>
      <div class="hint">Name and icon come from the entity. Enter each preset's
        target height${i} to show its target and highlight it when the desk is there.</div>
      ${t.map((s,r)=>this._renderPresetRow(s,r,t.length,e,i))}
      ${t.length<4?I`<button class="add" @click=${this._addPreset}>+ Add preset</button>`:W}

      <div class="section-label">Optional features</div>
      ${s(Ot)}
    `}_renderPresetRow(t,e,i,s,r){return I`
      <div class="preset-row">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${t.entity}
          .includeDomains=${vt}
          allow-custom-entity
          @value-changed=${t=>this._updateEntity(e,t.detail.value)}
        ></ha-entity-picker>
        <input
          class="height"
          type="number"
          inputmode="decimal"
          placeholder=${s}
          title=${`Target height${r}`}
          .value=${Mt(null!=t.height?String(t.height):"")}
          @input=${t=>this._updateHeight(e,t.target.value)}
        />
        <button
          class="remove"
          title="Remove preset"
          ?disabled=${i<=1}
          @click=${()=>this._removePreset(e)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
      ${t.entity?W:I`<ha-alert alert-type="warning">Select an entity for this preset</ha-alert>`}
    `}_scalarsChanged(t){t.stopPropagation(),this._config&&(this._config={...this._config,...t.detail.value},this._emit())}_updateEntity(t,e){this._patchPreset(t,t=>({...t,entity:e}))}_updateHeight(t,e){const i=parseFloat((e??"").trim());this._patchPreset(t,t=>{const e={...t};return Number.isFinite(i)?e.height=i:delete e.height,e})}_patchPreset(t,e){if(!this._config)return;const i=this._config.presets.map((i,s)=>s===t?e(i):i);this._config={...this._config,presets:i},this._emit()}_addPreset(){if(!this._config||this._config.presets.length>=4)return;const t=[...this._config.presets,{entity:""}];this._config={...this._config,presets:t},this._emit()}_removePreset(t){if(!this._config||this._config.presets.length<=1)return;const e=this._config.presets.filter((e,i)=>i!==t);this._config={...this._config,presets:e},this._emit()}_emit(){const t=this._config;if(!t)return;const e=!t.presets?.length||t.presets.some(t=>!t.entity);e||this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};t([pt({attribute:!1})],Nt.prototype,"hass",void 0),t([ut()],Nt.prototype,"_config",void 0),t([ut()],Nt.prototype,"_loaded",void 0),t([ut()],Nt.prototype,"_error",void 0),Nt=t([ct("desk-card-editor")],Nt);const Lt=window.customCards=window.customCards||[];Lt.some(t=>"desk-card"===t.type)||Lt.push({type:"desk-card",name:"Standing Desk Control",description:"Control a motorized sit/stand desk"});export{kt as DeskCard,Nt as DeskCardEditor};
//# sourceMappingURL=desk-card.js.map
