import { Document } from 'mongoose';
import { IBaseEntity } from '@shared/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ICredential } from '../interfaces/entities/credential-entity.interface';
import { validateEmail } from '@user/validations/email/email.validator';
import { validatePassword } from '@user/validations/password/password.validator';
import * as bcrypt from 'bcryptjs';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class Credential extends Document implements IBaseEntity, ICredential {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true, validate: validateEmail })
  email: string;

  @Prop({ required: true, validate: validatePassword })
  password: string;

  @Prop({ required: true, default: false })
  confirmed: boolean;

  @Prop({ required: true, default: false })
  blocked: boolean;

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);

CredentialSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});

CredentialSchema.pre<ICredential & Document>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

CredentialSchema.statics.comparePassword = async (
  candidatePassword: string,
  currentPassword: string,
) => {
  return await bcrypt.compare(candidatePassword, currentPassword);
};
