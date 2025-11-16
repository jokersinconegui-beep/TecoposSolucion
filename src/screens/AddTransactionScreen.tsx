import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { apiService } from '../services/api';
import { InputField } from '../components/atoms/InputField';
import { SelectField } from '../components/atoms/SelectField';
import { useTransactionForm } from '../hooks/useTransactionForm';

type AddTransactionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTransaction'>;

type Props = {
  navigation: AddTransactionScreenNavigationProp;
  route: {
    params: {
      accountId: string;
      accountName?: string;
    };
  };
};

const AddTransactionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { accountId, accountName } = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
  } = useTransactionForm({ accountId });

  const transactionTypes = [
    { label: 'Gasto', value: 'expense' },
    { label: 'Ingreso', value: 'income' },
  ];

  const categories = [
    { label: 'Trabajo', value: 'trabajo' },
    { label: 'Comida', value: 'comida' },
    { label: 'Transporte', value: 'transporte' },
    { label: 'Inversiones', value: 'inversiones' },
    { label: 'Entretenimiento', value: 'entretenimiento' },
    { label: 'Salud', value: 'salud' },
    { label: 'Educación', value: 'educación' },
    { label: 'Otros', value: 'otros' },
  ];

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    setIsSubmitting(true);

    try {
      await apiService.createTransaction(formData);
      
      Alert.alert(
        '¡Éxito!',
        'Transacción creada correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              resetForm();
              // Simplemente regresar - useFocusEffect en TransactionsScreen recargará
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error creating transaction:', error);
      Alert.alert('Error', 'No se pudo crear la transacción. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formData.description || formData.amount) {
      Alert.alert(
        '¿Descartar cambios?',
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Salir',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Nueva Transacción</Text>
        {accountName && (
          <Text style={styles.subtitle}>Cuenta: {accountName}</Text>
        )}

        <SelectField
          label="Tipo de Transacción *"
          value={formData.type}
          options={transactionTypes}
          onSelect={(value) => updateField('type', value)}
          error={errors.type}
        />

        <InputField
          label="Monto *"
          value={formData.amount}
          onChangeText={(value) => updateField('amount', value)}
          placeholder="0.00"
          keyboardType="decimal-pad"
          error={errors.amount}
        />

        <InputField
          label="Descripción *"
          value={formData.description}
          onChangeText={(value) => updateField('description', value)}
          placeholder="Ej: Pago de servicios, Compra supermercado..."
          multiline
          numberOfLines={2}
          error={errors.description}
        />

        <SelectField
          label="Categoría *"
          value={formData.category}
          options={categories}
          onSelect={(value) => updateField('category', value)}
          error={errors.category}
        />

        <InputField
          label="Fecha"
          value={formData.date}
          onChangeText={(value) => updateField('date', value)}
          placeholder="YYYY-MM-DD"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Crear Transacción</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>
          * Campos obligatorios
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default AddTransactionScreen;