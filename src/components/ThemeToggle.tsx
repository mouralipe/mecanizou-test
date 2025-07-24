'use client';

import { useTheme } from '@/hooks/useTheme';
import { Button } from './Button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === 'light' ? '🌙' : '🌞';

  return (
    <Button
      onClick={toggleTheme}
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      variant="icon"
    >
      {themeIcon}
    </Button>
  );
}
