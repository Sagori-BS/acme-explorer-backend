import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IAuthToken } from '../interfaces/entities/auth-token-entity.interface';
import { validateToken } from '@user/validations/token/token.validator';
import { validateEmail } from '@user/validations/email/email.validator';
import { AuthTokenTypes } from '@user/graphql/enums/auth-token-types.enum';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class AuthToken extends Document implements IAuthToken {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateEmail })
  email: string;

  @Prop()
  origin: string;

  @Prop({ required: true, unique: true, validate: validateToken })
  token: string;

  @Prop({ required: true, default: false })
  completed: boolean;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(AuthTokenTypes),
  })
  type: AuthTokenTypes;

  version: number;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);

AuthTokenSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
