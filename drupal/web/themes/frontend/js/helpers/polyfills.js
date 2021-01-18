/**
 * Polyfills to be loaded by default
 *
 * Small polyfills we are being inlined
 * Larger ones are loaded async and only if needed
 *
 * If a polyfill is expected to be used only in exceptional cases it could make sense to load it
 * where needed instead of here
 *
 * !IMPORTANT! Check with core-js to see which polyfills are included for you
 * automatically with @babel/preset-env
 * Website: https://www.npmjs.com/package/core-js
 */

import 'mdn-polyfills/NodeList.prototype.forEach';
import 'mdn-polyfills/Node.prototype.remove';
import 'mdn-polyfills/Element.prototype.matches';
import 'mdn-polyfills/Element.prototype.closest';

/**
 * loadPolyfills
 * Tests for certain functionality and adds polyfills when functionality is not found
 * @return {Promise} - Resolves when all async polyfills are loaded
 */
export default function loadPolyfills() {
  const requiredPolyfills = [];

  if (!Modernizr.objectfit) {
    requiredPolyfills.push(import(/* webpackChunkName: "object-fit-images" */ 'object-fit-images'));
  }

  if (!window.fetch) {
    requiredPolyfills.push(import(/* webpackChunkName: "fetch" */ 'whatwg-fetch'));
  }

  if (!window.IntersectionObserver) {
    requiredPolyfills.push(import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer'));
  }

  return Promise.all(requiredPolyfills).then(polyfills => {
    const objectFitImages = polyfills.find(module => typeof module.supportsObjectFit !== 'undefined')
    
    if (objectFitImages) {
      objectFitImages.default();
    }

    return polyfills;
  });
}
