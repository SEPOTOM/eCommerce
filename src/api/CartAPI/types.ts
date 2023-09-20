export interface UpdateRequest {
  version: number;
  actions: Action[];
}

export interface Action {
  action: string;
}

export interface LineItemChangeQuantityAction extends Action {
  action: 'changeLineItemQuantity';
  lineItemId: string;
  quantity: number;
}

export interface LineItemRemoveAction extends Action {
  action: 'removeLineItem';
  lineItemId: string;
}

export interface AddDiscountCodeAction extends Action {
  action: 'addDiscountCode';
  code: string;
}
