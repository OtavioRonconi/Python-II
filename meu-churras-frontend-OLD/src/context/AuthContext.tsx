'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Definindo a "forma" do nosso contexto
interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Criando o "Provedor" do contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      // Ao carregar a aplicação, verifica se já existe um token no localStorage
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
      }
    } catch (error) {
        console.error("Erro ao carregar token do localStorage", error);
    } finally {
        // Avisa que o carregamento inicial do contexto terminou
        setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api-token-auth/', {
        username,
        password,
      });
      const receivedToken = response.data.token;
      
      setToken(receivedToken);
      localStorage.setItem('authToken', receivedToken);
      
      axios.defaults.headers.common['Authorization'] = `Token ${receivedToken}`;
      
      router.push('/');

    } catch (error) {
      console.error('Falha no login', error);
      alert('Usuário ou senha inválidos.');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    
    delete axios.defaults.headers.common['Authorization'];

    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para facilitar o uso do nosso contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}