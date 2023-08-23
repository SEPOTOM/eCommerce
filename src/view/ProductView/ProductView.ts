import ProductHTML from './ProductView.html';
import Converter from '../../components/Converter/Converter';
import Product from '../../api/Product/Product';
import Authorization from '../../api/Authorization/Authorization';
import {
  CTP_AUTH_URL,
  /* CTP_API_URL, */
  /* CTP_PROJECT_KEY, */
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../../api/APIClients/JSNinjas-custom';
import { IProduct, IClientLoginResponse, IError, IAttributes, IImages, ProductElements } from '../../types';
import { currencySymbol, currencyName } from './data';

const accessToken = 'access_token';

const centsPerDollar = 100;

export default class ProductView {
  public draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(this.getProductView('ab39b246-c292-4e50-94d6-3b2b61ee2e28'));
  }

  public async displayProductByID(id: string, productHTML: HTMLElement): Promise<void> {
    const endpoint: string = `${CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${CTP_SCOPES}`;
    const basicToken: string = btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`);
    const clientTokens: IClientLoginResponse | IError | Error = await Authorization.loginClient(endpoint, basicToken);

    const product = new Product();
    let productDetails: IProduct | IError | Error;

    if (accessToken in clientTokens) {
      productDetails = await product.getProductByID(id, clientTokens.access_token);
      console.log(productDetails);
      this.putProductDataToPage(productDetails as IProduct, productHTML);
    } else {
      productDetails = new Error(`${clientTokens.message}`);
    }
  }

  private putProductDataToPage(productDetails: IProduct, productHTML: HTMLElement): void {
    // Put picture
    this.addProductPictureSlider(productDetails, productHTML);

    // Put product name
    const productName = productHTML.querySelector(`#${ProductElements.PRODUCT_NAME}`) as HTMLElement;
    productName.textContent = productDetails.masterData.current.name['en-US'];
    // Put category
    // const categoryName = productHTML.querySelector(`#${ProductElements.PRODUCT_CATEGORY}`) as HTMLElement;
    // TODO: To fetch categories by IDs ant to put it on html
    // Put product description
    const productDescription = productHTML.querySelector(`#${ProductElements.PRODUCT_DESCRIPTION}`) as HTMLElement;
    productDescription.textContent = productDetails.masterData.current.description['en-US'];
    // Put price
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

    // Put details
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

  private addProductPictureSlider(productDetails: IProduct, productHTML: HTMLElement): void {
    const productPicture = productHTML.querySelector(`#${ProductElements.PRODUCT_PICTURES}`) as HTMLElement;
    const pictureContainer = document.createElement('img');
    const imagesArray = productDetails.masterData.current.masterVariant.images as IImages[];
    if ('url' in imagesArray[0]) {
      pictureContainer.setAttribute('src', `${imagesArray[0].url}`);
      productPicture.appendChild(pictureContainer);
    }
  }

  private getProductView(id: string): HTMLElement {
    const productHTML: HTMLElement = Converter.htmlToElement(ProductHTML) as HTMLElement;
    this.displayProductByID(id, productHTML);
    return productHTML;
  }
}
