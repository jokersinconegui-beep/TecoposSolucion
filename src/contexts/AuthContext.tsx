import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulamos delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Login fake - válido con cualquier email y password que tenga al menos 3 caracteres
    if (email.length >= 3 && password.length >= 3) {
      setIsAuthenticated(true);
    } else {
      throw new Error('Credenciales inválidas. Use cualquier email/password con al menos 3 caracteres.');
    }
    
    setIsLoading(false);
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};