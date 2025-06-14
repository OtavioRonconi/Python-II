'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function CadastroPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      setError('As senhas não coincidem.');
      return;
    }
    setError('');
    await register(username, password);
  };

  return (
    <div className="mx-auto max-w-md mt-10">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Cadastre-se</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">Nome de Usuário</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Confirmar Senha</label>
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required className="form-input" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">Criar Conta</button>
        </form>
      </div>
    </div>
  );
}