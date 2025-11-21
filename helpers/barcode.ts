export const generateNutriVaxBarcode = (): string => {
  const year = new Date().getFullYear();
  const randomId = Math.floor(100000 + Math.random() * 900000);
  return `NVX-${year}-${randomId}`;
};
