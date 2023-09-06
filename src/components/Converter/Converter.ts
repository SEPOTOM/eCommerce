import Formatter from '../Formatter/Formatter';
import { CartResponse, CartInfo, LineItemResponse, ProductInfo } from '../../types';

export default class Converter {
  public static htmlToElement<T extends HTMLElement>(htmlString: string): T | null {
    const template = document.createElement('template');
    template.innerHTML = htmlString;

    if (template.content.firstChild) {
      return template.content.firstChild as T;
    }

    return null;
  }

  public static cartResponseToInfo(cart: CartResponse): CartInfo {
    const formattedCart: CartInfo = {
      productsInfo: [],
    };

    formattedCart.productsInfo = this.cartItemsToProducts(cart.lineItems);

    return formattedCart;
  }

  private static cartItemsToProducts(cartItems: LineItemResponse[]): ProductInfo[] | [] {
    return cartItems.map((cartItem) => {
      const formattedItem: ProductInfo = {
        imageSrc: '',
        name: cartItem.name['en-US'],
        quantity: cartItem.quantity,
        individualPrice: Formatter.formatPrice(cartItem.price.value),
        totalPrice: Formatter.formatPrice(cartItem.totalPrice),
      };

      if (cartItem.variant.images?.length) {
        formattedItem.imageSrc = cartItem.variant.images[0].url;
      }

      return formattedItem;
    });
  }
}
