export interface ICategoryInfoJSON {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  key: string;
  parent?: {
    id: string;
  };
}

// export interface IAlpineComponent {
//   title: string | null;
//   description: string | null;
//   products: IShortProductsJSON[];
//   isLoading: boolean;
//   init: () => void;
//   priceConverter: (T: string) => string;
// }

export interface IAllProducts {
  results: Array<IShortProductsJSON>;
}

export interface IShortProductsJSON {
    id: string;
    key: string;
    name: { [key: string]: string };
    description: { [key: string]: string };
    masterVariant: {
      images: [{ url: string }];
      attributes?: [
        {
          name: string;
          value: string | { [key: string]: string };
        },
      ];
      availability?: {
        isOnStock: boolean;
      };
      prices: [
        {
          value: {
            centAmount: number;
            currencyCode: string;
          };
          discounted?: {
            value: {
              centAmount: number;
            };
          };
        },
      ];
    };
}

export interface IBodyRequest {
  method: string;
  headers: {
    Authorization: string;
  };
}

export interface IShortCategoryJSON {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  key: string;
  parent?: {
    id: string;
  };
}

export interface IBodyRequest {
  method: string;
  headers: {
    Authorization: string;
  };
}

export interface IRouteProductLink {
  link: string;
  productId: string;
}

