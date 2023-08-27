import Converter from '../../components/Converter/Converter';
/* eslint-disable import/no-cycle */
import Customer from '../../api/Customer/Customer';
import HTML from './ProfileView.html';
import ParagraphView from './ParagraphView/ParagraphView';
import { CustomerDataResponse } from '../../types';
import { DataAttrs, ParagraphLabels } from './data';

export default class ProfileView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  constructor() {
    this.configureView();
  }

  public draw(): void {
    const main = document.querySelector('main');

    if (main) {
      main.innerHTML = '';
      main.append(this.view);
    }
  }

  private async configureView(): Promise<void> {
    const customerData = await Customer.getCurrentCustomer();

    if (!('message' in customerData)) {
      this.configureUserInfo(customerData);
    }
  }

  private configureUserInfo(customerData: CustomerDataResponse): void {
    const section = this.view.querySelector(`[${DataAttrs.USER_INFO}]`);

    section?.append(new ParagraphView().buildView(ParagraphLabels.FIRST_NAME, customerData.firstName));
    section?.append(new ParagraphView().buildView(ParagraphLabels.LAST_NAME, customerData.lastName));

    if (typeof customerData.dateOfBirth === 'string') {
      const [year, month, day] = customerData.dateOfBirth.split('-');
      const formattedDate = `${month}/${day}/${year}`;

      section?.append(new ParagraphView().buildView(ParagraphLabels.BIRTH_DATE, formattedDate));
    }
  }
}
