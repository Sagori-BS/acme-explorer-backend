import { nodemailerConfig } from 'apps/notification/src/config/nodemailer-transport-options.config';
import { LoggerService } from '@shared/logger/logger.service';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { SendEmailOptionsDto } from './dtos/send-email-options.dto';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private readonly logger: LoggerService) {
    this.transporter = nodemailer.createTransport(nodemailerConfig());
  }

  public async sendEmail(
    sendEmailOptionsDto: SendEmailOptionsDto,
  ): Promise<boolean> {
    try {
      this.logger.log(`Sending ${sendEmailOptionsDto.type} email`);

      await this.transporter.sendMail(sendEmailOptionsDto.options);

      return true;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);

      throw error;
    }
  }
}
