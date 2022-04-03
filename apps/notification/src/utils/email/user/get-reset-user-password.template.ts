import { EmailTypes } from '@shared/data/enums/email-types.enum';
import { ResetUserPasswordPayload } from '@shared/events/notification/notification.payload';
import { generateLink } from 'apps/notification/src/notification/utils/generate-link';
import { IGetEmailTemplate } from '../../interfaces/get-email-template.interface';
import { resetPasswordTemplate } from '../../templates/reset-password.template';

export const getResetUserPasswordTemplate = (
  resetUserPasswordPayload: ResetUserPasswordPayload,
): IGetEmailTemplate => {
  resetUserPasswordPayload.url = generateLink(
    resetUserPasswordPayload.url,
    EmailTypes.RESET_PASSWORD,
  );

  const emailTitle = `NFTS reset your password!!`;
  const emailTemplate = resetPasswordTemplate(resetUserPasswordPayload);

  return {
    emailTitle,
    emailTemplate,
  };
};
