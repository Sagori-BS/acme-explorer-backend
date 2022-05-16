import { Document } from 'mongoose';
import { IBaseEntity } from '@shared/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { validateId } from '@shared/validations/common/identification/mongo-id/id.validator';
import { IFinder } from '../interfaces/entities/finder.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version'
})
export class Finder extends Document implements IBaseEntity, IFinder {
  @Prop()
  id: string;

  @Prop({
    required: true,
    validate: validateId
  })
  user: string;

  @Prop({ default: null })
  keyword: string;

  @Prop({ default: null })
  minDate: string;

  @Prop({ default: null })
  minPrice: number;

  @Prop({ default: null })
  maxPrice: number;

  @Prop({ default: null })
  maxDate: string;

  version: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const FinderSchema = SchemaFactory.createForClass(Finder);

FinderSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
