'use client';

import { useEffect, useState } from 'react';

export const useHydrate = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
