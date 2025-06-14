// src/components/EditItemModal.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

// Tipagem para as props do componente
interface Item {
  id: number;
  evento: number;
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: string;
}

interface EditItemModalProps {
  item: Item;
  onClose: () => void;
  onItemUpdate: () => void;
}

export default function EditItemModal({ item, onClose, onItemUpdate }: EditItemModalProps) {
  // Estados para os campos do formulário, inicializados com os dados do item
  const [nome, setNome] = useState(item.nome);
  const [quantidade, setQuantidade] = useState(item.quantidade.toString());
  const [unidade, setUnidade] = useState(item.unidade);
  const [tipo, setTipo] = useState(item.tipo);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      await axios.put(`http://localhost:8000/api/itens/${item.id}/`, {
        nome,
        quantidade: parseFloat(quantidade),
        unidade,
        tipo,
        evento: item.evento // O ID do evento não muda, mas precisa ser enviado
      }, { headers: { 'Authorization': `Token ${token}` } });
      
      onItemUpdate(); // Avisa a página de detalhes para recarregar a lista
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao atualizar item", error);
      alert("Falha ao atualizar o item.");
    }
  };

  return (
    // Overlay (fundo escuro)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Conteúdo do Modal */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Item</h2>
        <form onSubmit={handleSubmit}>
          {/* Formulário similar ao de criação */}
          <div className="space-y-4">
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} required className="w-full p-2 border rounded" step="0.01" />
            <input type="text" value={unidade} onChange={e => setUnidade(e.target.value)} required className="w-full p-2 border rounded" />
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full p-2 border rounded">
                <option value="CARNE">Carne</option>
                <option value="BEBIDA">Bebida</option>
                <option value="SUPRIMENTO">Suprimento</option>
                <option value="OUTRO">Outro</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancelar</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
}