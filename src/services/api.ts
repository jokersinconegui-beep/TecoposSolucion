import { Account, Transaction, TransactionFormData } from '../types';
import { mockAccounts, mockTransactions } from './mockData';

// REEMPLAZA ESTO CON TU URL REAL DE MOCKAPI
const API_BASE_URL = 'https://6918391e21a96359486f3ab3.mockapi.io/api/v1';
const ACCOUNTS_URL = `${API_BASE_URL}/accounts`;
const TRANSACTIONS_URL = `${API_BASE_URL}/transactions`;

// Configuración: cambia a false si quieres forzar el error de red para testing
const USE_REAL_API = true;

export const apiService = {
  async getAccounts(): Promise<Account[]> {
    try {
      if (!USE_REAL_API) throw new Error('Forced mock mode');
      
      console.log('🔗 Fetching accounts from:', ACCOUNTS_URL);
      
      const response = await fetch(ACCOUNTS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('✅ API Response successful:', data.length, 'accounts');
      return data;
      
    } catch (error) {
      console.warn('⚠️ API failed, using mock data. Error:', error);
      // Fallback a datos mock para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red
      console.log('📦 Using mock accounts:', mockAccounts.length, 'accounts');
      return mockAccounts;
    }
  },

  async getTransactionsByAccount(accountId: string): Promise<Transaction[]> {
    try {
      if (!USE_REAL_API) throw new Error('Forced mock mode');
      
      const url = `${TRANSACTIONS_URL}?accountId=${accountId}`;
      console.log('🔗 Fetching transactions from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Error fetching transactions');
      const data = await response.json();
      console.log('✅ Transactions response:', data.length, 'transactions');
      return data;
      
    } catch (error) {
      console.warn('⚠️ API failed, using mock transactions. Error:', error);
      // Filtrar transacciones mock por accountId
      await new Promise(resolve => setTimeout(resolve, 800));
      const filteredTransactions = mockTransactions.filter(t => t.accountId === accountId);
      console.log('📦 Using mock transactions:', filteredTransactions.length, 'for account', accountId);
      return filteredTransactions;
    }
  },

  async createTransaction(transactionData: TransactionFormData): Promise<Transaction> {
    try {
      if (!USE_REAL_API) throw new Error('Forced mock mode');
      
      console.log('🔗 Creating transaction:', transactionData);
      
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
      const data = await response.json();
      console.log('✅ Transaction created successfully:', data);
      return data;
      
    } catch (error) {
      console.warn('⚠️ API failed, simulating transaction creation. Error:', error);
      // Simular creación exitosa
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTransaction: Transaction = {
        ...transactionData,
        id: Date.now().toString(),
        amount: parseFloat(transactionData.amount),
        createdAt: new Date().toISOString(),
        date: transactionData.date || new Date().toISOString(),
      };
      console.log('📦 Simulated transaction creation:', newTransaction);
      return newTransaction;
    }
  },

  async updateAccountBalance(accountId: string, newBalance: number): Promise<void> {
    // En un caso real, harías PATCH a /accounts/:id
    console.log(`📊 Simulating balance update for account ${accountId}: $${newBalance}`);
    return Promise.resolve();
  }
};