import { generateSlug } from '@common/common/functions/generate-slug';
import * as faker from 'faker';
import { Model, Types } from 'mongoose';

export const createBaseEntityWithIdSetup = async (
  entityModel: Model<any>,
  name = faker.lorem.word()
) => {
  const entity = new entityModel({
    id: new Types.ObjectId().toString(),
    name,
    slug: generateSlug([name]),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return entity.save();
};
