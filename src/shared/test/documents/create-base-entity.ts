import * as faker from 'faker';
import { Model } from 'mongoose';

export const createBaseEntitySetup = async (entityModel: Model<any>) => {
  const entity = new entityModel({
    name: faker.vehicle.type(),
    slug: faker.lorem.slug(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return entity.save();
};
