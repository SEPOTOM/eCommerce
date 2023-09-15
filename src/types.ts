export interface Link {
  content: string;
  href: string;
}

export interface DiscountCodesResponse {
  results: DiscountCodeResponse[];
}

export interface DiscountCodeResponse {
  code: string;
  description: ILocalizedString;
}

export interface DiscountCodeInfo {
  code: string;
  description: string;
}

export interface CartsResponse {
  results: CartResponse[];
}

export interface CartResponse {
  id: string;
  lineItems: LineItemResponse[];
  version: number;
  totalPrice: ITypedMoney;
  totalLineItemQuantity?: number;
}

export interface LineItemResponse {
  id: string;
  productId?: string;
  quantity: number;
  name: ILocalizedString;
  price: IPrices;
  totalPrice: ITypedMoney;
  variant: IMasterVariant;
}

export interface CartInfo {
  id: string;
  totalPrice: string;
  productsInfo: ProductInfo[];
  version: number;
}

export interface ProductInfo {
  itemId: string;
  imageSrc: string;
  name: string;
  quantity: number;
  individualPrice: string;
  totalPrice: string;
  discountedIndividualPrice?: string;
}

export interface CustomerCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
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
  customer: CustomerDataResponse;
}

export interface CustomerDataResponse {
  addresses: Address[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: CreatedOrModifiedBy;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: CreatedOrModifiedBy;
  lastName: string;
  middleName: string;
  password: string;
  shippingAddressIds: string[];
  stores: [];
  title: string;
  version: number;
  versionModifiedAt: string;
  dateOfBirth?: string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
}

export interface CreatedOrModifiedBy {
  isPlatformClient: boolean;
  clientId?: string;
  user?: {
    id: string;
    typeId: string;
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

export interface InputOptions {
  type?: string;
  id?: string;
  validationData: PatternAndMessage[];
  dataAttr?: {
    name: string;
    value: string;
  };
}

export type PatternAndMessage = [RegExp, string];

export interface AlpineRouter {
  isCustomerLogin: boolean;
  activeItemMenu: number;
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
  lastVariantId: number;
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
  availability?: IAvailability;
}

interface IAvailability {
  availableQuantity: number;
  id: string;
  isOnStock: boolean;
  version: number;
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
  discounted?: IDiscount;
  tiers?: object[];
  custom?: object;
}

interface IDiscount {
  value: ITypedMoney;
  discount: object;
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

export interface IAddLineItem {
  version: number;
  actions: IAction[];
}

export interface ICartTemplate {
  currency: string;
}

interface IAction {
  action: string;
  productId?: string;
  variantId?: number;
  quantity?: number;
  lineItemId?: string;
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

export {
  IClientLoginResponse,
  ICustomerLoginResponse,
  IError,
  IProduct,
  IAttributes,
  IImages,
  ITypedMoney,
  TokenPayload,
};

export type EventCallback = (e: Event) => void;
