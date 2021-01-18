import { animations } from '../../styles/settings/_animations.json';

export default {
  methods: {
    enterHeight(el, done) {
      const targetValue = el.scrollHeight;
      const transitionend = () => {
        el.classList.remove('is-animating');

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.height = "auto";
          });
        });

        this.$emit('heightTransitionEnd', true);

        done();
      };

      this.$emit('heightTransitionStart', true);

      el.style.opacity = 0;
      el.style.height = "0px";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            transitionend();
          }, animations.duration.default);

          el.classList.add('is-animating');

          el.style.opacity = 1;
          el.style.height = `${targetValue}px`;
        });
      });
    },
    leaveHeight(el, done) {
      const targetValue = el.scrollHeight;
      const transitionend = () => {
        el.classList.remove('is-animating');

        this.$emit('heightTransitionEnd', false);

        done();
      };

      this.$emit('heightTransitionStart', false);

      el.style.opacity = 1;
      el.style.height = `${targetValue}px`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            transitionend();
          }, animations.duration.default);

          el.classList.add('is-animating');

          el.style.opacity = 0;
          el.style.height = "0px";
        });
      });
    },
  }
};
