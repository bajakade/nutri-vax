import uuid from 'react-native-uuid';

export const hasSubString = (source: string, searchText: string) => {
  return source.toLowerCase().includes(searchText.toLowerCase());
};

export const generateNutriVaxBarcode = (): string => {
  const year = new Date().getFullYear();
  const randomId = Math.floor(100000 + Math.random() * 900000);
  return `NVX-${year}-${randomId}`;
};

export const calculateAgeInMonths = (dob: string): number => {
  if (!dob) return 0;
  const today = new Date();
  const birthDate = new Date(dob);
  return (
    (today.getFullYear() - birthDate.getFullYear()) * 12 +
    (today.getMonth() - birthDate.getMonth()) -
    (today.getDate() < birthDate.getDate() ? 1 : 0)
  );
};

/**
 * Generates a new UUID (v4) value
 *
 * @returns UUID string
 */
export const genUUID = (): string => uuid.v4().toString();
