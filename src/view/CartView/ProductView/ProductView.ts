/* eslint-disable import/no-cycle */
import Converter from '../../../components/Converter/Converter';
import Cart from '../../../components/Cart/Cart';
import Validator from '../../../components/Validator/Validator';
import HTML from './ProductView.html';
import { ProductInfo } from '../../../types';
import { DataAttrs, Events } from '../data';

const HIDE_ERROR_DELAY = 3000;

enum ErrorMessages {
  ERROR = 'Operation error. Please, try again later.',
}

export default class ProductView {
  private view = Converter.htmlToElement<HTMLLIElement>(HTML) || document.createElement('li');

  constructor(private cart: Cart) {}

  public buildView(productData: ProductInfo, labelMark: string): HTMLLIElement {
    this.configureView(productData, labelMark);

    return this.view;
  }

  public updateTotalPrice(): void {
    const productInfo = this.cart.getProductInfo(this.getItemId());

    if (productInfo) {
      this.configureTotalPrice(productInfo.totalPrice, productInfo.originalTotalPrice);
    }
  }

  public getItemId(): string {
    return this.view.dataset.itemId || '';
  }

  private configureView(productData: ProductInfo, labelMark: string): void {
    this.view.dataset.itemId = productData.itemId;
    this.view.addEventListener('click', this.handleClicks.bind(this));

    this.configureImage(productData.imageSrc, productData.name);
    this.configureName(productData.name);
    this.configureQuantity(productData.quantity);
    this.configureIndividualPrice(productData.individualPrice, productData.discountedIndividualPrice);
    this.configureTotalPrice(productData.totalPrice, productData.originalTotalPrice);
    this.configureQuantityRow(labelMark);
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

  private configureTotalPrice(price: string, originalPrice?: string): void {
    const totalPriceBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_TOTAL_PRICE}]`);

    if (totalPriceBlock) {
      totalPriceBlock.textContent = price;
    }

    const originalTotalPriceBlock = this.view.querySelector(`[${DataAttrs.PRODUCT_ORIGINAL_TOTAL_PRICE}]`);

    if (originalPrice && originalTotalPriceBlock) {
      originalTotalPriceBlock.textContent = originalPrice;
    } else if (originalTotalPriceBlock) {
      originalTotalPriceBlock.textContent = '';
    }
  }

  private configureQuantityRow(labelMark: string): void {
    const row = this.view.querySelector(`[${DataAttrs.ROW}]`);
    const label = row?.querySelector(`[${DataAttrs.LABEL}]`);
    const input = row?.querySelector(`[${DataAttrs.QUANTITY_INPUT}]`);

    if (label && input) {
      const labelFor = label.getAttribute('for');

      label.setAttribute('for', `${labelFor}${labelMark}`);
      input.setAttribute('id', `${labelFor}${labelMark}`);
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
    this.notifyAbout(Events.CHANGE_TOTAL_PRICE);
  }

  private async deleteProduct(): Promise<void> {
    const itemId = this.getItemId();
    const response = await this.cart.removeProduct(itemId);

    if ('message' in response) {
      this.showDeleteError(ErrorMessages.ERROR);
      return;
    }

    this.notifyAbout(Events.PRODUCT_DELETED);
    this.notifyAbout(Events.CHANGE_TOTAL_PRICE);
    this.view.remove();
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

  private showDeleteError(message: string): void {
    const deleteErrorBlock = this.view.querySelector(`[${DataAttrs.DELETE_ERROR}]`);

    if (deleteErrorBlock instanceof HTMLElement) {
      deleteErrorBlock.textContent = message;
      deleteErrorBlock.dataset.error = 'true';

      setTimeout(this.hideDeleteError.bind(this), HIDE_ERROR_DELAY);
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

  private hideDeleteError(): void {
    const deleteErrorBlock = this.view.querySelector(`[${DataAttrs.DELETE_ERROR}]`);

    if (deleteErrorBlock instanceof HTMLElement) {
      deleteErrorBlock.textContent = '';
      deleteErrorBlock.dataset.error = 'false';
    }
  }

  private notifyAbout(eventMessage: string): void {
    const event = new Event(eventMessage, {
      bubbles: true,
    });
    this.view.dispatchEvent(event);
  }
}
