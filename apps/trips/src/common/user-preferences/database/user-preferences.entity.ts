import { Document, Query, Schema as MongooseSchema } from 'mongoose';
import { IBaseEntity } from '@common/common/data/interfaces/base-entity.interface';
import { validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUserPreferences } from '../interfaces/entities/user-preferences.interface';
import { validateIds } from '@common/common/validations/common/identification/mongo-ids/ids.validator';
import { Trip } from '@trips/common/trip/database/trip.entity';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class UserPreferences extends Document
  implements IUserPreferences, IBaseEntity {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true, validate: validateId })
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

export const UserPreferencesSchema = SchemaFactory.createForClass(
  UserPreferences
);

UserPreferencesSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});

UserPreferencesSchema.statics.buildProjection = (
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
