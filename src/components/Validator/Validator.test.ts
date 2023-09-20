import Validator from './Validator';
import { ErrorMessages } from './data';

/* eslint-disable max-lines-per-function */
describe('Validator class', () => {
  it('must be defined', () => {
    expect(Validator).toBeDefined();
  });

  it('must have a validateProductQuantity method', () => {
    expect(Validator.validateProductQuantity).toBeDefined();
  });

  describe('the validateProductQuantity method', () => {
    it('must handle cases when the value is less than the specified one', () => {
      const value = '5';
      const min = '10';
      const max = '12';
      const expected = new Error(`${ErrorMessages.TOO_SMALL}10`);

      const result = Validator.validateProductQuantity(value, min, max);

      expect(result).toEqual(expected);
    });

    it('must handle cases when the value is greater than the specified one', () => {
      const value = '13';
      const min = '10';
      const max = '12';
      const expected = new Error(`${ErrorMessages.TOO_BIG}12`);

      const result = Validator.validateProductQuantity(value, min, max);

      expect(result).toEqual(expected);
    });

    it('must handle cases where the value is not an integer', () => {
      const value = '11.0';
      const min = '10';
      const max = '12';
      const expected = new Error(`${ErrorMessages.NOT_INTEGER}`);

      const result = Validator.validateProductQuantity(value, min, max);

      expect(result).toEqual(expected);
    });

    it('must return true when the value is valid', () => {
      const value = '11';
      const min = '10';
      const max = '12';

      const result = Validator.validateProductQuantity(value, min, max);

      expect(result).toBe(true);
    });
  });
});
