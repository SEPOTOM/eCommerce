import ProductHTML from './ProductView.html';
import ProductPicture from './ProductPictureView/ProductPictureView.html';
import MainPicture from './MainPictureView/MainPictureView.html';
import Converter from '../../components/Converter/Converter';
import ProductModalView from './ProductModalView/ProductModalView';
import Product from '../../api/Product/Product';
import Authorization from '../../api/Authorization/Authorization';
import Category from '../../api/Category/Category';
import BreadcrumbsView from '../BreadcrumbsView/BreadcrumbsView';
import {
  CTP_AUTH_URL,
  /* CTP_API_URL, */
  /* CTP_PROJECT_KEY, */
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../../api/APIClients/JSNinjas-custom';
import { IProduct, IClientLoginResponse, IError, IAttributes, IImages, ICategory } from '../../types';
import { currencySymbol, currencyName, categoryStyles, ProductElements } from './data';
import { IBreadCrumbLink } from '../CatalogView/types/types';

const accessToken = 'access_token';

const urlStartPosition = 5;

const urlEndShift = -2;

export default class ProductView {
  private static activeImage: number = 0;

  public draw(id: string): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(this.getProductView(id));
  }

  private async displayProductByID(id: string, productHTML: HTMLElement): Promise<void> {
    const clientTokens: IClientLoginResponse | IError | Error = await this.getClientToken();

    const product = new Product();
    let productDetails: IProduct | IError | Error;

    if (accessToken in clientTokens) {
      try {
        productDetails = await product.getProductByID(id, clientTokens.access_token);
        this.putProductDataToPage(productDetails as IProduct, productHTML);

        // Set breadcrumbs
        const arrayCrumbs: IBreadCrumbLink[] = [];
        const productLinks: IBreadCrumbLink = {
          name: (productDetails as IProduct).masterData.current.name['en-US'],
          link: `/${(productDetails as IProduct).key}`,
        };

        const categoryLink: string | null = localStorage.getItem('previousCategory');

        if (categoryLink) arrayCrumbs.push(JSON.parse(categoryLink));
        arrayCrumbs.push(productLinks);

        new BreadcrumbsView().draw(arrayCrumbs);
      } catch (error) {
        (document.querySelector('main') as HTMLElement).firstChild?.remove();
        (document.querySelector('main') as HTMLElement).textContent = 'Product with the specified ID is not found';
      }
    } else {
      (document.querySelector('main') as HTMLElement).firstChild?.remove();
      (document.querySelector('main') as HTMLElement).textContent = clientTokens.message;
    }
  }

  private async getClientToken(): Promise<IClientLoginResponse | IError | Error> {
    const endpoint: string = `${CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${CTP_SCOPES}`;
    const basicToken: string = btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`);
    const clientTokens: IClientLoginResponse | IError | Error = await Authorization.loginClient(endpoint, basicToken);
    return clientTokens;
  }

  private putProductDataToPage(productDetails: IProduct, productHTML: HTMLElement): void {
    this.addMainPicture(productDetails, productHTML);
    this.addAllProductPictures(productDetails, productHTML);
    this.addSlider(productDetails, productHTML);
    this.addProductName(productDetails, productHTML);
    this.addProductCategories(productDetails, productHTML);
    this.addProductDescription(productDetails, productHTML);
    this.addProductPrice(productDetails, productHTML);
    this.addProductCharacteristics(productDetails, productHTML);
  }

  private addMainPicture(productDetails: IProduct, productHTML: HTMLElement): void {
    const productPicture = productHTML.querySelector(`#${ProductElements.PRODUCT_PICTURES}`) as HTMLElement;

    const pictureContainer = Converter.htmlToElement(MainPicture) as HTMLElement;

    const imagesArray = productDetails.masterData.current.masterVariant.images as IImages[];
    if ('url' in imagesArray[0]) {
      pictureContainer.setAttribute('src', `${imagesArray[0].url}`);
      productPicture.appendChild(pictureContainer);

      pictureContainer.addEventListener('click', () => {
        const modal = new ProductModalView();
        modal.showProductModal(
          (pictureContainer as Node).cloneNode(true) as HTMLElement,
          imagesArray,
          ProductView.activeImage
        );
      });
    }
  }

  private addAllProductPictures(productDetails: IProduct, productHTML: HTMLElement): void {
    const allPictures = productHTML.querySelector(`#${ProductElements.PRODUCT_PICTURES_ALL}`) as HTMLElement;
    const imagesArray = productDetails.masterData.current.masterVariant.images as IImages[];

    for (let i = 0; i < imagesArray.length; i += 1) {
      const blockContainer = Converter.htmlToElement(ProductPicture) as HTMLElement;
      blockContainer.style.backgroundImage = `url(${imagesArray[i].url})`;
      ProductView.activeImage = 0;

      blockContainer.addEventListener('click', () => {
        ProductView.activeImage = i;
        this.setActiveImage();
        this.setArrowStyles(imagesArray.length - 1);
      });

      allPictures.appendChild(blockContainer);
    }
    this.setActiveImage();

    if (imagesArray.length < 2) {
      this.removeImageNavigation();
    }
  }

  private setActiveImage(): void {
    const pictureContainers = document.getElementById('pictures-small')?.childNodes as NodeListOf<ChildNode>;
    const productPicture = document.querySelector(`#${ProductElements.PRODUCT_PICTURES}`) as HTMLElement;
    const activeImage = pictureContainers[ProductView.activeImage] as HTMLElement;
    const activeImageURL = activeImage.style.backgroundImage.slice(urlStartPosition, urlEndShift);

    pictureContainers.forEach((element) => {
      (element as HTMLElement).classList.remove('opacity-100');
      (element as HTMLElement).classList.add('opacity-30');
    });

    (activeImage as HTMLElement).classList.remove('opacity-30');
    (activeImage as HTMLElement).classList.add('opacity-100');

    // the following block makes smooth change of the main product image
    (productPicture.lastChild as HTMLImageElement).classList.add('opacity-0');
    setTimeout(() => {
      (productPicture.lastChild as HTMLImageElement).setAttribute('src', activeImageURL);
      (productPicture.lastChild as HTMLImageElement).classList.remove('opacity-0');
    }, 500);
  }

  private removeImageNavigation(): void {
    const leftArrow = document.querySelector(`#${ProductElements.PRODUCT_LEFT_ARROW}`);
    const rightArrow = document.querySelector(`#${ProductElements.PRODUCT_RIGHT_ARROW}`);

    leftArrow?.remove();
    rightArrow?.remove();
  }

  private widenDescription(): void {
    const miniImages = document.querySelector(`#${ProductElements.PRODUCT_PICTURES_ALL}`) as HTMLElement;
    const productWrapper = document.querySelector(`#${ProductElements.PRODUCT_WRAPPER}`) as HTMLElement;
    const productDescription = document.querySelector(`#${ProductElements.PRODUCT_DESCRIPTION}`) as HTMLElement;

    miniImages.remove();

    productWrapper.appendChild(productDescription);
  }

  private addSlider(productDetails: IProduct, productHTML: HTMLElement): void {
    const rightArrow = productHTML.querySelector(`#${ProductElements.PRODUCT_RIGHT_ARROW}`) as HTMLElement;
    const leftArrow = productHTML.querySelector(`#${ProductElements.PRODUCT_LEFT_ARROW}`) as HTMLElement;
    const minIndex = 0;
    const maxIndex = (productDetails.masterData.current.masterVariant.images as IImages[]).length - 1;

    leftArrow.classList.remove('hover:bg-white/50');
    rightArrow.classList.remove('cursor-not-allowed');

    if (maxIndex > 0) {
      rightArrow.addEventListener('click', () => {
        if (ProductView.activeImage + 1 <= maxIndex) {
          ProductView.activeImage += 1;
          this.setActiveImage();
          this.setArrowStyles(maxIndex);
        }
      });

      leftArrow.addEventListener('click', () => {
        if (ProductView.activeImage - 1 >= minIndex) {
          ProductView.activeImage -= 1;
          this.setActiveImage();
          this.setArrowStyles(maxIndex);
        }
      });
    }
  }

  private setArrowStyles(maxIndex: number): void {
    const rightArrow = document.querySelector(`#${ProductElements.PRODUCT_RIGHT_ARROW}`) as HTMLElement;
    const leftArrow = document.querySelector(`#${ProductElements.PRODUCT_LEFT_ARROW}`) as HTMLElement;
    if (ProductView.activeImage === 0) {
      this.setActiveArrow(rightArrow);
      this.setInactiveArrow(leftArrow);
    }
    if (ProductView.activeImage === maxIndex) {
      this.setActiveArrow(leftArrow);
      this.setInactiveArrow(rightArrow);
    }
    if (ProductView.activeImage > 0 && ProductView.activeImage < maxIndex) {
      this.setActiveArrow(rightArrow);
      this.setActiveArrow(leftArrow);
    }
  }

  private setActiveArrow(arrow: HTMLElement): void {
    arrow.classList.add('hover:bg-white/50');
    arrow.classList.add('cursor-pointer');
    arrow.classList.remove('cursor-not-allowed');
  }

  private setInactiveArrow(arrow: HTMLElement): void {
    arrow.classList.remove('hover:bg-white/50');
    arrow.classList.remove('cursor-pointer');
    arrow.classList.add('cursor-not-allowed');
  }

  private addProductName(productDetails: IProduct, productHTML: HTMLElement): void {
    const productName = productHTML.querySelector(`#${ProductElements.PRODUCT_NAME}`) as HTMLElement;
    productName.textContent = productDetails.masterData.current.name['en-US'];
  }

  private async addProductCategories(productDetails: IProduct, productHTML: HTMLElement): Promise<void> {
    const productCategory = productHTML.querySelector(`#${ProductElements.PRODUCT_CATEGORY}`) as HTMLElement;
    const categoriesArray = productDetails.masterData.current.categories;
    const clientTokens: IClientLoginResponse | IError | Error = await this.getClientToken();

    categoriesArray.forEach(async (element) => {
      const category = new Category();
      if ('access_token' in clientTokens) {
        const categoryDetails = await category.getCategoryByID(element.id, clientTokens.access_token);
        productCategory.appendChild(this.getCategoryShortcut((categoryDetails as ICategory).name['en-US']));
      }
    });
  }

  private getCategoryShortcut(categoryName: string): HTMLElement {
    const shortcut = document.createElement('span');
    shortcut.textContent = categoryName;
    categoryStyles.forEach((element) => {
      shortcut.classList.add(element);
    });
    return shortcut;
  }

  private addProductDescription(productDetails: IProduct, productHTML: HTMLElement): void {
    const productDescription = productHTML.querySelector(`#${ProductElements.PRODUCT_DESCRIPTION}`) as HTMLElement;
    const imagesArray = productDetails.masterData.current.masterVariant.images as IImages[];
    productDescription.textContent = productDetails.masterData.current.description['en-US'];

    if (imagesArray.length < 2) {
      this.widenDescription();
    }
  }

  private addProductPrice(productDetails: IProduct, productHTML: HTMLElement): void {
    const productPrice = productHTML.querySelector(`#${ProductElements.PRODUCT_PRICE}`) as HTMLElement;
    const productOldPrice = productHTML.querySelector(`#${ProductElements.PRODUCT_PRICE_ORIGINAL}`) as HTMLElement;
    const productCurrency = productDetails.masterData.current.masterVariant.prices[0].value.currencyCode;
    let productPriceAmount: string;
    let oldPrice: string;

    if (productDetails.masterData.current.masterVariant.prices[0].discounted) {
      productPriceAmount = this.setTwoDecimals(
        productDetails.masterData.current.masterVariant.prices[0].discounted.value.centAmount
      );
      oldPrice = this.setTwoDecimals(productDetails.masterData.current.masterVariant.prices[0].value.centAmount);
      productOldPrice.textContent = `${currencySymbol.USD}${oldPrice}`;
    } else {
      productPriceAmount = this.setTwoDecimals(
        productDetails.masterData.current.masterVariant.prices[0].value.centAmount
      );
    }

    if (productCurrency === currencyName.USD) {
      productPrice.textContent = `Price: ${currencySymbol.USD}${productPriceAmount}`;
    }
    if (productCurrency === currencyName.GBP) {
      productPrice.textContent = `Price: ${currencySymbol.GBP}${productPriceAmount}`;
    }
  }

  private setTwoDecimals(num: number): string {
    const numString = String(num);
    const floatString = `${numString.slice(0, numString.length - 2)}.${numString.slice(
      numString.length - 2,
      numString.length
    )}`;

    return floatString;
  }

  private addProductCharacteristics(productDetails: IProduct, productHTML: HTMLElement): void {
    const productCharacteristics = productHTML.querySelector(`#${ProductElements.PRODUCT_DETAILS}`) as HTMLElement;
    const characteristics = productDetails.masterData.current.masterVariant.attributes as IAttributes[];
    characteristics.forEach((element) => {
      if (typeof element.value === 'object' && 'label' in element.value) {
        productCharacteristics.innerHTML += `${element.name.charAt(0).toUpperCase()}${element.name.slice(1)}: ${
          element.value.label
        }<br>`;
      } else {
        productCharacteristics.innerHTML += `${element.name.charAt(0).toUpperCase()}${element.name.slice(1)}: ${
          element.value
        }<br>`;
      }
    });
  }

  private getProductView(id: string): HTMLElement {
    const productHTML: HTMLElement = Converter.htmlToElement(ProductHTML) as HTMLElement;
    this.displayProductByID(id, productHTML);
    return productHTML;
  }
}
