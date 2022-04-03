import { ResetUserPasswordPayload } from '@shared/events/notification/notification.payload';

export const resetPasswordTemplate = (
  emailOptions: ResetUserPasswordPayload,
) => {
  return `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
        style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

          <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Nuevo correo electrónico</title>
            <!--[if (mso 16)]>
                  <style type="text/css">
                  a {text-decoration: none;}
                  </style>
                  <![endif]-->
            <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
            <!--[if gte mso 9]>
              <xml>
                  <o:OfficeDocumentSettings>
                  <o:AllowPNG></o:AllowPNG>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
            <!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
            <!--<![endif]-->
          </head>

          <body
            style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
          ${emailOptions.url}
          </body>

      </html>`;
};
