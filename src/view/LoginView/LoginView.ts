import passwordShown from '../../assets/svg/eyeOpen.svg';
import passwordHidden from '../../assets/svg/eyeClosed.svg';
import Authorization from '../../api/Authorization/Authorization';
import { ICustomerLoginResponse, IError } from '../../types';
import Tokens from '../../components/Tokens/Tokens';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  EXCLAMATION_MARK,
  UPPER_CASE_REGEX,
  LOWER_CASE_REGEX,
  NUMBERS_CASE_REGEX,
  SPECIAL_CASE_REGEX,
  DOMAIN_REGEX,
  PASSWORD_MIN_LENGTH,
  loginWindowStyles,
  loginFormStyles,
  formCaptionStyles,
  inputStyles,
  passwordContainerStyles,
  passwordModeStyles,
  buttonContainerStyles,
  loginButtonStyles,
  cancelButtonStyles,
  registrationButtonStyles,
  validationErrorStyles,
  loginWindowAttributes,
  loginFormAttributes,
  loginInputAttributes,
  passwordInputAttributes,
  okButtonAttributes,
  cancelButtonAttributes,
  loginErrorAttributes,
  passwordErrorAttributes,
} from './data';

export default class LoginView {
  private static loginWindow: HTMLDivElement;

  private static loginValid: boolean = true;

  private static passwordValid: boolean = true;

  public static showLoginView(): HTMLDivElement {
    LoginView.loginWindow = document.createElement('div');
    const loginForm: HTMLFormElement = document.createElement('form');

    LoginView.cleanLoginView();

    LoginView.addStyles(LoginView.loginWindow, loginWindowStyles);
    LoginView.addStyles(loginForm, loginFormStyles);

    LoginView.addAttributes(LoginView.loginWindow, loginWindowAttributes);
    LoginView.addAttributes(loginForm, loginFormAttributes);

    LoginView.addLoginForm(loginForm);

    LoginView.loginWindow.appendChild(loginForm);
    return LoginView.loginWindow;
  }

  public static addStyles(htmlElement: HTMLElement, styles: string[]): void {
    styles.forEach((element) => {
      htmlElement.classList.add(element);
    });
  }

  private static addAttributes(htmlElement: HTMLElement, styles: string[][]): void {
    styles.forEach((element) => {
      htmlElement.setAttribute(element[0], element[1]);
    });
  }

  private static async addLoginForm(loginForm: HTMLFormElement): Promise<void> {
    await LoginView.addLoginCaption(loginForm);
    await LoginView.addLoginInput(loginForm);
    await LoginView.addPasswordInput(loginForm);
    await LoginView.addLoginButtons(loginForm);
    await LoginView.addErrorBlock();
    LoginView.addValidation();
  }

  private static addLoginCaption(loginForm: HTMLFormElement): void {
    const caption = document.createElement('div');
    LoginView.addStyles(caption, formCaptionStyles);
    caption.textContent = 'Welcome!';

    loginForm.appendChild(caption);
  }

  private static addLoginInput(loginForm: HTMLFormElement): void {
    const container = document.createElement('div');
    const input = document.createElement('input');

    LoginView.addStyles(input, inputStyles);
    LoginView.addAttributes(input, loginInputAttributes);

    container.appendChild(input);
    loginForm.appendChild(container);
  }

  private static addPasswordInput(loginForm: HTMLFormElement): void {
    const container: HTMLDivElement = document.createElement('div');
    const input: HTMLInputElement = document.createElement('input');

    LoginView.addStyles(container, passwordContainerStyles);

    LoginView.addStyles(input, inputStyles);
    LoginView.addAttributes(input, passwordInputAttributes);

    container.appendChild(input);
    loginForm.appendChild(container);

    LoginView.togglePasswordVisibility(container);
  }

  private static togglePasswordVisibility(container: HTMLDivElement): void {
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const showPasswordMode = document.createElement('img');
    showPasswordMode.src = passwordHidden;
    LoginView.addStyles(showPasswordMode, passwordModeStyles);
    container.appendChild(showPasswordMode);

    showPasswordMode.addEventListener('click', () => {
      if (showPasswordMode.src === passwordHidden) {
        showPasswordMode.src = passwordShown;
        passwordInput.type = 'text';
      } else {
        showPasswordMode.src = passwordHidden;
        passwordInput.type = 'password';
      }
    });
  }

  private static addLoginButtons(loginForm: HTMLFormElement): void {
    const container = document.createElement('div');
    const okButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const registrationButton = document.createElement('button');

    LoginView.addStyles(container, buttonContainerStyles);

    LoginView.addStyles(okButton, loginButtonStyles);
    LoginView.addAttributes(okButton, okButtonAttributes);
    okButton.textContent = 'Login';

    LoginView.addStyles(cancelButton, cancelButtonStyles);
    LoginView.addAttributes(cancelButton, cancelButtonAttributes);
    cancelButton.textContent = 'Cancel';

    LoginView.addStyles(registrationButton, registrationButtonStyles);
    registrationButton.textContent = 'Registration';

    container.appendChild(okButton);
    container.appendChild(cancelButton);
    container.appendChild(registrationButton);
    loginForm.appendChild(container);
  }

  private static addErrorBlock(): void {
    const loginInputContainer = document.getElementById('login')?.parentElement as HTMLElement;
    const passwordInput = document.getElementById('password')?.parentElement as HTMLElement;

    const loginError = document.createElement('div');
    const passwordError = document.createElement('div');

    LoginView.addStyles(loginError, validationErrorStyles);
    LoginView.addAttributes(loginError, loginErrorAttributes);

    LoginView.addStyles(passwordError, validationErrorStyles);
    LoginView.addAttributes(passwordError, passwordErrorAttributes);

    loginInputContainer.appendChild(loginError);
    passwordInput.appendChild(passwordError);
  }

