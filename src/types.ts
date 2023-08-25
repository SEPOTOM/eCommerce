export interface CustomerCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Address {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
  id?: string;
}

export interface CustomerResponse {
  customer: {
    addresses: Address[];
    authenticationMode: string;
    billingAddressIds: string[];
    createdAt: string;
    createdBy: {
      clientId: string;
      isPlatformClient: boolean;
    };
    email: string;
    firstName: string;
    id: string;
    isEmailVerified: boolean;
    lastMessageSequenceNumber: number;
    lastModifiedAt: string;
    lastModifiedBy: {
      clientId: string;
      isPlatformClient: boolean;
    };
    lastName: string;
    password: string;
    shippingAddressIds: string[];
    stores: [];
    version: number;
    versionModifiedAt: string;
  };
}

export interface RegErrorResponse {
  errors: RegError[];
  message: string;
  statusCode: number;
}

export interface RegError {
  code: string;
  message: string;
  detailedErrorMessage?: string;
  field?: string;
}

export interface ResponseInfo {
  ok: boolean;
  message: string;
}

export interface AlpineRouter {
  isCustomerLogin: boolean;
  init(): void;
  route(event: Event): void;
  logout(): void;
  handleLocation(): void;
  checkCustomerLogin(): void;
}

interface IClientLoginResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface ICustomerLoginResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

interface IErrorItems {
  code: string;
  message: string;
}

interface IError {
  statusCode: number;
  message: string;
  errors: IErrorItems[];
  error: string;
  error_description: string;
}

interface IProduct {
  id: string;
  version: number;
  key: string;
  productType: IProductTypeReference;
  masterData: IProductCatalogData;
  taxCategory: ITaxCategoryReference;
  state: object;
  reviewRatingStatistics: object;
  priceMode: string;
  createdAt: Date;
  createdBy: object;
  lastModifiedAt: Date;
  lastModifiedBy: object;
}

interface IProductTypeReference {
  id: string;
  typeId: string;
  obj: object;
}

interface IProductCatalogData {
  published: boolean;
  current: IProductData;
  staged: IProductData;
  hasStagedChanges: boolean;
}

interface IProductData {
  name: ILocalizedString;
  categories: ICategoryReference[];
  categoryOrderHints: object;
  description: ILocalizedString;
  slug: ILocalizedString;
  metaTitle: ILocalizedString;
  metaDescription: ILocalizedString;
  metaKeywords: ILocalizedString;
  masterVariant: IMasterVariant;
  variants: object[];
  searchKeywords: object;
}

interface ILocalizedString {
  'en-US': string;
}

interface ICategoryReference {
  id: string;
  typeId: string;
  obj: object;
}

interface ITaxCategoryReference {
  id: string;
  typeId: string;
  obj?: object;
}

interface IMasterVariant {
  id: number;
  sku?: string;
  prices: IPrices[];
  images?: IImages[];
  attributes?: IAttributes[];
  assets?: object[];
}

interface IPrices {
  id: string;
  key?: string;
  value: ITypedMoney;
  country?: object;
  customerGroup?: object;
  channel?: object;
  validFrom?: Date;
  validUntil?: Date;
  discounted?: object;
  tiers?: object[];
  custom?: object;
}

interface ITypedMoney {
  centAmount: number;
  currencyCode: string;
  type: string;
  fractionDigits: number;
}

interface IImages {
  url: string;
  dimensions: IDimensions;
  label?: string;
}

interface IDimensions {
  w: number;
  h: number;
}

interface IAttributes {
  name: string;
  value: boolean | string | number | Date | IEnum;
}

interface IEnum {
  key: string;
  label: string;
}

export interface ICategory {
  id: string;
  version: number;
  key?: string;
  externalId?: string;
  name: ILocalizedString;
  slug: ILocalizedString;
  description?: ILocalizedString;
  ancestors: ICategoryReference[];
  parent?: ICategoryReference;
  orderHint: string;
  metaTitle?: ILocalizedString;
  metaDescription?: ILocalizedString;
  metaKeywords?: ILocalizedString;
  assets?: object[];
  custom?: object;
  createdAt: Date;
  createdBy?: object;
  lastModifiedAt: Date;
  lastModifiedBy?: object;
}

enum TokenPayload {
  EXPIRES_IN = 'expires_in',
  REFRESH_TOKEN = 'refresh_token',
  SCOPE = 'scope',
  TOKEN_TYPE = 'token_type',
}

enum ProductElements {
  PRODUCT_NAME = 'product-name',
  PRODUCT_PICTURES = 'product-pictures',
  PRODUCT_RIGHT_ARROW = 'right-arrow',
  PRODUCT_LEFT_ARROW = 'left-arrow',
  PRODUCT_PICTURES_ALL = 'pictures-small',
  PRODUCT_CATEGORY = 'product-category',
  PRODUCT_DESCRIPTION = 'product-description',
  PRODUCT_PRICE = 'product-price',
  PRODUCT_DETAILS = 'product-details',
}

export {
  IClientLoginResponse,
  ICustomerLoginResponse,
  IError,
  IProduct,
  IAttributes,
  IImages,
  TokenPayload,
  ProductElements,
};

export type EventCallback = (e: Event) => void;
