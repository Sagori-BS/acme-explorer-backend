import { Document, Schema as MongooseSchema } from 'mongoose';
import { IBaseEntity } from '@shared/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IApplication } from '../interfaces/entities/application.interface';
import { validateId } from '@shared/validations/common/identification/mongo-id/id.validator';
import { User } from '@trips/common/user/database/user.entity';
import { ApplicationState } from '../graphql/enums/application-states.enum';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class Application extends Document implements IBaseEntity, IApplication {
  @Prop()
  id: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    validate: validateId,
    ref: 'User'
  })
  explorer: User;

  @Prop({
    default: [],
    type: [String]
  })
  comments: string[];

  @Prop({
    type: String,
    default: ApplicationState.PENDING,
    enum: Object.values(ApplicationState)
  })
  state: ApplicationState;

  @Prop({
    default: null
  })
  reasonRejected?: string;

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

ApplicationSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
