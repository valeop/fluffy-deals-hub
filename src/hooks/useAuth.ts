import { useState, useEffect } from 'react';
import { AuthUser } from '@/types';
import { localStorageService } from '@/services/localStorage.service';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorageService.initializeDefaults();
    const session = localStorageService.getSession();
    if (session) {
      setUser(session);
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = localStorageService.getUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password);
    
    if (foundUser) {
      const authUser: AuthUser = { email, isAuthenticated: true };
      setUser(authUser);
      localStorageService.saveSession(authUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorageService.clearSession();
  };

  const register = (email: string, password: string): boolean => {
    const users = localStorageService.getUsers();
    
    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return false;
    }
    
    users.push({ email, password });
    localStorageService.saveUsers(users);
    return true;
  };

  return { user, loading, login, logout, register };
};