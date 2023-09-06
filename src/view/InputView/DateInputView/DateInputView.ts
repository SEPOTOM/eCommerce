import InputView from '../InputView';
import DateUtils from '../../../components/DateUtils/DateUtils';

const MONTHS_IN_YEAR = 12;
const MIN_USER_AGE = 18;
const MAX_DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const ErrorMessages = {
  MONTH: 'Incorrect month number (MM/DD/YYYY)',
  DAY: 'Incorrect day for the specified month (MM/DD/YYYY)',
  AGE: `Your age must be over ${MIN_USER_AGE} years old`,
};

export default class DateInputView extends InputView {
  public validateInput(): void {
    super.validateInput();

    if (!this.errorBlock.textContent) {
      const [month, day, year] = this.input.value.split('/').map((str: string) => Number(str));

      if (month > MONTHS_IN_YEAR || month < 1) {
        this.makeInputInvalid(ErrorMessages.MONTH);
        return;
      }

      const formattedMonth = month - 1;

      const maxDaysInMonth =
        formattedMonth === 1 && new DateUtils().isLeapYear(year)
          ? MAX_DAYS_IN_MONTHS[formattedMonth] + 1
          : MAX_DAYS_IN_MONTHS[formattedMonth];

      if (day > maxDaysInMonth) {
        this.makeInputInvalid(ErrorMessages.DAY);
        return;
      }

      if (DateInputView.isOverMinAge(formattedMonth, day, year)) {
        this.makeInputValid();
      } else {
        this.makeInputInvalid(ErrorMessages.AGE);
      }
    }
  }

  private static isOverMinAge(userMonth: number, userDay: number, userYear: number): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (currentYear - userYear > MIN_USER_AGE) {
      return true;
    }

    if (currentYear - userYear === MIN_USER_AGE) {
      if (currentMonth > userMonth) {
        return true;
      }

      if (currentMonth === userMonth && currentDay >= userDay) {
        return true;
      }
    }

    return false;
  }
}
