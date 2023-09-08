/* eslint-disable import/no-cycle */
import CartAPI from '../../api/CartAPI/CartAPI';
import Converter from '../Converter/Converter';
import { CartInfo, ProductInfo, CartResponse } from '../../types';

export default class Cart {
  private cart: CartInfo | null = null;

  public async getCart(): Promise<Cart | Error> {
    const cartResponse = await CartAPI.get();
    const cart = this.updateCurrentCart(cartResponse);

    return cart;
  }

  public getProductsInfo(): ProductInfo[] {
    return this.cart?.productsInfo || [];
  }

  private updateCurrentCart(cartResponse: CartResponse | Error): Cart | Error {
    if ('message' in cartResponse) {
      return cartResponse;
    }

    this.cart = Converter.cartResponseToInfo(cartResponse);

    return this;
  }
}
