import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { Types } from 'mongoose';
import { IGetMatchStageInfoInput } from '../../../../interfaces/get-match-stage-info-input.interface';
import { IMatchStageInfo } from '../../../../interfaces/match-stage-info.interface';
import { buildMatchStage, getMatchStageInfo } from '../build-match-stage.util';

describe('GetMatchStageInfo', () => {
  it('should throw an error if field is null', () => {
    // arrange & act & assert
    expect(() =>
      getMatchStageInfo({
        field: null,
        value: 1,
      }),
    ).toThrow(MissingRequiredParametersError);
  });

  it('should throw an error if field is undefined', () => {
    // arrange & act & assert
    expect(() =>
      getMatchStageInfo({
        field: null,
        value: 1,
      }),
    ).toThrow(MissingRequiredParametersError);
  });

  it('should throw an error if field is empty', () => {
    // arrange & act & assert
    expect(() =>
      getMatchStageInfo({
        field: '',
        value: 1,
      }),
    ).toThrow(MissingRequiredParametersError);
  });

  it('should return the corresponding match stage info', () => {
    // arrange
    const id = new Types.ObjectId();

    const expectedResult: IMatchStageInfo = {
      fieldName: 'bodyStyle',
      operation: { $eq: id },
    };

    const input: IGetMatchStageInfoInput = {
      field: 'bodyStyle',
      value: id.toHexString(),
    };

    // act
    const res = getMatchStageInfo(input);

    // assert
    expect(res).toEqual(expectedResult);
  });
});

describe('BuildMatchStage', () => {
  it('should return the expected match aggregation pipeline stage', () => {
    // arrange
    const id = new Types.ObjectId();

    const expectedResult = {
      $match: {
        bodyStyle: { $eq: id },
        year: { $gt: 1999, $lt: 2020 },
      },
    };

    const input: IMatchStageInfo[] = [
      {
        fieldName: 'year',
        operation: { $gt: 1999 },
      },
      {
        fieldName: 'year',
        operation: { $lt: 2020 },
      },
      {
        fieldName: 'bodyStyle',
        operation: { $eq: id },
      },
    ];

    // act
    const res = buildMatchStage(input);

    // assert
    expect(res).toEqual(expectedResult);
  });
});
