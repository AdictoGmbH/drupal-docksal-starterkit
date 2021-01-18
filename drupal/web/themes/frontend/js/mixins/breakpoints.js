import { breakpoints } from '../../styles/settings/_breakpoints.json';

export default {
  methods: {
    attachResizeListener (breakpoint, fn) {
      const size = breakpoints[breakpoint] - 1;

      if (fn && size) {
        const mq = window.matchMedia(`(max-width: ${size}px)`);

        mq.addListener(() => fn(mq.matches));

        fn(mq.matches);
      }
    },
  },
};
