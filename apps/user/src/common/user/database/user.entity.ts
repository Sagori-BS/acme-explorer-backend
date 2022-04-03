import { Document } from 'mongoose';
import { IBaseEntity } from '@shared/data/interfaces/base-entity.interface';
import { IUser } from '../interfaces/entities/user-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AuthProviders, AuthType } from '../../auth/utils/auth-providers.enum';
import { validateName } from '@shared/validations/common/strings/name/name.validator';
import { validateEmail } from '@user/validations/email/email.validator';
import { validateNullableUrl } from '@shared/validations/common/internet/url/url-nullable.validator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class User extends Document implements IBaseEntity, IUser {
  @Prop()
  id: string;

  @Prop({ validate: validateNullableUrl, default: null })
  profilePicture: string;

  @Prop({ required: true, validate: validateName })
  name: string;

  @Prop({
    required: true,
    type: String,
    default: UserRoles.CLIENT,
    enum: Object.values(UserRoles),
  })
  role: UserRoles;

  @Prop({
    required: true,
    unique: true,
    validate: validateEmail,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(AuthProviders),
  })
  socialProvider: AuthProviders;

  @Prop({ required: true, type: String, enum: Object.values(AuthType) })
  authType: AuthType;

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
  this.id = this._id;

  next();
});
