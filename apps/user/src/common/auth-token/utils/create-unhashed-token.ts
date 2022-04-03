import * as crypto from 'crypto';

export const createUnhashedToken = () => crypto.randomBytes(32).toString('hex');
