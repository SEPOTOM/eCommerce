import Formatter from './Formatter';
import { ITypedMoney } from '../../types';

/* eslint-disable max-lines-per-function */
describe('Formatter class', () => {
  it('must be defined', () => {
    expect(Formatter).toBeDefined();
  });

  it('must have a formatPrice method', () => {
    expect(Formatter.formatPrice).toBeDefined();
  });

  describe('the formatPrice method', () => {
    it('must return the string $16100.00', () => {
      const priceData: ITypedMoney = {
        centAmount: 1610000,
        currencyCode: 'USD',
        type: 'test-type',
        fractionDigits: 2,
      };
      const expected = '$16100.00';
      const result = Formatter.formatPrice(priceData);

      expect(result).toBe(expected);
    });

    it('must return the string $1000.08', () => {
      const priceData: ITypedMoney = {
        centAmount: 100008,
        currencyCode: 'USD',
        type: 'test-type',
        fractionDigits: 2,
      };
      const expected = '$1000.08';
      const result = Formatter.formatPrice(priceData);

      expect(result).toBe(expected);
    });

    it('must return an empty string', () => {
      const priceData: ITypedMoney = {
        centAmount: 12345,
        currencyCode: 'Unknown code',
        type: 'test-type',
        fractionDigits: 2,
      };
      const expected = '';
      const result = Formatter.formatPrice(priceData);

      expect(result).toBe(expected);
    });
  });
});
