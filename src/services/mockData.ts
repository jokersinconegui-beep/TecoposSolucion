import { Account, Transaction } from '../types';

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Cuenta Principal',
    balance: 2500.75,
    currency: 'USD',
    type: 'general',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Inversiones',
    balance: 5000.00,
    currency: 'USD',
    type: 'investment',
    createdAt: '2024-01-10T14:20:00Z',
  },
  {
    id: '3',
    name: 'Gastos Varios',
    balance: 350.50,
    currency: 'USD',
    type: 'expenses',
    createdAt: '2024-01-12T09:15:00Z',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    accountId: '1',
    type: 'income',
    amount: 1200.00,
    description: 'Pago de cliente',
    category: 'trabajo',
    date: '2024-01-20T08:00:00Z',
    createdAt: '2024-01-20T08:00:00Z',
  },
  {
    id: '2',
    accountId: '1',
    type: 'expense',
    amount: 150.25,
    description: 'Supermercado',
    category: 'comida',
    date: '2024-01-19T18:30:00Z',
    createdAt: '2024-01-19T18:30:00Z',
  },
];