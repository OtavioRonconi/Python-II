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
    if (id) { // Adicionada verificação de 'id' para evitar erros na primeira renderização
        try {
            const response = await axios.get(`http://localhost:8000/api/eventos/${id}/`);
            setEvento(response.data);
        } catch (error) {
            console.error("Erro ao buscar detalhes do evento", error);
        }
    }
  };

  useEffect(() => {
    if (!authLoading) { // Só roda a lógica quando a autenticação estiver resolvida
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

  if (authLoading || pageLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  if (!evento) {
    return <div className="p-8 text-center">Evento não encontrado ou você não tem permissão para vê-lo.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border-b pb-4 mb-8">
        <span className="text-sm text-gray-500">{new Date(evento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{evento.nome}</h1>
        <div className="text-md text-gray-600 mt-2">
          <span><strong>Local:</strong> {evento.local}</span> | 
          <span> <strong>Organizador:</strong> {evento.organizador}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Descrição</h2>
          <p className="text-gray-700">
            Aqui podemos adicionar uma descrição mais detalhada sobre o evento.
          </p>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Ações do Evento</h3>
            <div className="flex gap-4">
              <Link href={`/eventos/${id}/editar`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Editar Evento</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Itens do Churrasco</h2>
          <AddItemForm eventoId={evento.id} onItemAdd={fetchEvento} />
          <div className="mt-6">
            {evento.itens.length > 0 ? (
              <ul className="space-y-3">
                {evento.itens.map(item => (
                  <li key={item.id} className="p-3 bg-white rounded shadow-sm border flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.nome}</p>
                      <span className="text-sm text-gray-600">{item.quantidade} {item.unidade}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingItem(item)} className="text-blue-500 hover:underline text-sm">Editar</button>
                      <button onClick={() => handleItemDelete(item.id)} className="text-red-500 hover:underline text-sm">Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : ( <p className="text-gray-500 mt-4">Nenhum item cadastrado ainda.</p> )}
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