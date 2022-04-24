import { Document, Query, Schema as MongooseSchema } from 'mongoose';
import { IBaseEntity } from '@shared/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ISponsorship } from '../interfaces/entities/sponsorship.interface';
import { validateId } from '@shared/validations/common/identification/mongo-id/id.validator';
import { User } from '@trips/common/user/database/user.entity';
import { SponsorshipState } from '../graphql/enums/sponsorship-states.enum';
import { Trip } from '@trips/common/trip/database/trip.entity';
import { validateUrl } from '@shared/validations/common/internet/url/url.validator';
import { validateRefsPlugin } from '@shared/mongo/plugins/validate-refs-plugin';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class Sponsorship extends Document implements IBaseEntity, ISponsorship {
  @Prop()
  id: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    validate: validateId,
    ref: User.name
  })
  sponsor: User;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    validate: validateId,
    ref: Trip.name
  })
  trip: Trip;

  @Prop({
    type: String,
    default: SponsorshipState.INACTIVE,
    enum: Object.values(SponsorshipState)
  })
  state: SponsorshipState;

  @Prop({
    required: true,
    type: String,
    validate: validateUrl
  })
  banner: string;

  @Prop({
    required: true,
    type: String,
    validate: validateUrl
  })
  link: string;

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const SponsorshipSchema = SchemaFactory.createForClass(Sponsorship);

SponsorshipSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});

SponsorshipSchema.plugin(validateRefsPlugin);

SponsorshipSchema.statics.buildProjection = (
  query: Query<any, any, any, any>
) => {
  query.populate([
    {
      path: 'trip'
    },
    {
      path: 'explorer',
      model: User.name
    },
    {
      path: 'manager',
      model: User.name
    }
  ]);

  return query;
};
