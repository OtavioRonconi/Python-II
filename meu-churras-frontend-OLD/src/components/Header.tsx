// src/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { token, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      {/* Top Header Area - Opcional, simplificado */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 h-12 flex justify-between items-center">
          <p className="text-sm text-gray-600">O melhor churrasco você encontra aqui!</p>
          <div className="text-gray-600">
            {/* Ícones de redes sociais podem ser adicionados aqui */}
          </div>
        </div>
      </div>

      {/* Main Menu Area */}
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <Image src="/img/core-img/logo.png" alt="Canes Grill Logo" width={150} height={40} />
          </Link>

          {/* Links de Navegação */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-500 font-semibold">Home</Link>
            {/* O link para "Churrasco" pode ser a própria home por enquanto */}
            <Link href="/" className="text-gray-700 hover:text-red-500 font-semibold">Meus Eventos</Link>
          </div>

          {/* Ações do Usuário */}
          <div className="flex items-center space-x-4">
            {token ? (
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold">
                Sair
              </button>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-red-500 font-semibold">Entrar</Link>
                <Link href="/cadastro" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold">Cadastre-se</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}