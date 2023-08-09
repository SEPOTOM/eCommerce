enum LabelTexts {
  EMAIL = 'Email',
}

enum InputTypes {
  EMAIL = 'email',
}

export default class RegistrationView {
  public static buildRegistrationView(): HTMLFormElement {
    const form = document.createElement('form');

    return form;
  }

  private static buildRowView(labelText: LabelTexts, inputType: InputTypes, inputPattern?: RegExp): HTMLElement {
    const row = document.createElement('div');

    const label = RegistrationView.buildLabelView(labelText, inputType, inputPattern);
    row.append(label);

    return row;
  }

  private static buildLabelView(text: LabelTexts, inputType: InputTypes, inputPattern?: RegExp): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = text;

    const input = RegistrationView.buildInputView(inputType, inputPattern);
    label.append(input);

    return label;
  }

  private static buildInputView(type: InputTypes, pattern?: RegExp): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.required = true;

    if (pattern) {
      input.pattern = `${pattern}`;
    }

    return input;
  }
}
