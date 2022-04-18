import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { IApplicationServiceType } from './interfaces/types/common-type.interface';

@Injectable()
export class ApplicationService extends Service<IApplicationServiceType> {
  constructor(private readonly applicationRepository: ApplicationRepository) {
    super(applicationRepository);
  }
}
