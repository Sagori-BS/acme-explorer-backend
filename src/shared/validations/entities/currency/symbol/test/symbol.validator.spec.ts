import { _validateSymbol } from '../symbol.validator';

describe('ValidateSymbol', () => {
  it('should return true given null', () => {
    const res = _validateSymbol(null);

    expect(res).toEqual(true);
  });

  it('should return true given undefined', () => {
    const res = _validateSymbol(undefined);

    expect(res).toEqual(true);
  });

  it('should return true given an empty string', () => {
    const res = _validateSymbol('');

    expect(res).toEqual(true);
  });

  it.each([['usdecxcv'], ['edeeste'], ['comicas']])(
    'should return false given an invalid currency = "%s"',
    val => {
      const res = _validateSymbol(val);

      expect(res).toEqual(false);
    }
  );

  it.each([['¥'], ['$'], ['RD$'], ['B/.']])(
    'should return true given a valid currency = "%s"',
    val => {
      const res = _validateSymbol(val);
      expect(res).toEqual(true);
    }
  );
});
