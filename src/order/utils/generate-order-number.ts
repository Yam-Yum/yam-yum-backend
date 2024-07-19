import { randomBytes } from 'crypto';

export const generateRandomOrderNumber = (prefix = 'ORD-') => {
  const randomBytesArray = randomBytes(4);
  const randomHexString = randomBytesArray.toString('hex').toUpperCase();
  return `${prefix}${randomHexString}`;
};
