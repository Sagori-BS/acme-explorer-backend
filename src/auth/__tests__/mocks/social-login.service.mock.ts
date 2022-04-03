import { ISocialLoginService } from '../../social-login.service';

export const SocialLoginServiceMock: ISocialLoginService = {
  getUser: jest.fn()
};
