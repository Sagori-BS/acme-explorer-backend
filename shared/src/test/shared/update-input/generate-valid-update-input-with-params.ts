import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';

export const generateValidUpdateInputWithParams = (
  updateEntityInput: IUpdateEntity,
  UpdateEntityInput,
  field: string,
  field_value: any
) => {
  // Arrange
  const input = {
    ...updateEntityInput,
    data: {
      [field]: field_value
    }
  };

  // Act
  const { error, value } = UpdateEntityInput.validationSchema.validate(input);

  // Assert
  expect(input.data[field]).toEqual(field_value);
  expect(error).toBeUndefined();
  expect(value).toEqual(input);
};
