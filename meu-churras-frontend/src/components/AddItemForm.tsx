'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface AddItemFormProps {
  eventoId: number;
  onItemAdd: () => void;
}

export default function AddItemForm({ eventoId, onItemAdd }: AddItemFormProps) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [preco, setPreco] = useState('');
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
          quantidade: parseFloat(quantidade) || 0,
          unidade,
          tipo,
          preco: parseFloat(preco) || 0,
          evento: eventoId
        },
        { headers: { 'Authorization': `Token ${token}` } }
      );
      
      setNome('');
      setQuantidade('');
      setUnidade('');
      setPreco('');
      
      onItemAdd();

    } catch (err) {
      console.error('Erro ao adicionar item', err);
      setError('Falha ao adicionar o item. Verifique os campos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-slate-100">Adicionar Novo Item</h3>
      <div className="space-y-3">
        <input type="text" placeholder="Nome do item" value={nome} onChange={e => setNome(e.target.value)} required className="form-input" />
        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Qtd" value={quantidade} onChange={e => setQuantidade(e.target.value)} required className="form-input" step="0.01" />
          <input type="text" placeholder="Unidade (kg, L)" value={unidade} onChange={e => setUnidade(e.target.value)} required className="form-input" />
        </div>
        <input type="number" placeholder="Preço (R$)" value={preco} onChange={e => setPreco(e.target.value)} className="form-input" step="0.01" />
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="form-input">
          <option value="CARNE">Carne</option>
          <option value="BEBIDA">Bebida</option>
          <option value="SUPRIMENTO">Suprimento</option>
          <option value="OUTRO">Outro</option>
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button type="submit" className="btn btn-blue w-full mt-4">
        + Adicionar à Lista
      </button>
    </form>
  );
}