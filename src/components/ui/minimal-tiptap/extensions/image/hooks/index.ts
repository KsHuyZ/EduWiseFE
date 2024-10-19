import { useEffect, useState } from 'react';

export const useImageLoad = (src: string) => {
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSize({ width: img.width, height: img.height });
    };
  }, [src]);

  return imgSize;
};
