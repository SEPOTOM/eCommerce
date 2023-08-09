export default class LoginView {
  public static EMAIL_REGEX = /^\S+@\S+\.\S+$/;

  public static PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;

  public static loginViewStyles = ['bg-black', 'm-0', 'opacity-75', 'absolute', 'inset-x-0', 'inset-y-0'];

  public static loginWindowStyles = [
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

  public static loginLabelAttributes = [['for', 'login']];

  public static loginInputAttributes = [
    ['type', 'text'],
    ['id', 'login'],
    ['oninvalid', 'this.setCustomValidity(" ")'],
    ['required', 'true'],
  ];

  public static passwordLabelAttributes = [['for', 'password']];

  public static passwordInputAttributes = [
    ['type', 'password'],
    ['id', 'password'],
    ['pattern', '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*s)(.{8,})$'],
    ['oninvalid', 'this.setCustomValidity(" ")'],
    ['required', 'true'],
  ];

  public static okButtonAttributes = [['id', 'submit-login']];

  public static cancelButtonAttributes = [['id', 'cancel-login']];

  public static loginErrorAttributes = [['id', 'loginError']];

  public static passwordErrorAttributes = [
    ['id', 'passwordError'],
    ['class', 'hidden'],
  ];

  public static showLoginView(): void {
    const loginView: HTMLDivElement = document.createElement('div');
    const loginWindow: HTMLDivElement = document.createElement('div');
    const loginForm: HTMLFormElement = document.createElement('form');

    LoginView.addStyles(loginView, LoginView.loginViewStyles);
    LoginView.addStyles(loginWindow, LoginView.loginWindowStyles);
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
    LoginView.addLoginInput(loginForm);
    LoginView.addPasswordInput(loginForm);
    LoginView.addLoginButtons(loginForm);
    LoginView.addErrorBlock(loginForm);
    LoginView.addValidation();
  }

  public static addLoginInput(loginForm: HTMLFormElement): void {
    const container = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    LoginView.addAttributes(label, LoginView.loginLabelAttributes);
    label.textContent = 'Login: ';

    LoginView.addAttributes(input, LoginView.loginInputAttributes);

    container.appendChild(label);
    container.appendChild(input);
    loginForm.appendChild(container);
  }

  public static addPasswordInput(loginForm: HTMLFormElement): void {
    const container = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    LoginView.addAttributes(label, LoginView.passwordLabelAttributes);
    label.textContent = 'Password: ';

    LoginView.addAttributes(input, LoginView.passwordInputAttributes);

    container.appendChild(label);
    container.appendChild(input);
    loginForm.appendChild(container);
  }

  public static addLoginButtons(loginForm: HTMLFormElement): void {
    const container = document.createElement('div');
    const ok = document.createElement('button');
    const cancel = document.createElement('button');

    LoginView.addAttributes(ok, LoginView.okButtonAttributes);
    ok.textContent = 'Ok';

    LoginView.addAttributes(cancel, LoginView.cancelButtonAttributes);
    cancel.textContent = 'Cancel';

    container.appendChild(ok);
    container.appendChild(cancel);
    loginForm.appendChild(container);
  }

  public static addErrorBlock(loginForm: HTMLFormElement): void {
    const loginError = document.createElement('div');
    const passwordError = document.createElement('div');

    LoginView.addAttributes(loginError, LoginView.loginErrorAttributes);

    LoginView.addAttributes(passwordError, LoginView.passwordErrorAttributes);

    loginForm.appendChild(loginError);
    loginForm.appendChild(passwordError);
  }

  public static addValidation() {
    const loginInput = document.getElementById('login');
    const loginError = document.getElementById('loginError');

    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');

    const submitButton: HTMLElement = document.getElementById('submit-login') as HTMLElement;
    const passwordErrorText =
      'Password does not meet a complexity criteria:<br>1. At least 8 characters long<br>2. At least one uppercase letter (A-Z)<br>3. At least one lowercase letter (a-z)<br>4. At least one digit (0-9)<br>5. At least one special character (!@#$%^&*)<br>6. Of no leading or trailing whitespace<br>';
    const loginErrorText =
      'Login does not meet requirements:<br>Email address must be properly formatted (e.g., user@example.com)<br>Email address must not contain leading or trailing whitespace<br>Email address must contain a domain name (e.g., example.com)<br>Email address must contain an &commat; symbol separating local part and domain name<br>';

    submitButton.addEventListener('click', () => {
      if (passwordInput.value.match(LoginView.PASSWORD_REGEX)) {
        passwordError.style.display = 'none';
      } else {
        passwordError.style.display = 'block';
        passwordError.innerHTML = passwordErrorText;
      }

      if (loginInput.value.match(LoginView.EMAIL_REGEX) && loginInput.value === loginInput.value.trim()) {
        loginError.style.display = 'none';
      } else {
        loginError.style.display = 'block';
        loginError.innerHTML = loginErrorText;
      }
    });

    passwordInput.addEventListener('input', () => {
      passwordError.style.display = 'none';
    });

    loginInput.addEventListener('input', () => {
      loginError.style.display = 'none';
    });
  }
}
