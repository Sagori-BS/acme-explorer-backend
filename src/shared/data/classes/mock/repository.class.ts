import { EntityRepositoryType } from '@common/common/test/types/entity-repository.type';

export const entityRepository: EntityRepositoryType = {
  getOneEntity: jest.fn(),
  getAllEntities: jest.fn(),
  listEntities: jest.fn(),
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn()
};
