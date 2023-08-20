export interface InputOptions {
  type?: string;
  id?: string;
  validationData: PatternAndMessage[];
  dataAttr?: {
    name: string;
    value: string;
  };
}

export type PatternAndMessage = [RegExp, string];
