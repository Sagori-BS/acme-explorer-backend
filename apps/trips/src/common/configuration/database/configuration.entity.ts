import { Document } from 'mongoose';
import { IBaseEntity } from '@shared/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { validatePositiveNumber } from '@shared/validations/data-types/number/number.validator';
import { IConfiguration } from '../interfaces/entities/configuration.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class Configuration extends Document
  implements IBaseEntity, IConfiguration {
  @Prop()
  id: string;

  @Prop({
    required: true,
    validate: validatePositiveNumber
  })
  flatRate: number;

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);

ConfigurationSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
