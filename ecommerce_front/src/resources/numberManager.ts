export const formatCurrency = (value: number): string => {
  try {
    const formattedValue = new Intl.NumberFormat("es-CO", {
      style: "decimal",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    return `$ ${formattedValue}`;
  } catch (error) {
    console.error(`Error formatting currency for country code`, error);
    return value.toString();
  }
};
