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
  PRODUCT_NETWORK_ERROR = 'network-error',
  PRODUCT_ADDED_SUCCESSFULLY = 'success',
}

const categoryStyles = ['border-solid', 'rounded-full', 'border-2', 'px-3', 'text-center', 'self-center'];

export { currencySymbol, currencyName, categoryStyles, ProductElements };
