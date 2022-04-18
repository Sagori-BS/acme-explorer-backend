import { Repository } from '@common/common/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from './database/application.entity';
import { IApplicationRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class ApplicationRepository extends Repository<
  IApplicationRepositoryType
> {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>
  ) {
    super(applicationModel, Application.name);
  }
}
