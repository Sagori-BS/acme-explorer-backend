import { DeletedUserPayload } from '@shared/events/user/user.payload';
import { User } from '../database/user.entity';

export const deleteUserPayload = (user: User): DeletedUserPayload => {
  const { id, version } = user;

  return { id, version };
};
