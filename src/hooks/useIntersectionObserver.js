import { useState, useEffect } from 'react';

const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      // eslint-disable-next-line
      if (ref?.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isIntersecting;
};

export default useIntersectionObserver;
