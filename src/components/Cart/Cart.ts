/* eslint-disable import/no-cycle */
import CartAPI from '../../api/CartAPI/CartAPI';
import Converter from '../Converter/Converter';
import { CartInfo, ProductInfo, CartResponse } from '../../types';

enum ErrorMessages {
  NO_PRODUCT = 'The updated product was not found. Please try again later.',
}

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

  public async updateProductQuantity(quantity: string, itemId: string): Promise<ProductInfo | Error> {
    const cartVersion = this.getCurrentCartVersion();
    const cartId = this.getCurrentCartId();
    const cartResponse = await CartAPI.updateQuantity(Number(quantity), itemId, cartVersion, cartId);
    const cart = this.updateCurrentCart(cartResponse);

    if ('message' in cart) {
      return cart;
    }

    const updatedProduct = cart.getProductsInfo().find((product) => product.itemId === itemId);

    if (updatedProduct) {
      return updatedProduct;
    }

    return new Error(ErrorMessages.NO_PRODUCT);
  }

  private updateCurrentCart(cartResponse: CartResponse | Error): Cart | Error {
    if ('message' in cartResponse) {
      return cartResponse;
    }

    this.cart = Converter.cartResponseToInfo(cartResponse);

    return this;
  }

  private getCurrentCartVersion(): number {
    return this.cart?.version || 0;
  }

  private getCurrentCartId(): string {
    return this.cart?.id || '';
  }
}
