import { Account, Transaction, TransactionFormData } from '../types';

const API_BASE_URL = 'https://6918391e21a96359486f3ab3.io/api/v1';

// Reemplaza con tus URLs reales de MockAPI
const ACCOUNTS_URL = `${API_BASE_URL}/accounts`;
const TRANSACTIONS_URL = `${API_BASE_URL}/transactions`;

export const apiService = {
  // Obtener todas las cuentas
  async getAccounts(): Promise<Account[]> {
    try {
      const response = await fetch(ACCOUNTS_URL);
      if (!response.ok) throw new Error('Error fetching accounts');
      return await response.json();
    } catch (error) {
      console.error('API Error - getAccounts:', error);
      throw error;
    }
  },

  // Obtener transacciones por cuenta
  async getTransactionsByAccount(accountId: string): Promise<Transaction[]> {
    try {
      const response = await fetch(`${TRANSACTIONS_URL}?accountId=${accountId}`);
      if (!response.ok) throw new Error('Error fetching transactions');
      return await response.json();
    } catch (error) {
      console.error('API Error - getTransactionsByAccount:', error);
      throw error;
    }
  },

  // Crear nueva transacción
  async createTransaction(transactionData: TransactionFormData): Promise<Transaction> {
    try {
      const response = await fetch(TRANSACTIONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transactionData,
          amount: parseFloat(transactionData.amount),
          createdAt: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) throw new Error('Error creating transaction');
      return await response.json();
    } catch (error) {
      console.error('API Error - createTransaction:', error);
      throw error;
    }
  },

  // Actualizar balance de cuenta (simulado)
  async updateAccountBalance(accountId: string, newBalance: number): Promise<void> {
    // En un caso real, harías PATCH a /accounts/:id
    // Para el MVP, lo simulamos
    console.log(`Simulating balance update for account ${accountId}: ${newBalance}`);
    return Promise.resolve();
  }
};