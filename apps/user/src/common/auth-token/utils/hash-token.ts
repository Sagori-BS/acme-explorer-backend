import * as crypto from 'crypto';

export const hashToken = token =>
  crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
