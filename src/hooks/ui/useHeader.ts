import { useEffect, useState } from 'react';

export const useHeader = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScroll = window.scrollY > 80;
      setScroll(isScroll);
    };
    setScroll(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return { scroll };
};
