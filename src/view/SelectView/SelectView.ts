import Converter from '../../components/Converter/Converter';
import OptionView from './OptionView.ts/OptionView';
import HTML from './SelectView.html';

export default class SelectView {
  private select = Converter.htmlToElement<HTMLSelectElement>(HTML) || document.createElement('select');

  public makeSmall(): void {
    this.select.dataset.small = 'true';
  }

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

  public getValue(): string {
    return this.select.value;
  }

  public setValue(value: string) {
    this.select.value = value;
  }

  public dispatchEvent(event: Event): void {
    this.select.dispatchEvent(event);
  }
}
