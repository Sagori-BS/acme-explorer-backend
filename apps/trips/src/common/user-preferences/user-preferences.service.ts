import { JwtPayload } from '@common/common/auth/interfaces/jwt-payload.interface';
import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { UserPreferences } from './database/user-preferences.entity';
import { UpdateUserPreferencesPayload } from './graphql/inputs/update-user-preferences.payload';
import { IUserPreferencesServiceType } from './interfaces/types/common-type.interface';
import { UserPreferencesRepository } from './user-preferences.repository';

@Injectable()
export class UserPreferencesService extends Service<
  IUserPreferencesServiceType
> {
  constructor(
    private readonly userPreferencesRepository: UserPreferencesRepository
  ) {
    super(userPreferencesRepository);
  }

  public async getOneEntity(
    getOneEntityInput: Record<string, any>
  ): Promise<UserPreferences> {
    getOneEntityInput = { ...getOneEntityInput, deleted: false };
    try {
      const userPreferences = await this.userPreferencesRepository.getOneEntity(
        getOneEntityInput
      );

      return userPreferences;
    } catch (e) {
      return await this.createEntity({
        user: getOneEntityInput.user
      });
    }
  }

  public async updateSelfUserPreferences(
    jwtPayload: JwtPayload,
    updateUserPreferencesPayload: UpdateUserPreferencesPayload
  ) {
    const updateUserPreferencesDto = {
      where: { user: jwtPayload.id },
      data: updateUserPreferencesPayload
    };

    return this.updateEntity(updateUserPreferencesDto);
  }

  public async addFavoriteTrip(
    jwtPayload: JwtPayload,
    id: string
  ): Promise<UserPreferences> {
    try {
      const userPreferences = await this.getOneEntity({
        user: jwtPayload.id
      });

      const trips = new Set(userPreferences.trips.map(trip => trip.toString()));
      trips.add(id);

      return this.updateEntity({
        where: { id: userPreferences.id },
        data: { trips: Array.from(trips) }
      });
    } catch (e) {
      return await this.createEntity({
        user: jwtPayload.id,
        trips: [id]
      });
    }
  }

  public async removeFavoriteTrip(
    jwtPayload: JwtPayload,
    id: string
  ): Promise<UserPreferences> {
    const userPreferences = await this.getOneEntity({
      user: jwtPayload.id
    });

    const trips = userPreferences.trips.filter(trip => trip.toString() !== id);

    return this.updateEntity({
      where: { id: userPreferences.id },
      data: { trips }
    });
  }

  public async clearAllFavoriteTrips(
    jwtPayload: JwtPayload
  ): Promise<UserPreferences> {
    const userPreferences = await this.getOneEntity({
      user: jwtPayload.id
    });

    return this.updateEntity({
      where: { id: userPreferences.id },
      data: { trips: [] }
    });
  }
}
