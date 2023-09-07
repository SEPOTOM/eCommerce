import Converter from '../../components/Converter/Converter';
import Cart from '../../components/Cart/Cart';
import HTML from './CartView.html';
import ProductView from './ProductView/ProductView';
import { ProductInfo } from '../../types';
import { DataAttrs } from './data';

export default class CartView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  constructor() {
    this.configureView();
  }

  public draw(): void {
    const main = document.querySelector('main');

    if (main) {
      main.innerHTML = '';
      main.append(this.view);
    }
  }

  private async configureView(): Promise<void> {
    const cartData = await new Cart().getCart();

    if ('message' in cartData) {
      return;
    }

    this.configureList(cartData.getProductsInfo());
  }

  private configureList(productsInfo: ProductInfo[]): void {
    const list = this.view.querySelector(`[${DataAttrs.PRODUCTS_LIST}]`);

    productsInfo.forEach((productInfo) => {
      const productItem = new ProductView().buildView(productInfo);
      list?.append(productItem);
    });
  }
}
