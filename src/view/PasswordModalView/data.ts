import { InputOptions, PatternAndMessage } from '../../types';

export enum DataAttrs {
  CANCEL_BUTTON = 'data-cancel-button',
  SAVE_BUTTON = 'data-save-button',
  MODAL_CONTENT = 'data-modal-content',
  ROW = 'data-row-modal-password',
  LABEL = 'data-label-modal-password',
}

export const ValidationData: Record<string, PatternAndMessage[]> = {
  PASSWORD: [],
};

export const ModalInputsOptions: InputOptions[] = [
  { validationData: ValidationData.PASSWORD },
  { validationData: ValidationData.PASSWORD },
];
