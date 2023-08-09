const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;

function getInput(e: Event): HTMLInputElement | null {
  if (e.currentTarget instanceof HTMLInputElement) {
    return e.currentTarget;
  }

  return null;
}

export default function validateEmail(e: Event): void {
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
