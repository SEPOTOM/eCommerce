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

export interface IRouteProductLink {
  link: string;
  productId: string;
}

export interface IShortProductsJSON {
  results: [
    {
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
    },
  ];
}
