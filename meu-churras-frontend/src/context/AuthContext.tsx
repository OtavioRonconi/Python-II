'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
      }
    } catch (error) {
        console.error("Erro ao carregar dados de autenticação", error);
    } finally {
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
      const currentUser = { username: username };
      
      setToken(receivedToken);
      setUser(currentUser);
      localStorage.setItem('authToken', receivedToken);
      localStorage.setItem('authUser', JSON.stringify(currentUser));
      
      axios.defaults.headers.common['Authorization'] = `Token ${receivedToken}`;
      router.push('/');

    } catch (error) {
      console.error('Falha no login', error);
      alert('Usuário ou senha inválidos.');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username,
        password,
      });
      await login(username, password);
    } catch (error) {
      console.error('Falha no cadastro', error);
      alert('Não foi possível realizar o cadastro. O usuário pode já existir.');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}