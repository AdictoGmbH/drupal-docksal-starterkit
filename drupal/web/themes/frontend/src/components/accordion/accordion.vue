<template>
  <div class="accordion" ref="accordion">
    <slot :isVisible="isVisible" :enterHeight="enterHeight" :leaveHeight="leaveHeight" :toggle="toggle" />
  </div>
</template>

<script>
import { enterHeightComposable, leaveHeightComposable } from '../../../js/composables/animations'
import { ref, computed } from 'vue';
import { attachMobileListener } from "../../../js/composables/breakpoints";

export default {
  emits: ['height-transition-start', 'height-transition-end'],
  setup (props) {
    const isVisible = ref(false);
    const isMobile = ref(false);
    const accordion = ref(null);
    const isAlwaysVisible = computed(() => {
      return props.mobile && !isMobile.value;
    });

    function toggle (event) {
      event.preventDefault();

      if (['mouseenter', 'mouseleave'].includes(event.type) && isMobile.value) {
        return;
      }

      const isEnter = event.type === 'mouseenter';
      const isLeave = event.type === 'mouseleave';

      // Either show (when entering) or hide (when leaving) or toggle
      isVisible.value = isEnter ? true : isLeave ? false : !isVisible.value;

      isVisible.value = isAlwaysVisible.value || isVisible.value;
    }

    return {
      isVisible,
      isMobile,
      accordion,
      isAlwaysVisible,
      toggle
    }
  },
  props: {
    mobile: {
      type: Boolean
    }
  },
  watch: {
    isMobile () {
      this.isVisible = this.isAlwaysVisible;
    }
  },
  mounted () {
    attachMobileListener(this.resize);

    this.isVisible = this.isAlwaysVisible;
  },
  methods: {
    resize (isMobile) {
      this.isMobile = isMobile;
    },
    enterHeight (done, element) {
      const fn = enterHeightComposable(this.$emit, this.accordion)
      fn(done, element);
    },
    leaveHeight (done, element) {
      const fn = leaveHeightComposable(this.$emit, this.accordion)
      fn(done, element);
    }
  }
};
</script>
