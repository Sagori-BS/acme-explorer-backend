import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';

export const generateSuccessTestCases = (updateEntityInput: IUpdateEntity) => {
  const keys = Object.keys(updateEntityInput.data);

  return keys.map(key => [key, updateEntityInput.data[key]]);
};
