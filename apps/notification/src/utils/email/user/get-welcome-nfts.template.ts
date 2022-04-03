import { WelcomeUserPayload } from '@shared/events/notification/notification.payload';
import { IGetEmailTemplate } from '../../interfaces/get-email-template.interface';
import { welcomeMessageTemplate } from '../../templates/welcome-message.template';

export const getWelcomeNFTSMarketTemplate = (
  welcomeUserPayload: WelcomeUserPayload,
): IGetEmailTemplate => {
  const { name } = welcomeUserPayload;
  const emailTitle = `Welcome to NFTS Market!! ${name}`;
  const emailTemplate = welcomeMessageTemplate(welcomeUserPayload);

  return {
    emailTitle,
    emailTemplate,
  };
};
