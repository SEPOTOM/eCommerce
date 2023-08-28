export interface INavigation {
  text: string;
  link: string;
  categoryId?: string;
}

export interface IAllCategories {
  results: Array<ISingleCategory>;
}

export interface ISingleCategory {
  name: { [key: string]: string };
  key: string;
  id: string;
}

export interface IBodyRequest {
  method: string;
  headers: {
    Authorization: string;
  };
}
