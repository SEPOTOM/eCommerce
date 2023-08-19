import passwordShown from '../../assets/svg/eyeOpen.svg';
import passwordHidden from '../../assets/svg/eyeClosed.svg';
import Authorization from '../../api/Authorization/Authorization';
import { ICustomerLoginResponse, IError } from '../../types';
import Tokens from '../../components/Tokens/Tokens';

export default class LoginView {
  private static EMAIL_REGEX: RegExp = /^\S+@\S+\.\S+$/;

  private static PASSWORD_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;

  private static EXCLAMATION_MARK =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline text-amber-400"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>';

  private static UPPER_CASE_REGEX: RegExp = /[A-Z]/;

  private static LOWER_CASE_REGEX: RegExp = /[a-z]/;

  private static NUMBERS_CASE_REGEX: RegExp = /[0-9]/;

  private static SPECIAL_CASE_REGEX: RegExp = /[!@#$%^&*]/;

  private static DOMAIN_REGEX: RegExp = /@[^\s@]+\.[^\s@]+$/;

  private static PASSWORD_MIN_LENGTH: number = 8;

  private static loginWindowStyles: string[] = [
    'bg-white',
    'w-3/4',
    'h-2/4',
    'text-center',
    'm-auto',
    'top-1/4',
    'bottom-1/4',
    'left-1/4',
    'right-1/4',
    'max-w-md',
  ];

  private static loginFormStyles: string[] = ['flex', 'flex-col', 'gap-8', 'py-12'];

  private static formCaptionStyles: string[] = ['text-4xl', 'mb-8'];

  private static inputStyles: string[] = ['bg-slate-300', 'w-full', 'h-12', 'px-2.5', 'pr-10'];

  private static passwordContainerStyles: string[] = ['relative'];

  private static passwordModeStyles: string[] = ['w-6', 'absolute', 'right-3', 'top-3'];

  private static buttonContainerStyles: string[] = ['flex', 'flex-col', 'gap-6', 'mt-8'];

  private static loginButtonStyles: string[] = [
    'w-full',
    'm-auto',
    'bg-red-600',
    'h-12',
    'text-white',
    'hover:bg-red-400',
    'transition-all',
    'duration-500',
  ];

  private static registrationButtonStyles: string[] = [
    'flex',
    'items-center',
    'justify-center',
    'w-full',
    'm-auto',
    'h-12',
    'border-2',
    'border-blue-900',
    'text-blue-900',
    'hover:bg-blue-900',
    'hover:text-white',
    'transition-all',
    'duration-500',
  ];

  private static validationErrorStyles: string[] = ['text-red-800', 'text-base', 'hidden', 'absolute'];

  private static loginWindowAttributes: string[][] = [['id', 'login-form']];

  private static loginFormAttributes: string[][] = [['autocomplete', 'off']];

  private static loginInputAttributes: string[][] = [
    ['placeholder', 'Login'],
    ['type', 'text'],
    ['id', 'login'],
    ['oninvalid', 'this.setCustomValidity(" ")'],
    ['required', 'true'],
  ];

  private static passwordInputAttributes: string[][] = [
    ['placeholder', 'Password'],
    ['type', 'password'],
    ['id', 'password'],
    ['pattern', '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*s)(.{8,})$'],
    ['oninvalid', 'this.setCustomValidity(" ")'],
    ['required', 'true'],
  ];

  private static registrationButtonAttributes: string[][] = [
    ['href', '/registration'],
    ['x-on:click', 'route($event)'],
  ];

  private static okButtonAttributes: string[][] = [['id', 'ok-login']];

  private static loginErrorAttributes: string[][] = [['id', 'login-error']];

  private static passwordErrorAttributes: string[][] = [['id', 'password-error']];

  private static loginWindow: HTMLDivElement;

  private static loginValid: boolean = true;

  private static passwordValid: boolean = true;

  public static showLoginView(): HTMLDivElement {
    LoginView.loginWindow = document.createElement('div');
    const loginForm: HTMLFormElement = document.createElement('form');

    LoginView.cleanLoginView();

    LoginView.addStyles(LoginView.loginWindow, LoginView.loginWindowStyles);
    LoginView.addStyles(loginForm, LoginView.loginFormStyles);

    LoginView.addAttributes(LoginView.loginWindow, LoginView.loginWindowAttributes);
    LoginView.addAttributes(loginForm, LoginView.loginFormAttributes);

    LoginView.addLoginForm(loginForm);

    LoginView.loginWindow.appendChild(loginForm);
    return LoginView.loginWindow;
  }

  public draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = '';
    main.append(LoginView.showLoginView());
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
    LoginView.addStyles(caption, LoginView.formCaptionStyles);
    caption.textContent = 'Welcome!';

    loginForm.appendChild(caption);
  }

  private static addLoginInput(loginForm: HTMLFormElement): void {
    const container = document.createElement('div');
    const input = document.createElement('input');

    LoginView.addStyles(input, LoginView.inputStyles);
    LoginView.addAttributes(input, LoginView.loginInputAttributes);

    container.appendChild(input);
    loginForm.appendChild(container);
  }

