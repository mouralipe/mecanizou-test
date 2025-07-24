'use client';

import { Button } from '@/components/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleLogout } = useAuth();
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 relative">
        <h1 className="text-2xl font-bold">Mecanizou</h1>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant="icon" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-md hover:bg-gray-200 ${isDark ? 'hover:bg-gray-700' : ''} transition-colors`}
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : 'mb-1'}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`}
              ></span>
            </div>
          </button>

          {isMenuOpen && (
            <>
              <div
                className={`fixed inset-0 z-10 bg-black/70 bg-opacity-50 transition-opacity duration-300`}
                onClick={() => setIsMenuOpen(false)}
              ></div>

              <div
                className={`absolute right-0 top-full mt-2 w-48 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} z-20 transform transition-all duration-300 ease-out animate-in slide-in-from-top-2 fade-in`}
              >
                <div className="py-2">
                  <div
                    className={`px-4 py-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tema</span>
                      <ThemeToggle />
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start"
                    >
                      Sair
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
}
