export interface InputOptions {
  type?: string;
  id?: string;
  validationData: PatternAndMessage[];
  dataAttr?: {
    name: string;
    value: string;
  };
}

export interface UserInfoCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
}

export type PatternAndMessage = [RegExp, string];
