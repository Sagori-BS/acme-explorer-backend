import { JwtModule, JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { TokensService } from '../tokens.service';
import { Model } from 'mongoose';
import { User, UserSchema } from '../../user/database/user.entity';
import { UserService } from '../../user/user.service';
import { mongooseModuleTesting } from '@shared/test/db-module';
import { AuthProviders, AuthType } from '../utils/auth-providers.enum';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonEnvKey } from '@shared/config/common-env-key.enum';
import * as faker from 'faker';

describe('Tokens Service', () => {
  let userModel: Model<User>;
  let tokensService: TokensService;
  let configService: ConfigService;
  let jwtService: JwtService;

  let user;

  let verifyAccessTokenOptions: JwtVerifyOptions;

  const userService = {
    getOneEntity: jest.fn(),
  };

  const createUser = async () => {
    const entity = new userModel({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      socialProvider: AuthProviders.Local,
      authType: AuthType.PASSWORD,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await entity.save();
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
            schema: UserSchema,
          },
        ]),
        JwtModule.register({}),
        ConfigModule,
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        TokensService,
      ],
    }).compile();

    tokensService = testModule.get<TokensService>(TokensService);
    configService = testModule.get<ConfigService>(ConfigService);
    jwtService = testModule.get<JwtService>(JwtService);
    userModel = testModule.get<Model<User>>(getModelToken(User.name));

    verifyAccessTokenOptions = {
      secret: configService.get(CommonEnvKey.ACCESS_TOKEN_SECRET),
    };

    user = await createUser();
  });

  describe(`signAccessToken`, () => {
    it(`should return a valid jwt containing the provided user information as payload`, async () => {
      const accessToken = await tokensService.signAccessToken(user);

      const accessTokenPayload = jwtService.verify(
        accessToken,
        verifyAccessTokenOptions,
      );

      delete accessTokenPayload.exp;
      delete accessTokenPayload.iat;

      expect(user.toObject()).toMatchObject(accessTokenPayload);
    });
  });
});
