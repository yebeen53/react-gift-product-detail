import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUserInfo = localStorage.getItem('user');
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('authToken', user.authToken);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
