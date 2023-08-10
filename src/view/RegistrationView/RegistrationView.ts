const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;
const NAME_REGEXP = /^(\w*[^\d_])+$/;

enum LabelTexts {
  EMAIL = 'Email',
  PASSWORD = 'Password',
  FIRST_NAME = 'First name',
}

enum InputTypes {
  EMAIL = 'email',
  PASSWORD = 'password',
  NAME = 'text',
}

export default class RegistrationView {
  public static buildRegistrationView(): HTMLFormElement {
    const form = document.createElement('form');

    const emailRow = RegistrationView.buildRowView(LabelTexts.EMAIL, InputTypes.EMAIL, EMAIL_REGEXP, LabelTexts.EMAIL);
    form.append(emailRow);

    const passwordRow = RegistrationView.buildRowView(
      LabelTexts.PASSWORD,
      InputTypes.PASSWORD,
      PASSWORD_REGEXP,
      LabelTexts.PASSWORD
    );
    form.append(passwordRow);

    const firstNameRow = RegistrationView.buildRowView(
      LabelTexts.FIRST_NAME,
      InputTypes.NAME,
      NAME_REGEXP,
      LabelTexts.FIRST_NAME
    );
    form.append(firstNameRow);

    return form;
  }

  private static buildRowView(
    labelText: LabelTexts,
    inputType: InputTypes,
    regExp: RegExp,
    fieldName: string
  ): HTMLElement {
    const row = document.createElement('div');

    const label = RegistrationView.buildLabelView(labelText, inputType, regExp, fieldName);
    row.append(label);

    return row;
  }

  private static buildLabelView(
    text: LabelTexts,
    inputType: InputTypes,
    regExp: RegExp,
    fieldName: string
  ): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = text;

    const input = RegistrationView.buildInputView(inputType, regExp, fieldName);
    label.append(input);

    return label;
  }

  private static buildInputView(type: InputTypes, regExp: RegExp, fieldName: string): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.required = true;

    input.addEventListener('change', (e: Event): void => {
      if (e.currentTarget instanceof HTMLInputElement) {
        RegistrationView.validateInput(input, regExp, fieldName);
      }
    });

    return input;
  }

  private static validateInput(input: HTMLInputElement, regExp: RegExp, fieldName: string): void {
    if (regExp.test(input.value)) {
      console.log(`${fieldName} is valid!`);
    } else {
      console.error(`${fieldName} is invalid!`);
    }
  }
}
