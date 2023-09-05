export interface INavigation {
  text: string;
  link: string;
  categoryId?: string;
}

export interface INavigationLevel1 {
  text: string;
  link: string;
  categoryId?: string;
  children?: INavigationLevel2[];
}

export interface INavigationLevel2 {
  text: string;
  link: string;
  categoryId: string;
  parentId: string;
}

export interface IAllCategories {
  results: Array<ISingleCategory>;
}

export interface ISingleCategory {
  name: { [key: string]: string };
  key: string;
  id: string;
  parent: {
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

export interface IAllProducts {
  results: Array<IShortProductsJSON>;
}

export interface IShortProductsJSON {
  id: string;
  key: string;
  masterData: {
    current: {
      categories: [{ id: string }];
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
    };
  };
}
