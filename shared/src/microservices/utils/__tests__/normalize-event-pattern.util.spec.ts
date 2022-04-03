import { MaximumEventPatternDepthError } from '@shared/errors/microservices/maximum-event-pattern-depth.error';
import { normalizeEventPattern } from '../normalize-event-pattern.util';

describe('Normalize Event Pattern', () => {
  it('should return an error given undefined', () => {
    expect(() => normalizeEventPattern(undefined)).toThrow(Error());
  });

  it('should return an error given null', () => {
    expect(() => normalizeEventPattern(null)).toThrow(Error());
  });

  it('should return an error given an empty string', () => {
    expect(() => normalizeEventPattern('')).toThrow(Error());
  });

  it.each([
    [
      {
        name: {
          type: {
            value: 'test',
          },
        },
      },
    ],
    [
      {
        other: {
          type: {
            value: 'test',
          },
        },
      },
    ],
  ])(
    'should return an error given a pattern deeper than 2 layers = "%s"',
    pattern => {
      expect(() => normalizeEventPattern(JSON.stringify(pattern))).toThrow(
        new MaximumEventPatternDepthError(),
      );
    },
  );

  it('should work with a string', () => {
    const expectedResult = 'created-asset';

    const pattern = JSON.stringify('created-asset');

    const res = normalizeEventPattern(pattern);

    expect(res).toEqual(expectedResult);
  });

  it.each([
    [{ type: 'created-asset' }, 'type-created-asset'],
    [{ event: 'created-asset' }, 'event-created-asset'],
  ])('should work with an object = "%s"', (pattern, expectedResult: string) => {
    const res = normalizeEventPattern(JSON.stringify(pattern));

    expect(res).toEqual(expectedResult);
  });

  it('should work with nested object', () => {
    const expectedResult = 'type-name-created-asset';

    const pattern = JSON.stringify({ type: { name: 'created-asset' } });

    const res = normalizeEventPattern(pattern);

    expect(res).toEqual(expectedResult);
  });

  it.each([
    [
      {
        type: { name: 'created-asset' },
        value: { type: 'service' },
      },
      'type-name-created-asset-value-type-service',
    ],
    [
      {
        event: { name: 'created-asset' },
      },
      'event-name-created-asset',
    ],
  ])('should work with nested objects = "%s"', (pattern, expectedResult) => {
    const res = normalizeEventPattern(JSON.stringify(pattern));

    expect(res).toEqual(expectedResult);
  });
});
