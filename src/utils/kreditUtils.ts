// utils/kreditUtils.ts

/**
 * Parsea un número escrito en formato alemán o internacional
 * (puntos como separadores de miles y coma como decimal).
 * Siempre devuelve un número válido. Si la entrada es inválida → 0.
 */
export const parseATNumber = (input: string): number => {
  if (!input) return 0;

  // eliminar todo lo que no sea dígito, punto o coma
  const cleaned = input.replace(/[^\d.,-]/g, "");

  // convertir puntos (miles) en nada y coma en punto decimal
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formatea como número con separador alemán.
 * Por defecto muestra 2 decimales.
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Formatea como moneda en euros.
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
};

/**
 * Calcula la cuota mensual con interés compuesto.
 * Fórmula: Annuitätenformel
 */
export const calculateMonthlyPayment = (
  principal: number,
  months: number,
  interestRate: number
): number => {
  const monthlyRate = interestRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
};
