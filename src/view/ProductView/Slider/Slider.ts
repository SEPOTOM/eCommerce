import SliderHTML from './Slider.html';
import MainPictureSlider from './MainPictureSlider/MainPictureSliderView.html';
import SmallPicture from './SmallPictureSlider/SmallPictureSlider.html';

import Converter from '../../../components/Converter/Converter';

import { IImages } from '../../../types';
import { SliderSelectors, SLIDE_WIDTH, SLIDER_INITIAL_POSITION } from './data';

export default class Slider {
  public getSlider(pictureURL: string, imagesArray: IImages[]): HTMLElement {
    const slider = Converter.htmlToElement(SliderHTML) as HTMLElement;
    const sliderMainPictureContainer = this.getSliderPicture(pictureURL);

    this.addSliderMainPicture(slider, sliderMainPictureContainer);

    this.addSliderSmallPictures(slider, imagesArray);

    this.processSliderNavigation(slider, imagesArray.length);

    return slider;
  }

  private getSliderPicture(pictureURL: string): HTMLElement {
    const container = Converter.htmlToElement(MainPictureSlider) as HTMLElement;
    (container as HTMLImageElement).src = pictureURL;
    return container;
  }

  private addSliderMainPicture(slider: HTMLElement, pictureContainer: HTMLElement) {
    const mainPictureContainer = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_PICTURE}`) as HTMLElement;
    mainPictureContainer.appendChild(pictureContainer);
  }

  private addSliderSmallPictures(slider: HTMLElement, imagesArray: IImages[]) {
    imagesArray.forEach((element) => {
      this.addSmallPicture(slider, element.url);
    });
  }

  private addSmallPicture(slider: HTMLElement, url: string) {
    const smallPicturesContainer = slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_PICTURES}`) as HTMLElement;
    const smallPictureWrapper = Converter.htmlToElement(SmallPicture) as HTMLElement;

    const smallPicture = smallPictureWrapper.querySelector(
      `#${SliderSelectors.SLIDER_SMALL_PICTURE}`
    ) as HTMLImageElement;

    smallPicture.src = url;

    smallPicturesContainer.appendChild(smallPictureWrapper);
  }

  private processSliderNavigation(slider: HTMLElement, puctureAmount: number) {
    const slidingPart = slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_PICTURES}`) as HTMLElement;
    const leftButton = slider.querySelector(`#${SliderSelectors.SLIDER_LEFT}`) as HTMLElement;
    const rightButton = slider.querySelector(`#${SliderSelectors.SLIDER_RIGHT}`) as HTMLElement;

    slidingPart.style.left = SLIDER_INITIAL_POSITION;

    leftButton.addEventListener('click', () => {
      const currentPosition = Number(slidingPart.style.left.slice(0, slidingPart.style.left.length - 2));
      if (currentPosition !== 0) {
        slidingPart.style.left = `${String(currentPosition + SLIDE_WIDTH)}px`;
        console.log(currentPosition - SLIDE_WIDTH);
        console.log(puctureAmount * SLIDE_WIDTH);
      }
    });

    rightButton.addEventListener('click', () => {
      const currentPosition = Number(slidingPart.style.left.slice(0, slidingPart.style.left.length - 2));
      if (puctureAmount * SLIDE_WIDTH - Math.abs(currentPosition) > SLIDE_WIDTH) {
        slidingPart.style.left = `${String(currentPosition - SLIDE_WIDTH)}px`;
      }
      console.log(currentPosition - SLIDE_WIDTH);
      console.log(puctureAmount * SLIDE_WIDTH);
    });
  }
}
