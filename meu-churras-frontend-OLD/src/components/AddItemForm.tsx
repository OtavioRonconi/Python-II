// src/components/AddItemForm.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface AddItemFormProps {
  eventoId: number;
  onItemAdd: () => void; // Esta é uma função que vamos chamar para avisar a página que um item foi adicionado
}

export default function AddItemForm({ eventoId, onItemAdd }: AddItemFormProps) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [tipo, setTipo] = useState('CARNE');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) return;

    try {
      await axios.post('http://localhost:8000/api/itens/', 
        {
          nome,
          quantidade: parseFloat(quantidade), // Converte para número
          unidade,
          tipo,
          evento: eventoId // Associa este item ao evento da página atual
        },
        { headers: { 'Authorization': `Token ${token}` } }
      );
      
      // Limpa o formulário após o sucesso
      setNome('');
      setQuantidade('');
      setUnidade('');
      
      // Chama a função do componente "pai" para atualizar a lista de itens
      onItemAdd();

    } catch (err) {
      console.error('Erro ao adicionar item', err);
      setError('Falha ao adicionar o item. Verifique os campos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4">Adicionar Novo Item</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Nome do item" value={nome} onChange={e => setNome(e.target.value)} required className="p-2 border rounded" />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} required className="p-2 border rounded" step="0.01" />
        <input type="text" placeholder="Unidade (kg, L, un)" value={unidade} onChange={e => setUnidade(e.target.value)} required className="p-2 border rounded" />
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="p-2 border rounded">
          <option value="CARNE">Carne</option>
          <option value="BEBIDA">Bebida</option>
          <option value="SUPRIMENTO">Suprimento</option>
          <option value="OUTRO">Outro</option>
        </select>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
        + Adicionar à Lista
      </button>
    </form>
  );
}