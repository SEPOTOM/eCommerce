import htmlToElement from '../../../utils/htmlToElement';
import OptionView from './OptionView.ts/OptionView';
import HTML from './SelectView.html';

export default class SelectView {
  private select = htmlToElement<HTMLSelectElement>(HTML) || document.createElement('select');

  public buildSelectView(values: Record<string, string>, id?: string): HTMLSelectElement {
    const entries = Object.entries(values);
    entries.forEach(([key, value]) => {
      const option = new OptionView().buildOptionView(value, key);
      this.select.append(option);
    });

    if (id) {
      this.select.id = id;
    }

    return this.select;
  }
}
