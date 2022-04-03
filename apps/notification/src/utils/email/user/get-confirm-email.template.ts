import { EmailTypes } from '@shared/data/enums/email-types.enum';
import { ConfirmUserAccountPayload } from '@shared/events/notification/notification.payload';
import { generateLink } from 'apps/notification/src/notification/utils/generate-link';
import { IGetEmailTemplate } from '../../interfaces/get-email-template.interface';
import { verifyEmailTemplate } from '../../templates/verify-email.template';

export const getConfirmEmailTemplate = (
  confirmUserAccountPayload: ConfirmUserAccountPayload,
): IGetEmailTemplate => {
  confirmUserAccountPayload.url = generateLink(
    confirmUserAccountPayload.url,
    EmailTypes.CONFIRM_ACCOUNT,
  );

  const emailTitle = `NFTS Confirm your email!!`;
  const emailTemplate = verifyEmailTemplate(confirmUserAccountPayload);

  return {
    emailTitle,
    emailTemplate,
  };
};
