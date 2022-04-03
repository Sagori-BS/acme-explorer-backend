import { NotificationEvents } from '@shared/events/notification/notification.events';
import {
  ConfirmUserAccountPayload,
  InitialSetupPayload,
  ResetUserPasswordPayload,
  WelcomeUserPayload,
} from '@shared/events/notification/notification.payload';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { LoggerService } from '@shared/logger/logger.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly loggerService: LoggerService,
  ) {}

  @MessagePattern({ type: NotificationEvents.ConfirmUserAccount })
  public async confirmEmail(
    confirmUserAccountPayload: ConfirmUserAccountPayload,
  ): Promise<any> {
    this.loggerService.log(
      `Received this confirm payload with that email ${JSON.stringify(
        confirmUserAccountPayload.email,
      )}`,
    );
    return await this.notificationService.confirmEmail(
      confirmUserAccountPayload,
    );
  }

  @MessagePattern({ type: NotificationEvents.InitialSetup })
  public async initialSetup(
    initialSetupPayload: InitialSetupPayload,
  ): Promise<any> {
    this.loggerService.log(
      `Received this initial setup with that email ${JSON.stringify(
        initialSetupPayload.email,
      )}`,
    );
    return await this.notificationService.initialSetup(initialSetupPayload);
  }

  @MessagePattern({ type: NotificationEvents.ResetUserPassword })
  public async resetPassword(
    resetUserPasswordPayload: ResetUserPasswordPayload,
  ): Promise<any> {
    this.loggerService.log(
      `Received this reset payload with that email ${JSON.stringify(
        resetUserPasswordPayload.email,
      )}`,
    );
    return await this.notificationService.resetPassword(
      resetUserPasswordPayload,
    );
  }

  @MessagePattern({ type: NotificationEvents.WelcomeMessage })
  public async welcomeMessage(
    welcomeUserPayload: WelcomeUserPayload,
  ): Promise<any> {
    this.loggerService.log(
      `Received this welcome payload ${JSON.stringify(welcomeUserPayload)}`,
    );
    return await this.notificationService.welcomeMessage(welcomeUserPayload);
  }
}
