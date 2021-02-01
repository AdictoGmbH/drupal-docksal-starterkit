// Polyfills
import loadPolyfills from './helpers/polyfills';

// Accessibility helpers
import focusSource from 'ally.js/amd/style/focus-source';

// Bundle Config
import '../.modernizrrc';
import './libs/modernizr-custom-tests';
import lazyload from './libs/lazyload.js';

// Helpers
import './helpers/breakpoint';

// Modules
import '../src/modules/favicon/favicon';
import '../src/modules/logo/logo';
// Vue app
import { createApp } from 'vue';
import text from '../src/modules/text/text.vue';
import textElement from '../src/modules/text/text';
import accordion from '../src/components/accordion/accordion.vue';
import header from '../src/modules/header/header.vue';

window.addEventListener('DOMContentLoaded', async function () {
  await loadPolyfills();

  focusSource();

  const vueApp = createApp({
    mounted () {
      lazyload.update();
    }
  });

  vueApp.component('text-component', text);
  vueApp.component('accordion-component', accordion);
  vueApp.component('header-component', header);

  vueApp.component('button-counter', {
    data() {
      return {
        count: 0
      };
    },
    template: `
    <button v-on:click="count++">
      You clicked me {{ count }} times.
    </button>`
  });

  vueApp.mount('#app');

  // Better exposed filters
  if (document.querySelector('.views-exposed-form input[type="submit"]')) {
    // Hide the apply button.
    document.querySelector('.views-exposed-form input[type="submit"]').style.display = 'none';

    // When the change event fires, run the submit handler
    for (let el of Object.values(document.querySelectorAll('.views-exposed-form input, .views-exposed-form select'))) {
      el.addEventListener('change', function (event) {
        el.closest('form').submit();
      });
    }
  }

  function updateFilledState (inputEl) {
    if (!inputEl || inputEl.type === 'checkbox' || inputEl.type === 'radio') {
      return;
    }
    if (inputEl.value.trim() !== '') {
      inputEl.parentElement.classList.add('input--filled');
    } else {
      inputEl.parentElement.classList.remove('input--filled');
    }
  }

  function handleInput (e) {
    const inputEl = e.target;
    updateFilledState(inputEl);
  }

  // Forms
  [].slice.call(document.querySelectorAll('.form-item')).forEach(function (inputEl) {
    inputEl.addEventListener('keyup', handleInput);
    inputEl.addEventListener('focusin', (e) => {
      const inputEl = e.target;
      if (!inputEl || inputEl.type === 'checkbox' || inputEl.type === 'radio') {
        return;
      }
      inputEl.parentElement.classList.add('input--filled');
    });
    inputEl.addEventListener('focusout', handleInput);
    updateFilledState(inputEl.querySelector('input:not(.form-radio):not(.form-checkbox),textarea,select'));
  });
});

window.addEventListener('load', function () {
  //Page loaded
  document.querySelector('body').classList.add('loaded');
});

// Calls
(function (Drupal, drupalSettings) {
  Drupal.behaviors.lazyLoad = {
    attach: function attach (context) {
      lazyload.init(context);
    },
    update: function update (context) {
      lazyload.update();
    }
  };

  Drupal.behaviors.text = {
    attach: function attach (context) {
      textElement.init(context);
    }
  };

})(Drupal, drupalSettings);
