import { FirebaseAdminService } from '@common/common/firebase-admin';
import { LoggerService } from '@common/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InvalidSocialLoginTokenError } from './errors/invalid-social-login-token.error';
import { SignUpUserInput } from './graphql/inputs/sign-up-user.input';
import { AuthType } from './utils/auth-providers.enum';
import { getAuthProvider } from './utils/get-auth-provider.util';

export interface ISocialLoginService {
  getUser: (token: string) => Promise<SignUpUserInput>;
}

@Injectable()
export class SocialLoginService {
  constructor(
    private readonly logger: LoggerService,
    private readonly firebaseAdminService: FirebaseAdminService
  ) {}

  public async getUser(token: string): Promise<SignUpUserInput> {
    try {
      const decodedToken = await this.verifyToken(token);

      const userFullName = (decodedToken.name as string).split(' ');
      const name = userFullName.shift();
      const lastName = userFullName.join(' ');

      return {
        name,
        lastName,
        email: decodedToken.email,
        profilePicture: decodedToken.picture,
        socialProvider: getAuthProvider(decodedToken.firebase.sign_in_provider),
        authType: AuthType.SOCIAL
      };
    } catch (error) {
      this.logger.error(JSON.stringify(`${error}`));
      throw error;
    }
  }

  private async verifyToken(token: string): Promise<any> {
    const registeredAppNames = this.firebaseAdminService.registeredAppNames;

    for (const registeredAppName of registeredAppNames) {
      const auth = this.firebaseAdminService.auth(registeredAppName);

      try {
        const decodedToken = await auth.verifyIdToken(token);

        return decodedToken;
      } catch (error) {
        this.logger.error(JSON.stringify(`${error}`));
      }
    }

    throw new InvalidSocialLoginTokenError();
  }
}