  private static addValidation(): void {
    const loginInput: HTMLInputElement = document.getElementById('login') as HTMLInputElement;
    const loginError: HTMLElement = document.getElementById('login-error') as HTMLElement;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const passwordError: HTMLElement = document.getElementById('password-error') as HTMLElement;
    const submitButton: HTMLButtonElement = document.getElementById('ok-login') as HTMLButtonElement;
    const cancelButton: HTMLButtonElement = document.getElementById('cancel-login') as HTMLButtonElement;

    submitButton.addEventListener('click', async () => {
      LoginView.checkRegExp(passwordInput, passwordError, loginInput, loginError);
      if (LoginView.passwordValid && LoginView.loginValid) {
        const customerLogin: ICustomerLoginResponse | IError | Error = await Authorization.loginBasicAuth(
          loginInput.value,
          passwordInput.value
        );
        if ('message' in customerLogin) {
          LoginView.addAuthErrorBlock(customerLogin);
        } else {
          document.getElementById('password-error')?.nextElementSibling?.remove();
          Tokens.setCustomerTokens(customerLogin);
          // TODO: do the actions needed on successful login right here
        }
      }
    });

    passwordInput.addEventListener('input', () => {
      passwordError.classList.add('hidden');
      LoginView.checkRegExp(passwordInput, passwordError, loginInput, loginError);
    });

    loginInput.addEventListener('input', () => {
      loginError.classList.add('hidden');
      LoginView.checkRegExp(passwordInput, passwordError, loginInput, loginError);
    });

    cancelButton.addEventListener('click', () => {
      LoginView.cleanLoginView();
    });
  }

  private static addAuthErrorBlock(customerLogin: IError | Error): void {
    const authorizationError: HTMLDivElement = document.createElement('div');
    const parent: HTMLElement = document.getElementById('password-error')?.parentElement as HTMLElement;

    LoginView.addStyles(authorizationError, validationErrorStyles);
    authorizationError.classList.remove('hidden');

    authorizationError.innerHTML = EXCLAMATION_MARK + customerLogin.message;

    document.getElementById('password-error')?.nextElementSibling?.remove();
    parent.appendChild(authorizationError);
  }

  private static checkRegExp(
    passwordInput: HTMLInputElement,
    passwordError: HTMLElement,
    loginInput: HTMLInputElement,
    loginError: HTMLElement
  ): void {
    let loginInputError = '';
    let passwordInputError = '';
    if (passwordInput.value.match(PASSWORD_REGEX)) {
      LoginView.passwordValid = true;
    } else {
      LoginView.passwordValid = false;
      passwordInputError = LoginView.getPasswordError(passwordInput);
      (document.getElementById('password-error') as HTMLElement).innerHTML = EXCLAMATION_MARK + passwordInputError;
    }
    if (loginInput.value.match(EMAIL_REGEX) && loginInput.value === loginInput.value.trim()) {
      LoginView.loginValid = true;
    } else {
      LoginView.loginValid = false;
      loginInputError = LoginView.getLoginError(loginInput);
      (document.getElementById('login-error') as HTMLElement).innerHTML = EXCLAMATION_MARK + loginInputError;
    }
    LoginView.toggleErrorMessages(passwordError, loginError);
  }

  private static getPasswordError(password: HTMLInputElement): string {
    let error: string = '';
    document.getElementById('password-error')?.nextElementSibling?.remove();
    if (password.value[0] === ' ' || password.value[password.value.length - 1] === ' ') {
      error = 'Do not use whitespace';
    }
    if (!password.value.match(UPPER_CASE_REGEX)) {
      error = 'No letter, uppercase';
    }
    if (!password.value.match(LOWER_CASE_REGEX)) {
      error = 'No letter, lowercase';
    }
    if (!password.value.match(NUMBERS_CASE_REGEX)) {
      error = 'Need at least 1 digit';
    }
    if (!password.value.match(SPECIAL_CASE_REGEX)) {
      error = 'Add special character !@#$%^&*';
    }
    if (password.value.length < PASSWORD_MIN_LENGTH) {
      error = 'Too short: at least 8 characters';
    }
    return error;
  }

  private static getLoginError(login: HTMLInputElement): string {
    let error: string = '';
    const loginArray = login.value.split('');
    if (!login.value.match(EMAIL_REGEX)) {
      error = 'Incorrect format (e.g., user@example.com)';
    }
    if (!login.value.match(DOMAIN_REGEX)) {
      error = 'Wrong domain (e.g., example.com)';
    }
    if (login.value[0] === ' ' || login.value[login.value.length - 1] === ' ') {
      error = 'Do not use whitespace';
    }
    if (!loginArray.includes('@')) {
      error = 'Missed "@" symbol';
    }
    return error;
  }

  private static toggleErrorMessages(passwordError: HTMLElement, loginError: HTMLElement): void {
    if (LoginView.passwordValid) {
      passwordError.classList.remove('block');
      passwordError.classList.add('hidden');
    } else {
      passwordError.classList.add('block');
      passwordError.classList.remove('hidden');
    }
    if (LoginView.loginValid) {
      loginError.classList.remove('block');
      loginError.classList.add('hidden');
    } else {
      loginError.classList.add('block');
      loginError.classList.remove('hidden');
    }
  }

  private static cleanLoginView(): void {
    LoginView.loginWindow.remove();
  }
}
