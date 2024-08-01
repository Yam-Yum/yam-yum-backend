import { randomBytes } from 'crypto';

export const generateRandomOrderNumber = (prefix = 'ORD-') => {
  const randomBytesArray = randomBytes(4);
  const randomHexString = randomBytesArray.toString('hex').toUpperCase();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const dateString = `${year}${month}${day}`;

  return `${prefix}${dateString}-${randomHexString}`;
};
