/* eslint-disable import/no-cycle */
import ProductHTML from './ProductView.html';
import Converter from '../../components/Converter/Converter';
import ProductModalView from './ProductModalView/ProductModalView';
import Product from '../../api/Product/Product';
import Authorization from '../../api/Authorization/Authorization';
import Category from '../../api/Category/Category';
import BreadcrumbsView from '../BreadcrumbsView/BreadcrumbsView';
import Slider from './Slider/Slider';
import CartAPI from '../../api/CartAPI/CartAPI';
import { SliderSelectors } from './Slider/data';
import {
  CTP_AUTH_URL,
  /* CTP_API_URL, */
  /* CTP_PROJECT_KEY, */
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
} from '../../api/APIClients/JSNinjas-custom';
import {
  IProduct,
  IClientLoginResponse,
  IError,
  IAttributes,
  IImages,
  ICategory,
  IAddLineItem,
  CartResponse,
  ICartTemplate,
} from '../../types';
import { IBreadCrumbsLink } from '../BreadcrumbsView/types/types';
import { currencySymbol, currencyName, categoryStyles, ProductElements } from './data';
import Tokens from '../../components/Tokens/Tokens';
import Cart from '../../components/Cart/Cart';

const accessToken = 'access_token';

const sliderClickDelay = 1200;

const errorTimeOut = 3000;

export default class ProductView {
  private static activeImage: number = 0;

  private lastTimeClick: number;

  constructor() {
    this.lastTimeClick = Date.now();
  }

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

        this.manageCartButtons(id, productDetails as IProduct);

