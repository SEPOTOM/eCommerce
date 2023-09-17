const currencySymbol = {
  USD: '$',
  GBP: '£',
};

const currencyName = {
  USD: 'USD',
  GBP: 'GBP',
};

enum ProductElements {
  PRODUCT_NAME = 'product-name',
  PRODUCT_SLIDER = 'slider-component',
  PRODUCT_PICTURES = 'product-pictures',
  PRODUCT_RIGHT_ARROW = 'right-arrow',
  PRODUCT_LEFT_ARROW = 'left-arrow',
  PRODUCT_PICTURES_ALL = 'pictures-small',
  PRODUCT_CATEGORY = 'product-category',
  PRODUCT_DESCRIPTION = 'product-description',
  PRODUCT_PRICE = 'product-price',
  PRODUCT_PRICE_ORIGINAL = 'original-price',
  PRODUCT_DETAILS = 'product-details',
  PRODUCT_WRAPPER = 'product-wrapper',
  PRODUCT_ADD = 'add-button',
  PRODUCT_REMOVE = 'remove-button',
  PRODUCT_AMOUNT = 'amount',
  PRODUCT_AMOUNT_CONTAINER = 'amount-container',
  PRODUCT_NETWORK_ERROR = 'network-error',
  PRODUCT_ADDED_SUCCESSFULLY = 'success',
  PRODUCT_PLEASE_LOGIN = 'please-login',
  PRODUCT_BUTTON_BLOCK = 'button-block',
  PRODUCT_OUT_OF_STOCK = 'out-of-stock',
  PRODUCT_IN_CART = 'in-cart',
}

const categoryStyles = ['border-solid', 'rounded-full', 'border-2', 'px-3', 'text-center', 'self-center'];

export { currencySymbol, currencyName, categoryStyles, ProductElements };
