import Converter from '../../../../components/Converter/Converter';
import HTML from './AddressView.html';
import ParagraphView from '../../ParagraphView/ParagraphView';
import { Address } from '../../../../types';
import { AddressLabels } from '../../data';

export default class AddressView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  public buildView(addressData: Address): AddressView {
    this.configureView(addressData);

    return this;
  }

  public getView(): HTMLDivElement {
    return this.view;
  }

  public makeDefault(): void {
    this.view.dataset.default = 'true';
  }

  public isDefault(): boolean {
    return this.view.dataset.default === 'true';
  }

  private configureView(addressData: Address): void {
    const contents = [
      [AddressLabels.STREET, addressData.streetName],
      [AddressLabels.CITY, addressData.city],
      [AddressLabels.COUNTRY, addressData.country],
      [AddressLabels.CODE, addressData.postalCode],
    ];

    contents.forEach(([label, content]) => {
      this.view.append(new ParagraphView().buildView(label, content));
    });
  }
}
