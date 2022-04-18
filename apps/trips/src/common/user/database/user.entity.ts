import { IBaseEntity } from '@common/common/data/interfaces/base-entity.interface';
import { validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { validateNullableUrl } from '@common/common/validations/common/internet/url/url-nullable.validator';
import { validateName } from '@common/common/validations/common/strings/name/name.validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { validateEmail } from '@shared/validations/entities/user/email/email.validator';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/entities/user-entity.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class User extends Document implements IUser, IBaseEntity {
  @Prop({ required: true, validate: validateId })
  id: string;

  @Prop({ required: true, validate: validateName })
  name: string;

  @Prop({ required: true, validate: validateName })
  lastName: string;

  @Prop({ required: true, validate: validateEmail, unique: true })
  email: string;

  @Prop({ validate: validateNullableUrl, default: null })
  profilePicture: string;

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function(next) {
  this._id = this.id;

  next();
});
