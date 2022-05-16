import { JwtPayload } from '@common/common/auth/interfaces/jwt-payload.interface';
import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { FavoriteList } from './database/favorite-list.entity';
import { FavoriteListRepository } from './favorite-list.repository';
import { AddFavoriteTripInput } from './graphql/inputs/add-favorite-trip.input';
import { CreateFavoriteListInput } from './graphql/inputs/create-favorite-list.input';
import { RemoveFavoriteTripInput } from './graphql/inputs/remove-favorite-trip.input';
import { UpdateFavoriteListInput } from './graphql/inputs/update-favorite-list.input';
import { IFavoriteListServiceType } from './interfaces/types/common-type.interface';

@Injectable()
export class FavoriteListService extends Service<IFavoriteListServiceType> {
  constructor(private readonly favoriteListRepository: FavoriteListRepository) {
    super(favoriteListRepository);
  }

  public async createFavoriteList(
    jwtPayload: JwtPayload,
    createFavoriteListInput: CreateFavoriteListInput
  ): Promise<FavoriteList> {
    createFavoriteListInput.user = jwtPayload.id;
    return this.createEntity(createFavoriteListInput);
  }

  public async renameFavoriteList(
    jwtPayload: JwtPayload,
    updateFavoriteListInput: UpdateFavoriteListInput
  ): Promise<FavoriteList> {
    const { where, data } = updateFavoriteListInput;

    const favoriteTrip = await this.getOneEntity({
      user: jwtPayload.id,
      id: where.id
    });

    return this.updateEntity({
      where: { id: favoriteTrip.id },
      data
    });
  }

  public async addFavoriteTrip(
    jwtPayload: JwtPayload,
    addFavoriteTrip: AddFavoriteTripInput
  ): Promise<FavoriteList> {
    const favoriteTrip = await this.getOneEntity({
      user: jwtPayload.id,
      id: addFavoriteTrip.id
    });

    const trips = new Set(favoriteTrip.trips.map(trip => trip.id.toString()));
    trips.add(addFavoriteTrip.trip);

    return this.updateEntity({
      where: { id: favoriteTrip.id },
      data: { trips: Array.from(trips) }
    });
  }

  public async removeFavoriteTrip(
    jwtPayload: JwtPayload,
    removeFavoriteTripInput: RemoveFavoriteTripInput
  ): Promise<FavoriteList> {
    const favoriteTrip = await this.getOneEntity({
      user: jwtPayload.id,
      id: removeFavoriteTripInput.id
    });

    const trips = favoriteTrip.trips.filter(
      trip => trip.id.toString() !== removeFavoriteTripInput.trip
    );

    return this.updateEntity({
      where: { id: favoriteTrip.id },
      data: { trips }
    });
  }

  public async deleteFavoriteList(
    jwtPayload: JwtPayload,
    id: string
  ): Promise<FavoriteList> {
    const favoriteTrip = await this.getOneEntity({
      user: jwtPayload.id,
      id
    });

    await this.favoriteListRepository.deleteFavoriteList({ id });

    return favoriteTrip;
  }
}
