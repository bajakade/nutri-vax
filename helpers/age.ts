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