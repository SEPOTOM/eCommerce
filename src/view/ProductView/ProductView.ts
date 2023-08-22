import ProductHTML from './ProductView.html';
import Converter from "../../components/Converter/Converter";
import Product from '../../api/Product/Product';
import { IProduct } from '../../types';

export default class ProductView {
  public draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(this.getProductView());
  }

  public async showProductByID(id: string) {
    const product = new Product();
    const productDetails = await product.getProductByID(id, 'to be replaced');
  }

  private getProductView(): HTMLElement {
    return Converter.htmlToElement(ProductHTML) as HTMLElement;
  }
}