  private static addPasswordInput(loginForm: HTMLFormElement): void {
    const container: HTMLDivElement = document.createElement('div');
    const input: HTMLInputElement = document.createElement('input');

    LoginView.addStyles(container, LoginView.passwordContainerStyles);

    LoginView.addStyles(input, LoginView.inputStyles);
    LoginView.addAttributes(input, LoginView.passwordInputAttributes);

    container.appendChild(input);
    loginForm.appendChild(container);

    LoginView.togglePasswordVisibility(container);
  }

  private static togglePasswordVisibility(container: HTMLDivElement): void {
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const showPasswordMode = document.createElement('img');
    showPasswordMode.src = passwordHidden;
    LoginView.addStyles(showPasswordMode, LoginView.passwordModeStyles);
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
    const registrationButton = document.createElement('a');

    LoginView.addStyles(container, LoginView.buttonContainerStyles);

    LoginView.addStyles(okButton, LoginView.loginButtonStyles);
    LoginView.addAttributes(okButton, LoginView.okButtonAttributes);
    okButton.textContent = 'Login';

    LoginView.addStyles(registrationButton, LoginView.registrationButtonStyles);
    LoginView.addAttributes(registrationButton, LoginView.registrationButtonAttributes);
    registrationButton.textContent = 'Registration';

    container.appendChild(okButton);
    container.appendChild(registrationButton);
    loginForm.appendChild(container);
  }

  private static addErrorBlock(): void {
    const loginInputContainer = document.getElementById('login')?.parentElement as HTMLElement;
    const passwordInput = document.getElementById('password')?.parentElement as HTMLElement;

    const loginError = document.createElement('div');
    const passwordError = document.createElement('div');

    LoginView.addStyles(loginError, LoginView.validationErrorStyles);
    LoginView.addAttributes(loginError, LoginView.loginErrorAttributes);

    LoginView.addStyles(passwordError, LoginView.validationErrorStyles);
    LoginView.addAttributes(passwordError, LoginView.passwordErrorAttributes);

    loginInputContainer.appendChild(loginError);
    passwordInput.appendChild(passwordError);
  }

  private static addValidation(): void {
    const loginInput: HTMLInputElement = document.getElementById('login') as HTMLInputElement;
    const loginError: HTMLElement = document.getElementById('login-error') as HTMLElement;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const passwordError: HTMLElement = document.getElementById('password-error') as HTMLElement;
    const submitButton: HTMLButtonElement = document.getElementById('ok-login') as HTMLButtonElement;

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
  }

  private static addAuthErrorBlock(customerLogin: IError | Error): void {
    const authorizationError: HTMLDivElement = document.createElement('div');
    const parent: HTMLElement = document.getElementById('password-error')?.parentElement as HTMLElement;

    LoginView.addStyles(authorizationError, LoginView.validationErrorStyles);
    authorizationError.classList.remove('hidden');

    authorizationError.innerHTML = LoginView.EXCLAMATION_MARK + customerLogin.message;

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
    if (passwordInput.value.match(LoginView.PASSWORD_REGEX)) {
      LoginView.passwordValid = true;
    } else {
      LoginView.passwordValid = false;
      passwordInputError = LoginView.getPasswordError(passwordInput);
      (document.getElementById('password-error') as HTMLElement).innerHTML =
        LoginView.EXCLAMATION_MARK + passwordInputError;
    }
    if (loginInput.value.match(LoginView.EMAIL_REGEX) && loginInput.value === loginInput.value.trim()) {
      LoginView.loginValid = true;
    } else {
      LoginView.loginValid = false;
      loginInputError = LoginView.getLoginError(loginInput);
      (document.getElementById('login-error') as HTMLElement).innerHTML = LoginView.EXCLAMATION_MARK + loginInputError;
    }
    LoginView.toggleErrorMessages(passwordError, loginError);
  }

  private static getPasswordError(password: HTMLInputElement): string {
    let error: string = '';
    document.getElementById('password-error')?.nextElementSibling?.remove();
    if (password.value[0] === ' ' || password.value[password.value.length - 1] === ' ') {
      error = 'Do not use whitespace';
    }
    if (!password.value.match(LoginView.UPPER_CASE_REGEX)) {
      error = 'No letter, uppercase';
    }
    if (!password.value.match(LoginView.LOWER_CASE_REGEX)) {
      error = 'No letter, lowercase';
    }
    if (!password.value.match(LoginView.NUMBERS_CASE_REGEX)) {
      error = 'Need at least 1 digit';
    }
    if (!password.value.match(LoginView.SPECIAL_CASE_REGEX)) {
      error = 'Add special character !@#$%^&*';
    }
    if (password.value.length < LoginView.PASSWORD_MIN_LENGTH) {
      error = 'Too short: at least 8 characters';
    }
    return error;
  }

  private static getLoginError(login: HTMLInputElement): string {
    let error: string = '';
    const loginArray = login.value.split('');
    if (!login.value.match(LoginView.EMAIL_REGEX)) {
      error = 'Incorrect format (e.g., user@example.com)';
    }
    if (!login.value.match(LoginView.DOMAIN_REGEX)) {
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
