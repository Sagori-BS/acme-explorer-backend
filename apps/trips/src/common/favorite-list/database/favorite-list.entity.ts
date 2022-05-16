import { Document, Query, Schema as MongooseSchema } from 'mongoose';
import { IBaseEntity } from '@common/common/data/interfaces/base-entity.interface';
import { validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { validateIds } from '@common/common/validations/common/identification/mongo-ids/ids.validator';
import { Trip } from '@trips/common/trip/database/trip.entity';
import { validateName } from '@shared/validations/common/strings/name/name.validator';
import { IFavoriteList } from '../interfaces/entities/favorite-list.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class FavoriteList extends Document
  implements IFavoriteList, IBaseEntity {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateName })
  name: string;

  @Prop({ required: true, validate: validateId })
  user: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId }],
    ref: 'Trip',
    validate: validateIds,
    default: []
  })
  trips: Trip[];

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const FavoriteListSchema = SchemaFactory.createForClass(FavoriteList);

FavoriteListSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});

FavoriteListSchema.statics.buildProjection = (
  query: Query<any, any, any, any>
) => {
  query.populate([
    {
      path: 'trips',
      model: Trip.name
    }
  ]);

  return query;
};
