<template>
  <header class="m-header" role="banner" ref="header">
    <div ref="headerWrapper" class="m-header__wrapper">
      <div class="l-container">
        <div class="m-header__inner" ref="headerMenu">
          <slot :heightTransitionStart="heightTransitionStart" :heightTransitionEnd="heightTransitionEnd" />
        </div>
      </div>
    </div>
    <span class="m-header__sticky" ref="stickyIndicator"></span>
  </header>
</template>

<script>
import noScroll from 'no-scroll';
import { attachMobileListener } from '../../../js/composables/breakpoints'
import {
  ref,
} from 'vue';

export default {
  name: 'header',
  setup () {
    const header = ref(null);
    const headerWrapper = ref(null);
    const headerMenu = ref(null);
    const stickyIndicator = ref(null);
    const isMobile = ref(false);

    return {
      // It is important to return the ref,
      // otherwise it won't work.
      header,
      headerMenu,
      headerWrapper,
      stickyIndicator,
      isMobile
    };
  },
  data () {
    return {
      observer: null,
      isSticky: false
    };
  },
  watch: {
    isSticky () {
      if (this.isSticky) {
        this.header.classList.add('is-sticky');
      } else {
        this.header.classList.remove('is-sticky');
        this.headerWrapper.style.marginTop = 0;
      }
    },
    isMobile () {
      // Re-enable scrolling when switching to desktop while having mobile menu expanded
      if (!this.isMobile) {
        noScroll.off();
      }
    }
  },
  mounted () {
    attachMobileListener(this.resize);

    this.header.classList.add('is-initialized');

    if (this.stickyIndicator) {
      this.observer = new window.IntersectionObserver(this.observe, {
        threshold: [0, 1]
      });

      this.observer.observe(this.stickyIndicator);
    }
  },
  methods: {
    // Disable scroll when opening mobile menu and expose scroll offset to CSS
    heightTransitionStart ({ active: isExpanded, element }) {
      if (!this.isMobile) {
        return;
      }

      if (isExpanded) {
        const offset = element.getBoundingClientRect().top;

        noScroll.on();

        // Wait long enough, no luck with (double) requestAnimationFrame
        setTimeout(() => {
          const height = window.innerHeight;

          document.documentElement.style.setProperty('--header-navigation-height', `${height - offset}px`);
        }, 100);
      }
    },
    // Re-enable scroll after closing mobile menu
    heightTransitionEnd ({ active: isExpanded, element }) {
      if (!this.isMobile) {
        return;
      }

      if (!isExpanded) {
        noScroll.off();
      }
    },

    observe (entries) {
      if (!entries[0].isIntersecting) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    resize (isMobile) {
      this.isMobile = isMobile;
    }
  }
};
</script>
