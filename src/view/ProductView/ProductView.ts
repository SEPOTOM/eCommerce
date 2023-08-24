import ProductHTML from './ProductView.html';
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
import { currencySymbol, currencyName, categoryStyles, smallPictureStyles } from './data';

const accessToken = 'access_token';

const centsPerDollar = 100;

export default class ProductView {
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
    this.addProductPictureSlider(productDetails, productHTML);
    this.addAllProductPictures(productDetails, productHTML);
    this.addProductName(productDetails, productHTML);
    this.addProductCategories(productDetails, productHTML);
    this.addProductDescription(productDetails, productHTML);
    this.addProductPrice(productDetails, productHTML);
    this.addProductCharacteristics(productDetails, productHTML);
  }

  private addProductPictureSlider(productDetails: IProduct, productHTML: HTMLElement): void {
    const productPicture = productHTML.querySelector(`#${ProductElements.PRODUCT_PICTURES}`) as HTMLElement;
    const pictureContainer = document.createElement('img');
    const imagesArray = productDetails.masterData.current.masterVariant.images as IImages[];
    if ('url' in imagesArray[0]) {
      pictureContainer.setAttribute('src', `${imagesArray[0].url}`);
      productPicture.appendChild(pictureContainer);
    }
  }

  private addAllProductPictures(productDetails: IProduct, productHTML: HTMLElement): void {
    const allPictures = productHTML.querySelector(`#${ProductElements.PRODUCT_PICTURES_ALL}`) as HTMLElement;
    const imagesArray = productDetails.masterData.current.masterVariant.images as IImages[];

    imagesArray.forEach(element => {
      // const pictureContainer = document.createElement('img');
      // pictureContainer.setAttribute('src', `${element.url}`);

      const blockContainer = document.createElement('div');
      blockContainer.style.backgroundImage = `url(${element.url})`;
      blockContainer.style.width = '150px';
      blockContainer.style.height = '100px';
      blockContainer.style.backgroundSize = 'contain';
      blockContainer.style.backgroundRepeat = 'no-repeat';
      blockContainer.style.backgroundPosition = 'center center';
      // blockContainer.appendChild(pictureContainer);

      smallPictureStyles.forEach(element => {
        blockContainer.classList.add(element);
      });

      allPictures.appendChild(blockContainer);
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
