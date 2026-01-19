const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // Use UTC methods to prevent timezone issues
  return `${months[date.getUTCMonth()]}, ${date.getUTCFullYear()}`;
};
