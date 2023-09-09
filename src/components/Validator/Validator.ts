import { ErrorMessages } from './data';

export default class Validator {
  public static validateProductQuantity(value: string, min: string, max: string): Error | true {
    const innerValue = Number(value);
    const innerMin = Number(min);
    const innerMax = Number(max);

    if (innerValue > innerMax) {
      return new Error(`${ErrorMessages.TOO_BIG}${innerMax}`);
    }

    if (innerValue < innerMin) {
      return new Error(`${ErrorMessages.TOO_SMALL}${innerMin}`);
    }

    if (value.split('.').length > 1) {
      return new Error(ErrorMessages.NOT_INTEGER);
    }

    return true;
  }
}
