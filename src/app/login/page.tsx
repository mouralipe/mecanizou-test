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
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Usuário:
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
