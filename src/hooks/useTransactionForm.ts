import { useState } from 'react';
import { TransactionFormData } from '../types';

interface ValidationErrors {
  amount?: string;
  description?: string;
  category?: string;
  type?: string;
}

export const useTransactionForm = (initialData?: Partial<TransactionFormData>) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    accountId: initialData?.accountId || '',
    type: initialData?.type || 'expense',
    amount: initialData?.amount || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validar monto
    if (!formData.amount.trim()) {
      newErrors.amount = 'El monto es requerido';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'El monto debe ser un número mayor a 0';
    }

    // Validar descripción
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.trim().length < 2) {
      newErrors.description = 'La descripción debe tener al menos 2 caracteres';
    }

    // Validar categoría
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es requerida';
    }

    // Validar tipo
    if (!formData.type) {
      newErrors.type = 'El tipo es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof TransactionFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      accountId: initialData?.accountId || '',
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
  };
};