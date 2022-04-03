import { Types } from 'mongoose';
import { EntityNotFoundError } from '../errors/common/entity-not-found.error';
import { FilterInput } from '../../../apps/user/src/graphql/inputs/graphql-filter.input';
import { createDocument } from './create-document';

export class CommonRepositoryTests {
  private readonly entityRepository;
  private readonly createEntityInput;
  public readonly createDocument;
  private readonly fieldsToBeTranslated;

  constructor(
    _entityRepository,
    _entityModel,
    _createEntityInput,
    _createDocument?,
  ) {
    this.entityRepository = _entityRepository;
    this.createEntityInput = _createEntityInput;

    this.createDocument =
      _createDocument ||
      createDocument(_entityModel, _entityRepository, _createEntityInput);
  }

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
    entity: any,
  ) {
    //Act
    const result = await this.entityRepository.getOneEntity(getOneEntityInput);

    //Assert
    expect(result.toObject()).toEqual(entity.toObject());
  }

  public async getOneEntityById() {
    //Arrange
    const entity = await this.createDocument();

    //Act
    const result = await this.entityRepository.getOneEntity({
      id: entity.id,
    });

    //Assert
    expect(result.toObject()).toEqual(entity.toObject());
  }

  public async getOneEntityError(
    getOneEntityInput: Record<string, any> = {
      id: new Types.ObjectId().toHexString(),
    },
  ) {
    //Act
    const result = this.entityRepository.getOneEntity(getOneEntityInput);

    //Assert
    await expect(result).rejects.toThrow(EntityNotFoundError);
  }

  public async getAllEntities(filterInput: FilterInput = {}) {
    //Arrange
    const entity = await this.createDocument();

    //Act
    const result = await this.entityRepository.getAllEntities(filterInput);

    //Assert
    expect(result.length).toEqual(1);
    expect(result[0].toObject()).toEqual(entity.toObject());
  }

  public async getAllEntitiesError() {
    //Act
    const result = await this.entityRepository.getAllEntities({});

    //Assert
    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  }

  public async createEntity() {
    //Act
    const result = await this.entityRepository.createEntity(
      this.createEntityInput,
    );

    //Assert
    expect(result.toObject()).toMatchObject(this.createEntityInput);
  }

  public async createEntityFromPayload() {
    //Act
    const result = await this.entityRepository.createEntity(
      this.createEntityInput,
    );

    const expectedValue: any = { ...result.toObject() };
    delete expectedValue._id;
    delete expectedValue.createdAt;
    delete expectedValue.deleted;
    delete expectedValue.updatedAt;
    delete expectedValue.version;

    //Assert
    expect(this.createEntityInput).toMatchObject(expectedValue);
  }

  public async updateEntity(data) {
    //Arrange
    const entity = await this.createDocument();

    const updateEntityInput = {
      where: { id: entity.id },
      data,
    };

    //Act
    const result = await this.entityRepository.updateEntity(updateEntityInput);

    //Assert
    expect(entity.toObject()).not.toMatchObject(data);
    expect(result.toObject()).toMatchObject(data);
  }

  public async updateEntityFromPayload(data) {
    //Arrange
    const entity = await this.createDocument();

    const updateEntityInput = {
      where: { id: entity.id, version: entity.version },
      data,
    };

    //Act
    const result = await this.entityRepository.updateEntity(updateEntityInput);

    const expectedValue: any = { ...result.toObject() };
    delete expectedValue.id;
    delete expectedValue._id;
    delete expectedValue.createdAt;
    delete expectedValue.deleted;
    delete expectedValue.updatedAt;
    delete expectedValue.version;

    //Assert
    expect(entity.toObject()).not.toMatchObject(data);
    expect(data).toMatchObject(expectedValue);
  }

  public async updateEntityError(input) {
    //Arrange
    const id = new Types.ObjectId().toHexString();
    const updateEntityInput = {
      where: { id },
      data: input,
    };

    //Act
    const result = this.entityRepository.updateEntity(updateEntityInput);

    //Assert
    await expect(result).rejects.toThrow(EntityNotFoundError);
  }

  public async updateEntityVersionError(data) {
    //Arrange
    const entity = await this.createDocument();

    const updateEntityInput = {
      where: { id: entity.id, version: 2 },
      data,
    };

    //Act
    const result = this.entityRepository.updateEntity(updateEntityInput);

    //Assert
    await expect(result).rejects.toThrow(EntityNotFoundError);
  }

  public async deleteEntity(addVersion = false) {
    //Arrange
    const entity = await this.createDocument();
    const input: any = {
      id: entity.id,
    };

    if (addVersion) input.version = entity.version;

    //Act
    const result = await this.entityRepository.deleteEntity(input);

    //Assert
    expect(result.deleted).toBe(true);
  }

  public async deleteEntityError() {
    //Arrange
    const id = new Types.ObjectId().toHexString();

    //Act
    const result = this.entityRepository.deleteEntity({ id });

    //Assert
    await expect(result).rejects.toThrow(EntityNotFoundError);
  }

  public async deleteEntityVersionError() {
    //Arrange
    const entity = await this.createDocument();

    //Act
    const result = this.entityRepository.deleteEntity({
      id: entity.id,
      version: 2,
    });

    //Assert
    await expect(result).rejects.toThrow(EntityNotFoundError);
  }
}
