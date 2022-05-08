import * as DataLoader from 'dataloader';
import { FilterInput } from '../inputs/graphql-filter.input';
import { BaseDataLoaderBuilderOptions } from './base-dataloader-options.type';

export const baseManyEntitiesDataLoaderBuilder = <T>({
  fieldName,
  service
}: BaseDataLoaderBuilderOptions): DataLoader<string, Array<T>, string> =>
  new DataLoader(async (ids: string[]) => {
    const filterInput: FilterInput = {
      where: {
        [`${fieldName}_in`]: ids
      }
    };

    const entities = await service.getEntities(filterInput);

    const entitiesMap = new Map<string, Array<T>>();

    ids.forEach(id => entitiesMap.set(id, []));

    entities.forEach(entity => {
      const entityId = entity[fieldName].toString();

      const currentList = entitiesMap.get(entityId);
      currentList.push(entity);
    });

    return ids.reduce((prev, curr) => {
      prev.push(entitiesMap.get(curr));
      return prev;
    }, []);
  });
