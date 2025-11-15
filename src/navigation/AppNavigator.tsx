import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AccountsScreen from '../screens/AccountsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';

export type RootStackParamList = {
  Login: undefined;
  Accounts: undefined;
  Transactions: { accountId: string; accountName: string };
  AddTransaction: { accountId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Accounts" 
          component={AccountsScreen}
          options={{ title: 'Mis Cuentas' }}
        />
        <Stack.Screen 
          name="Transactions" 
          component={TransactionsScreen}
          options={({ route }) => ({ title: route.params.accountName })}
        />
        <Stack.Screen 
          name="AddTransaction" 
          component={AddTransactionScreen}
          options={{ title: 'Nueva Operación' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;