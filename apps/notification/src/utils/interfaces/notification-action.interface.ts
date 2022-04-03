import { IGetEmailTemplate } from './get-email-template.interface';

export interface INotificationActions {
  getEmailTemplate?: (data: any) => IGetEmailTemplate;
  getPushNotificationPayload?: (data: any) => any;
}
