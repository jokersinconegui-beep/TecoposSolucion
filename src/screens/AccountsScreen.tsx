import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Account } from '../types';
import { apiService } from '../services/api';
import { AccountCard } from '../components/molecules/AccountCard';
import { AccountCardSkeleton } from '../components/molecules/AccountCardSkeleton';
import { EmptyState } from '../components/molecules/EmptyState';

type AccountsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Accounts'>;

type Props = {
  navigation: AccountsScreenNavigationProp;
};

const AccountsScreen: React.FC<Props> = ({ navigation }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAccounts = async (showRefresh = false) => {
    try {
      if (!showRefresh) {
        setIsLoading(true);
      }
      
      const accountsData = await apiService.getAccounts();
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error loading accounts:', error);
      Alert.alert('Error', 'No se pudieron cargar las cuentas');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleAccountPress = (account: Account) => {
    navigation.navigate('Transactions', {
      accountId: account.id,
      accountName: account.name,
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadAccounts(true);
  };

  const renderAccountItem = ({ item }: { item: Account }) => (
    <AccountCard account={item} onPress={handleAccountPress} />
  );

  const renderSkeleton = () => (
    <View>
      {[1, 2, 3].map((item) => (
        <AccountCardSkeleton key={item} />
      ))}
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Mis Cuentas</Text>
        {renderSkeleton()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Mis Cuentas</Text>
      
      <FlatList
        data={accounts}
        renderItem={renderAccountItem}
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
            title="No hay cuentas"
            message="No se encontraron cuentas bancarias. Pull to refresh para intentar de nuevo."
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default AccountsScreen;