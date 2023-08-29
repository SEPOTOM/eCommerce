import Converter from '../../../components/Converter/Converter';
import HTML from './UserInfoView.html';
import ParagraphView from '../ParagraphView/ParagraphView';
import { CustomerDataResponse } from '../../../types';
import { ParagraphLabels } from '../data';

export default class UserInfoView {
  private view = Converter.htmlToElement<HTMLElement>(HTML) || document.createElement('section');

  public buildView(customerData: CustomerDataResponse): HTMLElement {
    this.configureView(customerData);

    return this.view;
  }

  private configureView(customerData: CustomerDataResponse): void {
    this.view.append(new ParagraphView().buildView(ParagraphLabels.FIRST_NAME, customerData.firstName));
    this.view.append(new ParagraphView().buildView(ParagraphLabels.LAST_NAME, customerData.lastName));

    if (typeof customerData.dateOfBirth === 'string') {
      const [year, month, day] = customerData.dateOfBirth.split('-');
      const formattedDate = `${month}/${day}/${year}`;

      this.view.append(new ParagraphView().buildView(ParagraphLabels.BIRTH_DATE, formattedDate));
    }
  }
}
