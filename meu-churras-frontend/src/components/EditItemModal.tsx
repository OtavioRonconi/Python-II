'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface Item {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: string;
  preco: number;
  evento: number;
}

interface EditItemModalProps {
  item: Item;
  onClose: () => void;
  onItemUpdate: () => void;
}

export default function EditItemModal({ item, onClose, onItemUpdate }: EditItemModalProps) {
  const [nome, setNome] = useState(item.nome);
  const [quantidade, setQuantidade] = useState(item.quantidade.toString());
  const [unidade, setUnidade] = useState(item.unidade);
  const [tipo, setTipo] = useState(item.tipo);
  const [preco, setPreco] = useState(item.preco.toString());
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) return;

    try {
      await axios.put(`http://localhost:8000/api/itens/${item.id}/`, {
        nome,
        quantidade: parseFloat(quantidade) || 0,
        unidade,
        tipo,
        preco: parseFloat(preco) || 0,
        evento: item.evento
      }, { headers: { 'Authorization': `Token ${token}` } });
      
      onItemUpdate();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar item", error);
      setError("Falha ao atualizar o item.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-slate-100">Editar Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-slate-400">Nome do Item</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} required className="form-input" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-400">Quantidade</label>
                <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} required className="form-input" step="0.01" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-400">Unidade</label>
                <input type="text" value={unidade} onChange={e => setUnidade(e.target.value)} required className="form-input" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-400">Preço (R$)</label>
                <input type="number" value={preco} onChange={e => setPreco(e.target.value)} required className="form-input" step="0.01" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-400">Tipo</label>
                <select value={tipo} onChange={e => setTipo(e.target.value)} className="form-input">
                    <option value="CARNE">Carne</option>
                    <option value="BEBIDA">Bebida</option>
                    <option value="SUPRIMENTO">Suprimento</option>
                    <option value="OUTRO">Outro</option>
                </select>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancelar</button>
            <button type="submit" className="btn btn-blue">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
}