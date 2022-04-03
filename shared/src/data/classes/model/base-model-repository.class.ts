import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { Repository } from '@shared/data/classes/repository.class';
import { EntityNotFoundError } from '@shared/errors/common/entity-not-found.error';
import { createEntityLog } from '@shared/functions/log-message-builder';
import { updateEntities } from '@shared/functions/update-entities';
import { validateAndGenerateSlug } from '@shared/functions/validate-and-generate-slug';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { BaseRepositoryType } from '../../interfaces/base-repository-type.interface';

@Injectable()
export abstract class BaseModelRepository<
  T extends BaseRepositoryType
> extends Repository<T> {
  @InjectConnection()
  protected readonly connection: Connection;

  constructor(
    private readonly _modelModel: Model<any>,
    private readonly _brandModel: Model<any>,
    entityName: string,
  ) {
    super(_modelModel, entityName);
  }

  public async createEntity(
    createEntityInput: T['createEntityInput'],
  ): Promise<T['entity']> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      this._logger.log(createEntityLog(this.entityName, createEntityInput));
      const { brand } = createEntityInput;

      const slug = validateAndGenerateSlug(
        this._modelModel,
        this.slugConfig,
        createEntityInput,
      );

      const model = new this._modelModel({
        ...createEntityInput,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const brandToUpdate = await this.addModelToBrand(
        brand,
        createEntityInput.id ? createEntityInput.id : model._id,
      );

      await brandToUpdate.save({ session });
      const result = await model.save({ session });

      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();
      this._logger.error(`${JSON.stringify(error)}`);

      throw error;
    } finally {
      session.endSession();
    }
  }

  //TODO: Fix version field on where (decrease 1)
  public async updateEntity(
    updateEntityInput: T['updateEntityInput'],
  ): Promise<T['entity']> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { data, where } = updateEntityInput;

      const updateEntity = updateEntities(data);
      const { brand } = updateEntity;

      //TODO: Make this work with all the slugConfig keys
      if (data[this.slugConfig.keys[0]]) {
        updateEntity['slug'] = validateAndGenerateSlug(
          this._modelModel,
          this.slugConfig,
          data,
        );
      }

      const model = await this._modelModel.findOne(where);

      if (!model) {
        throw new EntityNotFoundError(Model.name);
      }

      if (brand && brand != model.brand.id) {
        const oldBrand = await this.removeModelFromBrand(
          model.brand.id,
          model._id,
        );

        const newBrand = await this.addModelToBrand(brand, model._id);

        await oldBrand.save({ session });
        await newBrand.save({ session });
      }

      model.set(updateEntity);
      const result = await model.save({ session });

      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();
      this._logger.error(`${JSON.stringify(error)}`);
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async deleteEntity(
    deleteEntityInput: GetEntityByIdInput,
  ): Promise<T['entity']> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = await this._modelModel.findOne(deleteEntityInput);

      if (!model) {
        throw new EntityNotFoundError(Model.name);
      }

      model.deleted = true;
      model.updatedAt = new Date().toISOString();

      const brandToUpdate = await this.removeModelFromBrand(
        model.brand.id,
        model._id,
      );

      await brandToUpdate.save({ session });
      const result = await model.save({ session });

      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();
      this._logger.error(`${JSON.stringify(error)}`);

      throw error;
    } finally {
      session.endSession();
    }
  }

  private async removeModelFromBrand(brandId, modelId) {
    const brand = await this._brandModel.findOne({
      id: brandId,
    });

    let modelsId = brand.models.map(model => model._id);

    modelsId = modelsId.filter(value => !value._id.equals(modelId));

    brand.set({ models: modelsId });

    return brand;
  }

  private async addModelToBrand(brandId, modelId) {
    const brand = await this._brandModel.findOne({
      id: brandId,
    });

    const modelsId = brand.models.map(model => model._id);

    modelsId.push(modelId);

    brand.set({ models: modelsId });

    return brand;
  }
}
