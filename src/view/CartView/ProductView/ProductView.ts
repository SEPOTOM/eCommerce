/* eslint-disable import/no-cycle */
import Converter from '../../../components/Converter/Converter';
import Cart from '../../../components/Cart/Cart';
import Validator from '../../../components/Validator/Validator';
import HTML from './ProductView.html';
import { ProductInfo } from '../../../types';
import { DataAttrs } from '../data';

const HIDE_ERROR_DELAY = 3000;

enum ErrorMessages {
  ERROR = 'Operation error. Please, try again later.',
}

export default class ProductView {
  private view = Converter.htmlToElement<HTMLLIElement>(HTML) || document.createElement('li');

  constructor(private cart: Cart) {}

  public buildView(productData: ProductInfo): HTMLLIElement {
    this.configureView(productData);

    return this.view;
  }

  private configureView(productData: ProductInfo): void {
    this.view.dataset.itemId = productData.itemId;
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
      quantityBlock.textContent = `${quantity}`;
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
      if (button && button.hasAttribute(DataAttrs.CHANGE_QUANTITY_BUTTON)) {
        this.updateProductQuantity();
      }
      if (button && button.hasAttribute(DataAttrs.DELETE_BUTTON)) {
        this.deleteProduct();
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

  private getNewQuantity(): string {
    const quantityInput = this.view.querySelector(`[${DataAttrs.QUANTITY_INPUT}]`);

    if (quantityInput instanceof HTMLInputElement) {
      return quantityInput.value;
    }

    return '';
  }

  private getItemId(): string {
    return this.view.dataset.itemId || '';
  }

  private setQuantityValue(value: string): void {
    const quantityInput = this.view.querySelector(`[${DataAttrs.QUANTITY_INPUT}]`);

    if (quantityInput instanceof HTMLInputElement) {
      quantityInput.value = value;
    }
  }

  private updateView(newData: ProductInfo): void {
    this.configureQuantity(newData.quantity);
    this.configureTotalPrice(newData.totalPrice);
    this.exitEditMode();
  }

  private async updateProductQuantity(): Promise<void> {
    const newQuantity = this.getNewQuantity();
    const validatedQuantity = this.validateQuantity(newQuantity);

    if (typeof validatedQuantity === 'object' && 'message' in validatedQuantity) {
      this.showQuantityError(validatedQuantity.message);
      return;
    }

    const itemId = this.getItemId();

    const updateResponse = await this.cart.updateProductQuantity(newQuantity, itemId);

    if ('message' in updateResponse) {
      this.showQuantityError(ErrorMessages.ERROR);
      return;
    }

    this.updateView(updateResponse);
  }

  private validateQuantity(quantity: string): Error | true {
    const quantityInput = this.view.querySelector(`[${DataAttrs.QUANTITY_INPUT}]`);

    if (quantityInput instanceof HTMLInputElement) {
      return Validator.validateProductQuantity(quantity, quantityInput.min, quantityInput.max);
    }

    return new Error(ErrorMessages.ERROR);
  }

  private showQuantityError(message: string): void {
    const quantityBlock = this.view.querySelector(`[${DataAttrs.QUANTITY_BLOCK}]`);
    const quantityErrorBlock = this.view.querySelector(`[${DataAttrs.QUANTITY_ERROR}]`);

    if (quantityBlock instanceof HTMLElement && quantityErrorBlock) {
      quantityBlock.dataset.error = 'true';
      quantityErrorBlock.textContent = message;

      setTimeout(this.hideQuantityError.bind(this), HIDE_ERROR_DELAY);
    }
  }

  private hideQuantityError(): void {
    const quantityBlock = this.view.querySelector(`[${DataAttrs.QUANTITY_BLOCK}]`);
    const quantityErrorBlock = this.view.querySelector(`[${DataAttrs.QUANTITY_ERROR}]`);

    if (quantityBlock instanceof HTMLElement && quantityErrorBlock) {
      quantityBlock.dataset.error = 'false';
      quantityErrorBlock.textContent = '';
    }
  }

  private deleteProduct(): void {
    this.view.remove();
  }
}
