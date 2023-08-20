const EMAIL_REGEX: RegExp = /^\S+@\S+\.\S+$/;

const PASSWORD_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;

const EXCLAMATION_MARK =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline text-amber-400 inline-block"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>';

const UPPER_CASE_REGEX: RegExp = /[A-Z]/;

const LOWER_CASE_REGEX: RegExp = /[a-z]/;

const NUMBERS_CASE_REGEX: RegExp = /[0-9]/;

const SPECIAL_CASE_REGEX: RegExp = /[!@#$%^&*]/;

const DOMAIN_REGEX: RegExp = /@[^\s@]+\.[^\s@]+$/;

const PASSWORD_MIN_LENGTH: number = 8;

const loginWindowStyles: string[] = [
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

const loginFormStyles: string[] = ['flex', 'flex-col', 'gap-8', 'py-12'];

const formCaptionStyles: string[] = ['text-4xl', 'mb-8'];

const inputStyles: string[] = ['bg-slate-300', 'w-full', 'h-12', 'px-2.5', 'pr-10'];

const passwordContainerStyles: string[] = ['relative'];

const passwordModeStyles: string[] = ['w-6', 'absolute', 'right-3', 'top-3'];

const buttonContainerStyles: string[] = ['flex', 'flex-col', 'gap-6', 'mt-8'];

const loginButtonStyles: string[] = [
  'w-full',
  'm-auto',
  'bg-red-600',
  'h-12',
  'text-white',
  'hover:bg-red-400',
  'transition-all',
  'duration-500',
];

const registrationButtonStyles: string[] = [
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

const validationErrorStyles: string[] = ['text-red-800', 'text-base', 'hidden', 'absolute'];

const loginWindowAttributes: string[][] = [['id', 'login-form']];

const loginFormAttributes: string[][] = [['autocomplete', 'off']];

const loginInputAttributes: string[][] = [
  ['placeholder', 'Login'],
  ['type', 'text'],
  ['id', 'login'],
  ['oninvalid', 'this.setCustomValidity(" ")'],
  ['required', 'true'],
];

const passwordInputAttributes: string[][] = [
  ['placeholder', 'Password'],
  ['type', 'password'],
  ['id', 'password'],
  ['pattern', '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*s)(.{8,})$'],
  ['oninvalid', 'this.setCustomValidity(" ")'],
  ['required', 'true'],
];

const registrationButtonAttributes: string[][] = [
    ['href', '/registration'],
    ['x-on:click', 'route($event)'],
  ];

const okButtonAttributes: string[][] = [['id', 'ok-login']];

const loginErrorAttributes: string[][] = [['id', 'login-error']];

const passwordErrorAttributes: string[][] = [['id', 'password-error']];

export {
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
  registrationButtonStyles,
  validationErrorStyles,
  loginWindowAttributes,
  loginFormAttributes,
  loginInputAttributes,
  passwordInputAttributes,
  okButtonAttributes,
  loginErrorAttributes,
  passwordErrorAttributes,
  registrationButtonAttributes,
};
