import { Document } from 'mongoose';
import { IBaseEntity } from '@common/common/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { validateName } from '@common/common/validations/common/strings/name/name.validator';
import { IApplication } from '../interfaces/entities/application.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class Application extends Document implements IBaseEntity, IApplication {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateName })
  brand: string;

  @Prop({ required: true, validate: validateName })
  carModel: string;

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
