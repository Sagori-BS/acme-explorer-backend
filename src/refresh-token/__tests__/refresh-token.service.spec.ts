import { RefreshTokenRepository } from '../refresh-token.repository';
import { RefreshTokenService } from '../refresh-token.service';
import { RefreshToken } from '../database/refresh-token.entity';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateRefreshTokenInput } from '../graphql/inputs/create-refresh-token.input';
import { ConfigModule } from '@nestjs/config';
import * as ms from 'ms';
import { RevokeRefreshTokenInput } from '../../auth/graphql/inputs/revoke-refresh-token.input';

const entityName = RefreshToken.name;
describe(`${entityName} Service`, () => {
  let entityService: RefreshTokenService;

  const createEntityInput: CreateRefreshTokenInput = {
    user: new Types.ObjectId().toHexString()
  };

  const entityRepository = {
    getOneEntity: jest.fn(),
    getAllEntities: jest.fn(),
    createEntity: jest.fn(),
    updateEntity: jest.fn(),
    deleteEntity: jest.fn(),
    revokeRefreshToken: jest.fn()
  };

  const REFRESH_TOKEN_EXPIRES_IN = '30s';

  beforeAll(async () => {
    process.env.REFRESH_TOKEN_EXPIRES_IN = REFRESH_TOKEN_EXPIRES_IN;

    const testModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: RefreshTokenRepository,
          useValue: entityRepository
        },
        RefreshTokenService
      ]
    }).compile();

    entityService = testModule.get<RefreshTokenService>(RefreshTokenService);
  });

  describe(`get${entityName}ById`, () => {
    it(`should call the getRefreshTokenByToken method of the ${entityName}Repository`, async () => {
      const payload = { id: new Types.ObjectId().toHexString() };

      await entityService.getRefreshTokenById(payload);

      expect(entityRepository.getOneEntity).toHaveBeenCalled();
      expect(entityRepository.getOneEntity).toHaveBeenCalledWith(payload);
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the createRefreshToken method of the ${entityName}Repository`, async () => {
      await entityService.createRefreshToken(createEntityInput);

      const expiresInMilliseconds: any = ms(REFRESH_TOKEN_EXPIRES_IN);
      const expiresIn = new Date();
      expiresIn.setTime(expiresIn.getTime() + expiresInMilliseconds);

      expect(entityRepository.createEntity).toHaveBeenCalled();
    });
  });

  describe(`revoke${entityName}`, () => {
    it(`should call the revokeRefreshToken method of the ${entityName}Repository`, async () => {
      const revokeRefreshTokenInput: RevokeRefreshTokenInput = {
        user: new Types.ObjectId().toHexString()
      };

      await entityService.revokeRefreshToken(revokeRefreshTokenInput);

      expect(entityRepository.revokeRefreshToken).toHaveBeenCalled();
      expect(entityRepository.revokeRefreshToken).toHaveBeenCalledWith(
        revokeRefreshTokenInput
      );
    });
  });
});
