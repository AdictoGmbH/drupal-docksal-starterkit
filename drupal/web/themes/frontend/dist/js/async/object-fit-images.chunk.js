(self.webpackChunkdrupal_frontend=self.webpackChunkdrupal_frontend||[]).push([[842],{6797:function(t){"use strict";function e(t,e,i){var r=function(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}(e||1,i||0);d.call(t,"src")!==r&&p.call(t,"src",r)}function i(t,e){t.naturalWidth?e(t):setTimeout(i,100,t,e)}function r(t){var r=function(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=o.exec(i));)r[e[1]]=e[2];return r}(t),s=t[c];if(r["object-fit"]=r["object-fit"]||"fill",!s.img){if("fill"===r["object-fit"])return;if(!s.skipTest&&l&&!r["object-position"])return}if(!s.img){s.img=new Image(t.width,t.height),s.img.srcset=d.call(t,"data-ofi-srcset")||t.srcset,s.img.src=d.call(t,"data-ofi-src")||t.src,p.call(t,"data-ofi-src",t.src),t.srcset&&p.call(t,"data-ofi-srcset",t.srcset),e(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{n(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}(function(t){if(t.srcset&&!f&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}})(s.img),t.style.backgroundImage='url("'+(s.img.currentSrc||s.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=r["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(r["object-fit"])?i(s.img,(function(){t.style.backgroundSize=s.img.naturalWidth>t.width||s.img.naturalHeight>t.height?"contain":"auto"})):t.style.backgroundSize=r["object-fit"].replace("none","auto").replace("fill","100% 100%"),i(s.img,(function(i){e(t,i.naturalWidth,i.naturalHeight)}))}function n(t){var e={get:function(e){return t[c].img[e||"src"]},set:function(e,i){return t[c].img[i||"src"]=e,p.call(t,"data-ofi-"+i,e),r(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function s(t,e){var i=!m&&!t;if(e=e||{},t=t||"img",u&&!e.skipTest||!g)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):!("length"in t)&&(t=[t]);for(var n=0;n<t.length;n++)t[n][c]=t[n][c]||{skipTest:e.skipTest},r(t[n]);i&&(document.body.addEventListener("load",(function(t){"IMG"===t.target.tagName&&s(t.target,{skipTest:e.skipTest})}),!0),m=!0,t="img"),e.watchMQ&&window.addEventListener("resize",s.bind(null,t,{skipTest:e.skipTest}))}var c="bfred-it:object-fit-images",o=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,a="undefined"==typeof Image?{style:{"object-position":1}}:new Image,l="object-fit"in a.style,u="object-position"in a.style,g="background-size"in a.style,f="string"==typeof a.currentSrc,d=a.getAttribute,p=a.setAttribute,m=!1;s.supportsObjectFit=l,s.supportsObjectPosition=u,function(){function t(t,e){return t[c]&&t[c].img&&("src"===e||"srcset"===e)?t[c].img:t}u||(HTMLImageElement.prototype.getAttribute=function(e){return d.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return p.call(t(this,e),e,i+"")})}(),t.exports=s}}]);