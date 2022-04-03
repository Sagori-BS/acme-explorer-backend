import { FilterInput } from '@user/graphql/inputs/graphql-filter.input';
import { Injectable } from '@nestjs/common';
import { BaseServiceType } from '../interfaces/base-service-type.interface';

@Injectable()
export abstract class Service<T extends BaseServiceType> {
  constructor(private readonly entityRepository: T['entityRepository']) {}

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<T['entity']> {
    getOneEntityInput = { ...getOneEntityInput, deleted: false };
    return this.entityRepository.getOneEntity(getOneEntityInput);
  }

  public async getAllEntities(
    filterInput: FilterInput,
  ): Promise<T['entity'][]> {
    return this.entityRepository.getAllEntities(filterInput);
  }

  public async getEntities(filterInput: FilterInput): Promise<T['entity'][]> {
    filterInput.where = { ...filterInput.where, deleted: false };

    return this.entityRepository.getAllEntities(filterInput);
  }

  public async createEntity(
    createEntityInput: T['createEntityInput'],
  ): Promise<T['entity']> {
    return this.entityRepository.createEntity(createEntityInput);
  }

  public async updateEntity(
    updateEntityInput: T['updateEntityInput'],
  ): Promise<T['entity']> {
    updateEntityInput.where = { ...updateEntityInput.where, deleted: false };

    this.verifyVersionProperty(updateEntityInput.where);

    return this.entityRepository.updateEntity(updateEntityInput);
  }

  public async deleteEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<T['entity']> {
    getOneEntityInput = { ...getOneEntityInput, deleted: false };

    this.verifyVersionProperty(getOneEntityInput);

    return this.entityRepository.deleteEntity(getOneEntityInput);
  }

  // Extra
  protected verifyVersionProperty(input: Record<string, any>) {
    if (input.version) {
      input.version -= 1;
    }
  }
}
