'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
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
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <Button type="submit">Entrar</Button>
        </form>
      </main>
    </div>
  );
}
