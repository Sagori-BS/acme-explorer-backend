import { EmailTypes } from '@shared/data/enums/email-types.enum';
import { generateLink } from '../generate-link';

const hostConfirmEmail = 'test.com/confirm';
const hostResetPassword = 'test.com/reset';

beforeAll(async () => {
  process.env.HOST_CONFIRM_EMAIL = hostConfirmEmail;
  process.env.HOST_RESET_PASSWORD = hostResetPassword;
});

describe('GenerateLink', () => {
  it('should return host to reset password', () => {
    const token = 'token';

    const res = generateLink(token, EmailTypes.RESET_PASSWORD);

    expect(res).toEqual(hostResetPassword + token);
  });

  it('should return host to confirm email', () => {
    const token = 'token';

    const res = generateLink(token, EmailTypes.CONFIRM_ACCOUNT);

    expect(res).toEqual(hostConfirmEmail + token);
  });
});
