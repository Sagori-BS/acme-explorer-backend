export const generateValidInputTest = (entityInput, inputType) => {
  // Arrange
  const input = {
    ...entityInput
  };

  // Act
  const { error, value } = inputType.validationSchema.validate(input);

  // Assert
  expect(error).toBeUndefined();
  expect(value).toEqual(input);
};
