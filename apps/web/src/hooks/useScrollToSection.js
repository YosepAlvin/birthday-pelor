
import { useCallback } from 'react';

export const useScrollToSection = () => {
  return useCallback((e, sectionId) => {
    if (e) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    // cubic-bezier(0.25, 0.46, 0.45, 0.94) approximation
    const easePremium = (t) => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easePremium(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);
};
