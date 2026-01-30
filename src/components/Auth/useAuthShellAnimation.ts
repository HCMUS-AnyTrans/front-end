'use client';

import { useState, useEffect } from 'react';

export function useAuthShellAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return { isVisible };
}
