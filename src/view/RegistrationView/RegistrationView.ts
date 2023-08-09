import { EventCallback } from './types';

import validateEmail from './validation';

enum LabelTexts {
  EMAIL = 'Email',
}

enum InputTypes {
  EMAIL = 'email',
}

export default class RegistrationView {
  public static buildRegistrationView(): HTMLFormElement {
    const form = document.createElement('form');

    const emailRow = RegistrationView.buildRowView(LabelTexts.EMAIL, InputTypes.EMAIL, validateEmail);
    form.append(emailRow);

    return form;
  }

  private static buildRowView(labelText: LabelTexts, inputType: InputTypes, callback?: EventCallback): HTMLElement {
    const row = document.createElement('div');

    const label = RegistrationView.buildLabelView(labelText, inputType, callback);
    row.append(label);

    return row;
  }

  private static buildLabelView(text: LabelTexts, inputType: InputTypes, callback?: EventCallback): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = text;

    const input = RegistrationView.buildInputView(inputType, callback);
    label.append(input);

    return label;
  }

  private static buildInputView(type: InputTypes, callback?: EventCallback): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.required = true;

    if (callback) {
      input.addEventListener('change', callback);
    }

    return input;
  }
}
