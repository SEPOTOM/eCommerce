enum LabelTexts {
  EMAIL = 'Email',
}

enum InputTypes {
  EMAIL = 'email',
}

export default class RegistrationView {
  public static buildRegistrationView(): HTMLFormElement {
    const form = document.createElement('form');

    const emailRow = RegistrationView.buildRowView(LabelTexts.EMAIL, InputTypes.EMAIL);
    form.append(emailRow);

    return form;
  }

  private static buildRowView(labelText: LabelTexts, inputType: InputTypes, inputPattern?: string): HTMLElement {
    const row = document.createElement('div');

    const label = RegistrationView.buildLabelView(labelText, inputType, inputPattern);
    row.append(label);

    return row;
  }

  private static buildLabelView(text: LabelTexts, inputType: InputTypes, inputPattern?: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = text;

    const input = RegistrationView.buildInputView(inputType, inputPattern);
    label.append(input);

    return label;
  }

  private static buildInputView(type: InputTypes, pattern?: string): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.required = true;

    if (pattern) {
      input.pattern = pattern;
    }

    return input;
  }
}
