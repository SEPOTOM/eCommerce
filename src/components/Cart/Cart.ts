import CartAPI from '../../api/CartAPI/CartAPI';
import Converter from '../Converter/Converter';
import { CartInfo, ProductInfo } from '../../types';

export default class Cart {
  private cart: CartInfo | null = null;

  public async getCart(): Promise<Cart | Error> {
    const cartResponse = await CartAPI.get();

    if ('message' in cartResponse) {
      return cartResponse;
    }

    this.cart = Converter.cartResponseToInfo(cartResponse);

    return this;
  }

  public getProductsInfo(): ProductInfo[] {
    return this.cart?.productsInfo || [];
  }
}
