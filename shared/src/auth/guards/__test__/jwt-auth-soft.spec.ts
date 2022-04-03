import { JwtAuthSoftGuard } from '../jwt-auth-soft.guard';

const reflector = {
  get: jest.fn(),
  getAll: jest.fn(),
  getAllAndMerge: jest.fn(),
  getAllAndOverride: jest.fn(),
};

const getRequest = jest.fn();

const context: any = {
  getType: jest.fn().mockReturnValue('http'),
  getClass: jest.fn(),
  getHandler: jest.fn(),
  switchToHttp: () => ({
    getRequest,
  }),
};

const jwtAuthSoftGuard = new JwtAuthSoftGuard(reflector);

describe('JwtAuthSoftGuard', () => {
  describe('canActivate', () => {
    it('should return true if the isPublic metadata is set to false', () => {
      reflector.getAllAndOverride.mockReturnValueOnce(false);

      const result = jwtAuthSoftGuard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should return true if the Authorization header is not provided', () => {
      reflector.getAllAndOverride.mockReturnValueOnce(true);
      getRequest.mockReturnValueOnce({ headers: {} });

      const result = jwtAuthSoftGuard.canActivate(context);

      expect(result).toBe(true);
    });

    it.todo(
      'should call the canActivate method of the super class if the isPublic metadata is set to true and there is provided an Authorization header',
    );
  });
});
