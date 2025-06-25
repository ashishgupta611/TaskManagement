export const formatTimestamp = (time?: number) => {
  if (!time || time === -1) {
    return '---';
  }
  if (typeof time !== 'number' || isNaN(time)) return '';
  const date = new Date(time);
  return formatDate(date);
};

export const formatDate = (date?: Date) => {
  if (!date || !(date instanceof Date)) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 becomes 12)
  
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm} - ${day} ${month} ${year}`;
};