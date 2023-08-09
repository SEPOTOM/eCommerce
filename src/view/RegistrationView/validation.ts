const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;

export default function validateEmail(e: Event): void {
  if (e.currentTarget instanceof HTMLInputElement) {
    const input = e.currentTarget;

    if (EMAIL_REGEXP.test(input.value)) {
      console.log('Email is valid!');
    } else {
      console.error('Email is invalid');
    }
  }
}
