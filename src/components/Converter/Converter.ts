import Formatter from '../Formatter/Formatter';
import {
  CartResponse,
  CartInfo,
  LineItemResponse,
  ProductInfo,
  DiscountCodeResponse,
  DiscountCodeInfo,
  ITypedMoney,
} from '../../types';

export default class Converter {
  private static originalTotalPrice = 0;

  public static htmlToElement<T extends HTMLElement>(htmlString: string): T | null {
    const template = document.createElement('template');
    template.innerHTML = htmlString;

    if (template.content.firstChild) {
      return template.content.firstChild as T;
    }

    return null;
  }

  public static discountCodeResponseToInfo(response: DiscountCodeResponse): DiscountCodeInfo {
    const info: DiscountCodeInfo = {
      code: response.code,
      description: response.description['en-US'],
    };
    return info;
  }

  public static cartResponseToInfo(cart: CartResponse): CartInfo {
    this.originalTotalPrice = 0;

    const formattedCart: CartInfo = {
      id: cart.id,
      totalPrice: Formatter.formatPrice(cart.totalPrice),
      productsInfo: [],
      version: cart.version,
    };

    formattedCart.productsInfo = this.cartItemsToProducts(cart.lineItems);

    if (this.originalTotalPrice > 0 && this.originalTotalPrice !== cart.totalPrice.centAmount) {
      formattedCart.originalTotalPrice = Formatter.formatPrice({
        ...cart.totalPrice,
        centAmount: this.originalTotalPrice,
      });
    }

    return formattedCart;
  }

  private static cartItemsToProducts(cartItems: LineItemResponse[]): ProductInfo[] | [] {
    return cartItems.map((cartItem) => {
      const formattedItem: ProductInfo = {
        itemId: cartItem.id,
        imageSrc: '',
        name: cartItem.name['en-US'],
        quantity: cartItem.quantity,
        individualPrice: Formatter.formatPrice(cartItem.variant.prices[0].value),
        totalPrice: Formatter.formatPrice(cartItem.totalPrice),
        discountedIndividualPrice: cartItem.price.discounted?.value
          ? Formatter.formatPrice(cartItem.price.discounted.value)
          : undefined,
      };

      if (cartItem.variant.images?.length) {
        formattedItem.imageSrc = cartItem.variant.images[0].url;
      }

      this.addOriginalTotalToProduct(cartItem, formattedItem);

      return formattedItem;
    });
  }

  private static addOriginalTotalToProduct(cartItem: LineItemResponse, product: ProductInfo): ProductInfo {
    const localProduct = product;
    let originalTotalPriceValue: ITypedMoney = {
      centAmount: 0,
      currencyCode: '',
      type: '',
      fractionDigits: 0,
    };

    if (cartItem.discountedPrice && cartItem.price.discounted) {
      originalTotalPriceValue = {
        ...cartItem.price.discounted.value,
      };
      originalTotalPriceValue.centAmount = cartItem.quantity * cartItem.price.discounted.value.centAmount;

      localProduct.originalTotalPrice = Formatter.formatPrice(originalTotalPriceValue);
    } else if (cartItem.discountedPrice) {
      originalTotalPriceValue = {
        ...cartItem.price.value,
      };
      originalTotalPriceValue.centAmount = cartItem.quantity * cartItem.price.value.centAmount;

      localProduct.originalTotalPrice = Formatter.formatPrice(originalTotalPriceValue);
    }

    this.originalTotalPrice += originalTotalPriceValue?.centAmount || 0;

    return localProduct;
  }
}
