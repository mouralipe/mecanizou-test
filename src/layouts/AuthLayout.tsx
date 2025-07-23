'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleLogout } = useAuth();

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Mecanizou</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={handleLogout}>Sair</button>
        </div>
      </header>

      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
}
