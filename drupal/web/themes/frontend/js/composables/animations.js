import animationsConfig from '../../styles/settings/_animations.json';

export function enterHeightComposable (emit, wrapperEl) {
  const enterHeight = (element, done) => {
    const targetValue = element.scrollHeight;
    const transitionend = () => {
      element.classList.remove('is-animating');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = 'auto';
        });
      });

      emit('height-transition-end', { active: true, element: wrapperEl });

      done();
    };

    emit('height-transition-start', { active: true, element: wrapperEl });

    element.style.opacity = 0;
    element.style.height = "0px";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          transitionend();
        }, animationsConfig.animations.duration.default);

        element.classList.add('is-animating');

        element.style.opacity = 1;
        element.style.height = `${targetValue}px`;
      });
    });
  };

  return enterHeight;
}

export function leaveHeightComposable (emit, wrapperEl) {
  const leaveHeight = (element, done) => {
    const targetValue = element.scrollHeight;
    const transitionend = () => {
      element.classList.remove('is-animating');

      emit('height-transition-end', { active: false, element: wrapperEl });

      done();
    };

    emit('height-transition-start', { active: false, element: wrapperEl });

    element.style.opacity = 1;
    element.style.height = `${targetValue}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          transitionend();
        }, animationsConfig.animations.duration.default);

        element.classList.add('is-animating');

        element.style.opacity = 0;
        element.style.height = '0px';
      });
    });
  };

  return leaveHeight;
}
