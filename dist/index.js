!function(t,e){"object"===typeof exports&&"object"===typeof module?module.exports=e():"function"===typeof define&&define.amd?define([],e):"object"===typeof exports?exports.NumberFlip=e():t.NumberFlip=e()}(window,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=1)}([function(t,e,r){window,t.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.g=void 0;var i=function(t){return null!==t&&"object"===n(t)};e.g=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"div";return function(){var r=document.createElement(e),n=i(t)?t:{class:t};Object.keys(n).forEach((function(t){var e=n[t];void 0!==e&&(/^\$/.test(t)?r.setAttribute("data-"+t.slice(1),e):"style"===t&&i(e)?r.setAttribute("style",Object.keys(e).map((function(t){return"".concat(t,":").concat(e[t])})).join(";")):r.setAttribute(t,e))}));for(var o=arguments.length,s=new Array(o),a=0;a<o;a++)s[a]=arguments[a];return s.forEach((function(t){var n,i;(i=t)instanceof HTMLElement&&1===i.nodeType?r.appendChild(t):"img"===e.toLowerCase()&&("string"==typeof(n=t)||n instanceof String)?r.setAttribute("src",t):r.innerHTML+=t})),r}}}])},function(t,e,r){t.exports=r(2)},function(t,e,r){"use strict";r.r(e),r.d(e,"Flip",(function(){return u}));var n=r(0);function i(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var s=function(t,e){return(t>e?t:e).toString().length},a=function(t,e){return function(t){return t.split("").map(Number)}(function t(e,r){return e.length<r?t("0"+e,r):e}(t.toString(),e)).reverse()},u=function(){function t(e){var r=this,n=e.node,i=e.from,o=void 0===i?0:i,a=e.to,u=e.duration,c=void 0===u?.5:u,f=e.delay,l=e.easeFn,p=void 0===l?function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)}:l,h=e.systemArr,d=void 0===h?[0,1,2,3,4,5,6,7,8,9]:h,y=e.direct,v=void 0===y||y,b=e.separator,m=e.seperateOnly,g=void 0===m?0:m,A=e.separateEvery,j=void 0===A?3:A;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.beforeArr=[],this.afterArr=[],this.ctnrArr=[],this.duration=1e3*c,this.systemArr=d,this.easeFn=p,this.from=o,this.to=a||0,this.node=n,this.direct=v,this.separator=b,this.seperateOnly=g,this.separateEvery=g?0:j,this._initHTML(s(this.from,this.to)),void 0!==a&&(f?setTimeout((function(){return r.flipTo({to:r.to})}),1e3*f):this.flipTo({to:this.to}))}var e,r,u;return e=t,(r=[{key:"_initHTML",value:function(t){var e,r=this;this.node.classList.add("number-flip"),this.node.style.position="relative",this.node.style.overflow="hidden";for(var o=0;o<t;o+=1){var s=Object(n.g)("ctnr ctnr".concat(o)).apply(void 0,i(this.systemArr.map((function(t){return Object(n.g)("digit")(t)}))).concat([Object(n.g)("digit")(this.systemArr[0])]));if(s.style.position="relative",s.style.display="inline-block",s.style.verticalAlign="top",this.ctnrArr.unshift(s),this.node.appendChild(s),this.beforeArr.push(0),this.separator&&(this.separateEvery||this.seperateOnly)&&o!==t-1&&((t-o)%this.separateEvery==1||t-o-this.seperateOnly==1)){var a=(e=this.separator,"[object String]"===Object.prototype.toString.call(e)?this.separator:this.separator.shift()),u=Object(n.g)("sprtr")(a);u.style.display="inline-block",this.node.appendChild(u)}}var c=function(){if(r.height=r.ctnrArr[0].clientHeight/(r.systemArr.length+1),r.node.style.height=r.height+"px",r.afterArr.length)r.frame(1);else for(var t=0,e=r.ctnrArr.length;t<e;t+=1)r._draw({digit:t,per:1,alter:~~(r.from/Math.pow(10,t))})};c(),window.addEventListener("resize",c)}},{key:"_draw",value:function(t){var e=t.per,r=t.alter,n=t.digit;this.height!==this.ctnrArr[0].clientHeight/(this.systemArr.length+1)&&(this.height=this.ctnrArr[0].clientHeight/(this.systemArr.length+1));var i=this.beforeArr[n],o="translateY(".concat(-((e*r+i)%10+10)%10*this.height,"px)");this.ctnrArr[n].style.webkitTransform=o,this.ctnrArr[n].style.transform=o}},{key:"frame",value:function(t){for(var e=0,r=this.ctnrArr.length-1;r>=0;r-=1){var n=this.afterArr[r]-this.beforeArr[r];e+=n,this._draw({digit:r,per:this.easeFn(t),alter:this.direct?n:e}),e*=10}}},{key:"flipTo",value:function(t){var e=this,r=t.to,n=t.duration,i=t.easeFn,o=t.direct;i&&(this.easeFn=i),void 0!==o&&(this.direct=o);var s=this.ctnrArr.length;this.beforeArr=a(this.from,s),this.afterArr=a(r,s);var u=Date.now(),c=1e3*n||this.duration;requestAnimationFrame((function t(){var n=Date.now()-u;e.frame(n/c),n<c?requestAnimationFrame(t):(e.from=r,e.frame(1))}))}}])&&o(e.prototype,r),u&&o(e,u),t}()}])}));