import { Service } from '@shared/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { IApplicationServiceType } from './interfaces/types/common-type.interface';
import { Application } from './database/application.entity';
import { TripService } from '../trip/trip.service';
import { CreateCustomApplicationInput } from './graphql/inputs/create-custom-application.input';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { UpdateCustomApplicationInput } from './graphql/inputs/update-custom-application.input';
import { ListApplications } from './graphql/types/list-applications.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';

@Injectable()
export class ApplicationService extends Service<IApplicationServiceType> {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly tripService: TripService
  ) {
    super(applicationRepository);
  }

  public async listEntities(
    filterInput: FilterInput,
    jwtPayload?: JwtPayload
  ): Promise<ListApplications> {
    if (jwtPayload) {
      const { id, role } = jwtPayload;
      if (role === UserRoles.EXPLORER) {
        filterInput.where = {
          ...filterInput.where,
          explorer: id
        };
      } else {
        filterInput.where = {
          ...filterInput.where,
          manager: id
        };
      }
    }
    return this.applicationRepository.listEntities(filterInput);
  }

  public async createEntity(
    createCustomApplicationInput: CreateCustomApplicationInput
  ): Promise<Application> {
    if (!createCustomApplicationInput.manager) {
      const trip = await this.tripService.getOneEntity({
        id: createCustomApplicationInput.trip
      });

      createCustomApplicationInput.manager = trip.manager.id;
    }

    return this.applicationRepository.createEntity(
      createCustomApplicationInput
    );
  }

  public async updateSelfApplication(
    jwtPayload: JwtPayload,
    updateCustomApplicationInput: UpdateCustomApplicationInput
  ): Promise<Application> {
    const { id } = updateCustomApplicationInput.where;

    await this.applicationRepository.getOneEntity({
      explorer: jwtPayload.id,
      id
    });

    return this.applicationRepository.updateEntity(
      updateCustomApplicationInput
    );
  }

  public async acceptOrRejectApplication(
    jwtPayload: JwtPayload,
    updateCustomApplicationInput: UpdateCustomApplicationInput
  ): Promise<Application> {
    const { id } = updateCustomApplicationInput.where;

    await this.applicationRepository.getOneEntity({
      manager: jwtPayload.id,
      id
    });

    return this.applicationRepository.updateEntity(
      updateCustomApplicationInput
    );
  }
}
