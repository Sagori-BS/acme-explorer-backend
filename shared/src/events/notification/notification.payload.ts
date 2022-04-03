export class WelcomeUserPayload {
  name: string;
  email: string;
}

export class InitialSetupPayload {
  name: string;
  email: string;
  url?: string;
}

export class ConfirmUserAccountPayload {
  name: string;
  email: string;
  url: string;
}

export class ResetUserPasswordPayload {
  email: string;
  url: string;
}
