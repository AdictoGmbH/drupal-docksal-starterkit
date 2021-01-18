<script>
import animations from '../../../js/mixins/animations';
import breakpoints from '../../../js/mixins/breakpoints';

export default {
  mixins: [animations, breakpoints],
  props: {
    mobile: {
      type: Boolean
    }
  },
  data () {
    return {
      isVisible: false,
      isMobile: false
    };
  },
  computed: {
    isAlwaysVisible () {
      return this.mobile && !this.isMobile;
    }
  },
  watch: {
    isMobile () {
      this.isVisible = this.isAlwaysVisible;
    }
  },
  mounted () {
    this.attachResizeListener('medium', this.resize);

    this.isVisible = this.isAlwaysVisible;
  },
  methods: {
    toggle (event) {
      event.preventDefault();

      if (['mouseenter', 'mouseleave'].includes(event.type) && this.isMobile) {
        return;
      }

      const isEnter = event.type === 'mouseenter';
      const isLeave = event.type === 'mouseleave';

      // Either show (when entering) or hide (when leaving) or toggle
      const isVisible = isEnter ? true : isLeave ? false : !this.isVisible;

      this.isVisible = this.isAlwaysVisible || isVisible;
    },
    resize (isMobile) {
      this.isMobile = isMobile;
    }
  }
};
</script>
