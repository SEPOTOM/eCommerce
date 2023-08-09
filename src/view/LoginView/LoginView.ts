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

  public static loginViewStyles: string[] = ['bg-black', 'm-0', 'opacity-75', 'absolute', 'inset-x-0', 'inset-y-0'];

  public static loginWindowStyles: string[] = [
    'bg-white',
    'w-2/4',
    'h-2/4',
    'text-center',
    'm-auto',
    'absolute',
    'top-1/4',
    'bottom-1/4',
    'left-1/4',
    'right-1/4',
    'max-w-500',
  ];

  public static loginFormStyles: string[] = ['flex', 'flex-col', 'gap-2', 'py-12'];

  public static formCaptionStyles: string[] = ['text-5xl', 'mb-8'];

  public static inputStyles: string[] = ['bg-slate-300', 'w-9/12', 'h-12'];

  public static buttonContainerStyles: string[] = ['flex', 'flex-col', 'gap-2'];

  public static loginButtonStyles: string[] = ['w-9/12', 'm-auto', 'bg-red-600', 'h-12', 'text-white'];

  public static cancelButtonStyles: string[] = ['w-9/12', 'm-auto', 'bg-orange-600', 'h-12', 'text-white'];

  public static registrationButtonStyles: string[] = [
    'w-9/12',
    'm-auto',
    'h-12',
    'border-2',
    'border-blue-900',
    'text-blue-900',
  ];

  public static validationErrorStyles: string[] = ['text-red-800', 'text-xs', 'hidden'];

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
    const loginView: HTMLDivElement = document.createElement('div');
    const loginWindow: HTMLDivElement = document.createElement('div');
    const loginForm: HTMLFormElement = document.createElement('form');

    LoginView.addStyles(loginView, LoginView.loginViewStyles);
    LoginView.addStyles(loginWindow, LoginView.loginWindowStyles);
    LoginView.addStyles(loginForm, LoginView.loginFormStyles);
    LoginView.addAttributes(loginForm, LoginView.loginFormAttributes);
    LoginView.addLoginForm(loginForm);

    loginWindow.appendChild(loginForm);
    loginView.appendChild(loginWindow);
    document.body.appendChild(loginView);
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

  public static addLoginForm(loginForm: HTMLFormElement): void {
    LoginView.addLoginCaption(loginForm);
    LoginView.addLoginInput(loginForm);
    LoginView.addPasswordInput(loginForm);
    LoginView.addLoginButtons(loginForm);
    LoginView.addErrorBlock(loginForm);
    LoginView.addValidation(loginForm);
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
    const container = document.createElement('div');
    const input = document.createElement('input');

    LoginView.addStyles(input, LoginView.inputStyles);
    LoginView.addAttributes(input, LoginView.passwordInputAttributes);

    container.appendChild(input);
    loginForm.appendChild(container);
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

  public static addErrorBlock(loginForm: HTMLFormElement): void {
    const loginError = document.createElement('div');
    const passwordError = document.createElement('div');

    LoginView.addStyles(loginError, LoginView.validationErrorStyles);
    LoginView.addAttributes(loginError, LoginView.loginErrorAttributes);
    loginError.textContent = LoginView.LOGIN_ERROR_TEXT;

    LoginView.addStyles(passwordError, LoginView.validationErrorStyles);
    LoginView.addAttributes(passwordError, LoginView.passwordErrorAttributes);
    passwordError.textContent = LoginView.PASSWORD_ERROR_TEXT;

    loginForm.appendChild(loginError);
    loginForm.appendChild(passwordError);
  }

  public static addValidation(loginForm: HTMLFormElement) {
    const loginInput: HTMLInputElement = (loginForm.childNodes[1] as HTMLElement).childNodes[0] as HTMLInputElement;
    const loginError: HTMLElement = loginForm.childNodes[4] as HTMLElement as HTMLElement;

    const passwordInput: HTMLInputElement = (loginForm.childNodes[2] as HTMLElement).childNodes[0] as HTMLInputElement;
    const passwordError: HTMLElement = loginForm.childNodes[5] as HTMLElement as HTMLElement;

    const submitButton: HTMLButtonElement = (loginForm.childNodes[3] as HTMLElement).childNodes[0] as HTMLButtonElement;
    const cancelButton: HTMLButtonElement = (loginForm.childNodes[3] as HTMLElement).childNodes[1] as HTMLButtonElement;

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
      LoginView.closeLoginView(loginForm);
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

  public static closeLoginView(loginForm: HTMLFormElement) {
    loginForm.parentElement?.parentElement?.remove();
  }
}
