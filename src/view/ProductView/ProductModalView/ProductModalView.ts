import ProductModal from './ProductModalView.html';
import { ProductElements } from '../data';
import Converter from '../../../components/Converter/Converter';
import Slider from '../Slider/Slider';

export default class ProductModalView {
  public showProductModal(pictureContainer: HTMLElement): void {
    const modalHTML = Converter.htmlToElement(ProductModal) as HTMLElement;

    document.body.classList.add('overflow-y-hidden');

    this.addSlider(pictureContainer, modalHTML);

    this.addCloseModal(modalHTML);

    this.addCloseOnOverlay(modalHTML);

    document.body.appendChild(modalHTML);
  }

  private addSlider(pictureContainer: HTMLElement, modalHTML: HTMLElement): void {
    const slider = new Slider();
    const sliderContainer = (modalHTML.querySelector(`#${ProductElements.PRODUCT_MODAL_CLOSE}`) as HTMLElement)
      .parentElement as HTMLElement;
    sliderContainer.appendChild(slider.getSlider(pictureContainer));
  }

  private addCloseModal(modalHTML: HTMLElement): void {
    (modalHTML.querySelector(`#${ProductElements.PRODUCT_MODAL_CLOSE}`) as HTMLElement).addEventListener(
      'click',
      () => {
        this.closeModal(modalHTML);
      }
    );
  }

  private addCloseOnOverlay(modalHTML: HTMLElement): void {
    modalHTML.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).outerHTML === modalHTML.firstChild?.parentElement?.outerHTML) {
        this.closeModal(modalHTML);
      }
    });
  }

  private closeModal(modalHTML: HTMLElement) {
    modalHTML.remove();
    document.body.classList.remove('overflow-y-hidden');
  }
}
