import { JoiValidationPipe } from '../joi-validation.pipe';
import * as joi from 'joi';
import { ArgumentMetadata } from '@nestjs/common';
import * as faker from 'faker';
import { InvalidUserInputError } from '@shared/errors/common/invalid-user-input.error';

describe('JoiValidationPipe', () => {
  const joiValidationPipe = new JoiValidationPipe();

  class TestInput {
    public name: string;

    public static validationSchema = joi.object<any>({
      name: joi.string().required(),
    });
  }

  const metaData: ArgumentMetadata = {
    type: 'body',
    metatype: TestInput,
  };
  const case1 = [
    [{ name: faker.name.findName() }, metaData],
    [
      20,
      {
        type: 'body',
        metatype: Number,
      },
    ],
    [
      faker.name.findName(),
      {
        type: 'body',
        metatype: String,
      },
    ],
  ];

  describe('transform', () => {
    it.each(case1)(
      'should return the provided input if validations pass',
      (input: any, metaData: any) => {
        const res = joiValidationPipe.transform(input, metaData);

        expect(res).toBe(input);
      },
    );

    it('should throw InvalidUserInputError if the provided input does not pass the validations', () => {
      const input = {};

      const fun = () => joiValidationPipe.transform(input, metaData);

      expect(fun).toThrow(InvalidUserInputError);
    });
  });
});
