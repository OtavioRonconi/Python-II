'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import AddItemForm from '@/components/AddItemForm';
import EditItemModal from '@/components/EditItemModal';

interface Item {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: string;
  preco: number;
  evento: number;
}

interface Evento {
  id: number;
  nome: string;
  data: string;
  local: string;
  organizador: string;
  itens: Item[];
}

export default function EventoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { token, loading: authLoading } = useAuth();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const fetchEvento = async () => {
    if (id) {
        try {
            const response = await axios.get(`http://localhost:8000/api/eventos/${id}/`);
            setEvento(response.data);
        } catch (error) {
            console.error("Erro ao buscar detalhes do evento", error);
        }
    }
  };
  
  useEffect(() => {
    if (!authLoading) {
        if (token) {
            setPageLoading(true);
            fetchEvento().finally(() => setPageLoading(false));
        } else {
            router.push('/login');
        }
    }
  }, [id, token, authLoading, router]);

  const handleItemDelete = async (itemId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await axios.delete(`http://localhost:8000/api/itens/${itemId}/`);
        fetchEvento();
      } catch (error) {
        console.error("Erro ao deletar item", error);
        alert("Não foi possível excluir o item.");
      }
    }
  };

  const totalCost = evento ? evento.itens.reduce((acc, item) => acc + Number(item.preco), 0) : 0;

  if (authLoading || pageLoading) {
    return <div className="p-8 text-center text-slate-300">Carregando...</div>;
  }

  if (!evento) {
    return <div className="p-8 text-center text-slate-300">Evento não encontrado ou você não tem permissão para vê-lo.</div>;
  }

  return (
    <div>
      <div className="bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-5xl font-bold text-white">{evento.nome}</h1>
          <div className="text-lg text-slate-400 mt-2">
            <span>{new Date(evento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: 'long', year: 'numeric' })}</span>
            <span className="mx-2">|</span>
            <span>{evento.local}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h2 className="text-2xl font-bold mb-4 text-slate-100">Detalhes e Ações</h2>
              <p className="text-slate-300 mb-6">
                Gerencie as informações gerais do seu evento ou adicione uma descrição detalhada para seus convidados.
              </p>
              <div className="flex gap-4">
                <Link href={`/eventos/${id}/editar`} className="btn btn-blue">Editar Evento</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-slate-100">Itens do Churrasco</h2>
            <AddItemForm eventoId={evento.id} onItemAdd={fetchEvento} />
            <div className="space-y-3 mt-6">
              {evento.itens.map(item => (
                <div key={item.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-center transition-all hover:border-red-500/50">
                  <div>
                    <p className="font-semibold text-slate-100">{item.nome}</p>
                    <span className="text-sm text-slate-400">{item.quantidade} {item.unidade} - {Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button onClick={() => setEditingItem(item)} className="text-blue-400 hover:text-blue-300 text-sm font-semibold">Editar</button>
                    <button onClick={() => handleItemDelete(item.id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">Excluir</button>
                  </div>
                </div>
              ))}
            </div>
            
            {evento.itens.length > 0 && (
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mt-6">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-slate-100">Custo Total:</span>
                        <span className="text-2xl font-bold text-green-400">
                        {totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      
      {editingItem && (
        <EditItemModal 
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onItemUpdate={fetchEvento}
        />
      )}
    </div>
  );
}