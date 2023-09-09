enum ErrorMessages {
  TOO_BIG = 'Invalid value: max - ',
  TOO_SMALL = 'Invalid value: min -',
  NOT_INTEGER = 'Invalid value: must be an integer',
}

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

    if (innerValue !== Math.floor(innerValue)) {
      return new Error(ErrorMessages.NOT_INTEGER);
    }

    return true;
  }
}
