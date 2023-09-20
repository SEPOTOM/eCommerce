/* eslint-disable import/no-cycle */
import Discount from '../../../components/Discount/Discount';

export default () => ({
  promoCodes: [],
  showMessage: false,

  async init() {
    await Discount.getCodes().then((response) => {
      if ('message' in response !== true) this.promoCodes = response;
    });
  },

  copyCodeToBuffer(element: HTMLInputElement): void {
    const delay: number = 1500;

    element.setSelectionRange(0, element.value.length);
    document.execCommand('copy');
    element.setSelectionRange(0, 0);

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, delay);
  },
});
