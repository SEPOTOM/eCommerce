/* eslint-disable import/no-cycle */
import { IAllProducts, IShortProductsJSON } from '../types/types';
import { CartResponse, IAddLineItem } from '../../../types';

// Import images placeholder if product don't have an image
import imgProductPlaceholder from '../../../assets/image_placeholder.jpg';
import CartAPI from '../../../api/CartAPI/CartAPI';
import HeaderView from '../../HeaderView/HeaderView';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../../../api/APIClients/JSNinjas';

const CategoryViewAlpine = {
  title: null,
  description: null,
  isLoading: false,
  products: [],
  productInCart: [],
  urlPath: '',
  searchRequest: '',
  searchQuery: '',
  searchResultCount: 0,
  filterQuery: '',
  filterActiveProps: {},
  filterAllProps: {},
  sortQuery: '',
  sortActive: 'default',
  productLimit: 100,
  productOffset: 0,
  maxPaginationCount: 0,
  loadedPage: 1,
  buttonStatus: {
    step1: 'Adding...',
    step2: 'Added',
  },
  messageStatus: 'success',
  showMessage: false,

  /* eslint-disable max-lines-per-function */
  init(): void {
    const delayForCategoryLoading = 1000;
    const delayForSetPagination = 200;
    this.urlPath = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search?filter=categories.id:"${this.categoryId}"`;
    this.filterQuery = '';
    this.filterActiveProps = {};
    this.filterAllProps = {};

    // Create array of products in cart
    this.productInCart = [];
    this.getProductInCart();

    // need to get first all filters
    this.getProductsByQuery();
    this.productLimit = 4;
    this.products = [];

    setTimeout(() => {
      this.getProductsByQuery();
    }, delayForSetPagination);

    setTimeout(() => {
      this.isLoading = true;
    }, delayForCategoryLoading);
  },

  getProductsByQuery(filterQuery: string = '', sortQuery: string = ''): void {
    try {
      fetch(
        `${this.urlPath}${this.searchQuery}&limit=${this.productLimit}&offset=${this.productOffset}${filterQuery}${sortQuery}`,
        this.setBodyRequest()
      )
        .then((resp) => resp.json())
        .then((json: IAllProducts): void => {
          this.maxPaginationCount = json.total ? Math.ceil(json.total / this.productLimit) : 0;
          this.searchResultCount = json.total ? json.total : 0;
          this.setProductData(json.results);
        });
    } catch {
      /* eslint-disable no-empty */
    }
  },

  setProductData(json: IShortProductsJSON[]): void {
    this.products = [];

    json.forEach((item): void => {
      // get product information
      this.products.push({
        id: item.id,
        link: `/${item.key}`,
        name: item.name['en-US'],
        description: item.description['en-US'] || '',
        image: item.masterVariant.images.length ? item.masterVariant.images[0].url : imgProductPlaceholder,
        attributes: item.masterVariant?.attributes || [],
        onStock: item.masterVariant?.availability?.isOnStock || false,
        price: item.masterVariant.prices.length
          ? (item.masterVariant.prices[0].value.centAmount / 100).toFixed(2)
          : null,
        discount:
          item.masterVariant.prices.length && item.masterVariant.prices[0].discounted
            ? (item.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2)
            : null,
        currency: item.masterVariant.prices.length ? item.masterVariant.prices[0].value.currencyCode : null,
      });

      this.getAllFilterProps(item);
    });
  },

  getAllFilterProps(json: IShortProductsJSON): void {
    if (json.masterVariant?.attributes) {
      json.masterVariant?.attributes.forEach((attr) => {
        if (attr.name !== 'transmission') {
          // if filter prop not exist
          /* eslint-disable no-prototype-builtins */
          if (!this.filterAllProps.hasOwnProperty(attr.name)) {
            /* eslint-disable no-prototype-builtins */
            this.filterAllProps[attr.name] = [];
            this.filterActiveProps[attr.name] = 0;
          }

          // save only uniqe value
          if (
            !this.filterAllProps[attr.name].filter((item: { [key: string]: string }) => item.name === attr.value).length
          ) {
            this.filterAllProps[attr.name].push({
              name: attr.value,
              action: `&filter=variants.attributes.${attr.name}:`,
              active: false,
            });

            // Sort filter by values
            this.filterAllProps[attr.name].sort((a: { [key: string]: string }, b: { [key: string]: string }) =>
              a.name > b.name ? 1 : -1
            );
          }
        }
      });
    }
  },

  sortBy(type: string, direction: string, activeText: string): void {
    this.sortActive = activeText;
    this.sortQuery = `&sort=${type} ${direction}`;
    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  filterBy(prop: string, index: number, value: string, filterQuery: string): void {
    this.filterAllProps[prop][index].active = !this.filterAllProps[prop][index].active;

    if (this.filterAllProps[prop][index].active) {
      this.filterActiveProps[prop] += 1;
    } else {
      this.filterActiveProps[prop] -= 1;
    }

    if (!this.filterQuery.includes(filterQuery)) {
      if (this.filterActiveProps[prop]) {
        this.filterQuery += `${filterQuery}"${value}"`;
      }
    } else if (this.filterActiveProps[prop]) {
      if (!this.filterQuery.includes(value)) {
        this.filterQuery = this.filterQuery.replace(filterQuery, `${filterQuery}"${value}",`);
      } else {
        this.filterQuery = this.filterQuery.replace(`"${value}",`, '');
        this.filterQuery = this.filterQuery.replace(`,"${value}"`, '');
      }
    } else {
      this.filterQuery = this.filterQuery.replace(`${filterQuery}"${value}"`, '');
    }

    this.productOffset = 0;
    this.loadedPage = 1;
    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  clearFilter(): void {
    this.filterQuery = '';

    /* eslint-disable no-restricted-syntax, guard-for-in */
    for (const key in this.filterActiveProps) {
      this.filterActiveProps[key] = 0;
    }

    for (const key in this.filterAllProps) {
      for (const obj in this.filterAllProps[key]) {
        this.filterAllProps[key][obj].active = false;
      }
    }

    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  quickSearch(): void {
    this.searchQuery =
      this.searchRequest.length > 4 ? `&fuzzy=true&fuzzyLevel=1&text.en-US="${this.searchRequest}"` : '';

    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  clearQuickSearch(): void {
    this.searchRequest = '';
    this.searchQuery = '';
    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  priceConverter(price: string): string {
    const [left, right] = price.split('.');
    const leftModify: string[] = [];

    left
      .split('')
      .reverse()
      .forEach((symbol, index) => {
        if ((index + 1) % 3 === 0) {
          leftModify.push(` ${symbol}`);
        } else {
          leftModify.push(symbol);
        }
      });

    return `${leftModify.reverse().join('')}.${right}`;
  },

  changePagination(action: string): void {
    if (action === 'next' && this.loadedPage !== this.maxPaginationCount) this.loadedPage += 1;
    if (action === 'prev' && this.loadedPage !== 1) this.loadedPage -= 1;
    if (action === 'first') this.loadedPage = 1;
    if (action === 'last') this.loadedPage = this.maxPaginationCount;

    this.productOffset = this.productLimit * this.loadedPage - this.productLimit;
    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  async addToBasket(e: Event, id: string): Promise<void> {
    e.stopPropagation();
    e.preventDefault();
    const delay = 1000;

    // Add delay between product adding
    if (!(e.target as HTMLElement).classList.contains('wait')) {
      // Run progress
      (e.target as HTMLElement).innerHTML = this.buttonStatus.step1;
      (e.target as HTMLElement).classList.add('opacity-50', 'wait');

      // Get or create personal cart
      const cartData: CartResponse = await this.getCartData();

      const BODY: IAddLineItem = {
        version: (cartData as CartResponse).version,
        actions: [
          {
            action: 'addLineItem',
            productId: id,
          },
        ],
      };

      // Add to cart
      let savedResponse: CartResponse;

      await CartAPI.updateLineItem((cartData as CartResponse).id, BODY)
        .then((response) => {
          if (response instanceof Error) {
            this.messageStatus = 'error';
          } else {
            this.messageStatus = 'success';
            HeaderView.setBasketCount(response.totalLineItemQuantity!);
            savedResponse = response;
          }
        })
        .finally(() => {
          (e.target as HTMLElement).innerHTML = this.buttonStatus.step2;
          this.showMessage = true;

          setTimeout((): void => {
            this.saveProductsInCart(savedResponse);
            this.showMessage = false;
          }, delay);
        });
    }
  },

  async getCartData(): Promise<CartResponse | Error> {
    // Get or create personal cart
    const cartData: CartResponse | Error = await CartAPI.get().then(async (response): Promise<CartResponse | Error> => {
      if (response instanceof Error) {
        await CartAPI.createCustomerCart({ currency: 'USD' });
        return CartAPI.get();
      }

      return response;
    });

    return cartData;
  },

  async getProductInCart() {
    const cartData: CartResponse = await this.getCartData();
    this.saveProductsInCart(cartData);
  },

  saveProductsInCart(cartData: CartResponse): void {
    if ((cartData as CartResponse).lineItems) {
      for (const item of (cartData as CartResponse).lineItems) {
        this.productInCart.push(item.productId);
      }

      this.productInCart = [...new Set(this.productInCart)];
    }
  },
};

export default CategoryViewAlpine;
