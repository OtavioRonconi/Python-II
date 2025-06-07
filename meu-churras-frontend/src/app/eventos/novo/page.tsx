// src/app/eventos/novo/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function NovoEventoPage() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Você precisa estar logado para criar um evento.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/eventos/', 
        { nome, data, local },
        {
          headers: {
            'Authorization': `Token ${token}`
          }
        }
      );
      // Redireciona para a home page após o sucesso
      router.push('/');
    } catch (err) {
      console.error('Erro ao criar evento', err);
      setError('Ocorreu um erro ao criar o evento. Tente novamente.');
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Planejar Novo Churrasco</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nome">Nome do Evento</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="data">Data</label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="local">Local</label>
          <input
            id="local"
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>Salvar Evento</button>
          <Link href="/" style={{ padding: '10px 20px', textDecoration: 'none', backgroundColor: '#6c757d', color: 'white', borderRadius: '5px' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}