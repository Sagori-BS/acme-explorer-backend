import { EntityRepositoryType } from '@shared/test/types/entity-repository.type';

export const entityRepository: EntityRepositoryType = {
  getOneEntity: jest.fn(),
  getAllEntities: jest.fn(),
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn(),
};
