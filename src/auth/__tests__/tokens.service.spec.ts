import {
  JwtModule,
  JwtService,
  JwtSignOptions,
  JwtVerifyOptions
} from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { TokensService } from '../tokens.service';
import { Model, Types } from 'mongoose';
import { User, UserSchema } from '../../user/database/user.entity';
import { UserService } from '../../user/user.service';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { RefreshTokenPayload } from '@common/common/auth/interfaces/refresh-token-payload.interface';
import { mongooseModuleTesting } from '@common/common/test/db-module';
import { AuthProviders, AuthType } from '../utils/auth-providers.enum';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonEnvKey } from '@common/common/config/common-env-key.enum';
import { EnvKey } from '../../../config/env-key.enum';
import { RevokedTokenError } from '../errors/revoked-token.error';
import * as faker from 'faker';
import { RevokeRefreshTokenInput } from '../graphql/inputs/revoke-refresh-token.input';
import { MalformedTokenError } from '@common/common/errors/common/malformed-token.error';
import { ExpiredTokenError } from '@common/common/errors/common/expired-token.error';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';

describe('Tokens Service', () => {
  let userModel: Model<User>;

  let tokensService: TokensService;
  let configService: ConfigService;
  let jwtService: JwtService;

  let user;

  let verifyAccessTokenOptions: JwtVerifyOptions;
  let verifyRefreshTokenOptions: JwtVerifyOptions;

  let refreshTokenSignOption: JwtSignOptions;

  const refreshTokenId = new Types.ObjectId().toHexString();

  const refreshTokenService = {
    getRefreshTokenById: jest.fn(),
    createRefreshToken: jest.fn(),
    revokeRefreshToken: jest.fn()
  };

  const userService = {
    getOneEntity: jest.fn()
  };

  const createUser = async () => {
    const entity = new userModel({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      socialProvider: AuthProviders.Local,
      authType: AuthType.PASSWORD,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return await entity.save();
  };

  const setupTestData = (mockPayload, jwtPayload) => {
    refreshTokenService.getRefreshTokenById.mockReturnValueOnce(mockPayload);

    const signOptions: JwtSignOptions = {
      jwtid: refreshTokenId,
      ...refreshTokenSignOption
    };

    const refreshToken = jwtService.sign(jwtPayload, signOptions);

    return refreshToken;
  };

  beforeAll(async () => {
    process.env.ACCESS_TOKEN_SECRET = 'secret1';
    process.env.REFRESH_TOKEN_SECRET = 'secret2';

    process.env.REFRESH_TOKEN_EXPIRES_IN = '60s';
    process.env.ACCESS_TOKEN_EXPIRES_IN = '30s';

    const testModule = await Test.createTestingModule({
      imports: [
        mongooseModuleTesting.instance,
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema
          }
        ]),
        JwtModule.register({}),
        ConfigModule
      ],
      providers: [
        {
          provide: RefreshTokenService,
          useValue: refreshTokenService
        },
        {
          provide: UserService,
          useValue: userService
        },
        TokensService
      ]
    }).compile();

    tokensService = testModule.get<TokensService>(TokensService);
    configService = testModule.get<ConfigService>(ConfigService);
    jwtService = testModule.get<JwtService>(JwtService);
    userModel = testModule.get<Model<User>>(getModelToken(User.name));

    verifyAccessTokenOptions = {
      secret: configService.get(CommonEnvKey.ACCESS_TOKEN_SECRET)
    };

    verifyRefreshTokenOptions = {
      secret: configService.get(EnvKey.REFRESH_TOKEN_SECRET)
    };

    refreshTokenSignOption = {
      expiresIn: configService.get(EnvKey.REFRESH_TOKEN_EXPIRES_IN),
      secret: configService.get(EnvKey.REFRESH_TOKEN_SECRET)
    };

    user = await createUser();
  });

  describe(`signAccessToken`, () => {
    it(`should return a valid jwt containing the provided user information as payload`, async () => {
      const accessToken = await tokensService.signAccessToken(user);

      const accessTokenPayload = jwtService.verify(
        accessToken,
        verifyAccessTokenOptions
      );

      delete accessTokenPayload.exp;
      delete accessTokenPayload.iat;

      expect(user.toObject()).toMatchObject(accessTokenPayload);
    });
  });

  describe(`createAndSignRefreshToken`, () => {
    it(`should call the createRefreshToken method of the refreshTokenService`, async () => {
      refreshTokenService.createRefreshToken.mockImplementation(input => ({
        id: refreshTokenId,
        user: input.user
      }));

      await tokensService.createAndSignRefreshToken(user);

      expect(refreshTokenService.createRefreshToken).toHaveBeenCalled();
      expect(refreshTokenService.createRefreshToken).toHaveBeenCalledWith({
        user: user.id
      });
    });

    it(`should return a valid jwt containing expiration time, user id and refresh token id as payload`, async () => {
      refreshTokenService.createRefreshToken.mockImplementation(input => ({
        id: refreshTokenId,
        user: input.user
      }));

      const refreshToken = await tokensService.createAndSignRefreshToken(user);

      const refreshTokenPayload = jwtService.verify(
        refreshToken,
        verifyRefreshTokenOptions
      );

      expect(refreshTokenPayload).toHaveProperty('exp');

      expect(user.id).toBe(refreshTokenPayload.user);
      expect(refreshTokenPayload.jti).toBe(refreshTokenId);
    });
  });

  describe(`refreshAccessToken`, () => {
    it(`should throw an ExpiredTokenError if the provided refresh token is expired`, async () => {
      const payload: RefreshTokenPayload = { user: user.id };

      const signOptions: JwtSignOptions = {
        jwtid: new Types.ObjectId().toHexString(),
        expiresIn: '0s',
        secret: configService.get(EnvKey.REFRESH_TOKEN_SECRET)
      };

      const refreshToken = jwtService.sign(payload, signOptions);

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(ExpiredTokenError);
    });

    it(`should throw an MalformedTokenError if the provided refresh token is missing jwtid field in payload`, async () => {
      const payload: RefreshTokenPayload = { user: user.id };

      const signOptions: JwtSignOptions = refreshTokenSignOption;

      const refreshToken = jwtService.sign(payload, signOptions);

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(MalformedTokenError);
    });

    it(`should throw an MalformedTokenError if the provided refresh token is missing user field in payload`, async () => {
      const mockPayload = {
        id: refreshTokenId,
        isRevoked: false
      };

      const refreshToken = setupTestData(mockPayload, {});

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(MalformedTokenError);
    });

    it(`should throw an RevokedTokenError if the provided refresh token is revoked`, async () => {
      const mockPayload = {
        id: refreshTokenId,
        isRevoked: true
      };

      const jwtPayload = { user: user.id };

      const refreshToken = setupTestData(mockPayload, jwtPayload);

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(RevokedTokenError);
    });

    it(`should return a new access and refresh token, and the related user, if a valid refresh token is provided`, async () => {
      userService.getOneEntity.mockReturnValueOnce({
        id: user.id,
        roles: [{ slug: UserRoles.CLIENT }]
      });

      const mockPayload = {
        id: refreshTokenId,
        isRevoked: false
      };

      const jwtPayload = { user: user.id };

      const refreshToken = setupTestData(mockPayload, jwtPayload);

      const result = await tokensService.refreshAccessToken({ refreshToken });

      const accessTokenPayload = jwtService.verify(
        result.accessToken,
        verifyAccessTokenOptions
      );

      const refreshTokenPayload = jwtService.verify(
        result.refreshToken,
        verifyRefreshTokenOptions
      );

      expect(result.user.id).toEqual(user.toObject().id);

      expect(accessTokenPayload).not.toBeNull();
      expect(refreshTokenPayload).not.toBeNull();
    });
  });

  describe(`revokeRefreshToken`, () => {
    it(`should call the revokeRefreshToken method of the RefreshTokenService`, async () => {
      const revokeRefreshTokenInput: RevokeRefreshTokenInput = {
        user: new Types.ObjectId().toHexString()
      };

      await refreshTokenService.revokeRefreshToken(revokeRefreshTokenInput);

      expect(refreshTokenService.revokeRefreshToken).toHaveBeenCalled();
      expect(refreshTokenService.revokeRefreshToken).toHaveBeenLastCalledWith(
        revokeRefreshTokenInput
      );
    });
  });
});
