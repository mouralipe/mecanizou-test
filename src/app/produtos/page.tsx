'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Produtos() {
  const { handleLogout } = useAuth();

  return (
    <div>
      <h1>Produtos</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
