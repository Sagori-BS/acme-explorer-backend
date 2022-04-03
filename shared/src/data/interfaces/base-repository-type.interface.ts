import { Document, Model } from 'mongoose';
import { GetEntityByIdInput } from '../classes/get-entity-by-id.class';
import { BaseModel } from './base-model.interface';

export interface BaseRepositoryType<T extends Document = any> {
  entity: T;
  entityModel: Model<T> & BaseModel<T>;
  createEntityInput: any;
  updateEntityInput: any;
  deleteEntityInput: any | GetEntityByIdInput;
}
