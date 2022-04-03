export abstract class UpdatedEventPayload {
  public where: {
    id: string;
    version: number;
  };

  public data?: Record<string, any>;
}

export abstract class DeletedEventPayload {
  public id: string;
  public version: number;
}
