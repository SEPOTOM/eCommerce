/* eslint-disable import/no-cycle */
// import Catalog from '../../../api/Catalog/Catalog';
import BreadcrumbsView from '../../BreadcrumbsView/BreadcrumbsView';
import { IAllProducts, IShortProductsJSON } from '../types/types';

// Import images placeholder if product don't have an image
import imgProductPlaceholder from '../../../assets/image_placeholder.jpg';

import { CTP_API_URL, CTP_PROJECT_KEY } from './../../../api/APIClients/JSNinjas';

const CategoryViewAlpine = {
  title: null,
  description: null,
  isLoading: false,
  products: [],
  urlPath: '',
  searchRequest: '',
  filterQuery: '',
  filterActiveProps: {},
  filterAllProps: {},
  sortQuery: '',
  sortActive: 'default',

  /* eslint-disable max-lines-per-function */
  init(): void {
    const delay = 1000;
    this.urlPath = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search?filter=categories.id:"${this.categoryId}"`;
    this.filterQuery = '';
    this.filterActiveProps = {};
    this.filterAllProps = {};
    this.getProductsByQuery();

    setTimeout(() => { this.isLoading = true }, delay);
  },

  getProductsByQuery(filterQuery: string = '', sortQuery: string = ''): void {
    fetch(`${this.urlPath}${filterQuery}${sortQuery}`, this.setBodyRequest()).then((resp) => resp.json()).then((json: IAllProducts): void => {
      this.setProductData(json.results);
    });
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
          if (!this.filterAllProps.hasOwnProperty(attr.name)) {
            this.filterAllProps[attr.name] = [];
            this.filterActiveProps[attr.name] = 0;
          }

          // save only uniqe value
          if (!this.filterAllProps[attr.name].filter((item: any) => item.name === attr.value).length) {
            this.filterAllProps[attr.name].push({
              name: attr.value,
              action: `&filter=variants.attributes.${attr.name}:`,
              active: false,
            });
          }
        }
      })
    }
  },

  sortBy(type: string, direction: string, activeText: string): void {
    this.sortActive = activeText;
    this.sortQuery = `&sort=${type} ${direction}`;
    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  filterBy(prop: string, index: number, value: string, filterQuery: string): void {
    this.filterAllProps[prop][index]['active'] = !this.filterAllProps[prop][index]['active'];

    if (this.filterAllProps[prop][index]['active']) {
      this.filterActiveProps[prop] += 1;
    } else {
      this.filterActiveProps[prop] -= 1;
    }

    if (!this.filterQuery.includes(filterQuery)) {
      if (this.filterActiveProps[prop]) {
        this.filterQuery += `${filterQuery}"${value}"`;
      }
    } else {
      if (this.filterActiveProps[prop]) {
        if (!this.filterQuery.includes(value)) {
          this.filterQuery = this.filterQuery.replace(filterQuery, `${filterQuery}"${value}",`);
        } else {
          this.filterQuery = this.filterQuery.replace(`"${value}",`, '');
          this.filterQuery = this.filterQuery.replace(`,"${value}"`, '');
        }
      } else {
        this.filterQuery = this.filterQuery.replace(`${filterQuery}"${value}"`, '');
      }
    }

    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  clearFilter() {
    this.filterQuery = '';

    for (let key in this.filterActiveProps) {
      this.filterActiveProps[key] = 0;
    }

    for (let key in this.filterAllProps) {
      for (let obj in this.filterAllProps[key]) {
        this.filterAllProps[key][obj]['active'] = false;
      }
    }

    this.getProductsByQuery(this.filterQuery, this.sortQuery);
  },

  quickSearch() {
    fetch(`${this.urlPath}${this.searchRequest ? `&fuzzy=true&fuzzyLevel=0&text.en-US="${this.searchRequest}"` : ''}`, this.setBodyRequest())
    .then((resp) => resp.json())
    .then((json: IAllProducts): void => {
      if (json.results.length) {
        this.setProductData(json.results);
      } else {
        this.getProductsByQuery();
      }
    })
  },

  clearQuickSearch() {
    this.searchRequest = '';
    this.getProductsByQuery();
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
};

export default CategoryViewAlpine;
