/* eslint-disable import/no-cycle */
import CartAPI from '../../api/CartAPI/CartAPI';
import Converter from '../Converter/Converter';
import { CartInfo, ProductInfo, CartResponse } from '../../types';
import HeaderView from '../../view/HeaderView/HeaderView';

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

  public getTotalPrice(): string {
    return this.cart?.totalPrice || '';
  }

  public async removeProduct(itemId: string): Promise<Cart | Error> {
    const cartVersion = this.getCurrentCartVersion();
    const cartId = this.getCurrentCartId();
    const cartResponse = await CartAPI.removeItem(itemId, cartVersion, cartId);
    const cart = this.updateCurrentCart(cartResponse);

    return cart;
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

  public updateCurrentCart(cartResponse: CartResponse | Error): Cart | Error {
    if ('message' in cartResponse) {
      return cartResponse;
    }

    this.cart = Converter.cartResponseToInfo(cartResponse);

    const headerCount = new HeaderView();
    if ('totalLineItemQuantity' in cartResponse) {
      console.log(cartResponse.totalLineItemQuantity);
      headerCount.setProductAmount(cartResponse.totalLineItemQuantity as number);
    } else {
      headerCount.setProductAmount(0);
    }

    return this;
  }

  private getCurrentCartVersion(): number {
    return this.cart?.version || 0;
  }

  private getCurrentCartId(): string {
    return this.cart?.id || '';
  }
}
