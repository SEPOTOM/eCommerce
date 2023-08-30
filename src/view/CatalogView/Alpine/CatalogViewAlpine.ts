/* eslint-disable import/no-cycle */
import Catalog from '../../../api/Catalog/Catalog';
import BreadcrumbsView from '../../BreadcrumbsView/BreadcrumbsView';
import { ICategoryInfoJSON, IAlpineComponent, IShortProductsJSON } from '../types/types';

// Import images placeholder if product don't have an image
import imgProductPlaceholder from '../../../assets/image_placeholder.jpg';

const CategoryViewAlpine: IAlpineComponent = {
  title: null,
  description: null,
  products: [],
  isLoading: true,

  /* eslint-disable max-lines-per-function */
  init(): void {
    const delay: number = 1000;

    setTimeout(() => {
      this.isLoading = false;
    }, delay);

    Catalog.getCategoryInfoJSON(this.categoryId).then((json: ICategoryInfoJSON | null): void => {
      if (!json) return;

      this.title = json.name['en-US'];
      this.description = json.description['en-US'];

      BreadcrumbsView.createCategoryPath(json);
    });

    Catalog.getAllProductsJSON().then((json: IShortProductsJSON | null): void => {
      if (!json) return;

      this.products = [];

      json.results.forEach((item): void => {
        if (item.masterData.current.categories.some((obj) => obj.id === this.categoryId)) {
          const { current } = item.masterData;

          this.products.push({
            id: item.id,
            link: `/${item.key}`,
            name: current.name['en-US'],
            description: current.description['en-US'] || '',
            image: current.masterVariant.images.length ? current.masterVariant.images[0].url : imgProductPlaceholder,
            attributes: current.masterVariant?.attributes || [],
            onStock: current.masterVariant?.availability?.isOnStock || false,
            price: current.masterVariant.prices.length
              ? (current.masterVariant.prices[0].value.centAmount / 100).toFixed(2)
              : null,
            discount:
              current.masterVariant.prices.length && current.masterVariant.prices[0].discounted
                ? (current.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2)
                : null,
            currency: current.masterVariant.prices.length ? current.masterVariant.prices[0].value.currencyCode : null,
          });
        }
      });
    });
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
