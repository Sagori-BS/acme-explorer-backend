import { EmailType } from '../../notification/enums/email-events.enum';

export class SendEmailOptionsDto {
  options: {
    html: string;
    from: string;
    to: string[];
    replyTo?: string;
    subject: string;
  };

  type: EmailType;
}
