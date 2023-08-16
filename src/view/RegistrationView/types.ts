export interface InputOptions {
  type?: string;
  id?: string;
  validationData: PatternAndMessage[];
}

export type PatternAndMessage = [RegExp, string];
