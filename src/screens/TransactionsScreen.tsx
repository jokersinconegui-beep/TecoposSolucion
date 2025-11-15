import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Transaction } from '../types';
import { apiService } from '../services/api';
import { TransactionCard } from '../components/molecules/TransactionCard';
import { TransactionCardSkeleton } from '../components/molecules/TransactionCardSkeleton';
import { EmptyState } from '../components/molecules/EmptyState';
import { Skeleton } from '../components/atoms/Skeleton';

// Función segura para formatear moneda
const formatCurrency = (amount: number): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  } catch (error) {
    return `$${amount.toFixed(2)}`;
  }
};

type TransactionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Transactions'>;

type Props = {
  navigation: TransactionsScreenNavigationProp;
  route: {
    params: {
      accountId: string;
      accountName: string;
    };
  };
};

const TransactionsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { accountId, accountName } = route.params;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTransactions = async (showRefresh = false) => {
    try {
      if (!showRefresh) {
        setIsLoading(true);
      }
      
      const transactionsData = await apiService.getTransactionsByAccount(accountId);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error loading transactions:', error);
      Alert.alert('Error', 'No se pudieron cargar las transacciones');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [accountId]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadTransactions(true);
  };

  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction', { accountId });
  };

  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'income' 
        ? total + transaction.amount 
        : total - transaction.amount;
    }, 0);
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TransactionCard transaction={item} />
  );

  const renderSkeleton = () => (
    <View>
      {[1, 2, 3, 4, 5].map((item) => (
        <TransactionCardSkeleton key={item} />
      ))}
    </View>
  );

  const currentBalance = calculateBalance();
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.accountName}>{accountName}</Text>
          <Skeleton width="40%" height={24} />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Skeleton width="60%" height={12} style={{ marginBottom: 4 }} />
            <Skeleton width="40%" height={16} />
          </View>
          <View style={styles.stat}>
            <Skeleton width="60%" height={12} style={{ marginBottom: 4 }} />
            <Skeleton width="40%" height={16} />
          </View>
          <View style={styles.stat}>
            <Skeleton width="60%" height={12} style={{ marginBottom: 4 }} />
            <Skeleton width="40%" height={16} />
          </View>
        </View>
        {renderSkeleton()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.accountName}>{accountName}</Text>
        <Text style={[
          styles.balance,
          { color: currentBalance >= 0 ? '#4CAF50' : '#F44336' }
        ]}>
          {formatCurrency(currentBalance)}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Total Transacciones</Text>
          <Text style={styles.statValue}>{transactions.length}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Ingresos</Text>
          <Text style={[styles.statValue, styles.incomeText]}>
            {formatCurrency(totalIncome)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Gastos</Text>
          <Text style={[styles.statValue, styles.expenseText]}>
            {formatCurrency(totalExpenses)}
          </Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#2196F3']}
          />
        }
        ListEmptyComponent={
          <EmptyState
            title="No hay transacciones"
            message="No se encontraron transacciones para esta cuenta. Presiona el botón + para agregar una nueva transacción."
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={handleAddTransaction}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  accountName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  balance: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  incomeText: {
    color: '#4CAF50',
  },
  expenseText: {
    color: '#F44336',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TransactionsScreen;