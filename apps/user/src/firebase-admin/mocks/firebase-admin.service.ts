import * as faker from 'faker';

export const firebaseAdminService = {
  auth: {
    verifyIdToken: jest.fn().mockReturnValue({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      picture: faker.image.imageUrl(),
      email: faker.internet.email(),
      firebase: { sign_in_provider: 'google.com' },
    }),
  },
};
