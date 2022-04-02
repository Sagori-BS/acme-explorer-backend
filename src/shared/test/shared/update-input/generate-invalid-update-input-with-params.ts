import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import { ValidationError } from 'joi';

export const generateInvalidUpdateInputWithParams = (
  updateEntityInput: IUpdateEntity,
  UpdateEntityInput,
  key: string,
  value: any,
  contain: string
) => {
  // Arrange
  const input: IUpdateEntity = {
    where: updateEntityInput.where,
    data: {
      ...updateEntityInput.data,
      [key]: value
    }
  };

  // Act
  const { error } = UpdateEntityInput.validationSchema.validate(input);

  // Assert
  expect(error.isJoi).toBeTruthy();
  expect(error).toBeInstanceOf(ValidationError);
  expect(error.message).toContain(contain);
};
