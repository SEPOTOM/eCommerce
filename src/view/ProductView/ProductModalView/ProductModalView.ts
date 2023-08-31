import ProductModal from './ProductModalView.html';
import ProductModalData from './data';
import Converter from '../../../components/Converter/Converter';
import Slider from '../Slider/Slider';
import { IImages } from '../../../types';

export default class ProductModalView {
  public showProductModal(pictureContainer: HTMLElement, imagesArray: IImages[], activeImage: number): void {
    const modalHTML = Converter.htmlToElement(ProductModal) as HTMLElement;

    document.body.classList.add('overflow-hidden');

    this.addSlider(pictureContainer, modalHTML, imagesArray, activeImage);

    this.addCloseModal(modalHTML);

    this.addCloseOnOverlay(modalHTML);

    document.body.appendChild(modalHTML);
  }

  private addSlider(
    pictureContainer: HTMLElement,
    modalHTML: HTMLElement,
    imagesArray: IImages[],
    activeImage: number
  ): void {
    const slider = new Slider();
    const sliderContainer = (modalHTML.querySelector(`#${ProductModalData.PRODUCT_MODAL_CLOSE}`) as HTMLElement)
      .parentElement as HTMLElement;
    sliderContainer.appendChild(slider.getSlider((pictureContainer as HTMLImageElement).src, imagesArray, activeImage));
  }

  private addCloseModal(modalHTML: HTMLElement): void {
    (modalHTML.querySelector(`#${ProductModalData.PRODUCT_MODAL_CLOSE}`) as HTMLElement).addEventListener(
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

  private closeModal(modalHTML: HTMLElement): void {
    modalHTML.remove();
    document.body.classList.remove('overflow-hidden');
  }
}
