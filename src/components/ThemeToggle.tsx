'use client';

import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === 'light' ? '🌙' : '🌞';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {themeIcon}
    </button>
  );
}
