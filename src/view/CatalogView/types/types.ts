export interface IAllProducts {
  results: Array<IShortProductsJSON>;
  total?: number;
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
