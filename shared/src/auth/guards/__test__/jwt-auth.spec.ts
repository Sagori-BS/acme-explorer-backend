import { JwtAuthGuard } from '../jwt-auth.guard';

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

const jwtAuthGuard = new JwtAuthGuard(reflector);

describe('JwtAuthGuard', () => {
  describe('canActivate', () => {
    it('should return true if the isPublic metadata is set to true', () => {
      reflector.getAllAndOverride.mockReturnValueOnce(true);

      const result = jwtAuthGuard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  it.todo(
    'should call the canActivate method of the super class if the isPublic metadata is set to false',
  );
});
