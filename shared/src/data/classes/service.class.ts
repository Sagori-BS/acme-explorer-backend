import { Injectable } from '@nestjs/common';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { BaseServiceType } from '../interfaces/base-service-type.interface';

export interface IBaseService {
  getOneEntity(getOneEntityInput: Record<string, any>): Promise<any>;
  getEntities(filterInput: FilterInput): Promise<any>;
  getAllEntities(filterInput: FilterInput): Promise<any>;
  createEntity(createEntityInput: Record<string, any>): Promise<any>;
  updateEntity(updateEntityInput: Record<string, any>): Promise<any>;
  deleteEntity(getOneEntityInput: Record<string, any>): Promise<any>;
}

@Injectable()
export abstract class Service<T extends BaseServiceType>
  implements IBaseService {
  constructor(private readonly entityRepository: T['entityRepository']) {}

  public async getOneEntity(
    getOneEntityInput: Record<string, any>
  ): Promise<T['entity']> {
    getOneEntityInput = { ...getOneEntityInput, deleted: false };
    return this.entityRepository.getOneEntity(getOneEntityInput);
  }

  public async getAllEntities(
    filterInput: FilterInput
  ): Promise<T['entity'][]> {
    return this.entityRepository.getAllEntities(filterInput);
  }

  public async getEntities(filterInput: FilterInput): Promise<T['entity'][]> {
    filterInput.where = { ...filterInput.where, deleted: false };

    return this.entityRepository.getAllEntities(filterInput);
  }

  public async listEntities(
    filterInput: FilterInput
  ): Promise<T['listEntities']> {
    return this.entityRepository.listEntities(filterInput);
  }

  public async createEntity(
    createEntityInput: T['createEntityInput']
  ): Promise<T['entity']> {
    return this.entityRepository.createEntity(createEntityInput);
  }

  public async updateEntity(
    updateEntityInput: T['updateEntityInput']
  ): Promise<T['entity']> {
    updateEntityInput.where = { ...updateEntityInput.where, deleted: false };

    this.verifyVersionProperty(updateEntityInput.where);

    return this.entityRepository.updateEntity(updateEntityInput);
  }

  public async deleteEntity(
    getOneEntityInput: Record<string, any>
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
