'use client';

import { useEffect, useMemo, useState } from 'react';

import type { Sizes } from './interface';

const sizes: Sizes = {
  sm: '640px',
  md: '767px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const usePortrait = (size: keyof Sizes = 'md'): boolean | undefined => {
  const windowObj = typeof window !== 'undefined' ? window : undefined;

  const mediaQuery = useMemo(
    () => windowObj?.matchMedia(`(width <= ${sizes[size]})`),
    [size, windowObj]
  );

  const [isPortrait, setIsPortrait] = useState<boolean | undefined>(
    mediaQuery?.matches
  );

  // use window.innerWidth to get the screen size
  useEffect(() => {
    mediaQuery?.addEventListener('change', (e) => {
      setIsPortrait(e.matches);
    });
    setIsPortrait(mediaQuery?.matches);

    return () => {
      mediaQuery?.removeEventListener('change', (e) => {
        setIsPortrait(e.matches);
      });
    };
  }, [size, mediaQuery]);

  return isPortrait;
};
