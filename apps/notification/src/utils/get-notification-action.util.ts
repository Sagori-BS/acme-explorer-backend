import { EmailNotSentError } from '@shared/errors/notification/email-not-sent.error';
import { EmailType } from '../notification/enums/email-events.enum';
import { getConfirmEmailTemplate } from './email/user/get-confirm-email.template';
import { getResetUserPasswordTemplate } from './email/user/get-reset-user-password.template';
import { getWelcomeNFTSMarketTemplate } from './email/user/get-welcome-nfts.template';
import { IGetEmailTemplate } from './interfaces/get-email-template.interface';
import { INotificationActions } from './interfaces/notification-action.interface';

const notificationActions: Record<EmailType, INotificationActions> = {
  WELCOME_MESSAGE: {
    getEmailTemplate: getWelcomeNFTSMarketTemplate,
  },
  CONFIRM_EMAIL: {
    getEmailTemplate: getConfirmEmailTemplate,
  },
  RESET_USER_PASSWORD: {
    getEmailTemplate: getResetUserPasswordTemplate,
  },
};

export const getEmailBody = (
  emailType: EmailType,
  data: any,
): IGetEmailTemplate => {
  const { getEmailTemplate } = notificationActions[emailType];

  if (!getEmailTemplate) {
    throw new EmailNotSentError();
  }

  return getEmailTemplate(data);
};
