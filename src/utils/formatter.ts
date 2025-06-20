export const formatDate = (date?: Date) => {
  if (!date || !(date instanceof Date)) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day}${month}${year}`;
};