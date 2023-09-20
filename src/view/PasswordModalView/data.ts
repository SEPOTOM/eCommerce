import { InputOptions, PatternAndMessage } from '../../types';
import { InputTypes, RegExps, ErrorMessages } from '../../data/validation';

export enum DataAttrs {
  CANCEL_BUTTON = 'data-cancel-button',
  SAVE_BUTTON = 'data-save-button',
  MODAL_CONTENT = 'data-modal-content',
  ROW = 'data-row-modal-password',
  LABEL = 'data-label-modal-password',
  ERROR_BLOCK = 'data-error-block',
}

export const ValidationData: Record<string, PatternAndMessage[]> = {
  PASSWORD: [
    [RegExps.NO_HASH, ErrorMessages.NO_HASH],
    [RegExps.MIN_LENGTH, ErrorMessages.MIN_LENGTH],
    [RegExps.ONE_UPPERCASE, ErrorMessages.ONE_UPPERCASE],
    [RegExps.ONE_LOWERCASE, ErrorMessages.ONE_LOWERCASE],
    [RegExps.ONE_DIGIT, ErrorMessages.ONE_DIGIT],
    [RegExps.ONE_SPECIAL, ErrorMessages.ONE_SPECIAL],
    [RegExps.NO_EDGE_WHITESPACE, ErrorMessages.NO_EDGE_WHITESPACE],
  ],
};

export const ModalInputsOptions: InputOptions[] = [
  { validationData: ValidationData.PASSWORD, type: InputTypes.PASSWORD },
  { validationData: ValidationData.PASSWORD, type: InputTypes.PASSWORD },
];
