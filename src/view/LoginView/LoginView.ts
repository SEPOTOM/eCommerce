import passwordShown from '../../assets/svg/eyeOpen.svg';
import passwordHidden from '../../assets/svg/eyeClosed.svg';

export default class LoginView {
  public static EMAIL_REGEX: RegExp = /^\S+@\S+\.\S+$/;

  public static PASSWORD_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;

  public static PASSWORD_ERROR_TEXT: string =
    'Password does not meet a complexity criteria. Hover this text to see the criteria.';

  public static PASSWORD_ERROR_HOVER: string =
    'The complexity criteria:\n\r1. At least 8 characters long\n\r2. At least one uppercase letter (A-Z)\n\r3. At least one lowercase letter (a-z)\n\r4. At least one digit (0-9)\n\r5. At least one special character (!@#$%^&*)\n\r6. Of no leading or trailing whitespace';

  public static LOGIN_ERROR_TEXT: string = 'Login does not meet requirements. Hover this text to see the requirements.';

  public static LOGIN_ERROR_HOVER: string =
    '1. Email address must be properly formatted (e.g., user@example.com)\n\r 2.Email address must not contain leading or trailing whitespace\n\r 3.Email address must contain a domain name (e.g., example.com)\n\r 4.Email address must contain an @ symbol separating local part and domain name';

  public static loginWindowStyles: string[] = [
    'bg-white',
    'w-2/4',
    'h-2/4',
    'text-center',
    'm-auto',
    'top-1/4',
    'bottom-1/4',
    'left-1/4',
    'right-1/4',
    'max-w-500',
    'min-w-320',
  ];

  public static loginFormStyles: string[] = ['flex', 'flex-col', 'gap-8', 'py-12'];

  public static formCaptionStyles: string[] = ['text-4xl', 'mb-8'];

  public static inputStyles: string[] = ['bg-slate-300', 'w-full', 'h-12'];

  public static passwordContainerStyles: string[] = ['relative'];

  public static passwordModeStyles: string[] = ['w-6', 'absolute', 'right-3', 'bottom-3'];

  public static buttonContainerStyles: string[] = ['flex', 'flex-col', 'gap-6', 'mt-8'];

  public static loginButtonStyles: string[] = ['w-full', 'm-auto', 'bg-red-600', 'h-12', 'text-white'];

  public static cancelButtonStyles: string[] = ['w-full', 'm-auto', 'bg-orange-600', 'h-12', 'text-white'];

  public static registrationButtonStyles: string[] = [
    'w-full',
    'm-auto',
    'h-12',
    'border-2',
    'border-blue-900',
    'text-blue-900',
  ];

  public static validationErrorStyles: string[] = ['text-red-800', 'text-xs', 'hidden', 'absolute'];

  public static loginFormAttributes: string[][] = [['autocomplete', 'off']];

  public static loginInputAttributes: string[][] = [
    ['placeholder', 'Login'],
    ['type', 'text'],
    ['id', 'login'],
    ['oninvalid', 'this.setCustomValidity(" ")'],
    ['required', 'true'],
  ];

  public static passwordInputAttributes: string[][] = [
    ['placeholder', 'Password'],
    ['type', 'password'],
    ['id', 'password'],
    ['pattern', '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*s)(.{8,})$'],
    ['oninvalid', 'this.setCustomValidity(" ")'],
    ['required', 'true'],
  ];

  public static okButtonAttributes: string[][] = [['id', 'ok-login']];

  public static cancelButtonAttributes: string[][] = [['id', 'cancel-login']];

  public static loginErrorAttributes: string[][] = [
    ['id', 'login-error'],
    ['title', LoginView.LOGIN_ERROR_HOVER],
  ];

  public static passwordErrorAttributes: string[][] = [
    ['id', 'password-error'],
    ['title', LoginView.PASSWORD_ERROR_HOVER],
  ];

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

  public static addAttributes(htmlElement: HTMLElement, styles: string[][]) {
    styles.forEach((element) => {
      htmlElement.setAttribute(element[0], element[1]);
    });
  }

  public static async addLoginForm(loginForm: HTMLFormElement): Promise<void> {
    await LoginView.addLoginCaption(loginForm);
    await LoginView.addLoginInput(loginForm);
    await LoginView.addPasswordInput(loginForm);
    await LoginView.addLoginButtons(loginForm);
    await LoginView.addErrorBlock();
    LoginView.addValidation();
  }

  public static addLoginCaption(loginForm: HTMLFormElement): void {
    const caption = document.createElement('div');
    LoginView.addStyles(caption, LoginView.formCaptionStyles);
    caption.textContent = 'Welcome!';

    loginForm.appendChild(caption);
  }

  public static addLoginInput(loginForm: HTMLFormElement): void {
    const container = document.createElement('div');
    const input = document.createElement('input');

    LoginView.addStyles(input, LoginView.inputStyles);
    LoginView.addAttributes(input, LoginView.loginInputAttributes);

    container.appendChild(input);
    loginForm.appendChild(container);
  }

  public static addPasswordInput(loginForm: HTMLFormElement): void {
    const container: HTMLDivElement = document.createElement('div');
    const input: HTMLInputElement = document.createElement('input');

    LoginView.addStyles(container, LoginView.passwordContainerStyles);

    LoginView.addStyles(input, LoginView.inputStyles);
    LoginView.addAttributes(input, LoginView.passwordInputAttributes);

    container.appendChild(input);
    loginForm.appendChild(container);

    LoginView.togglePasswordVisibility(container);
  }

  public static togglePasswordVisibility(container: HTMLDivElement): void {
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

  public static addLoginButtons(loginForm: HTMLFormElement): void {
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

  public static addErrorBlock(): void {
    const loginInputContainer = document.getElementById('login')?.parentElement as HTMLElement;
    const passwordInput = document.getElementById('password')?.parentElement as HTMLElement;

    const loginError = document.createElement('div');
    const passwordError = document.createElement('div');

    LoginView.addStyles(loginError, LoginView.validationErrorStyles);
    LoginView.addAttributes(loginError, LoginView.loginErrorAttributes);
    loginError.textContent = LoginView.LOGIN_ERROR_TEXT;

    LoginView.addStyles(passwordError, LoginView.validationErrorStyles);
    LoginView.addAttributes(passwordError, LoginView.passwordErrorAttributes);
    passwordError.textContent = LoginView.PASSWORD_ERROR_TEXT;

    loginInputContainer.appendChild(loginError);
    passwordInput.appendChild(passwordError);
  }

  public static addValidation() {
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
    });

    loginInput.addEventListener('input', () => {
      loginError.classList.add('hidden');
    });

    cancelButton.addEventListener('click', () => {
      LoginView.cleanMainView();
    });
  }

  public static checkRegExp(
    passwordInput: HTMLInputElement,
    passwordError: HTMLElement,
    loginInput: HTMLInputElement,
    loginError: HTMLElement
  ) {
    if (passwordInput.value.match(LoginView.PASSWORD_REGEX)) {
      passwordError.classList.remove('block');
      passwordError.classList.add('hidden');
    } else {
      passwordError.classList.add('block');
      passwordError.classList.remove('hidden');
    }

    if (loginInput.value.match(LoginView.EMAIL_REGEX) && loginInput.value === loginInput.value.trim()) {
      loginError.classList.remove('block');
      loginError.classList.add('hidden');
    } else {
      loginError.classList.add('block');
      loginError.classList.remove('hidden');
    }
  }

  public static cleanMainView() {
    (document.querySelector('main') as HTMLElement).innerHTML = '';
  }
}
