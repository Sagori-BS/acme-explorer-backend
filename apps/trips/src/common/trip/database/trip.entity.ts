import { Document, Schema as MongooseSchema } from 'mongoose';
import { IBaseEntity } from '@shared/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ITrip } from '../interfaces/entities/trip';
import { validateId } from '@shared/validations/common/identification/mongo-id/id.validator';
import { User } from '@trips/common/user/database/user.entity';
import { TripState } from '../graphql/enums/trip-states.enum';
import { validateTitle } from '@shared/validations/common/strings/title/title.validator';
import { validatePositiveNumber } from '@shared/validations/data-types/number/number.validator';
import { validateIsoDate } from '@shared/validations/common/iso-date/iso-date.validator';
import { IStage } from '../interfaces/entities/stage';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class Trip extends Document implements IBaseEntity, ITrip {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateTitle })
  title: string;

  @Prop({ required: true, validate: validateTitle })
  ticker: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, validate: validatePositiveNumber })
  price: number;

  @Prop({ required: true, validateIsoDate })
  startDate: string;

  @Prop({ required: true, validateIsoDate })
  endDate: string;

  @Prop({
    default: null
  })
  reasonCancelled?: string;

  @Prop({
    type: [
      {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          min: 0,
          required: true
        }
      }
    ],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one stage is required'
    }
  })
  stages: IStage[];

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    validate: validateId,
    ref: 'User'
  })
  manager: User;

  @Prop({
    default: [],
    type: [String]
  })
  requirements: string[];

  @Prop({
    default: [],
    type: [String]
  })
  pictures: string[];

  @Prop({
    type: String,
    default: TripState.INACTIVE,
    enum: Object.values(TripState)
  })
  state: TripState;

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);

TripSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
