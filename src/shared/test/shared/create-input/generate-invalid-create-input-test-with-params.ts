import { ValidationError } from 'joi';

export const generateInvalidCreateInputWithParams = (
  createEntityInput,
  CreateEntityInput,
  key: string,
  value: any,
  contain: string
) => {
  // Arrange
  const fields = {};
  fields[key] = value;

  const input = {
    ...createEntityInput,
    ...fields
  };

  // Act
  const { error } = CreateEntityInput.validationSchema.validate(input);

  // Assert
  expect(error.isJoi).toBeTruthy();
  expect(error).toBeInstanceOf(ValidationError);
  expect(error.message).toContain(contain);
};
