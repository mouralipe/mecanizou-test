'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    handleLogin(user, password);

    setUser('');
    setPassword('');
  };

  return (
    <div className="h-full flex items-center justify-center">
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Mecanizou</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
