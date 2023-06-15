import { useRef, useCallback } from 'react';

export default function useIntersection(callback, options) {
  const observer = useRef(
    new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        console.log('닿아니', entry.isIntersecting);
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options),
  );

  const observe = useCallback(element => {
    observer.current.observe(element);
  }, []);

  const unobserve = useCallback(element => {
    observer.current.unobserve(element);
  }, []);

  return [observe, unobserve];
}
