const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s)(.{8,})$/;

function getInput(e: Event): HTMLInputElement | null {
  if (e.currentTarget instanceof HTMLInputElement) {
    return e.currentTarget;
  }

  return null;
}

export function validateEmail(e: Event): void {
  const input = getInput(e);

  if (!input) {
    return;
  }

  if (EMAIL_REGEXP.test(input.value)) {
    console.log('Email is valid!');
  } else {
    console.error('Email is invalid');
  }
}

export function validatePassword(e: Event): void {
  const input = getInput(e);

  if (!input) {
    return;
  }

  if (PASSWORD_REGEXP.test(input.value)) {
    console.log('Password is valid!');
  } else {
    console.error('Password is invalid');
  }
}
