/*! @version pwa-studio: 1.0.0, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.10, @magento/pwa-theme-venia: ^1.3.0, @magento/pwa-buildpack: ~11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/experience-platform-connector: ^1.0.5, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.7.12 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"Ri/J":function(e,t,r){"use strict"
var n=r("LboF"),o=r.n(n),a=r("sARL"),i={injectType:"singletonStyleTag",insert:"head",singleton:!0}
o()(a.a,i)
t.a=a.a.locals||{}},sARL:function(e,t,r){"use strict"
var n=r("JPst"),o=r.n(n)()(function(e){return e[1]})
o.push([e.i,".button-root-MFn {\n    padding-top: calc(0.5rem + 1px); /* TODO @TW: review */\n    padding-bottom: calc(0.5rem - 1px); /* TODO @TW: review */\n    min-height: 2.5rem;\n    transition-duration: 256ms;\n    transition-property: background-color, border-color, color;\n    transition-timing-function: var(--venia-global-anim-standard);\n}\n\n.button-root-MFn:active {\n    transition-duration: 128ms;\n}\n\n/**\n * Some browsers retain the :hover state after a click, this ensures if a button becomes disabled after\n * being clicked it will be visually disabled.\n */\n.button-root-MFn:hover:disabled {\n    /* TODO @TW: cannot compose. This may not be possible with two variants. */\n    pointer-events: none;\n}\n\n.button-root_lowPriority-Qoh {\n}\n\n.button-root_normalPriority-1E0 {\n}\n\n.button-root_highPriority-UpE {\n}\n\n.button-root_lowPriorityNegative-uax,\n.button-root_normalPriorityNegative-x-d {\n}\n\n.button-root_highPriorityNegative-gwK {\n}\n\n.button-content-TD8 {\n}\n",""]),o.locals={root:"button-root-MFn border-2 border-solid cursor-pointer font-bold inline-flex items-center justify-center leading-tight max-w-full min-w-[10rem] outline-none pointer-events-auto px-sm rounded-full text-center text-sm uppercase disabled_bg-gray-400 disabled_border-gray-400 disabled_opacity-50 disabled_pointer-events-none disabled_text-white focus_shadow-inputFocus",root_lowPriority:"button-root_lowPriority-Qoh button-root-MFn border-2 border-solid cursor-pointer font-bold inline-flex items-center justify-center leading-tight max-w-full min-w-[10rem] outline-none pointer-events-auto px-sm rounded-full text-center text-sm uppercase disabled_bg-gray-400 disabled_border-gray-400 disabled_opacity-50 disabled_pointer-events-none disabled_text-white focus_shadow-inputFocus bg-transparent border-gray-700 text-gray-700 active_border-gray-800 active_text-gray-800 hover_border-gray-800 hover_text-gray-800",root_normalPriority:"button-root_normalPriority-1E0 button-root-MFn border-2 border-solid cursor-pointer font-bold inline-flex items-center justify-center leading-tight max-w-full min-w-[10rem] outline-none pointer-events-auto px-sm rounded-full text-center text-sm uppercase disabled_bg-gray-400 disabled_border-gray-400 disabled_opacity-50 disabled_pointer-events-none disabled_text-white focus_shadow-inputFocus bg-transparent border-brand-dark text-brand-dark active_border-brand-darkest active_text-brand-darkest hover_border-brand-darkest hover_text-brand-darkest",root_highPriority:"button-root_highPriority-UpE button-root-MFn border-2 border-solid cursor-pointer font-bold inline-flex items-center justify-center leading-tight max-w-full min-w-[10rem] outline-none pointer-events-auto px-sm rounded-full text-center text-sm uppercase disabled_bg-gray-400 disabled_border-gray-400 disabled_opacity-50 disabled_pointer-events-none disabled_text-white focus_shadow-inputFocus bg-brand-dark border-brand-dark text-white active_bg-brand-darkest active_border-brand-darkest active_text-white hover_bg-brand-darkest hover_border-brand-darkest hover_text-white",root_lowPriorityNegative:"button-root_lowPriorityNegative-uax button-root-MFn border-2 border-solid cursor-pointer font-bold inline-flex items-center justify-center leading-tight max-w-full min-w-[10rem] outline-none pointer-events-auto px-sm rounded-full text-center text-sm uppercase disabled_bg-gray-400 disabled_border-gray-400 disabled_opacity-50 disabled_pointer-events-none disabled_text-white focus_shadow-inputFocus bg-transparent border-red-600 text-red-600 active_border-red-700 active_text-red-700 hover_border-red-700 hover_text-red-700",root_normalPriorityNegative:"button-root_normalPriorityNegative-x-d button-root-MFn border-2 border-solid cursor-pointer font-bold inline-flex items-center justify-center leading-tight max-w-full min-w-[10rem] outline-none pointer-events-auto px-sm rounded-full text-center text-sm uppercase disabled_bg-gray-400 disabled_border-gray-400 disabled_opacity-50 disabled_pointer-events-none disabled_text-white focus_shadow-inputFocus bg-transparent border-red-600 text-red-600 active_border-red-700 active_text-red-700 hover_border-red-700 hover_text-red-700",root_highPriorityNegative:"button-root_highPriorityNegative-gwK button-root-MFn border-2 border-solid cursor-pointer font-bold inline-flex items-center justify-center leading-tight max-w-full min-w-[10rem] outline-none pointer-events-auto px-sm rounded-full text-center text-sm uppercase disabled_bg-gray-400 disabled_border-gray-400 disabled_opacity-50 disabled_pointer-events-none disabled_text-white focus_shadow-inputFocus bg-red-600 border-red-600 text-white active_bg-red-700 active_border-red-700 active_text-white hover_bg-red-700 hover_border-red-700 hover_text-white",content:"button-content-TD8 gap-1.5 grid-flow-col inline-grid items-center justify-center justify-items-center"},t.a=o},"zI+h":function(e,t,n){"use strict"
n.d(t,"a",function(){return $701a24aa0da5b062$export$ea18c227d4417cc3})
var o=n("q1tI"),a=n.n(o)
String(Math.round(1e10*Math.random()))
Boolean("undefined"!=typeof window&&window.document&&window.document.createElement),new WeakMap
function r(e){var t,n,o=""
if("string"==typeof e||"number"==typeof e)o+=e
else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n)
else for(t in e)e[t]&&(o&&(o+=" "),o+=t)
return o}var i=function clsx(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t)
return o}
const s="undefined"!=typeof window?a.a.useLayoutEffect:()=>{}
let d=new Map
function $bdb11010cef70236$export$cd8c9cb68f842629(e,t){if(e===t)return e
let r=d.get(e)
if(r)return r(t),t
let n=d.get(t)
return n?(n(e),e):t}function $ff5963eb1fccf552$export$e08e3b67e392101e(...e){return(...t)=>{for(let r of e)"function"==typeof r&&r(...t)}}function $3ef42575df84b30b$export$9d1611c77c2fe928(...e){let t={...e[0]}
for(let r=1;r<e.length;r++){let n=e[r]
for(let e in n){let r=t[e],o=n[e]
"function"==typeof r&&"function"==typeof o&&"o"===e[0]&&"n"===e[1]&&e.charCodeAt(2)>=65&&e.charCodeAt(2)<=90?t[e]=$ff5963eb1fccf552$export$e08e3b67e392101e(r,o):"className"!==e&&"UNSAFE_className"!==e||"string"!=typeof r||"string"!=typeof o?"id"===e&&r&&o?t.id=$bdb11010cef70236$export$cd8c9cb68f842629(r,o):t[e]=void 0!==o?o:r:t[e]=i(r,o)}}return t}const c=new Set(["id"]),l=new Set(["aria-label","aria-labelledby","aria-describedby","aria-details"]),u=/^(data-.*)$/
function $7215afc6de606d6b$export$de79e2c695e052f3(e){if(function $7215afc6de606d6b$var$supportsPreventScroll(){if(null==f){f=!1
try{var e=document.createElement("div")
e.focus({get preventScroll(){return f=!0,!0}})}catch(e){}}return f}())e.focus({preventScroll:!0})
else{let t=function $7215afc6de606d6b$var$getScrollableElements(e){var t=e.parentNode,r=[],n=document.scrollingElement||document.documentElement
for(;t instanceof HTMLElement&&t!==n;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&r.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode
n instanceof HTMLElement&&r.push({element:n,scrollTop:n.scrollTop,scrollLeft:n.scrollLeft})
return r}(e)
e.focus(),function $7215afc6de606d6b$var$restoreScrollPosition(e){for(let{element:t,scrollTop:r,scrollLeft:n}of e)t.scrollTop=r,t.scrollLeft=n}(t)}}let f=null
let b=new Map,p=new Set
function $bbed8b41f857bcc0$var$setupGlobalEvents(){if("undefined"==typeof window)return
let e=t=>{let r=b.get(t.target)
if(r&&(r.delete(t.propertyName),0===r.size&&(t.target.removeEventListener("transitioncancel",e),b.delete(t.target)),0===b.size)){for(let e of p)e()
p.clear()}}
document.body.addEventListener("transitionrun",t=>{let r=b.get(t.target)
r||(r=new Set,b.set(t.target,r),t.target.addEventListener("transitioncancel",e)),r.add(t.propertyName)}),document.body.addEventListener("transitionend",e)}function $bbed8b41f857bcc0$export$24490316f764c430(e){requestAnimationFrame(()=>{0===b.size?e():p.add(e)})}"undefined"!=typeof document&&("loading"!==document.readyState?$bbed8b41f857bcc0$var$setupGlobalEvents():document.addEventListener("DOMContentLoaded",$bbed8b41f857bcc0$var$setupGlobalEvents))
function $03deb23ff14920c4$export$4eaf04e54aa8eed6(){let e=(0,o.useRef)(new Map),t=(0,o.useCallback)((t,r,n,o)=>{let a=(null==o?void 0:o.once)?(...t)=>{e.current.delete(n),n(...t)}:n
e.current.set(n,{type:r,eventTarget:t,fn:a,options:o}),t.addEventListener(r,n,o)},[]),r=(0,o.useCallback)((t,r,n,o)=>{var a
let i=(null===(a=e.current.get(n))||void 0===a?void 0:a.fn)||n
t.removeEventListener(r,i,o),e.current.delete(n)},[]),n=(0,o.useCallback)(()=>{e.current.forEach((e,t)=>{r(e.eventTarget,e.type,t,e.options)})},[r])
return(0,o.useEffect)(()=>n,[n]),{addGlobalListener:t,removeGlobalListener:r,removeAllGlobalListeners:n}}function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(e,t){s(()=>{if(e&&e.ref&&t)return e.ref.current=t.current,()=>{e.ref.current=null}},[e,t])}"undefined"!=typeof window&&window.visualViewport
new Map
function $c87311424ea30a05$var$testUserAgent(e){var t
return"undefined"!=typeof window&&null!=window.navigator&&((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.brands.some(t=>e.test(t.brand)))||e.test(window.navigator.userAgent))}function $c87311424ea30a05$var$testPlatform(e){var t
return"undefined"!=typeof window&&null!=window.navigator&&e.test((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.platform)||window.navigator.platform)}function $c87311424ea30a05$export$9ac100e40613ea10(){return $c87311424ea30a05$var$testPlatform(/^Mac/i)}function $c87311424ea30a05$export$fedb369cb70207f1(){return function $c87311424ea30a05$export$186c6964ca17d99(){return $c87311424ea30a05$var$testPlatform(/^iPhone/i)}()||function $c87311424ea30a05$export$7bef049ce92e4224(){return $c87311424ea30a05$var$testPlatform(/^iPad/i)||$c87311424ea30a05$export$9ac100e40613ea10()&&navigator.maxTouchPoints>1}()}function $6a7db85432448f7f$export$60278871457622de(e){return!(0!==e.mozInputSource||!e.isTrusted)||(function $c87311424ea30a05$export$a11b0059900ceec8(){return $c87311424ea30a05$var$testUserAgent(/Android/i)}()&&e.pointerType?"click"===e.type&&1===e.buttons:0===e.detail&&!e.pointerType)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let $="default",v="",g=new WeakMap
function $14c0b72509d70225$export$16a4697467175487(e){$c87311424ea30a05$export$fedb369cb70207f1()?("default"===$&&(v=document.documentElement.style.webkitUserSelect,document.documentElement.style.webkitUserSelect="none"),$="disabled"):(e instanceof HTMLElement||e instanceof SVGElement)&&(g.set(e,e.style.userSelect),e.style.userSelect="none")}function $14c0b72509d70225$export$b0d6fa1ab32e3295(e){if($c87311424ea30a05$export$fedb369cb70207f1()){if("disabled"!==$)return
$="restoring",setTimeout(()=>{$bbed8b41f857bcc0$export$24490316f764c430(()=>{"restoring"===$&&("none"===document.documentElement.style.webkitUserSelect&&(document.documentElement.style.webkitUserSelect=v||""),v="",$="default")})},300)}else if((e instanceof HTMLElement||e instanceof SVGElement)&&e&&g.has(e)){let t=g.get(e)
"none"===e.style.userSelect&&(e.style.userSelect=t),""===e.getAttribute("style")&&e.removeAttribute("style"),g.delete(e)}}const y=a.a.createContext(null)
function $f6c31cce2adf654f$export$45712eceda6fad21(e){let{onPress:t,onPressChange:r,onPressStart:n,onPressEnd:a,onPressUp:i,isDisabled:s,isPressed:d,preventFocusOnPress:c,shouldCancelOnPointerExit:l,allowTextSelectionOnPress:u,ref:f,...b}=function $f6c31cce2adf654f$var$usePressResponderContext(e){let t=(0,o.useContext)(y)
if(t){let{register:r,...n}=t
e=$3ef42575df84b30b$export$9d1611c77c2fe928(n,e),r()}return $e7801be82b4b2a53$export$4debdb1a3f0fa79e(t,e.ref),e}(e),p=(0,o.useRef)(null)
p.current={onPress:t,onPressChange:r,onPressStart:n,onPressEnd:a,onPressUp:i,isDisabled:s,shouldCancelOnPointerExit:l}
let[$,v]=(0,o.useState)(!1),g=(0,o.useRef)({isPressed:!1,ignoreEmulatedMouseEvents:!1,ignoreClickAfterPress:!1,didFirePressStart:!1,activePointerId:null,target:null,isOverTarget:!1,pointerType:null}),{addGlobalListener:h,removeAllGlobalListeners:m}=$03deb23ff14920c4$export$4eaf04e54aa8eed6(),T=(0,o.useMemo)(()=>{let e=g.current,t=(t,r)=>{let{onPressStart:n,onPressChange:o,isDisabled:a}=p.current
a||e.didFirePressStart||(n&&n({type:"pressstart",pointerType:r,target:t.currentTarget,shiftKey:t.shiftKey,metaKey:t.metaKey,ctrlKey:t.ctrlKey,altKey:t.altKey}),o&&o(!0),e.didFirePressStart=!0,v(!0))},r=(t,r,n=!0)=>{let{onPressEnd:o,onPressChange:a,onPress:i,isDisabled:s}=p.current
e.didFirePressStart&&(e.ignoreClickAfterPress=!0,e.didFirePressStart=!1,o&&o({type:"pressend",pointerType:r,target:t.currentTarget,shiftKey:t.shiftKey,metaKey:t.metaKey,ctrlKey:t.ctrlKey,altKey:t.altKey}),a&&a(!1),v(!1),i&&n&&!s&&i({type:"press",pointerType:r,target:t.currentTarget,shiftKey:t.shiftKey,metaKey:t.metaKey,ctrlKey:t.ctrlKey,altKey:t.altKey}))},n=(e,t)=>{let{onPressUp:r,isDisabled:n}=p.current
n||r&&r({type:"pressup",pointerType:t,target:e.currentTarget,shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey})},o=t=>{e.isPressed&&(e.isOverTarget&&r($f6c31cce2adf654f$var$createEvent(e.target,t),e.pointerType,!1),e.isPressed=!1,e.isOverTarget=!1,e.activePointerId=null,e.pointerType=null,m(),u||$14c0b72509d70225$export$b0d6fa1ab32e3295(e.target))},a={onKeyDown(r){$f6c31cce2adf654f$var$isValidKeyboardEvent(r.nativeEvent,r.currentTarget)&&r.currentTarget.contains(r.target)?($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(r.target,r.key)&&r.preventDefault(),r.stopPropagation(),e.isPressed||r.repeat||(e.target=r.currentTarget,e.isPressed=!0,t(r,"keyboard"),h(document,"keyup",i,!1))):"Enter"===r.key&&$f6c31cce2adf654f$var$isHTMLAnchorLink(r.currentTarget)&&r.stopPropagation()},onKeyUp(t){$f6c31cce2adf654f$var$isValidKeyboardEvent(t.nativeEvent,t.currentTarget)&&!t.repeat&&t.currentTarget.contains(t.target)&&n($f6c31cce2adf654f$var$createEvent(e.target,t),"keyboard")},onClick(o){o&&!o.currentTarget.contains(o.target)||o&&0===o.button&&(o.stopPropagation(),s&&o.preventDefault(),e.ignoreClickAfterPress||e.ignoreEmulatedMouseEvents||"virtual"!==e.pointerType&&!$6a7db85432448f7f$export$60278871457622de(o.nativeEvent)||(s||c||$7215afc6de606d6b$export$de79e2c695e052f3(o.currentTarget),t(o,"virtual"),n(o,"virtual"),r(o,"virtual")),e.ignoreEmulatedMouseEvents=!1,e.ignoreClickAfterPress=!1)}},i=t=>{if(e.isPressed&&$f6c31cce2adf654f$var$isValidKeyboardEvent(t,e.target)){$f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(t.target,t.key)&&t.preventDefault(),t.stopPropagation(),e.isPressed=!1
let n=t.target
r($f6c31cce2adf654f$var$createEvent(e.target,t),"keyboard",e.target.contains(n)),m(),e.target instanceof HTMLElement&&e.target.contains(n)&&($f6c31cce2adf654f$var$isHTMLAnchorLink(e.target)||"link"===e.target.getAttribute("role"))&&e.target.click()}}
if("undefined"!=typeof PointerEvent){a.onPointerDown=(r=>{0===r.button&&r.currentTarget.contains(r.target)&&(!function $6a7db85432448f7f$export$29bf1b5f2c56cf63(e){return 0===e.width&&0===e.height||1===e.width&&1===e.height&&0===e.pressure&&0===e.detail&&"mouse"===e.pointerType}(r.nativeEvent)?($f6c31cce2adf654f$var$shouldPreventDefault(r.currentTarget)&&r.preventDefault(),e.pointerType=r.pointerType,r.stopPropagation(),e.isPressed||(e.isPressed=!0,e.isOverTarget=!0,e.activePointerId=r.pointerId,e.target=r.currentTarget,s||c||$7215afc6de606d6b$export$de79e2c695e052f3(r.currentTarget),u||$14c0b72509d70225$export$16a4697467175487(e.target),t(r,e.pointerType),h(document,"pointermove",i,!1),h(document,"pointerup",d,!1),h(document,"pointercancel",l,!1))):e.pointerType="virtual")}),a.onMouseDown=(e=>{e.currentTarget.contains(e.target)&&0===e.button&&($f6c31cce2adf654f$var$shouldPreventDefault(e.currentTarget)&&e.preventDefault(),e.stopPropagation())}),a.onPointerUp=(t=>{t.currentTarget.contains(t.target)&&"virtual"!==e.pointerType&&0===t.button&&$f6c31cce2adf654f$var$isOverTarget(t,t.currentTarget)&&n(t,e.pointerType||t.pointerType)})
let i=n=>{n.pointerId===e.activePointerId&&($f6c31cce2adf654f$var$isOverTarget(n,e.target)?e.isOverTarget||(e.isOverTarget=!0,t($f6c31cce2adf654f$var$createEvent(e.target,n),e.pointerType)):e.isOverTarget&&(e.isOverTarget=!1,r($f6c31cce2adf654f$var$createEvent(e.target,n),e.pointerType,!1),p.current.shouldCancelOnPointerExit&&o(n)))},d=t=>{t.pointerId===e.activePointerId&&e.isPressed&&0===t.button&&($f6c31cce2adf654f$var$isOverTarget(t,e.target)?r($f6c31cce2adf654f$var$createEvent(e.target,t),e.pointerType):e.isOverTarget&&r($f6c31cce2adf654f$var$createEvent(e.target,t),e.pointerType,!1),e.isPressed=!1,e.isOverTarget=!1,e.activePointerId=null,e.pointerType=null,m(),u||$14c0b72509d70225$export$b0d6fa1ab32e3295(e.target))},l=e=>{o(e)}
a.onDragStart=(e=>{e.currentTarget.contains(e.target)&&o(e)})}else{a.onMouseDown=(r=>{0===r.button&&r.currentTarget.contains(r.target)&&($f6c31cce2adf654f$var$shouldPreventDefault(r.currentTarget)&&r.preventDefault(),r.stopPropagation(),e.ignoreEmulatedMouseEvents||(e.isPressed=!0,e.isOverTarget=!0,e.target=r.currentTarget,e.pointerType=$6a7db85432448f7f$export$60278871457622de(r.nativeEvent)?"virtual":"mouse",s||c||$7215afc6de606d6b$export$de79e2c695e052f3(r.currentTarget),t(r,e.pointerType),h(document,"mouseup",i,!1)))}),a.onMouseEnter=(r=>{r.currentTarget.contains(r.target)&&(r.stopPropagation(),e.isPressed&&!e.ignoreEmulatedMouseEvents&&(e.isOverTarget=!0,t(r,e.pointerType)))}),a.onMouseLeave=(t=>{t.currentTarget.contains(t.target)&&(t.stopPropagation(),e.isPressed&&!e.ignoreEmulatedMouseEvents&&(e.isOverTarget=!1,r(t,e.pointerType,!1),p.current.shouldCancelOnPointerExit&&o(t)))}),a.onMouseUp=(t=>{t.currentTarget.contains(t.target)&&(e.ignoreEmulatedMouseEvents||0!==t.button||n(t,e.pointerType))})
let i=t=>{0===t.button&&(e.isPressed=!1,m(),e.ignoreEmulatedMouseEvents?e.ignoreEmulatedMouseEvents=!1:($f6c31cce2adf654f$var$isOverTarget(t,e.target)?r($f6c31cce2adf654f$var$createEvent(e.target,t),e.pointerType):e.isOverTarget&&r($f6c31cce2adf654f$var$createEvent(e.target,t),e.pointerType,!1),e.isOverTarget=!1))}
a.onTouchStart=(r=>{if(!r.currentTarget.contains(r.target))return
r.stopPropagation()
let n=function $f6c31cce2adf654f$var$getTouchFromEvent(e){const{targetTouches:t}=e
return t.length>0?t[0]:null}(r.nativeEvent)
n&&(e.activePointerId=n.identifier,e.ignoreEmulatedMouseEvents=!0,e.isOverTarget=!0,e.isPressed=!0,e.target=r.currentTarget,e.pointerType="touch",s||c||$7215afc6de606d6b$export$de79e2c695e052f3(r.currentTarget),u||$14c0b72509d70225$export$16a4697467175487(e.target),t(r,e.pointerType),h(window,"scroll",d,!0))}),a.onTouchMove=(n=>{if(!n.currentTarget.contains(n.target))return
if(n.stopPropagation(),!e.isPressed)return
let a=$f6c31cce2adf654f$var$getTouchById(n.nativeEvent,e.activePointerId)
a&&$f6c31cce2adf654f$var$isOverTarget(a,n.currentTarget)?e.isOverTarget||(e.isOverTarget=!0,t(n,e.pointerType)):e.isOverTarget&&(e.isOverTarget=!1,r(n,e.pointerType,!1),p.current.shouldCancelOnPointerExit&&o(n))}),a.onTouchEnd=(t=>{if(!t.currentTarget.contains(t.target))return
if(t.stopPropagation(),!e.isPressed)return
let o=$f6c31cce2adf654f$var$getTouchById(t.nativeEvent,e.activePointerId)
o&&$f6c31cce2adf654f$var$isOverTarget(o,t.currentTarget)?(n(t,e.pointerType),r(t,e.pointerType)):e.isOverTarget&&r(t,e.pointerType,!1),e.isPressed=!1,e.activePointerId=null,e.isOverTarget=!1,e.ignoreEmulatedMouseEvents=!0,u||$14c0b72509d70225$export$b0d6fa1ab32e3295(e.target),m()}),a.onTouchCancel=(t=>{t.currentTarget.contains(t.target)&&(t.stopPropagation(),e.isPressed&&o(t))})
let d=t=>{e.isPressed&&t.target.contains(e.target)&&o({currentTarget:e.target,shiftKey:!1,ctrlKey:!1,metaKey:!1,altKey:!1})}
a.onDragStart=(e=>{e.currentTarget.contains(e.target)&&o(e)})}return a},[h,s,c,m,u])
return(0,o.useEffect)(()=>()=>{u||$14c0b72509d70225$export$b0d6fa1ab32e3295(g.current.target)},[u]),{isPressed:d||$,pressProps:$3ef42575df84b30b$export$9d1611c77c2fe928(b,T)}}function $f6c31cce2adf654f$var$isHTMLAnchorLink(e){return"A"===e.tagName&&e.hasAttribute("href")}function $f6c31cce2adf654f$var$isValidKeyboardEvent(e,t){const{key:r,code:n}=e,o=t,a=o.getAttribute("role")
return!("Enter"!==r&&" "!==r&&"Spacebar"!==r&&"Space"!==n||o instanceof HTMLInputElement&&!$f6c31cce2adf654f$var$isValidInputKey(o,r)||o instanceof HTMLTextAreaElement||o.isContentEditable||$f6c31cce2adf654f$var$isHTMLAnchorLink(o)&&("button"!==a||"Enter"===r)||"link"===a&&"Enter"!==r)}function $f6c31cce2adf654f$var$getTouchById(e,t){const r=e.changedTouches
for(let e=0;e<r.length;e++){const n=r[e]
if(n.identifier===t)return n}return null}function $f6c31cce2adf654f$var$createEvent(e,t){return{currentTarget:e,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey,altKey:t.altKey}}function $f6c31cce2adf654f$var$isOverTarget(e,t){return function $f6c31cce2adf654f$var$areRectanglesOverlapping(e,t){return!(e.left>t.right||t.left>e.right||e.top>t.bottom||t.top>e.bottom)}(t.getBoundingClientRect(),function $f6c31cce2adf654f$var$getPointClientRect(e){let t=e.width/2||e.radiusX||0,r=e.height/2||e.radiusY||0
return{top:e.clientY-r,right:e.clientX+t,bottom:e.clientY+r,left:e.clientX-t}}(e))}function $f6c31cce2adf654f$var$shouldPreventDefault(e){return!(e instanceof HTMLElement&&e.draggable)}function $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(e,t){return e instanceof HTMLInputElement?!$f6c31cce2adf654f$var$isValidInputKey(e,t):!(e instanceof HTMLButtonElement)||"submit"!==e.type}y.displayName="PressResponderContext"
const h=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"])
function $f6c31cce2adf654f$var$isValidInputKey(e,t){return"checkbox"===e.type||"radio"===e.type?" "===t:h.has(e.type)}class $8a9cb279dc87e130$export$905e7fc544a71f36{isDefaultPrevented(){return this.nativeEvent.defaultPrevented}preventDefault(){this.defaultPrevented=!0,this.nativeEvent.preventDefault()}stopPropagation(){this.nativeEvent.stopPropagation(),this.isPropagationStopped=(()=>!0)}isPropagationStopped(){return!1}persist(){}constructor(e,t){this.nativeEvent=t,this.target=t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget,this.bubbles=t.bubbles,this.cancelable=t.cancelable,this.defaultPrevented=t.defaultPrevented,this.eventPhase=t.eventPhase,this.isTrusted=t.isTrusted,this.timeStamp=t.timeStamp,this.type=e}}function $8a9cb279dc87e130$export$715c682d09d639cc(e){let t=(0,o.useRef)({isFocused:!1,onBlur:e,observer:null})
return t.current.onBlur=e,s(()=>{const e=t.current
return()=>{e.observer&&(e.observer.disconnect(),e.observer=null)}},[]),(0,o.useCallback)(e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement){t.current.isFocused=!0
let r=e.target,n=e=>{var n,o
t.current.isFocused=!1,r.disabled&&(null===(o=(n=t.current).onBlur)||void 0===o||o.call(n,new $8a9cb279dc87e130$export$905e7fc544a71f36("blur",e))),t.current.observer&&(t.current.observer.disconnect(),t.current.observer=null)}
r.addEventListener("focusout",n,{once:!0}),t.current.observer=new MutationObserver(()=>{t.current.isFocused&&r.disabled&&(t.current.observer.disconnect(),r.dispatchEvent(new FocusEvent("blur")),r.dispatchEvent(new FocusEvent("focusout",{bubbles:!0})))}),t.current.observer.observe(r,{attributes:!0,attributeFilter:["disabled"]})}},[])}function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(e){let{isDisabled:t,onFocus:r,onBlur:n,onFocusChange:a}=e
const i=(0,o.useCallback)(e=>{if(e.target===e.currentTarget)return n&&n(e),a&&a(!1),!0},[n,a]),s=$8a9cb279dc87e130$export$715c682d09d639cc(i),d=(0,o.useCallback)(e=>{e.target===e.currentTarget&&document.activeElement===e.target&&(r&&r(e),a&&a(!0),s(e))},[a,r,s])
return{focusProps:{onFocus:!t&&(r||a||n)?d:void 0,onBlur:t||!n&&!a?void 0:i}}}let m=null,T=new Set,P=!1,x=!1,E=!1
function $507fabe10e71c6fb$var$triggerChangeHandlers(e,t){for(let r of T)r(e,t)}function $507fabe10e71c6fb$var$handleKeyboardEvent(e){x=!0,function $507fabe10e71c6fb$var$isValidKey(e){return!(e.metaKey||!$c87311424ea30a05$export$9ac100e40613ea10()&&e.altKey||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key)}(e)&&(m="keyboard",$507fabe10e71c6fb$var$triggerChangeHandlers("keyboard",e))}function $507fabe10e71c6fb$var$handlePointerEvent(e){m="pointer","mousedown"!==e.type&&"pointerdown"!==e.type||(x=!0,$507fabe10e71c6fb$var$triggerChangeHandlers("pointer",e))}function $507fabe10e71c6fb$var$handleClickEvent(e){$6a7db85432448f7f$export$60278871457622de(e)&&(x=!0,m="virtual")}function $507fabe10e71c6fb$var$handleFocusEvent(e){e.target!==window&&e.target!==document&&(x||E||(m="virtual",$507fabe10e71c6fb$var$triggerChangeHandlers("virtual",e)),x=!1,E=!1)}function $507fabe10e71c6fb$var$handleWindowBlur(){x=!1,E=!0}function $507fabe10e71c6fb$var$setupGlobalFocusEvents(){if("undefined"==typeof window||P)return
let e=HTMLElement.prototype.focus
HTMLElement.prototype.focus=function(){x=!0,e.apply(this,arguments)},document.addEventListener("keydown",$507fabe10e71c6fb$var$handleKeyboardEvent,!0),document.addEventListener("keyup",$507fabe10e71c6fb$var$handleKeyboardEvent,!0),document.addEventListener("click",$507fabe10e71c6fb$var$handleClickEvent,!0),window.addEventListener("focus",$507fabe10e71c6fb$var$handleFocusEvent,!0),window.addEventListener("blur",$507fabe10e71c6fb$var$handleWindowBlur,!1),"undefined"!=typeof PointerEvent?(document.addEventListener("pointerdown",$507fabe10e71c6fb$var$handlePointerEvent,!0),document.addEventListener("pointermove",$507fabe10e71c6fb$var$handlePointerEvent,!0),document.addEventListener("pointerup",$507fabe10e71c6fb$var$handlePointerEvent,!0)):(document.addEventListener("mousedown",$507fabe10e71c6fb$var$handlePointerEvent,!0),document.addEventListener("mousemove",$507fabe10e71c6fb$var$handlePointerEvent,!0),document.addEventListener("mouseup",$507fabe10e71c6fb$var$handlePointerEvent,!0)),P=!0}"undefined"!=typeof document&&("loading"!==document.readyState?$507fabe10e71c6fb$var$setupGlobalFocusEvents():document.addEventListener("DOMContentLoaded",$507fabe10e71c6fb$var$setupGlobalFocusEvents))
function $93925083ecbb358c$export$48d1ea6320830260(e){if(!e)return
let t=!0
return r=>{let n={...r,preventDefault(){r.preventDefault()},isDefaultPrevented:()=>r.isDefaultPrevented(),stopPropagation(){console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.")},continuePropagation(){t=!1}}
e(n),t&&r.stopPropagation()}}function $6a99195332edec8b$export$80f3e147d781571c(e){if("virtual"===function $507fabe10e71c6fb$export$630ff653c5ada6a9(){return m}()){let t=document.activeElement
$bbed8b41f857bcc0$export$24490316f764c430(()=>{document.activeElement===t&&document.contains(e)&&$7215afc6de606d6b$export$de79e2c695e052f3(e)})}else $7215afc6de606d6b$export$de79e2c695e052f3(e)}const w=["input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","a[href]","area[href]","summary","iframe","object","embed","audio[controls]","video[controls]","[contenteditable]"]
w.join(":not([hidden]),")
w.push('[tabindex]:not([tabindex="-1"]):not([disabled])')
w.join(':not([hidden]):not([tabindex="-1"]),')
function $9bf71ea28793e738$var$isElementInScope(e,t){return t.some(t=>t.contains(e))}class module_$9bf71ea28793e738$var$Tree{get size(){return this.fastMap.size}getTreeNode(e){return this.fastMap.get(e)}addTreeNode(e,t,r){let n=this.fastMap.get(null!=t?t:null),o=new module_$9bf71ea28793e738$var$TreeNode({scopeRef:e})
n.addChild(o),o.parent=n,this.fastMap.set(e,o),r&&(o.nodeToRestore=r)}addNode(e){this.fastMap.set(e.scopeRef,e)}removeTreeNode(e){if(null===e)return
let t=this.fastMap.get(e),r=t.parent
for(let e of this.traverse())e!==t&&t.nodeToRestore&&e.nodeToRestore&&t.scopeRef.current&&$9bf71ea28793e738$var$isElementInScope(e.nodeToRestore,t.scopeRef.current)&&(e.nodeToRestore=t.nodeToRestore)
let n=t.children
r.removeChild(t),n.size>0&&n.forEach(e=>r.addChild(e)),this.fastMap.delete(t.scopeRef)}*traverse(e=this.root){if(null!=e.scopeRef&&(yield e),e.children.size>0)for(let t of e.children)yield*this.traverse(t)}clone(){let e=new module_$9bf71ea28793e738$var$Tree
for(let t of this.traverse())e.addTreeNode(t.scopeRef,t.parent.scopeRef,t.nodeToRestore)
return e}constructor(){_defineProperty(this,"fastMap",new Map),this.root=new module_$9bf71ea28793e738$var$TreeNode({scopeRef:null}),this.fastMap.set(null,this.root)}}class module_$9bf71ea28793e738$var$TreeNode{addChild(e){this.children.add(e),e.parent=this}removeChild(e){this.children.delete(e),e.parent=void 0}constructor(e){_defineProperty(this,"children",new Set),_defineProperty(this,"contain",!1),this.scopeRef=e.scopeRef}}new module_$9bf71ea28793e738$var$Tree
let _=a.a.createContext(null)
function $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(e,t){let{focusProps:r}=$a1ea59d68270f0dd$export$f8168d8dd8fd66e6(e),{keyboardProps:n}=function $46d819fcbaf35654$export$8f71654801c2f7cd(e){return{keyboardProps:e.isDisabled?{}:{onKeyDown:$93925083ecbb358c$export$48d1ea6320830260(e.onKeyDown),onKeyUp:$93925083ecbb358c$export$48d1ea6320830260(e.onKeyUp)}}}(e),a=$3ef42575df84b30b$export$9d1611c77c2fe928(r,n),i=function $e6afbd83fe6ebbd2$var$useFocusableContext(e){let t=(0,o.useContext)(_)||{}
$e7801be82b4b2a53$export$4debdb1a3f0fa79e(t,e)
let{ref:r,...n}=t
return n}(t),s=e.isDisabled?{}:i,d=(0,o.useRef)(e.autoFocus)
return(0,o.useEffect)(()=>{d.current&&t.current&&$6a99195332edec8b$export$80f3e147d781571c(t.current),d.current=!1},[t]),{focusableProps:$3ef42575df84b30b$export$9d1611c77c2fe928({...a,tabIndex:e.excludeFromTabOrder&&!e.isDisabled?-1:void 0},s)}}function $701a24aa0da5b062$export$ea18c227d4417cc3(e,t){let r,{elementType:n="button",isDisabled:o,onPress:a,onPressStart:i,onPressEnd:s,onPressChange:d,preventFocusOnPress:f,allowFocusWhenDisabled:b,onClick:p,href:$,target:v,rel:g,type:y="button"}=e
r="button"===n?{type:y,disabled:o}:{role:"button",tabIndex:o?void 0:0,href:"a"===n&&o?void 0:$,target:"a"===n?v:void 0,type:"input"===n?y:void 0,disabled:"input"===n?o:void 0,"aria-disabled":o&&"input"!==n?o:void 0,rel:"a"===n?g:void 0}
let{pressProps:h,isPressed:m}=$f6c31cce2adf654f$export$45712eceda6fad21({onPressStart:i,onPressEnd:s,onPressChange:d,onPress:a,isDisabled:o,preventFocusOnPress:f,ref:t}),{focusableProps:T}=$e6afbd83fe6ebbd2$export$4c014de7c8940b4c(e,t)
b&&(T.tabIndex=o?-1:T.tabIndex)
let P=$3ef42575df84b30b$export$9d1611c77c2fe928(T,h,function $65484d02dcb7eb3e$export$457c3d6518dd4c6f(e,t={}){let{labelable:r,propNames:n}=t,o={}
for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(c.has(t)||r&&l.has(t)||(null==n?void 0:n.has(t))||u.test(t))&&(o[t]=e[t])
return o}(e,{labelable:!0}))
return{isPressed:m,buttonProps:$3ef42575df84b30b$export$9d1611c77c2fe928(r,P,{"aria-haspopup":e["aria-haspopup"],"aria-expanded":e["aria-expanded"],"aria-controls":e["aria-controls"],"aria-pressed":e["aria-pressed"],onClick:e=>{p&&(p(e),console.warn("onClick is deprecated, please use onPress"))}})}}}}])