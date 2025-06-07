// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { token, logout } = useAuth();

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
        🔥 CanesGril
      </Link>
      <nav>
        {token ? (
          <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', fontWeight: 'bold' }}>
            Sair
          </button>
        ) : (
          <>
            <Link href="/login" style={{ marginRight: '1rem', textDecoration: 'none', color: '#555' }}>Entrar</Link>
            <Link href="/cadastro" style={{ textDecoration: 'none', color: '#555' }}>Cadastre-se</Link>
          </>
        )}
      </nav>
    </header>
  );
}