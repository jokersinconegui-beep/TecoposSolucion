// Tipos para las cuentas
export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  type: 'general' | 'investment' | 'expenses';
  createdAt: string;
}

// Tipos para las transacciones
export interface Transaction {
  id: string;
  accountId: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
}

// Tipos para el formulario
export interface TransactionFormData {
  accountId: string;
  type: 'income' | 'expense';
  amount: string;
  description: string;
  category: string;
  date: string;
}

// Tipo para el contexto de autenticación
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}