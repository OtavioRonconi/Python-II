// src/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { token, logout, user } = useAuth(); // Adicionamos o 'user' para pegar o nome

  return (
    // Header com fundo semitransparente e efeito de blur
    <header className="sticky top-0 z-50 bg-slate-900/75 backdrop-blur-lg border-b border-slate-700">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          <Link href="/">
            <Image src="/img/core-img/logo.png" alt="Canes Grill Logo" width={150} height={40} />
          </Link>

          <div className="flex items-center space-x-6">
            {token ? (
              <>
                <span className="text-slate-300">Olá, {user?.username}</span>
                <button onClick={logout} className="btn btn-primary">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 hover:text-white font-semibold">Entrar</Link>
                <Link href="/cadastro" className="btn btn-primary">
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}