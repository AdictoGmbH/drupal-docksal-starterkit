<script>
import noScroll from 'no-scroll';
import breakpoints from '../../../js/mixins/breakpoints';
import { EventBus } from "../../../js/libs/event-bus";

export default {
  mixins: [breakpoints],
  data () {
    return {
      observer: null,
      isSticky: false,
      isMobile: false,
      globalMessageHeight: 0
    };
  },
  watch: {
    isSticky () {
      if (this.isSticky) {
        this.$el.classList.add('is-sticky');
        // Adjust sticky behaviour if global message is set
        this.$refs.headerWrapper.style.marginTop = `${this.globalMessageHeight}px`;
      } else {
        this.$el.classList.remove('is-sticky');
        this.$refs.headerWrapper.style.marginTop = 0;
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
    this.attachResizeListener('medium', this.resize);

    this.$el.classList.add('is-initialized');

    const { stickyIndicator, headerMenu } = this.$refs;

    if (stickyIndicator) {
      this.observer = new window.IntersectionObserver(this.observe, {
        threshold: [0, 1]
      });

      this.observer.observe(stickyIndicator);
    }

    if (headerMenu) {
      // Disable scroll when opening mobile menu and expose scroll offset to CSS
      headerMenu.$on('heightTransitionStart', (isExpanded) => {
        if (!this.isMobile) {
          return;
        }

        if (isExpanded) {
          const offset = headerMenu.$el.getBoundingClientRect().top;

          noScroll.on();

          // Wait long enough, no luck with (double) requestAnimationFrame
          setTimeout(() => {
            const height = window.innerHeight;

            document.documentElement.style.setProperty('--header-navigation-height', `${height - offset}px`);
          }, 100);
        }
      });

      // Re-enable scroll after closing mobile menu
      headerMenu.$on('heightTransitionEnd', (isExpanded) => {
        if (!this.isMobile) {
          return;
        }

        if (!isExpanded) {
          noScroll.off();
        }
      });
    }

    EventBus.$on('globalMessage', this.globalMessageHandler)
  },
  beforeDestroy () {
    EventBus.$off('globalMessage', this.globalMessageHandler);
  },
  methods: {
    globalMessageHandler (globalMessageHeight) {
      this.globalMessageHeight = globalMessageHeight;

      // Set offset top of header below global message
      this.$el.style.marginTop = `${globalMessageHeight}px`;

      // Set offset top of sticky indicator to set header sticky when menu reaches the global message
      const headerMenuHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breadcrumb-offset-top'), 10);
      const headerHeight = this.$el.clientHeight;
      this.$refs.stickyIndicator.style.top = `${headerHeight - globalMessageHeight - headerMenuHeight}px`;
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
