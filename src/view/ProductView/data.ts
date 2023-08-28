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
  PRODUCT_MODAL_CLOSE = 'close-icon',
}

enum ProductModal {
  MODAL_MAIN_PICTURE = 'picture',
  MODAL_SMALL_PICTURES = 'small-pictures',
}

const categoryStyles = ['border-solid', 'rounded-full', 'border-2', 'px-3'];

export { currencySymbol, currencyName, categoryStyles, ProductElements, ProductModal };
