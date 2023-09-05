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
