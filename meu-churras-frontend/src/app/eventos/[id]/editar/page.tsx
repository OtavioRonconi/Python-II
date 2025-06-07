// src/app/eventos/[id]/editar/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function EditarEventoPage() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { token } = useAuth();

  // Efeito para buscar os dados do evento atual quando a página carrega
  useEffect(() => {
    if (token && id) {
      const fetchEvento = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/eventos/${id}/`);
          const evento = response.data;
          setNome(evento.nome);
          setData(evento.data);
          setLocal(evento.local);
        } catch (err) {
          console.error('Erro ao buscar evento para edição', err);
          setError('Não foi possível carregar os dados do evento.');
        }
      };
      fetchEvento();
    }
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Usamos o método PUT para atualizar o recurso existente
      await axios.put(`http://localhost:8000/api/eventos/${id}/`, 
        { nome, data, local },
        { headers: { 'Authorization': `Token ${token}` } }
      );
      // Redireciona para a página de detalhes do evento após o sucesso
      router.push(`/eventos/${id}`);
    } catch (err) {
      console.error('Erro ao atualizar evento', err);
      setError('Ocorreu um erro ao atualizar o evento. Tente novamente.');
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Editar Evento</h1>
      <form onSubmit={handleSubmit}>
        {/* O formulário é idêntico ao de criação */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nome">Nome do Evento</label>
          <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="data">Data</label>
          <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="local">Local</label>
          <input id="local" type="text" value={local} onChange={(e) => setLocal(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>Salvar Alterações</button>
          <Link href={`/eventos/${id}`} style={{ padding: '10px 20px', textDecoration: 'none', backgroundColor: '#6c757d', color: 'white', borderRadius: '5px' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}