import { CreatedUserPayload } from '@common/common/events/user/user.payload';
import { User } from '../../user/database/user.entity';

export const createUserPayload = (
  user: User,
  token?: string
): CreatedUserPayload => {
  const {
    id,
    lastName,
    name,
    address,
    deviceTokens,
    documentId,
    drivingLicense,
    email,
    profilePicture,
    roles,
    telephoneNumber
  } = user;

  const createdUser: CreatedUserPayload = {
    id,
    lastName,
    name,
    address,
    deviceTokens,
    documentId,
    drivingLicense,
    email,
    profilePicture,
    roles,
    telephoneNumber,

    //TODO: Fix this url
    url: token
  };

  return createdUser;
};
