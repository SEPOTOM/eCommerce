import Converter from '../../../components/Converter/Converter';
import HTML from './ProductView.html';
import { ProductInfo } from '../../../types';
import { DataAttrs } from '../data';

export default class ProductView {
  private view = Converter.htmlToElement<HTMLLIElement>(HTML) || document.createElement('li');

  public buildView(productData: ProductInfo): HTMLLIElement {
    this.configureView(productData);

    return this.view;
  }

  private configureView(productData: ProductInfo): void {
    this.view.addEventListener('click', this.handleClicks.bind(this));

    this.configureImage(productData.imageSrc, productData.name);
    this.configureName(productData.name);
    this.configureQuantity(productData.quantity);
    this.configureIndividualPrice(productData.individualPrice, productData.discountedIndividualPrice);
    this.configureTotalPrice(productData.totalPrice);
  }

  private configureImage(src: string, alt: string): void {
    const image = this.view.querySelector(`[${DataAttrs.PRODUCT_IMG}]`);

    if (image instanceof HTMLImageElement) {
      image.src = src;
      image.alt = alt;
    }
  }

  private configureName(name: string): void {
    const nameBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_NAME}]`);

    if (nameBlock) {
      nameBlock.textContent = name;
    }
  }

  private configureQuantity(quantity: number): void {
    const quantityBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_QUANTITY}]`);

    if (quantityBlock) {
      quantityBlock.textContent += `${quantity}`;
    }
  }

  private configureIndividualPrice(price: string, discountedPrice?: string): void {
    const currentPriceBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_CURRENT_PRICE}]`);

    if (discountedPrice && currentPriceBlock) {
      const oldPriceBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_OLD_PRICE}]`);

      if (oldPriceBlock) {
        oldPriceBlock.textContent = price;
      }

      currentPriceBlock.textContent = ` / ${discountedPrice}`;
    } else if (currentPriceBlock) {
      currentPriceBlock.textContent = price;
    }
  }

  private configureTotalPrice(price: string): void {
    const totalPriceBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_TOTAL_PRICE}]`);

    if (totalPriceBlock) {
      totalPriceBlock.textContent = price;
    }
  }

  private enterEditMode(): void {
    const quantityInfo = this.getQuantityInfo();

    if (quantityInfo) {
      this.setQuantityValue(quantityInfo);
    }

    this.view.dataset.edit = 'true';
  }

  private exitEditMode(): void {
    this.view.dataset.edit = 'false';
  }

  private handleClicks(e: Event): void {
    if (e.target instanceof Element) {
      const button = e.target.closest('button');

      if (button && button.hasAttribute(DataAttrs.ENTER_EDITING_BUTTON)) {
        this.enterEditMode();
      }
      if (button && button.hasAttribute(DataAttrs.EXIT_EDITING_BUTTON)) {
        this.exitEditMode();
      }
    }
  }

  private getQuantityInfo(): string | null {
    const quantityBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_QUANTITY}]`);

    if (quantityBlock) {
      return quantityBlock.textContent;
    }

    return null;
  }

  private setQuantityValue(value: string): void {
    const quantityInput = this.view.querySelector(`[${DataAttrs.QUANTITY_INPUT}]`);

    if (quantityInput instanceof HTMLInputElement) {
      quantityInput.value = value;
    }
  }
}
