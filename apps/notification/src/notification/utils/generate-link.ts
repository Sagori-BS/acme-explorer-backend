import { EmailTypes } from '@shared/data/enums/email-types.enum';

export const generateLink = (token: string, type: EmailTypes): string => {
  switch (type) {
    case EmailTypes.RESET_PASSWORD:
      return `${process.env.HOST_RESET_PASSWORD}${token}`;
    case EmailTypes.CONFIRM_ACCOUNT:
      return `${process.env.HOST_CONFIRM_EMAIL}${token}`;
    default:
      return '';
  }
};
