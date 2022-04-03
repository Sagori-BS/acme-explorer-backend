import {
  DeletedEventPayload,
  UpdatedEventPayload,
} from '@shared/data/classes/event-payload.class';

export class CreatedUserPayload {
  id: string;
  profilePicture?: string;
  name: string;
  email: string;
  url?: string;
}

export class UpdatedUserPayload extends UpdatedEventPayload {
  data: {
    profilePicture: string;
    name: string;
  };
}

export class DeletedUserPayload extends DeletedEventPayload {}
