import { buildLookupStage } from '../build-lookup-stage.util';
import * as faker from 'faker';
import { IBuildLookupStageInput } from '../../../../interfaces/build-lookup-stage-input.inteface';
import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';

describe('BuildLookupStage', () => {
  it('should throw an error if the collection option is null', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: null,
      localField: faker.random.alpha(),
      outputField: faker.random.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the collection option is undefined', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: undefined,
      localField: faker.random.alpha(),
      outputField: faker.random.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the collection option is empty', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: '',
      localField: faker.random.alpha(),
      outputField: faker.random.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the localField option is null', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.random.alpha(),
      localField: null,
      outputField: faker.random.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the localField option is undefined', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.random.alpha(),
      localField: undefined,
      outputField: faker.random.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the localField option is empty', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.random.alpha(),
      localField: '',
      outputField: faker.random.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the outputField option is null', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.random.alpha(),
      localField: faker.random.alpha(),
      outputField: null,
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the outputField option is undefined', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.random.alpha(),
      localField: faker.random.alpha(),
      outputField: undefined,
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the outputField option is empty', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.random.alpha(),
      localField: faker.random.alpha(),
      outputField: '',
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should return a lookup stage', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.random.alpha(),
      localField: faker.random.alpha(),
      outputField: faker.random.alpha(),
    };

    // act
    const expectedResult = buildLookupStage(input);

    // assert
    expect(expectedResult).toBeDefined();
  });
});
