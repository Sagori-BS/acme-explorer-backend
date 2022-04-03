import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRefreshToken } from '../interfaces/entities/refresh-token-entity.interface';
import { Schema as MongooseSchema } from 'mongoose';
import { validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { validateIsoDate } from '@common/common/validations/common/iso/iso-date/iso-date.validator';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class RefreshToken extends Document implements IRefreshToken {
  @Prop()
  id: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    validate: validateId
  })
  user: string;

  @Prop({ required: true, default: false })
  isRevoked: boolean;

  @Prop({ required: true, validate: validateIsoDate })
  expiresIn: string;

  version: number;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

RefreshTokenSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
