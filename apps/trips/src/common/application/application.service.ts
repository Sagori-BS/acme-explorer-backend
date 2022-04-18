import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { IDataStoreServiceType } from './interfaces/types/common-type.interface';

@Injectable()
export class ApplicationService extends Service<IDataStoreServiceType> {
  constructor(private readonly applicationRepository: ApplicationRepository) {
    super(applicationRepository);
  }
}
