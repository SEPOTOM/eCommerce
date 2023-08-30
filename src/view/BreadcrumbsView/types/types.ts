export interface IBreadCrumbsLink {
  name: string;
  link: string;
}

export interface ICategoryInfoJSON {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  key: string;
  parent?: {
    id: string;
  };
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
