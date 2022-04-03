import { Environment } from '@shared/data/enums/environment.enum';

export const nodemailerConfig = (): any => {
  if (process.env.MAIL_ENVIRONMENT === Environment.DEVELOPMENT) {
    //Mailtrap Config
    return {
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    };
  }

  //Sendgrid config
  return {
    service: 'Sendgrid',
    auth: {
      user: process.env.SENGRID_USER,
      pass: process.env.SENGRID_API_KEY,
    },
  };
};
