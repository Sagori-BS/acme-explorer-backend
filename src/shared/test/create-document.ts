import { validateAndGenerateSlug } from '../functions/validate-and-generate-slug';

export const createDocument = (
  entityModel,
  entityRepository,
  createEntityInput
) => async () => {
  const slug = validateAndGenerateSlug(
    entityModel,
    entityRepository.slugConfig,
    createEntityInput
  );

  const entity = new entityModel({
    ...createEntityInput,
    slug,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  });

  await entity.save();

  let query = entityModel.findById(entity.id);

  if ((entityModel as any).buildProjection) {
    query = (entityModel as any).buildProjection(query);
  }

  return await query;
};