        // Set breadcrumbs
        const productLink: IBreadCrumbsLink = {
          name: (productDetails as IProduct).masterData.current.name['en-US'],
          link: `/${(productDetails as IProduct).key}`,
        };
        BreadcrumbsView.createProductPath(productLink);
      } catch (error) {
        (document.querySelector('main') as HTMLElement).firstChild?.remove();
        (document.querySelector('main') as HTMLElement).textContent = 'Product with the specified ID is not found';
      }
    } else {
      (document.querySelector('main') as HTMLElement).firstChild?.remove();
      (document.querySelector('main') as HTMLElement).textContent = clientTokens.message;
    }
  }

  private async manageCartButtons(productID: string, productDetails: IProduct): Promise<void> {
    const personalCart = await CartAPI.get();
    const inCart = this.productIsInCart(productID, personalCart);

    if (inCart) {
      this.disableAddToCart();
    } else {
      this.disableRemoveFromCart();
    }

    this.processAddProduct(productID, productDetails);
    this.processRemoveProduct(personalCart, productID);
  }

  private disableAddToCart(): void {
    const addToCartButton = document.querySelector(`#${ProductElements.PRODUCT_ADD}`) as HTMLButtonElement;
    const removeFromCartButton = document.querySelector(`#${ProductElements.PRODUCT_REMOVE}`) as HTMLButtonElement;

    addToCartButton.classList.add('hidden');

    removeFromCartButton.classList.remove('hidden');
  }

  private disableRemoveFromCart(): void {
    const addToCartButton = document.querySelector(`#${ProductElements.PRODUCT_ADD}`) as HTMLButtonElement;
    const removeFromCartButton = document.querySelector(`#${ProductElements.PRODUCT_REMOVE}`) as HTMLButtonElement;

    removeFromCartButton.classList.add('hidden');

    addToCartButton.classList.remove('hidden');
  }

  private processRemoveProduct(personalCart: CartResponse | Error, productID: string) {
    const removeFromCartButton = document.querySelector(`#${ProductElements.PRODUCT_REMOVE}`) as HTMLButtonElement;

    removeFromCartButton.addEventListener('click', async () => {
      const itemID = await this.getLineItemID(productID);
      if ('version' in personalCart) {
        if (itemID) {
          const payload: IAddLineItem = {
            version: await CartAPI.getActiveCartVersion(),
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: itemID,
              },
            ],
          };

          if ('id' in personalCart) {
            const response = await CartAPI.updateLineItem(String(personalCart.id), payload);
            if (!(response instanceof Error)) {
              this.disableRemoveFromCart();
              this.showMessage(document.querySelector(`#${ProductElements.PRODUCT_ADDED_SUCCESSFULLY}`) as HTMLElement);
              const cart = new Cart();
              cart.updateCurrentCart(response);
            }
          }
        } else {
          this.showMessage(document.querySelector(`#${ProductElements.PRODUCT_NETWORK_ERROR}`) as HTMLElement);
        }
      }
    });
  }

  private async getLineItemID(productID: string): Promise<string> {
    let lineItemID: string = '';
    const lineItemsArray = await this.getLineItemArray();

    if (!(lineItemsArray instanceof Error) && lineItemsArray !== undefined) {
      lineItemsArray.forEach((element) => {
        if ('id' in element && 'productId' in element) {
          if (element.productId === productID) {
            lineItemID = String(element.id);
          }
        }
      });
    } else {
      this.showMessage(document.querySelector(`#${ProductElements.PRODUCT_NETWORK_ERROR}`) as HTMLElement);
    }
    return lineItemID;
  }

  private async getLineItemArray(): Promise<object[] | Error> {
    const activeCart = await CartAPI.get();

    return (activeCart as CartResponse).lineItems;
  }

  private processAddProduct(productID: string, productDetails: IProduct) {
    const addToCartButton = document.querySelector(`#${ProductElements.PRODUCT_ADD}`) as HTMLButtonElement;

    addToCartButton.addEventListener('click', async () => {
      let personalCart = await CartAPI.get();
      if (personalCart instanceof Error) {
        const payload: ICartTemplate = {
          currency: currencyName.USD,
        };
        await CartAPI.createCustomerCart(payload);
        personalCart = await CartAPI.get();
      }

      if ('id' in personalCart && 'version' in personalCart) {
        const personalCartID = String(personalCart.id);
        const payload: IAddLineItem = {
          version: await CartAPI.getActiveCartVersion(),
          actions: [
            {
              action: 'addLineItem',
              productId: productID,
              variantId: productDetails.lastVariantId,
              quantity: Number(
                (document.querySelector(`#${ProductElements.PRODUCT_AMOUNT}`) as HTMLInputElement).value
              ),
            },
          ],
        };
        const response = await CartAPI.updateLineItem(personalCartID, payload);
        if ('lineItems' in response) {
          this.disableAddToCart();
          this.showMessage(document.querySelector(`#${ProductElements.PRODUCT_ADDED_SUCCESSFULLY}`) as HTMLElement);
          const cart = new Cart();
          cart.updateCurrentCart(response);
        } else {
          this.showMessage(document.querySelector(`#${ProductElements.PRODUCT_NETWORK_ERROR}`) as HTMLElement);
        }
      }
    });
  }

  private productIsInCart(productID: string, personalCart: CartResponse | Error): boolean {
    let inCart: boolean = false;

    if (!(personalCart instanceof Error)) {
      (personalCart as CartResponse).lineItems.forEach((element) => {
        if ('productId' in element) {
          if (element.productId === productID) {
            inCart = true;
          }
        }
      });
    }

    return inCart;
  }

  private async getClientToken(): Promise<IClientLoginResponse | IError | Error> {
    const endpoint: string = `${CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${CTP_SCOPES}`;
    const basicToken: string = btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`);
    const clientTokens: IClientLoginResponse | IError | Error = await Authorization.loginClient(endpoint, basicToken);
    return clientTokens;
  }

  private putProductDataToPage(productDetails: IProduct, productHTML: HTMLElement): void {
    this.addSlider(productDetails, productHTML);
    this.addProductName(productDetails, productHTML);
    this.addProductCategories(productDetails, productHTML);
    this.addProductDescription(productDetails, productHTML);
    this.addProductPrice(productDetails, productHTML);
    this.addProductCharacteristics(productDetails, productHTML);
    this.processButtonsVisibility();
  }

  private addSlider(productDetails: IProduct, productHTML: HTMLElement): void {
    const sliderContainer = productHTML.querySelector(`#${ProductElements.PRODUCT_SLIDER}`) as HTMLElement;
    const imagesArray: IImages[] = productDetails.masterData.current.masterVariant.images as IImages[];
    const productSlider = new Slider();

    sliderContainer.appendChild(
      productSlider.getSlider(imagesArray[ProductView.activeImage].url, imagesArray, ProductView.activeImage)
    );

    const htmlSlider = productHTML.querySelector(`#${SliderSelectors.SLIDER_MAIN_PICTURE}`) as HTMLElement;
    const sliderBox = productHTML.querySelector(`#${SliderSelectors.SLIDER_CONTAINER}`) as HTMLElement;

    // Adapt the re-used slider for product page
    htmlSlider.classList.add('relative');
    sliderBox.classList.add('h-[450px]');
    sliderBox.classList.add('sm:h-[650px]');

    (htmlSlider.lastChild as HTMLElement).addEventListener('click', () => {
      const modal = new ProductModalView();
      if (Date.now() - this.lastTimeClick >= sliderClickDelay) {
        modal.showProductModal(
          (htmlSlider.lastChild as Node).cloneNode(true) as HTMLElement,
          imagesArray,
          productSlider.activeImage
        );
        this.lastTimeClick = Date.now();
      }
    });

    this.setLastTimeClick();
  }

  private setLastTimeClick(): void {
    const leftButton = document.querySelector(`#${SliderSelectors.SLIDER_MAIN_LEFT}`) as HTMLElement;
    const rightButton = document.querySelector(`#${SliderSelectors.SLIDER_MAIN_RIGHT}`) as HTMLElement;

    if (leftButton && rightButton) {
      leftButton.addEventListener('click', () => {
        this.lastTimeClick = Date.now();
      });

      rightButton.addEventListener('click', () => {
        this.lastTimeClick = Date.now();
      });
    }
  }

  private widenDescription(): void {
    const miniImages = document.querySelector(`#${SliderSelectors.SLIDER_SMALL_PICTURES}`) as HTMLElement;
    const productWrapper = document.querySelector(`#${ProductElements.PRODUCT_WRAPPER}`) as HTMLElement;
    const productDescription = document.querySelector(`#${ProductElements.PRODUCT_DESCRIPTION}`) as HTMLElement;

    miniImages.remove();

    productWrapper.appendChild(productDescription);
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

  private async processButtonsVisibility(): Promise<void> {
    const pleaseLoginText = document.querySelector(`#${ProductElements.PRODUCT_PLEASE_LOGIN}`) as HTMLElement;
    const buttonBlock = document.querySelector(`#${ProductElements.PRODUCT_BUTTON_BLOCK}`) as HTMLButtonElement;
    const tokens = await Tokens.getCustomerTokens();

    if (tokens) {
      if ('access_token' in tokens && tokens.access_token) {
        buttonBlock.classList.remove('hidden');
        pleaseLoginText.classList.add('hidden');
      } else {
        buttonBlock.classList.add('hidden');
        pleaseLoginText.classList.remove('hidden');
      }
    } else {
      buttonBlock.classList.add('hidden');
      pleaseLoginText.classList.remove('hidden');
    }
  }

  private getProductView(id: string): HTMLElement {
    const productHTML: HTMLElement = Converter.htmlToElement(ProductHTML) as HTMLElement;
    this.displayProductByID(id, productHTML);
    return productHTML;
  }

  private showMessage(messageContainer: HTMLElement): void {
    messageContainer.classList.remove('hidden');
    setTimeout(() => {
      messageContainer.classList.add('hidden');
    }, errorTimeOut);
  }
}
