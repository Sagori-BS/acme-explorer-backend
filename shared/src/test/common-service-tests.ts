import { Types } from 'mongoose';
import { FilterInput } from '../../../apps/user/src/graphql/inputs/graphql-filter.input';
import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';

export class CommonServiceTests {
  public readonly entityService;
  public readonly entityRepository;

  constructor(_entityService, _entityRepository) {
    this.entityService = _entityService;
    this.entityRepository = _entityRepository;
  }

  public async getOneEntity() {
    const id = new Types.ObjectId().toHexString();

    await this.entityService.getOneEntity({ id });

    expect(this.entityRepository.getOneEntity).toHaveBeenCalled();
    expect(this.entityRepository.getOneEntity).toHaveBeenCalledWith({
      id,
      deleted: false,
    });
  }

  public async getAllEntities(filterInput: FilterInput = {}) {
    await this.entityService.getAllEntities(filterInput);

    expect(this.entityRepository.getAllEntities).toHaveBeenCalled();
  }

  public async getEntities(filterInput: FilterInput = {}) {
    await this.entityService.getEntities(filterInput);

    expect(this.entityRepository.getAllEntities).toHaveBeenCalled();
  }

  public async createEntity(input) {
    await this.entityService.createEntity(input);

    expect(this.entityRepository.createEntity).toHaveBeenCalled();
    expect(this.entityRepository.createEntity).toHaveBeenCalledWith(input);
  }

  public async updateEntity(payload) {
    //Arrange
    const id = new Types.ObjectId().toHexString();
    const updateEntityInput = {
      where: { id },
      data: payload,
    };

    const expectedUpdateEntityInput = {
      where: { id, deleted: false },
      data: payload,
    };

    //Act
    await this.entityService.updateEntity(updateEntityInput);

    //Assert
    expect(this.entityRepository.updateEntity).toHaveBeenCalled();
    expect(this.entityRepository.updateEntity).toHaveBeenCalledWith(
      expectedUpdateEntityInput,
    );
  }

  public async deleteEntity() {
    const id = new Types.ObjectId().toHexString();

    await this.entityService.deleteEntity({
      id,
    });

    expect(this.entityRepository.deleteEntity).toHaveBeenCalled();
    expect(this.entityRepository.deleteEntity).toHaveBeenCalledWith({
      deleted: false,
      id,
    });
  }

  public async addEntityTranslationTestGetOneEntityCall(input: IUpdateEntity) {
    //Arrange
    (this.entityRepository.getOneEntity as jest.Mock).mockReturnValueOnce({});

    //Act
    await this.entityService.addEntityTranslation(input);

    //Assert
    expect(this.entityRepository.getOneEntity).toHaveBeenCalled();
    expect(this.entityRepository.getOneEntity).toHaveBeenCalledWith(
      input.where,
    );
  }

  public async addEntityTranslationTestUpdateEntityCall(
    input: IUpdateEntity,
    entityMock,
  ) {
    //Arrange
    (this.entityRepository.getOneEntity as jest.Mock).mockReturnValueOnce(
      entityMock,
    );

    const expectedValue = {
      where: {
        ...input.where,
        deleted: false,
      },
      data: {},
    };

    for (const key in entityMock) {
      expectedValue.data[key] = {
        ...expectedValue.data[key],
        ...entityMock[key],
      };
    }

    for (const key in input.data) {
      expectedValue.data[key] = {
        ...expectedValue.data[key],
        ...input.data[key],
      };
    }

    //Act
    await this.entityService.addEntityTranslation(input);

    //Assert
    expect(this.entityRepository.updateEntity).toHaveBeenCalled();
    expect(this.entityRepository.updateEntity).toHaveBeenCalledWith(
      expectedValue,
    );
  }
}
