import { BadImplementationError } from '@shared/errors/common/bad-implementation.error';
import { UnauthorizedRoleError } from '@shared/errors/common/unauthorized-role.error';
import { UserRoles } from '../../enums/user-roles.enum';
import { RolesGuard } from '../roles.guard';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;

  const reflector = {
    get: jest.fn(),
    getAll: jest.fn(),
    getAllAndMerge: jest.fn(),
    getAllAndOverride: jest.fn(),
  };

  const getRequest = jest.fn();

  const context: any = {
    getType: jest.fn().mockReturnValue('http'),
    getHandler: () => undefined,
    switchToHttp: () => ({
      getRequest,
    }),
  };

  const correctTestCases = [
    [UserRoles.ADMIN, [UserRoles.CLIENT, UserRoles.ADMIN]],
  ];

  const failedTestCases = [[UserRoles.CLIENT, [UserRoles.ADMIN]]];

  beforeAll(() => {
    rolesGuard = new RolesGuard(reflector);
  });

  describe('canActivate', () => {
    it('should return true if authorized roles are not provided', () => {
      //Arrange
      reflector.get.mockReturnValueOnce(undefined);

      //Act
      const result = rolesGuard.canActivate(context);

      //Assert
      expect(result).toBe(true);
    });

    it('should return a BadImplementationError if there is no user defined in the request object', () => {
      //Arrange
      reflector.get.mockReturnValueOnce([]);
      getRequest.mockReturnValueOnce({});

      //Act
      const result = () => rolesGuard.canActivate(context);

      //Assert
      expect(result).toThrow(BadImplementationError);
    });

    it.each(correctTestCases)(
      'should return true if the user role match at least one the authorized roles',
      (userRole: UserRoles, authorizedRoles: UserRoles[]) => {
        //Arrange
        reflector.get.mockReturnValueOnce(authorizedRoles);

        getRequest.mockReturnValueOnce({
          user: {
            role: userRole,
          },
        });

        //Act
        const result = rolesGuard.canActivate(context);

        //Assert
        expect(result).toBe(true);
      },
    );

    it.each(failedTestCases)(
      'should return a UnauthorizedRoleError none of the user roles match one of the authorized roles',
      (userRole: UserRoles, authorizedRoles: UserRoles[]) => {
        //Arrange
        reflector.get.mockReturnValueOnce(authorizedRoles);

        getRequest.mockReturnValueOnce({
          user: {
            role: userRole,
          },
        });

        //Act
        const result = () => rolesGuard.canActivate(context);

        //Assert
        expect(result).toThrow(UnauthorizedRoleError);
      },
    );
  });
});
