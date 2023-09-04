import SliderHTML from './Slider.html';
import MainPictureSlider from './MainPictureSlider/MainPictureSliderView.html';
import SmallPicture from './SmallPictureSlider/SmallPictureSlider.html';

import Converter from '../../../components/Converter/Converter';

import { IImages } from '../../../types';
import { SliderSelectors, SLIDE_WIDTH, SLIDER_INITIAL_POSITION } from './data';

const mainSliderClickDelay = 200;

export default class Slider {
  public activeImage: number = 0;

  private static previousSlideCriteria: boolean;

  public getSlider(pictureURL: string, imagesArray: IImages[], activeImage: number): HTMLElement {
    const slider = Converter.htmlToElement(SliderHTML) as HTMLElement;
    const sliderMainPictureContainer = this.getSliderPicture(pictureURL);

    this.activeImage = activeImage;

    this.addSliderMainPicture(slider, sliderMainPictureContainer);

    if (imagesArray.length >= 2) {
      this.addSliderSmallPictures(slider, imagesArray);

      this.processMainNavigation(slider, imagesArray.length);

      this.processSliderNavigation(slider, imagesArray.length);

      this.setDefaultSmallArrowStyles(slider, imagesArray.length);
    } else {
      const leftArrow = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_LEFT}`) as HTMLElement;
      const rightArrow = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_RIGHT}`) as HTMLElement;
      leftArrow.remove();
      rightArrow.remove();
    }

    document.body.addEventListener('click', () => {
      setTimeout(() => {
        this.setProperSize(slider, sliderMainPictureContainer);
      }, 300);
    });

    return slider;
  }

  private setProperSize(slider: HTMLElement, sliderMainPictureContainer: HTMLElement): void {
    /* eslint-disable no-param-reassign */
    (
      slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_IMAGES_WRAPPER}`) as HTMLElement
    ).style.width = `${sliderMainPictureContainer.offsetWidth}px`;
    /* eslint-enable no-param-reassign */
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
        this.activeImage = i;
        this.setActiveImage(slider, i);
        this.setArrowStyles(slider, imagesArray.length);
      });

      smallPicturesContainer.appendChild(smallPictureWrapper);
    }
    this.setActiveImage(slider, this.activeImage);
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
        (
          (imageNodes[activeImage] as HTMLElement).querySelector(
            `#${SliderSelectors.SLIDER_SMALL_PICTURE}`
          ) as HTMLImageElement
        ).src
      );
      mainImage.classList.remove('opacity-0');
      // now we adjust slider size to main picture size
      mainImage.onload = () => {
        this.setProperSize(slider, mainImage);
        Slider.previousSlideCriteria = true;
      };
    }, 500);
  }

  private setArrowStyles(slider: HTMLElement, totalNumber: number): void {
    const leftArrow = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_LEFT}`) as HTMLImageElement;
    const rightArrow = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_RIGHT}`) as HTMLImageElement;

    if (this.activeImage > 0 && this.activeImage < totalNumber - 1) {
      this.setActiveArrow(leftArrow);
      this.setActiveArrow(rightArrow);
    }

    if (this.activeImage === 0) {
      this.setInactiveArrow(leftArrow);
      this.setActiveArrow(rightArrow);
    }

    if (this.activeImage === totalNumber - 1) {
      this.setInactiveArrow(rightArrow);
      this.setActiveArrow(leftArrow);
    }

    if (totalNumber === 1) {
      this.setInactiveArrow(leftArrow);
      this.setInactiveArrow(rightArrow);
    }
  }

  private setActiveArrow(arrow: HTMLElement): void {
    arrow.classList.remove('cursor-not-allowed');
    arrow.classList.add('cursor-pointer');
    arrow.classList.add('hover:opacity-70');
  }

  private setInactiveArrow(arrow: HTMLElement): void {
    arrow.classList.add('cursor-not-allowed');
    arrow.classList.remove('cursor-pointer');
    arrow.classList.remove('hover:opacity-70');
  }

  private processMainNavigation(slider: HTMLElement, maxIndex: number): void {
    const leftButton = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_LEFT}`) as HTMLElement;
    const rightButton = slider.querySelector(`#${SliderSelectors.SLIDER_MAIN_RIGHT}`) as HTMLElement;

    this.setArrowStyles(slider, maxIndex);

    leftButton.addEventListener('click', () => {
      if (this.activeImage - 1 >= 0) {
        this.activeImage -= 1;
        setTimeout(() => {
          this.setActiveImage(slider, this.activeImage);
          this.setArrowStyles(slider, maxIndex);
        }, mainSliderClickDelay);
      }
    });

    rightButton.addEventListener('click', () => {
      if (this.activeImage + 1 < maxIndex) {
        this.activeImage += 1;
        setTimeout(() => {
          this.setArrowStyles(slider, maxIndex);
          this.setActiveImage(slider, this.activeImage);
        }, mainSliderClickDelay);
      }
    });
  }

  private processSliderNavigation(slider: HTMLElement, pictureAmount: number): void {
    const slidingPart = slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_PICTURES}`) as HTMLElement;
    const leftButton = slider.querySelector(`#${SliderSelectors.SLIDER_LEFT}`) as HTMLElement;
    const rightButton = slider.querySelector(`#${SliderSelectors.SLIDER_RIGHT}`) as HTMLElement;
    slidingPart.style.left = SLIDER_INITIAL_POSITION;
    this.setPreviousSlideCriteria();

    this.processLeftButtonClick(leftButton, rightButton, slidingPart, pictureAmount);

    this.processRightButtonClick(leftButton, rightButton, slidingPart, pictureAmount);
  }

  private processLeftButtonClick(
    leftButton: HTMLElement,
    rightButton: HTMLElement,
    slidingPart: HTMLElement,
    pictureAmount: number
  ): void {
    leftButton.addEventListener('click', () => {
      const currentPosition = Number(slidingPart.style.left.slice(0, slidingPart.style.left.length - 2));
      if (Math.abs(currentPosition) > SLIDE_WIDTH) {
        /* eslint-disable no-param-reassign */
        slidingPart.style.left = `${String(currentPosition + SLIDE_WIDTH)}px`;
        /* eslint-enable no-param-reassign */
        this.setActiveArrow(rightButton);
      } else {
        /* eslint-disable no-param-reassign */
        slidingPart.style.left = `${String(currentPosition + Math.abs(currentPosition))}px`;
        /* eslint-enable no-param-reassign */
        this.setInactiveArrow(leftButton);
        if (pictureAmount > 1) {
          this.setActiveArrow(rightButton);
        }
      }
    });
  }

  private processRightButtonClick(
    leftButton: HTMLElement,
    rightButton: HTMLElement,
    slidingPart: HTMLElement,
    pictureAmount: number
  ): void {
    rightButton.addEventListener('click', () => {
      const currentPosition = Number(slidingPart.style.left.slice(0, slidingPart.style.left.length - 2));
      const slideRightCriteria: boolean =
        Math.abs(currentPosition) + slidingPart.offsetWidth + SLIDE_WIDTH < SLIDE_WIDTH * pictureAmount;
      const smallShiftAmount = SLIDE_WIDTH * pictureAmount - Math.abs(currentPosition) - slidingPart.offsetWidth;
      if (
        pictureAmount * SLIDE_WIDTH - Math.abs(currentPosition) > 0 &&
        slideRightCriteria &&
        Slider.previousSlideCriteria
      ) {
        /* eslint-disable no-param-reassign */
        slidingPart.style.left = `${String(currentPosition - SLIDE_WIDTH)}px`;
        /* eslint-enable no-param-reassign */
        this.setActiveArrow(leftButton);
      } else if (smallShiftAmount <= SLIDE_WIDTH && smallShiftAmount > 0) {
        /* eslint-disable no-param-reassign */
        slidingPart.style.left = `${String(currentPosition - smallShiftAmount)}px`;
        /* eslint-enable no-param-reassign */
        this.setInactiveArrow(rightButton);
        this.setActiveArrow(leftButton);
      }
      Slider.previousSlideCriteria = slideRightCriteria;
    });
  }

  private setPreviousSlideCriteria() {
    window.addEventListener('resize', () => {
      Slider.previousSlideCriteria = false;
    });
  }

  private setDefaultSmallArrowStyles(slider: HTMLElement, pictureAmount: number) {
    const leftButton = slider.querySelector(`#${SliderSelectors.SLIDER_LEFT}`) as HTMLElement;
    const rightButton = slider.querySelector(`#${SliderSelectors.SLIDER_RIGHT}`) as HTMLElement;
    const slidingPart = slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_PICTURES}`) as HTMLElement;
    const slidingPartWrapper = slider.querySelector(`#${SliderSelectors.SLIDER_SMALL_IMAGES_WRAPPER}`) as HTMLElement;
    const currentPosition = Number(slidingPart.style.left.slice(0, slidingPart.style.left.length - 2));

    setTimeout(() => {
      if (Math.abs(currentPosition) > SLIDE_WIDTH) {
        this.setActiveArrow(rightButton);
      } else {
        this.setInactiveArrow(leftButton);
        this.setActiveArrow(rightButton);
      }
      const slideRightCriteria: boolean =
        Math.abs(currentPosition) + slidingPart.offsetWidth + SLIDE_WIDTH < SLIDE_WIDTH * pictureAmount;
      const smallShiftAmount = SLIDE_WIDTH * pictureAmount - Math.abs(currentPosition) - slidingPart.offsetWidth;
      if (
        pictureAmount * SLIDE_WIDTH - Math.abs(currentPosition) > 0 &&
        slideRightCriteria &&
        Slider.previousSlideCriteria
      ) {
        this.setActiveArrow(leftButton);
      } else if (smallShiftAmount <= SLIDE_WIDTH && smallShiftAmount > 0) {
        this.setInactiveArrow(rightButton);
        this.setActiveArrow(leftButton);
      }
      if (pictureAmount === 1) {
        this.setInactiveArrow(leftButton);
        this.setInactiveArrow(rightButton);
      }

      if (slidingPart.offsetWidth < slidingPartWrapper.offsetWidth) {
        this.setInactiveArrow(leftButton);
        this.setInactiveArrow(rightButton);
      }
    }, 100);
  }
}
