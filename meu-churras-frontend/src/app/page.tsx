// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // Importe nosso hook
import Link from 'next/link';

interface Evento {
  id: number;
  nome: string;
  organizador: string;
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [error, setError] = useState('');
  const { token, logout } = useAuth(); // Pegue o token e a função logout do contexto

  useEffect(() => {
    // Só busca os eventos se o token existir
    if (token) {
      const fetchEventos = async () => {
        try {
          // O token já está configurado no axios pelo nosso AuthContext!
          const response = await axios.get('http://localhost:8000/api/eventos/');
          setEventos(response.data);
        } catch (err) {
          console.error("Erro ao buscar eventos:", err);
          setError('Não foi possível carregar os eventos.');
        }
      };
      fetchEventos();
    }
  }, [token]); // Roda o efeito sempre que o token mudar

  if (!token) {
    return (
      <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
        <h1>Bem-vindo ao CanesGril</h1>
        <p>Por favor, faça o login para ver os eventos.</p>
        {/* Você pode adicionar um link para a página de login aqui */}
      </div>
    );
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Meus Eventos</h1>
        {/* BOTÃO ADICIONADO AQUI */}
        <Link href="/eventos/novo">
          <button style={{ padding: '10px 15px', cursor: 'pointer' }}>+ Planejar Novo Churras</button>
        </Link>
      </div>
        {eventos.length > 0 ? (
          eventos.map(evento => (
            // 2. Envolva o item da lista com o componente Link
            <li key={evento.id}>
              <Link href={`/eventos/${evento.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{evento.nome}</h3>
                <p>(Organizado por: {evento.organizador})</p>
              </Link>
            </li>
          ))
        ) : (
          <p>Nenhum evento encontrado. Crie um novo!</p>
        )}
      {/* Aqui no futuro podemos adicionar um botão para criar um novo evento */}
    </main>
  );
}