import {
  DeletedEventPayload,
  UpdatedEventPayload
} from '@shared/data/classes/event-payload.class';

export class CreatedUserPayload {
  id: string;
  name: string;
  lastName: string;
  email: string;
  url?: string;
  profilePicture?: string;
}

export class UpdatedUserPayload extends UpdatedEventPayload {
  data: {
    profilePicture: string;
    name: string;
    lastName: string;
  };
}

export class DeletedUserPayload extends DeletedEventPayload {}
