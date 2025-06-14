// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import EventCard from '@/components/EventCard'; // 1. Importe o novo componente
import Link from 'next/link';

interface Evento {
  id: number;
  nome: string;
  organizador: string;
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const fetchEventos = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/eventos/');
          setEventos(response.data);
        } catch (err) {
          console.error("Erro ao buscar eventos:", err);
        }
      };
      fetchEventos();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao CanesGril</h1>
        <p className="text-lg text-gray-600 mb-8">Faça o login ou cadastre-se para planejar seus churrascos.</p>
        <Link href="/login" className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 font-semibold text-lg">
          Entrar
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Meus Eventos</h1>
        <Link href="/eventos/novo">
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-px">
            + Planejar Novo Churrasco
          </button>
        </Link>
      </div>
      
      {eventos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventos.map(evento => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">Nenhum evento encontrado.</h2>
            <p className="text-gray-500 mt-2">Que tal começar a planejar seu próximo churrasco?</p>
        </div>
      )}
    </div>
  );
}