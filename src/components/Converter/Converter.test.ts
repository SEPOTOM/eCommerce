import Converter from './Converter';
import { CartResponse, CartInfo } from '../../types';

/* eslint-disable max-lines-per-function */
describe('Converter class', () => {
  it('must be defined', () => {
    expect(Converter).toBeDefined();
  });

  it('must have a cartResponseToInfo method', () => {
    expect(Converter.cartResponseToInfo).toBeDefined();
  });

  it('the method cartResponseToInfo must work correctly', () => {
    const cartResponse: CartResponse = {
      totalPrice: {
        type: 'test-type',
        fractionDigits: 2,
        currencyCode: 'USD',
        centAmount: 290000,
      },
      id: 'test-cart-id',
      lineItems: [
        {
          id: 'test-id-1',
          quantity: 5,
          name: {
            'en-US': 'Item name',
          },
          price: {
            id: 'test-id',
            value: {
              centAmount: 12345,
              currencyCode: 'USD',
              type: 'test-type',
              fractionDigits: 2,
            },
          },
          totalPrice: {
            centAmount: 250000,
            currencyCode: 'USD',
            type: 'test-type',
            fractionDigits: 2,
          },
          variant: {
            id: 1,
            prices: [
              {
                id: 'test-id',
                value: {
                  centAmount: 50000,
                  currencyCode: 'USD',
                  type: 'test-type',
                  fractionDigits: 2,
                },
              },
            ],
            images: [
              {
                url: 'test-image-url-1',
                dimensions: {
                  w: 12,
                  h: 12,
                },
              },
            ],
          },
        },
        {
          id: 'test-id-2',
          quantity: 2,
          name: {
            'en-US': 'Another Item name',
          },
          price: {
            id: 'test-id',
            value: {
              centAmount: 12345,
              currencyCode: 'USD',
              type: 'test-type',
              fractionDigits: 2,
            },
            discounted: {
              discount: {},
              value: {
                centAmount: 20000,
                currencyCode: 'USD',
                type: 'test-type',
                fractionDigits: 2,
              },
            },
          },
          totalPrice: {
            centAmount: 40000,
            currencyCode: 'USD',
            type: 'test-type',
            fractionDigits: 2,
          },
          variant: {
            id: 1,
            prices: [
              {
                id: 'test-id',
                value: {
                  centAmount: 30000,
                  currencyCode: 'USD',
                  type: 'test-type',
                  fractionDigits: 2,
                },
              },
            ],
            images: [
              {
                url: 'test-image-url-2',
                dimensions: {
                  w: 12,
                  h: 12,
                },
              },
            ],
          },
        },
      ],
      version: 1,
    };
    const expected: CartInfo = {
      id: 'test-cart-id',
      totalPrice: '$2900.00',
      productsInfo: [
        {
          itemId: 'test-id-1',
          imageSrc: 'test-image-url-1',
          name: 'Item name',
          quantity: 5,
          individualPrice: '$500.00',
          totalPrice: '$2500.00',
          discountedIndividualPrice: undefined,
        },
        {
          itemId: 'test-id-2',
          imageSrc: 'test-image-url-2',
          name: 'Another Item name',
          quantity: 2,
          individualPrice: '$300.00',
          totalPrice: '$400.00',
          discountedIndividualPrice: '$200.00',
        },
      ],
      version: 1,
    };
    const result = Converter.cartResponseToInfo(cartResponse);

    expect(result).toEqual(expected);
  });
});
