import InputView from '../InputView';

const MONTHS_IN_YEAR = 12;
const MAX_DAYS_IN_MONTH = 31;
const MIN_USER_AGE = 18;
const MS_IN_YEAR = 31536000000;

export default class DateInputView extends InputView {
  protected validateInput(regExp: RegExp): void {
    if (!this.isValid(regExp)) {
      this.input.dataset.valid = 'false';
      this.errorBlock.textContent = `${this.input.id} must be in the format MM/DD/YYYY!`;
      return;
    }

    const [month, day, year] = this.input.value.split('/').map((str: string) => Number(str));

    if (month > MONTHS_IN_YEAR || day > MAX_DAYS_IN_MONTH) {
      this.input.dataset.valid = 'false';
      this.errorBlock.textContent = `${this.input.id} is invalid!`;
      return;
    }

    const userBirthDateTimestamp = new Date(year, month, day).getTime();
    const currentDateTimestamp = Date.now();
    const userAge = (currentDateTimestamp - userBirthDateTimestamp) / MS_IN_YEAR;

    if (userAge > MIN_USER_AGE) {
      this.input.dataset.valid = 'true';
      this.errorBlock.textContent = '';
    } else {
      this.input.dataset.valid = 'false';
      this.errorBlock.textContent = `Your age must be over ${MIN_USER_AGE} years old`;
    }
  }
}
