export type EventCallback = (e: Event) => void;

export interface InputOptions {
  type: string;
  fieldName: string;
  regExp: RegExp;
}

export interface SelectOptions {
  values: Record<string, string>;
}
