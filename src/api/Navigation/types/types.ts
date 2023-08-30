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
