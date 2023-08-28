import { ProductModal } from '../data';
import SliderHTML from './Slider.html';
import MainPictureModal from '../MainPictureView/MainPictureModalView.html';
import Converter from '../../../components/Converter/Converter';

export default class Slider {
  public getSlider(pictureURL: string): HTMLElement {
    const slider = Converter.htmlToElement(SliderHTML) as HTMLElement;

    const modalPictureContainer = this.getModelPicture(pictureURL);

    this.addMainPicture(slider, modalPictureContainer);

    return slider;
  }

  private getModelPicture(pictureURL: string): HTMLElement {
    const container = Converter.htmlToElement(MainPictureModal) as HTMLElement;
    (container as HTMLImageElement).src = pictureURL;
    return container;
  }

  private addMainPicture(slider: HTMLElement, pictureContainer: HTMLElement) {
    const mainPictureContainer = slider.querySelector(`#${ProductModal.MODAL_MAIN_PICTURE}`) as HTMLElement;
    mainPictureContainer.appendChild(pictureContainer);
  }
}
