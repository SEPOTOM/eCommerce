import Converter from '../../../components/Converter/Converter';
import HTML from './OptionView.html';

export default class OptionView {
  private option = Converter.htmlToElement<HTMLOptionElement>(HTML) || document.createElement('option');

  public buildOptionView(text: string, value: string): HTMLOptionElement {
    this.option.textContent = text;
    this.option.value = value;

    return this.option;
  }
}
