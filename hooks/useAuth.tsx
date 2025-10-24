
import React, { createContext, useState, useContext, useMemo } from 'react';
import { User, FacebookPage } from '../types';

interface AuthContextType {
  user: User | null;
  pages: FacebookPage[];
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  name: 'Alex Chen',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
};

const mockPages: FacebookPage[] = [
  { id: '1', name: 'Gourmet Travels', avatarUrl: 'https://picsum.photos/seed/page1/100/100' },
  { id: '2', name: 'Tech Innovators Hub', avatarUrl: 'https://picsum.photos/seed/page2/100/100' },
  { id: '3', name: 'Minimalist Living Co.', avatarUrl: 'https://picsum.photos/seed/page3/100/100' },
];


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pages] = useState<FacebookPage[]>(mockPages);

  const login = () => {
    // In a real app, this would involve a redirect to Facebook OAuth
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };
  
  const value = useMemo(() => ({ user, pages, login, logout }), [user, pages]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
