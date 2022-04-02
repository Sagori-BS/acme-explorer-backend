import * as faker from 'faker';
import { ValidationError } from 'joi';
import { FilterByIsoDateRangeInput } from '../date-range.input';

describe('FilterByIsoDateRangeInput', () => {
  const filterByIsoDateRangeInput: FilterByIsoDateRangeInput = {
    from: faker.date.past().toISOString(),
    to: faker.date.future().toISOString()
  };

  describe('Valid inputs', () => {
    it('should successfully validate the input', () => {
      // Arrange
      const input: FilterByIsoDateRangeInput = {
        ...filterByIsoDateRangeInput
      };

      // Act
      const {
        error,
        value
      } = FilterByIsoDateRangeInput.validationSchema.validate(input);

      // Assert
      expect(error).toBeUndefined();
      expect(value).toEqual(input);
    });
  });

  describe('Invalid Inputs', () => {
    describe('invalid from', () => {
      it('should return an error if the from is null', () => {
        // Arrange
        const input: FilterByIsoDateRangeInput = {
          ...filterByIsoDateRangeInput,
          from: null
        };

        // Act
        const { error } = FilterByIsoDateRangeInput.validationSchema.validate(
          input
        );

        // Assert
        expect(error.isJoi).toBeTruthy();
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toContain('from');
      });

      it('should return an error if given an invalid from', () => {
        // Arrange
        const input: FilterByIsoDateRangeInput = {
          ...filterByIsoDateRangeInput,
          from: faker.lorem.word()
        };

        // Act
        const { error } = FilterByIsoDateRangeInput.validationSchema.validate(
          input
        );

        // Assert
        expect(error.isJoi).toBeTruthy();
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toContain('isodate');
      });
    });

    describe('invalid to', () => {
      it('should return an error if the to is null', () => {
        // Arrange
        const input: FilterByIsoDateRangeInput = {
          ...filterByIsoDateRangeInput,
          to: null
        };

        // Act
        const { error } = FilterByIsoDateRangeInput.validationSchema.validate(
          input
        );

        // Assert
        expect(error.isJoi).toBeTruthy();
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toContain('to');
      });

      it('should return an error if given an invalid to', () => {
        // Arrange
        const input: FilterByIsoDateRangeInput = {
          ...filterByIsoDateRangeInput,
          to: faker.lorem.word()
        };

        // Act
        const { error } = FilterByIsoDateRangeInput.validationSchema.validate(
          input
        );

        // Assert
        expect(error.isJoi).toBeTruthy();
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toContain('isodate');
      });
    });
  });
});
