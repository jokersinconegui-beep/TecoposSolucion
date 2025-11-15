export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Función segura para formatear moneda que evita el error de Hermes
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  // Validar que la moneda sea un código válido de 3 letras
  const validCurrency = /^[A-Z]{3}$/.test(currency) ? currency : 'USD';
  
  try {
    // Usar un enfoque más seguro para NumberFormat
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: validCurrency,
    }).format(amount);
  } catch (error) {
    console.warn('Error formatting currency, using fallback:', error);
    // Fallback seguro
    return `$${amount.toFixed(2)}`;
  }
};

// Función alternativa más simple si persisten los problemas
export const formatCurrencySimple = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};