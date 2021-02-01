import breakpointsConfig from '../../styles/settings/_breakpoints.json';

export function attachMobileListener (fn) {
  const size = breakpointsConfig.breakpoints.medium - 1;

  if (size) {
    const mq = window.matchMedia(`(max-width: ${size}px)`);

    mq.addEventListener('change', function () { fn(mq.matches);});

    fn(mq.matches);
  }
}
