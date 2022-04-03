import { UpdatedUserPayload } from '@shared/events/user/user.payload';
import { User } from '../database/user.entity';

export const updateUserPayload = (user: User): UpdatedUserPayload => {
  const { profilePicture, name, version, id } = user;

  const updatedUser: UpdatedUserPayload = {
    where: {
      version,
      id,
    },
    data: {
      profilePicture,
      name,
    },
  };

  return updatedUser;
};
