import { useState, useEffect } from 'react';
import { AuthUser } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('petstore:session');
    if (session) {
      try {
        const userData = JSON.parse(session);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('petstore:session');
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('petstore:users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const authUser: AuthUser = { email, isAuthenticated: true };
      setUser(authUser);
      localStorage.setItem('petstore:session', JSON.stringify(authUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('petstore:session');
  };

  const register = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('petstore:users') || '[]');
    users.push({ email, password });
    localStorage.setItem('petstore:users', JSON.stringify(users));
  };

  return { user, loading, login, logout, register };
};