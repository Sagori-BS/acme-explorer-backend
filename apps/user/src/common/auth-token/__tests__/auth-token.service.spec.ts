import { AuthTokenTypes } from '@user/graphql/enums/auth-token-types.enum';
import { AuthTokenRepository } from '../auth-token.repository';
import { AuthTokenService } from '../auth-token.service';
import { AuthToken } from '../database/auth-token.entity';
import { CreateAuthTokenInternalInput } from '../dtos/create-auth-token-internal.input';
import { Test } from '@nestjs/testing';
import { CredentialService } from '../../credential/credential.service';
import { createUnhashedToken } from '../utils/create-unhashed-token';
import { hashToken } from '../utils/hash-token';
import { CreateAuthTokenInput } from '../graphql/inputs/create-auth-token.input';
import { pubSubClient } from '@shared/config/clients/mock/pub-sub-client';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';

describe('AuthTokenService', () => {
  const entityName = AuthToken.name;
  let entityService: AuthTokenService;

  const createEntityInput: CreateAuthTokenInternalInput = {
    email: 'test@email.com',
    type: AuthTokenTypes.RESET_PASSWORD,
    origin: 'N/A',
  };

  const entityRepository = {
    getAuthTokenByToken: jest.fn(),
    createAuthToken: jest.fn(),
    updateAuthToken: jest.fn(),
  };

  const credentialService = {
    getCredentialByIdOrEmail: jest.fn(),
    createCredential: jest.fn(),
    updateCredential: jest.fn(),
    deleteCredential: jest.fn(),
    resetPassword: jest.fn(),
  };

  const unhashedToken = createUnhashedToken();
  const token = hashToken(unhashedToken);

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthTokenRepository,
          useValue: entityRepository,
        },
        {
          provide: PUB_SUB_CLIENT_TOKEN,
          useValue: pubSubClient,
        },
        {
          provide: CredentialService,
          useValue: credentialService,
        },
        AuthTokenService,
      ],
    }).compile();

    entityService = testModule.get<AuthTokenService>(AuthTokenService);
  });

  describe(`get${entityName}ById`, () => {
    it(`should call the getAuthTokenByToken method of the ${entityName}Repository`, async () => {
      await entityService.getAuthTokenByToken({ token: unhashedToken });

      expect(entityRepository.getAuthTokenByToken).toHaveBeenCalled();
      expect(entityRepository.getAuthTokenByToken).toHaveBeenCalledWith({
        token: unhashedToken,
      });
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the createAuthToken method of the ${entityName}Repository`, async () => {
      await entityService.createAuthToken(createEntityInput);

      expect(entityRepository.createAuthToken).toHaveBeenCalled();
      expect(entityRepository.createAuthToken).toHaveBeenCalledWith(
        createEntityInput,
      );
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the updateAuthToken method of the ${entityName}Repository`, async () => {
      await entityService.updateAuthToken({ token: unhashedToken });

      expect(entityRepository.updateAuthToken).toHaveBeenCalled();
      expect(entityRepository.updateAuthToken).toHaveBeenCalledWith({
        token: unhashedToken,
      });
    });
  });

  describe(`validate${entityName}`, () => {
    it(`should return false if unvalid token is provided`, async () => {
      const result = await entityService.validateAuthToken({
        token: unhashedToken,
        origin: 'NA',
      });

      expect(result).toBe(false);
    });

    it(`should call the getAuthTokenByToken and updateAuthToken method of the ${entityName}Repository if valid token is provided`, async () => {
      entityRepository.getAuthTokenByToken.mockReturnValueOnce({
        token,
        type: AuthTokenTypes.CONFIRM_ACCOUNT,
      });

      await entityService.validateAuthToken({
        token: unhashedToken,
        origin: 'NA',
      });

      expect(entityRepository.getAuthTokenByToken).toHaveBeenCalled();
      expect(entityRepository.getAuthTokenByToken).toHaveBeenCalledWith({
        token,
      });

      expect(entityRepository.updateAuthToken).toHaveBeenCalled();
      expect(entityRepository.updateAuthToken).toHaveBeenCalledWith({ token });
    });

    it(`should return true if valid token is provided`, async () => {
      entityRepository.getAuthTokenByToken.mockReturnValueOnce({
        token,
        type: AuthTokenTypes.CONFIRM_ACCOUNT,
      });

      const result = await entityService.validateAuthToken({
        token: unhashedToken,
        origin: 'NA',
      });

      expect(result).toBe(true);
    });
  });

  describe(`resetUserPassword`, () => {
    it(`should call the createAuthToken method of the ${entityName}Repository, and the send method of the pub-sub client if valid input is provided`, async () => {
      const authToken = {
        ...createEntityInput,
        token,
      };

      entityRepository.createAuthToken.mockReturnValueOnce(authToken);

      await entityService.resetUserPassword(
        <CreateAuthTokenInput>createEntityInput,
      );

      expect(entityRepository.createAuthToken).toHaveBeenCalled();
      expect(pubSubClient.send).toHaveBeenCalled();
    });

    it(`should return true if valid input is provided`, async () => {
      const authToken = {
        ...createEntityInput,
        token,
      };
      entityRepository.createAuthToken.mockReturnValueOnce(authToken);

      const result = await entityService.resetUserPassword(
        <CreateAuthTokenInput>createEntityInput,
      );

      expect(result).toBe(true);
    });
  });
});
