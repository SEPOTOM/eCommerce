enum InputTypes {
  EMAIL = 'email',
}

export default class RegistrationView {
  public static buildRegistrationView(): HTMLFormElement {
    const form = document.createElement('form');

    return form;
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
