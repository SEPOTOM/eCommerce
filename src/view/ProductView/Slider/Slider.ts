import { ProductModal } from '../data';
import SliderHTML from './Slider.html';
import Converter from '../../../components/Converter/Converter';

export default class Slider {
  public getSlider(pictureContainer: HTMLElement): HTMLElement {
    const slider = Converter.htmlToElement(SliderHTML) as HTMLElement;

    this.addMainPicture(slider, pictureContainer);

    return slider;
  }

  private addMainPicture(slider: HTMLElement, pictureContainer: HTMLElement) {
    const mainPictureContainer = slider.querySelector(`#${ProductModal.MODAL_MAIN_PICTURE}`) as HTMLElement;
    mainPictureContainer.appendChild(pictureContainer);
  }
}
