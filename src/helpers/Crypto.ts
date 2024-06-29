// import crypto from 'crypto';
import { createHash, createCipheriv, createDecipheriv } from 'crypto';
import { cryptoAlgorithm, cryptoIvKey, cryptoSecretKey } from '../utils/env';

const key = createHash('sha512').update(cryptoSecretKey, 'utf-8').digest('hex').substring(0, 32);
const iv = createHash('sha512').update(cryptoIvKey, 'utf-8').digest('hex').substring(0, 16);

interface ICrypto {
    encrypt: (payload: string) => string;
    decrypt: (encryptedPayload: string) => string;
}

export class Crypto implements ICrypto {
    public encrypt(payload: string): string {
        const cipher = createCipheriv(cryptoAlgorithm, key, iv);
        const encrypted = `${cipher.update(payload, 'utf-8', 'base64')}${cipher.final('base64')}`;
        return Buffer.from(encrypted).toString('base64');
    }

    public decrypt(encryptedPayload: string): string {
        const auxEncrypted = Buffer.from(encryptedPayload, 'base64').toString('utf-8');
        const decipher = createDecipheriv(cryptoAlgorithm, key, iv);
        const decrypted = `${decipher.update(auxEncrypted, 'base64', 'utf-8')}${decipher.final('utf-8')}`;
        return decrypted;
    }

    public static create() {
        return new Crypto();
    }
}