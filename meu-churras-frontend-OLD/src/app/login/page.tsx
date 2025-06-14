// src/app/login/page.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Usando nosso hook customizado!

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1 className='mb-4'>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            className='bg-white text-black rounded-2xl'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            className='bg-white text-black rounded-2xl'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <button className='bg-red-500 text-black rounded-2xl' type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
    </div>
  );
}