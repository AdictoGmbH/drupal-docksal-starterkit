(self.webpackChunkdrupal_frontend=self.webpackChunkdrupal_frontend||[]).push([[653],{6337:function(){!function(){"use strict";function t(t){try{return t.defaultView&&t.defaultView.frameElement||null}catch(t){return null}}function e(t){this.time=t.time,this.target=t.target,this.rootBounds=h(t.rootBounds),this.boundingClientRect=h(t.boundingClientRect),this.intersectionRect=h(t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0}),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,i=o.width*o.height;this.intersectionRatio=n?+(i/n).toFixed(4):this.isIntersecting?1:0}function n(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType&&9!=n.root.nodeType)throw new Error("root must be a Document or Element");this._checkForIntersections=function(t,e){var n=null;return function(){n||(n=setTimeout((function(){t(),n=null}),e))}}(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map((function(t){return t.value+t.unit})).join(" "),this._monitoringDocuments=[],this._monitoringUnsubscribes=[]}function o(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function i(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function r(t,e){var n=Math.min,o=Math.max,i=o(t.top,e.top),r=n(t.bottom,e.bottom),s=o(t.left,e.left),h=n(t.right,e.right),u=h-s,c=r-i;return 0<=u&&0<=c&&{top:i,bottom:r,left:s,right:h,width:u,height:c}||null}function s(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function h(t){return!t||"x"in t?t:{top:t.top,y:t.top,bottom:t.bottom,left:t.left,x:t.left,right:t.right,width:t.width,height:t.height}}function u(t,e){var n=e.top-t.top,o=e.left-t.left;return{top:n,left:o,height:e.height,width:e.width,bottom:n+e.height,right:o+e.width}}function c(t,e){for(var n=e;n;){if(n==t)return!0;n=a(n)}return!1}function a(e){var n=e.parentNode;return 9==e.nodeType&&e!=f?t(e):(n&&n.assignedSlot&&(n=n.assignedSlot.parentNode),n&&11==n.nodeType&&n.host?n.host:n)}function l(t){return t&&9===t.nodeType}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var f=function(e){for(var n=window.document,o=t(n);o;)o=t(n=o.ownerDocument);return n}(),p=[],d=null,g=null;n.prototype.THROTTLE_TIMEOUT=100,n.prototype.POLL_INTERVAL=null,n.prototype.USE_MUTATION_OBSERVER=!0,n._setupCrossOriginUpdater=function(){return d||(d=function(t,e){g=t&&e?u(t,e):{top:0,bottom:0,left:0,right:0,width:0,height:0},p.forEach((function(t){t._checkForIntersections()}))}),d},n._resetCrossOriginUpdater=function(){d=null,g=null},n.prototype.observe=function(t){if(!this._observationTargets.some((function(e){return e.element==t}))){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(t.ownerDocument),this._checkForIntersections()}},n.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter((function(e){return e.element!=t})),this._unmonitorIntersections(t.ownerDocument),0==this._observationTargets.length&&this._unregisterInstance()},n.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorAllIntersections(),this._unregisterInstance()},n.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},n.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter((function(t,e,n){if("number"!=typeof t||isNaN(t)||0>t||1<t)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]}))},n.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map((function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}}));return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},n.prototype._monitorIntersections=function(e){var n=e.defaultView;if(n&&-1==this._monitoringDocuments.indexOf(e)){var r=this._checkForIntersections,s=null,h=null;this.POLL_INTERVAL?s=n.setInterval(r,this.POLL_INTERVAL):(o(n,"resize",r,!0),o(e,"scroll",r,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in n&&(h=new n.MutationObserver(r)).observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0})),this._monitoringDocuments.push(e),this._monitoringUnsubscribes.push((function(){var t=e.defaultView;t&&(s&&t.clearInterval(s),i(t,"resize",r,!0)),i(e,"scroll",r,!0),h&&h.disconnect()}));var u=this.root&&(this.root.ownerDocument||this.root)||f;if(e!=u){var c=t(e);c&&this._monitorIntersections(c.ownerDocument)}}},n.prototype._unmonitorIntersections=function(e){var n=this._monitoringDocuments.indexOf(e);if(-1!=n){var o=this.root&&(this.root.ownerDocument||this.root)||f;if(!this._observationTargets.some((function(n){var i=n.element.ownerDocument;if(i==e)return!0;for(;i&&i!=o;){var r=t(i);if((i=r&&r.ownerDocument)==e)return!0}return!1}))){var i=this._monitoringUnsubscribes[n];if(this._monitoringDocuments.splice(n,1),this._monitoringUnsubscribes.splice(n,1),i(),e!=o){var r=t(e);r&&this._unmonitorIntersections(r.ownerDocument)}}}},n.prototype._unmonitorAllIntersections=function(){var t=this._monitoringUnsubscribes.slice(0);this._monitoringDocuments.length=0,this._monitoringUnsubscribes.length=0;for(var e=0;e<t.length;e++)t[e]()},n.prototype._checkForIntersections=function(){if(this.root||!d||g){var t=this._rootIsInDom(),n=t?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach((function(o){var i=o.element,r=s(i),h=this._rootContainsTarget(i),u=o.entry,c=t&&h&&this._computeTargetAndRootIntersection(i,r,n),a=null;this._rootContainsTarget(i)?(!d||this.root)&&(a=n):a={top:0,bottom:0,left:0,right:0,width:0,height:0};var l=o.entry=new e({time:window.performance&&performance.now&&performance.now(),target:i,boundingClientRect:r,rootBounds:a,intersectionRect:c});u?t&&h?this._hasCrossedThreshold(u,l)&&this._queuedEntries.push(l):u&&u.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)}),this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)}},n.prototype._computeTargetAndRootIntersection=function(t,e,n){if("none"!=window.getComputedStyle(t).display){for(var o=e,i=a(t),h=!1;!h&&i;){var c=null,l=1==i.nodeType?window.getComputedStyle(i):{};if("none"==l.display)return null;if(i!=this.root&&9!=i.nodeType){var p=i.ownerDocument;i!=p.body&&i!=p.documentElement&&"visible"!=l.overflow&&(c=s(i))}else if(h=!0,i==this.root||i==f)d&&!this.root?!g||0==g.width&&0==g.height?(i=null,c=null,o=null):c=g:c=n;else{var m=a(i),_=m&&s(m),v=m&&this._computeTargetAndRootIntersection(m,_,n);_&&v?(i=m,c=u(_,v)):(i=null,o=null)}if(c&&(o=r(c,o)),!o)break;i=i&&a(i)}return o}},n.prototype._getRootRect=function(){var t;if(this.root&&!l(this.root))t=s(this.root);else{var e=l(this.root)?this.root:f,n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},n.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map((function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100})),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},n.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var i,r=0;r<this.thresholds.length;r++)if((i=this.thresholds[r])==n||i==o||i<n!=i<o)return!0},n.prototype._rootIsInDom=function(){return!this.root||c(f,this.root)},n.prototype._rootContainsTarget=function(t){var e=this.root&&(this.root.ownerDocument||this.root)||f;return c(e,t)&&(!this.root||e==t.ownerDocument)},n.prototype._registerInstance=function(){0>p.indexOf(this)&&p.push(this)},n.prototype._unregisterInstance=function(){var t=p.indexOf(this);-1!=t&&p.splice(t,1)},window.IntersectionObserver=n,window.IntersectionObserverEntry=e}}()}}]);