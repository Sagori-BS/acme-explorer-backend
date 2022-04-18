export type EntityRepositoryType = {
  getOneEntity: jest.Mock;
  getAllEntities: jest.Mock;
  listEntities: jest.Mock;
  createEntity: jest.Mock;
  updateEntity: jest.Mock;
  deleteEntity: jest.Mock;
};
