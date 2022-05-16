import { Repository } from '@common/common/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoriteList } from './database/favorite-list.entity';
import { IFavoriteListRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class FavoriteListRepository extends Repository<
  IFavoriteListRepositoryType
> {
  constructor(
    @InjectModel(FavoriteList.name)
    private readonly favoriteListModel: Model<FavoriteList>
  ) {
    super(favoriteListModel, FavoriteList.name);
  }

  public async deleteFavoriteList(deleteEntityInput: Record<string, any>) {
    return this.favoriteListModel.deleteOne(deleteEntityInput);
  }
}
