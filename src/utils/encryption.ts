// NOTE: encryption is not used in this project at the moment
// This file is kept for reference purposes
// It will be removed once the project is complete
// It will be used for encryption and decryption of sensitive data if necessary




import * as crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "1234567890abcdef1234567890abcdef";

console.log('ENCRYPTION_KEY:', ENCRYPTION_KEY);
console.log('Encryption Key Length:', Buffer.byteLength(ENCRYPTION_KEY, 'utf8')); // Should print 32

if (Buffer.byteLength(ENCRYPTION_KEY, 'utf8') !== 32) {
  throw new Error('ENCRYPTION_KEY must be 256 bits (32 bytes) long!');
}

const IV_LENGTH = 16; // For AES, this is always 16

// checking key length
console.log('Encryption Key Length:', Buffer.byteLength(ENCRYPTION_KEY, 'utf8'));

// checking if the ENCRYPTION_KEY is exactly 32 bytes
if (Buffer.byteLength(ENCRYPTION_KEY, 'utf8') !== 32) {
  throw new Error('ENCRYPTION_KEY must be 256 bits (32 bytes) long!');
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
