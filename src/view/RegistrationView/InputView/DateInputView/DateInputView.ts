import InputView from '../InputView';

const MONTHS_IN_YEAR = 12;
const MIN_USER_AGE = 18;
const MS_IN_YEAR = 31536000000;
const MAX_DAYS_IN_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const ErrorMessages = {
  MONTH: 'Enter the correct month number (MM/DD/YYYY)',
  DAY: 'Enter the correct day for the specified month (MM/DD/YYYY)',
  AGE: `Your age must be over ${MIN_USER_AGE} years old`,
};

export default class DateInputView extends InputView {
  protected validateInput(): void {
    super.validateInput();

    if (!this.errorBlock.textContent) {
      const [month, day, year] = this.input.value.split('/').map((str: string) => Number(str));

      if (month > MONTHS_IN_YEAR || month < 1) {
        this.input.dataset.valid = 'false';
        this.errorBlock.textContent = ErrorMessages.MONTH;
        return;
      }

      const formattedMonth = month - 1;

      if (day > MAX_DAYS_IN_MONTHS[formattedMonth]) {
        this.input.dataset.valid = 'false';
        this.errorBlock.textContent = ErrorMessages.DAY;
        return;
      }

      const userBirthDateTimestamp = new Date(year, formattedMonth, day).getTime();
      const currentDateTimestamp = Date.now();
      const userAge = (currentDateTimestamp - userBirthDateTimestamp) / MS_IN_YEAR;

      if (userAge > MIN_USER_AGE) {
        this.input.dataset.valid = 'true';
        this.errorBlock.textContent = '';
      } else {
        this.input.dataset.valid = 'false';
        this.errorBlock.textContent = ErrorMessages.AGE;
      }
    }
  }
}
