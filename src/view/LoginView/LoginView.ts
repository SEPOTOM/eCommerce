import passwordShown from '../../assets/svg/eyeOpen.svg';
import passwordHidden from '../../assets/svg/eyeClosed.svg';

export default class LoginView {
  private static EMAIL_REGEX: RegExp = /^\S+@\S+\.\S+$/;

  private static PASSWORD_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;

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

  private static passwordModeStyles: string[] = ['w-6', 'absolute', 'right-3', 'bottom-3'];

  private static buttonContainerStyles: string[] = ['flex', 'flex-col', 'gap-6', 'mt-8'];

  private static loginButtonStyles: string[] = ['w-full', 'm-auto', 'bg-red-600', 'h-12', 'text-white'];

  private static cancelButtonStyles: string[] = ['w-full', 'm-auto', 'bg-orange-600', 'h-12', 'text-white'];

  private static registrationButtonStyles: string[] = [
    'w-full',
    'm-auto',
    'h-12',
    'border-2',
    'border-blue-900',
    'text-blue-900',
  ];

  private static validationErrorStyles: string[] = ['text-red-800', 'text-base', 'hidden', 'absolute'];

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

  private static okButtonAttributes: string[][] = [['id', 'ok-login']];

  private static cancelButtonAttributes: string[][] = [['id', 'cancel-login']];

  private static loginErrorAttributes: string[][] = [['id', 'login-error']];

  private static passwordErrorAttributes: string[][] = [['id', 'password-error']];

  private static loginValid: boolean = true;

  private static passwordValid: boolean = true;

  public static showLoginView(): void {
    const main: HTMLElement = document.querySelector('main') as HTMLElement;
    const loginWindow: HTMLDivElement = document.createElement('div');
    const loginForm: HTMLFormElement = document.createElement('form');

    LoginView.cleanMainView();

    LoginView.addStyles(loginWindow, LoginView.loginWindowStyles);
    LoginView.addStyles(loginForm, LoginView.loginFormStyles);
    LoginView.addAttributes(loginForm, LoginView.loginFormAttributes);
    LoginView.addLoginForm(loginForm);

    loginWindow.appendChild(loginForm);
    main.appendChild(loginWindow);
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
    const cancelButton = document.createElement('button');
    const registrationButton = document.createElement('button');

    LoginView.addStyles(container, LoginView.buttonContainerStyles);

    LoginView.addStyles(okButton, LoginView.loginButtonStyles);
    LoginView.addAttributes(okButton, LoginView.okButtonAttributes);
    okButton.textContent = 'Login';

    LoginView.addStyles(cancelButton, LoginView.cancelButtonStyles);
    LoginView.addAttributes(cancelButton, LoginView.cancelButtonAttributes);
    cancelButton.textContent = 'Cancel';

    LoginView.addStyles(registrationButton, LoginView.registrationButtonStyles);
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
    const cancelButton: HTMLButtonElement = document.getElementById('cancel-login') as HTMLButtonElement;

    submitButton.addEventListener('click', () => {
      LoginView.checkRegExp(passwordInput, passwordError, loginInput, loginError);
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
      LoginView.cleanMainView();
    });
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
      (document.getElementById('password-error') as HTMLElement).textContent = passwordInputError;
    }
    if (loginInput.value.match(LoginView.EMAIL_REGEX) && loginInput.value === loginInput.value.trim()) {
      LoginView.loginValid = true;
    } else {
      LoginView.loginValid = false;
      loginInputError = LoginView.getLoginError(loginInput);
      (document.getElementById('login-error') as HTMLElement).textContent = loginInputError;
    }
    LoginView.toggleErrorMessages(passwordError, loginError);
  }

  private static getPasswordError(password: HTMLInputElement): string {
    let error: string = '';
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

  private static cleanMainView(): void {
    (document.querySelector('main') as HTMLElement).innerHTML = '';
  }
}
