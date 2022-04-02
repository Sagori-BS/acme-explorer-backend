import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '@common/common/logger/logger.service';
import {
  getEntitiesLog,
  createEntityLog,
  getOneEntityLogMessageFormatter
} from '@common/common/functions/log-message-builder';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { updateEntities } from '@common/common/functions/update-entities';
import { BaseRepositoryType } from '../interfaces/base-repository-type.interface';
import { slugConfigType } from '../types/slugConfig.type';
import { validateAndGenerateSlug } from '@common/common/functions/validate-and-generate-slug';
import { EntityNotFoundError } from '@common/common/errors/common/entity-not-found.error';
import { ClientSession, Error as MongooseErrors } from 'mongoose';
import { InvalidUserInputError } from '@common/common/errors/common/invalid-user-input.error';
import { mongooseQueryBuilder } from '@common/common/graphql/advanced-filter/mongo/mongoose-query-builder';
import { DuplicateKeyError } from '@common/common/errors/common/duplicate-key.error';
import { buildGetListingBaseEntitiesPipeline } from '@common/common/mongo/pipelines/get-listing-base-entities.pipeline';

@Injectable()
export abstract class Repository<T extends BaseRepositoryType> {
  @Inject() protected readonly _logger: LoggerService;

  constructor(
    private readonly entityModel: T['entityModel'],
    protected entityName: string,
    public readonly slugConfig: slugConfigType = {
      keys: ['name'],
      isUnique: false
    }
  ) {}

  private async _getOneEntity(
    getOneEntityInput: Record<string, any>
  ): Promise<T['entity']> {
    let query = this.entityModel.findOne(getOneEntityInput);

    const entity = await query;

    if (!entity) {
      throw new EntityNotFoundError(this.entityName);
    }

    return entity;
  }

  public async getOneEntity(
    getOneEntityInput: Record<string, any>
  ): Promise<T['entity']> {
    try {
      this._logger.log(
        getOneEntityLogMessageFormatter(this.entityName, getOneEntityInput)
      );
      return this._getOneEntity(getOneEntityInput);
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async getAllEntities(
    filterInput: FilterInput
  ): Promise<T['entity'][]> {
    try {
      this._logger.log(getEntitiesLog(this.entityName, filterInput));

      let query = this.entityModel.find();

      const result: T['entity'][] = await mongooseQueryBuilder(
        query,
        filterInput
      );

      return result;
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async listEntities(
    filterInput: FilterInput
  ): Promise<T['listEntities']> {
    try {
      let pipeline = [];

      if (this.entityModel.getListingPipeline) {
        pipeline = this.entityModel.getListingPipeline(filterInput);
      } else {
        pipeline = buildGetListingBaseEntitiesPipeline({
          filters: filterInput
        });
      }

      const [res] = await this.aggregateEntities(pipeline);

      return res;
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  public async createEntity(
    createEntityInput: T['createEntityInput'],
    session?: ClientSession
  ): Promise<T['entity']> {
    try {
      this._logger.log(createEntityLog(this.entityName, createEntityInput));

      const slug = validateAndGenerateSlug(
        this.entityModel,
        this.slugConfig,
        createEntityInput
      );

      const result = new this.entityModel({
        ...createEntityInput,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      if (session) return await result.save({ session });

      await result.save();

      const entity = await this._getOneEntity({ id: result.id });

      return entity;
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);

      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      //TOOD CALL EXCEPTION HANDLER
      if (error.code === 11000) {
        throw new DuplicateKeyError(error.message);
      }

      throw error;
    }
  }

  public async updateEntity(
    updateEntityInput: T['updateEntityInput'],
    session?: ClientSession
  ): Promise<T['entity']> {
    try {
      const { data, where } = updateEntityInput;

      let updateEntity = {};

      if (data) {
        updateEntity = updateEntities(data);
        if (data[this.slugConfig.keys[0]]) {
          updateEntity['slug'] = validateAndGenerateSlug(
            this.entityModel,
            this.slugConfig,
            data
          );
        }
      }

      const result = await this._getOneEntity(where);

      result.set(updateEntity);

      if (session) {
        return await result.save({ session });
      }

      await result.save();

      // As the version number changes after the update, the entity couldn't be found
      // if the filter had the version field
      const getUpdatedEntityInput: Record<string, any> = {
        ...where
      };

      delete getUpdatedEntityInput.version;

      return this._getOneEntity(getUpdatedEntityInput);
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);

      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      throw error;
    }
  }

  public async aggregateEntities<T = any>(pipeline: any[]): Promise<T[]> {
    try {
      this._logger.log(`aggregate ${this.entityName}`);

      const res = await this.entityModel.aggregate(pipeline);

      return res;
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);

      throw error;
    }
  }

  public async deleteEntity(
    deleteEntityInput: Record<string, any>,
    session?: ClientSession
  ): Promise<T['entity']> {
    try {
      const deleteEntity = {
        deleted: true,
        updatedAt: new Date().toISOString()
      };

      const result = await this._getOneEntity(deleteEntityInput);

      result.set(deleteEntity);

      if (session) {
        return await result.save({ session, validateBeforeSave: false });
      }

      return await result.save({ validateBeforeSave: false });
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
