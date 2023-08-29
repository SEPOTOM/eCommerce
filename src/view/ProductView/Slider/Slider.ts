import SliderHTML from './Slider.html';
import MainPictureSlider from './MainPictureSlider/MainPictureSliderView.html';
import SmallPicture from './SmallPictureSlider/SmallPictureSlider.html';

import Converter from '../../../components/Converter/Converter';

import { IImages } from '../../../types';
import { SliderSelectors, SLIDE_WIDTH, SLIDER_INITIAL_POSITION } from './data';

export default class Slider {
  private static activeImage: number;

  public getSlider(pictureURL: string, imagesArray: IImages[], activeImage: number): HTMLElement {
    const slider = Converter.htmlToElement(SliderHTML) as HTMLElement;
    const sliderMainPictureContainer = this.getSliderPicture(pictureURL);

    Slider.activeImage = activeImage;

    this.addSliderMainPicture(slider, sliderMainPictureContainer);

    this.addSliderSmallPictures(slider, imagesArray);

    this.processMainNavigation(slider, imagesArray.length);

    this.processSliderNavigation(slider, imagesArray.length);

    return slider;
  }

  private getSliderPicture(pictureURL: string): HTMLElement {
    const container = Converter.htmlToElement(MainPictureSlider) as HTMLElement;
    (container as HTMLImageElement).src = pictureURL;
    return container;
  }

  private addSliderMainPicture(slider: HTMLElement, pictureContainer: HTMLElement): void {
    const mainPictureContainer = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_PICTURE}`) as HTMLElement;
    mainPictureContainer.appendChild(pictureContainer);
  }

  private addSliderSmallPictures(slider: HTMLElement, imagesArray: IImages[]): void {
    for (let i = 0; i < imagesArray.length; i += 1) {
      const smallPicturesContainer = slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_PICTURES}`) as HTMLElement;
      const smallPictureWrapper = Converter.htmlToElement(SmallPicture) as HTMLElement;

      const smallPicture = smallPictureWrapper.querySelector(
        `#${SliderSelectors.SLIDER_SMALL_PICTURE}`
      ) as HTMLImageElement;

      smallPicture.src = imagesArray[i].url;

      smallPicture.addEventListener('click', () => {
        Slider.activeImage = i;
        this.setActiveImage(slider, i);
      });

      smallPicturesContainer.appendChild(smallPictureWrapper);
    }
    this.setActiveImage(slider, Slider.activeImage);
  }

  private setActiveImage(slider: HTMLElement, activeImage: number): void {
    const imageNodes = slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_PICTURES}`)
      ?.childNodes as NodeListOf<ChildNode>;
    const mainImage = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_PICTURE}`)?.lastChild as HTMLImageElement;

    imageNodes.forEach((element) => {
      (element as HTMLElement).classList.remove('opacity-100');
      (element as HTMLElement).classList.add('opacity-30');
    });

    (imageNodes[activeImage] as HTMLElement).classList.remove('opacity-30');
    (imageNodes[activeImage] as HTMLElement).classList.add('opacity-100');

    // now change the main image
    mainImage.classList.add('opacity-0');
    setTimeout(() => {
      mainImage.setAttribute(
        'src',
        ((imageNodes[activeImage] as HTMLElement).querySelector('#slider-small-image') as HTMLImageElement).src
      );
      mainImage.classList.remove('opacity-0');
    }, 500);
  }

  private processMainNavigation(slider: HTMLElement, maxIndex: number): void {
    const leftButton = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_LEFT}`) as HTMLElement;
    const rightButton = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_RIGHT}`) as HTMLElement;

    leftButton.addEventListener('click', () => {
      if (Slider.activeImage - 1 >= 0) {
        Slider.activeImage -= 1;
        this.setActiveImage(slider, Slider.activeImage);
        // this.setArrowStyles(maxIndex);
      }
    });

    rightButton.addEventListener('click', () => {
      if (Slider.activeImage + 1 <= maxIndex) {
        Slider.activeImage += 1;
        this.setActiveImage(slider, Slider.activeImage);
        // this.setArrowStyles(maxIndex);
      }
    });
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
      }
    });

    rightButton.addEventListener('click', () => {
      const currentPosition = Number(slidingPart.style.left.slice(0, slidingPart.style.left.length - 2));
      if (puctureAmount * SLIDE_WIDTH - Math.abs(currentPosition) > SLIDE_WIDTH) {
        slidingPart.style.left = `${String(currentPosition - SLIDE_WIDTH)}px`;
      }
    });
  }
}
