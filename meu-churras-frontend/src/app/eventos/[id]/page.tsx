// src/app/eventos/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Evento {
  id: number;
  nome: string;
  data: string;
  local: string;
  organizador: string;
}

export default function EventoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { token } = useAuth();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && id) {
      const fetchEvento = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/eventos/${id}/`);
          setEvento(response.data);
        } catch (error) {
          console.error("Erro ao buscar detalhes do evento", error);
        } finally {
          setLoading(false);
        }
      };
      fetchEvento();
    }
  }, [id, token]);

  //função para deletar
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este evento permanentemente?')) {
      try {
        await axios.delete(`http://localhost:8000/api/eventos/${id}/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        // Redireciona para a home page após deletar com sucesso
        router.push('/');
      } catch (error) {
        console.error("Erro ao deletar evento", error);
        alert("Não foi possível excluir o evento.");
      }
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Carregando...</p>;
  if (!evento) return <p style={{ padding: '2rem' }}>Evento não encontrado.</p>;

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>{evento.nome}</h1>
      <p><strong>Data:</strong> {new Date(evento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
      <p><strong>Local:</strong> {evento.local}</p>
      <p><strong>Organizador:</strong> {evento.organizador}</p>
      
      {/* 5. Adicione os botões de ação */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link href={`/eventos/${id}/editar`}>
          <button style={{ padding: '10px 15px', cursor: 'pointer' }}>Editar Evento</button>
        </Link>
        <button onClick={handleDelete} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
          Excluir Evento
        </button>
      </div>

      {/* Aqui no futuro listaremos os itens do churrasco */}
    </main>
  );
}