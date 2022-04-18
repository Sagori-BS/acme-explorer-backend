import { CreatedUserPayload } from '@shared/events/user/user.payload';
import { User } from '../../user/database/user.entity';

export const createUserPayload = (
  user: User,
  token?: string
): CreatedUserPayload => {
  const { id, name, email, profilePicture, lastName } = user;

  const createdUser: CreatedUserPayload = {
    id,
    name,
    email,
    profilePicture,
    lastName,
    url: token
  };

  return createdUser;
};
