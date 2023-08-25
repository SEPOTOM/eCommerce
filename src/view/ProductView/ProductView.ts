import ProductHTML from './ProductView.html';
import ProductPicture from './ProductPicture/ProductPicture.html';
import MainPicture from './MainPicture/MainPicture.html';
import Converter from '../../components/Converter/Converter';
import Product from '../../api/Product/Product';
import Authorization from '../../api/Authorization/Authorization';
import Category from '../../api/Category/Category';
import {
  CTP_AUTH_URL,
  /* CTP_API_URL, */
  /* CTP_PROJECT_KEY, */
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../../api/APIClients/JSNinjas-custom';
import { IProduct, IClientLoginResponse, IError, IAttributes, IImages, ProductElements, ICategory } from '../../types';
import { currencySymbol, currencyName, categoryStyles } from './data';

const accessToken = 'access_token';

const centsPerDollar = 100;

const hiddenPictureOpacity = '30%';

const visiblePictureOpacity = '100%';

const urlStartPosition = 5;

const urlEndShift = -2;

export default class ProductView {
  private static activeImage: number = 0;

  public draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(this.getProductView('ab39b246-c292-4e50-94d6-3b2b61ee2e28'));
  }

  public async displayProductByID(id: string, productHTML: HTMLElement): Promise<void> {
    const clientTokens: IClientLoginResponse | IError | Error = await this.getClientToken();

    const product = new Product();
    let productDetails: IProduct | IError | Error;

    if (accessToken in clientTokens) {
      productDetails = await product.getProductByID(id, clientTokens.access_token);
      this.putProductDataToPage(productDetails as IProduct, productHTML);
    } else {
      productDetails = new Error(`${clientTokens.message}`);
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
    }
  }

  private addAllProductPictures(productDetails: IProduct, productHTML: HTMLElement): void {
    const allPictures = productHTML.querySelector(`#${ProductElements.PRODUCT_PICTURES_ALL}`) as HTMLElement;
    const imagesArray = productDetails.masterData.current.masterVariant.images as IImages[];

    for (let i = 0; i < imagesArray.length; i += 1) {
      const blockContainer = Converter.htmlToElement(ProductPicture) as HTMLElement;
      blockContainer.style.backgroundImage = `url(${imagesArray[i].url})`;
      ProductView.activeImage = 0;
      allPictures.appendChild(blockContainer);
    }
    this.setActiveImage();
  }

  private setActiveImage(): void {
    const pictureContainers = document.getElementById('pictures-small')?.childNodes as NodeListOf<ChildNode>;
    const productPicture = document.querySelector(`#${ProductElements.PRODUCT_PICTURES}`) as HTMLElement;
    const activeImage = pictureContainers[ProductView.activeImage] as HTMLElement;
    const activeImageURL = activeImage.style.backgroundImage.slice(urlStartPosition, urlEndShift);

    pictureContainers.forEach((element) => {
      (element as HTMLElement).style.opacity = hiddenPictureOpacity;
    });

    activeImage.style.opacity = visiblePictureOpacity;
    console.log(activeImageURL);

    (productPicture.lastChild as HTMLImageElement).setAttribute('src', activeImageURL);
  }

  private addSlider(productDetails: IProduct, productHTML: HTMLElement): void {
    const rightArrow = productHTML.querySelector(`#${ProductElements.PRODUCT_RIGHT_ARROW}`) as HTMLElement;
    const leftArrow = productHTML.querySelector(`#${ProductElements.PRODUCT_LEFT_ARROW}`) as HTMLElement;
    const minIndex = 0;
    const maxIndex = (productDetails.masterData.current.masterVariant.images as IImages[]).length - 1;

    rightArrow.addEventListener('click', (event) => {
      event.preventDefault();
      if (ProductView.activeImage + 1 <= maxIndex) {
        ProductView.activeImage += 1;
        this.setActiveImage();
      }
    });

    leftArrow.addEventListener('click', (event) => {
      event.preventDefault();
      if (ProductView.activeImage - 1 >= minIndex) {
        ProductView.activeImage -= 1;
        this.setActiveImage();
      }
    });
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
    productDescription.textContent = productDetails.masterData.current.description['en-US'];
  }

  private addProductPrice(productDetails: IProduct, productHTML: HTMLElement): void {
    const productPrice = productHTML.querySelector(`#${ProductElements.PRODUCT_PRICE}`) as HTMLElement;
    const productCurrency = productDetails.masterData.current.masterVariant.prices[0].value.currencyCode;
    const productPriceAmount =
      productDetails.masterData.current.masterVariant.prices[0].value.centAmount / centsPerDollar;

    if (productCurrency === currencyName.USD) {
      productPrice.textContent = `Price: ${currencySymbol.USD}${productPriceAmount}`;
    }
    if (productCurrency === currencyName.GBP) {
      productPrice.textContent = `Price: ${currencySymbol.GBP}${productPriceAmount}`;
    }
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
