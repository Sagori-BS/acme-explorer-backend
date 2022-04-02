import { Types } from 'mongoose';
import { _validateLoanLengths } from '../loan-lengths.validator';

describe('ValidateLoanLengths', () => {
  it('should return false if given null', () => {
    const res = _validateLoanLengths(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateLoanLengths(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty array', () => {
    const res = _validateLoanLengths([]);

    expect(res).toBe(false);
  });

  it.each([[['a']], [['qwertyuiopasdfghjklzxcvbnm']]])(
    'should return false if given an invalid ID = "%s"',
    val => {
      const res = _validateLoanLengths(val);

      expect(res).toBe(false);
    }
  );

  it.each([
    [[new Types.ObjectId().toHexString(), new Types.ObjectId().toHexString()]]
  ])('should return true if given a valid Id = "%s"', val => {
    const res = _validateLoanLengths(val);

    expect(res).toBe(true);
  });
});
