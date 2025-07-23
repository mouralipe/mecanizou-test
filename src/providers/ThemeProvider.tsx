'use client';

import { useThemeStore } from '@/stores/themeStore';
import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  useEffect(() => {
    const hasStoredTheme = localStorage.getItem('theme-storage');

    if (!hasStoredTheme) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setTheme(prefersDark ? 'dark' : 'light');
    } else {
      // Se há tema salvo, garante que a classe CSS esteja aplicada
      try {
        const parsed = JSON.parse(hasStoredTheme);
        const savedTheme = parsed.state?.theme;
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          setTheme(savedTheme);
        }
      } catch {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    }
  }, [setTheme]);

  return <>{children}</>;
}
