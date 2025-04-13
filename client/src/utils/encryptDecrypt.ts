import * as CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_SECRET_ENCRYPTION_KEY); // Must be 32 chars
const IV_LENGTH = 16;

const encrypt = (plainText: string): string | null => {
  try {
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
    const encrypted = CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
  } catch (err) {
    console.error('Encryption error:', err);
    return null;
  }
};

const decrypt = (encrypted: string): string | null => {
  try {
    const [ivHex, encryptedText] = encrypted.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    const decrypted = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    return null;
  }
};

export default { encrypt, decrypt };
