import { _validateUserRole } from '../user-role.validator';

describe('UserRole', () => {
  it('should return false given null', () => {
    const res = _validateUserRole(null);

    expect(res).toEqual(false);
  });

  it('should return false given undefined', () => {
    const res = _validateUserRole(undefined);

    expect(res).toEqual(false);
  });

  it('should return false given an empty string', () => {
    const res = _validateUserRole('');

    expect(res).toEqual(false);
  });

  it.each([['client2'], ['test'], ['TECHNICIAN@']])(
    'should return false given an invalid user role = "%s"',
    val => {
      const res = _validateUserRole(val);

      expect(res).toEqual(false);
    },
  );

  it.each([['client'], ['ADMIN']])(
    'should return true given a valid user role = "%s"',
    val => {
      const res = _validateUserRole(val);
      expect(res).toEqual(true);
    },
  );
});
