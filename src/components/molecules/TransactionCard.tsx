import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../../types';
import { formatDate } from '../../utils/dateUtils';

// Función segura para formatear moneda
const formatCurrency = (amount: number): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  } catch (error) {
    // Fallback seguro si hay error
    return `$${amount.toFixed(2)}`;
  }
};

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      trabajo: '#4CAF50',
      comida: '#FF9800',
      transporte: '#2196F3',
      inversiones: '#9C27B0',
      entretenimiento: '#E91E63',
      salud: '#00BCD4',
      educación: '#795548',
      otros: '#9E9E9E',
    };
    return colors[category] || colors.otros;
  };

  const getCategoryText = (category: string) => {
    const categories: { [key: string]: string } = {
      trabajo: 'Trabajo',
      comida: 'Comida',
      transporte: 'Transporte',
      inversiones: 'Inversiones',
      entretenimiento: 'Entretenimiento',
      salud: 'Salud',
      educación: 'Educación',
      otros: 'Otros',
    };
    return categories[category] || category;
  };

  return (
    <View style={styles.card}>
      <View style={styles.mainContent}>
        <View style={styles.leftSection}>
          <Text style={styles.description} numberOfLines={1}>
            {transaction.description}
          </Text>
          <View style={styles.metaInfo}>
            <View 
              style={[
                styles.categoryBadge,
                { backgroundColor: getCategoryColor(transaction.category) }
              ]}
            >
              <Text style={styles.categoryText}>
                {getCategoryText(transaction.category)}
              </Text>
            </View>
            <Text style={styles.date}>
              {formatDate(transaction.date)}
            </Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Text 
            style={[
              styles.amount,
              { color: isIncome ? '#4CAF50' : '#F44336' }
            ]}
          >
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </Text>
          <Text style={styles.type}>
            {isIncome ? 'Ingreso' : 'Gasto'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default TransactionCard;