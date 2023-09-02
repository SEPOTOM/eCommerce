import Converter from '../../components/Converter/Converter';
import HTML from './PasswordModalView.html';
import InputView from '../InputView/InputView';
import { DataAttrs, ModalInputsOptions } from './data';

const DEFAULT_INPUT_VALUE = '';

enum ClassNames {
  HIDDEN = 'hidden',
  NO_OVERFLOW = 'overflow-hidden',
}

export default class PasswordModalView {
  private view = Converter.htmlToElement<HTMLDivElement>(HTML) || document.createElement('div');

  private inputsObjects: InputView[] = [];

  public buildView(): HTMLElement {
    this.configureView();
    this.configureInputs();

    return this.view;
  }

  public show(): void {
    this.view.classList.remove(ClassNames.HIDDEN);

    document.body.classList.add(ClassNames.NO_OVERFLOW);
  }

  public hide(): void {
    this.view.classList.add(ClassNames.HIDDEN);

    document.body.classList.remove(ClassNames.NO_OVERFLOW);
  }

  private configureView(): void {
    this.hide();

    this.view.addEventListener('click', (e) => {
      const { target } = e;

      if (target instanceof HTMLElement) {
        const isInsideContent = target.closest(`[${DataAttrs.MODAL_CONTENT}]`);
        const isCloseButton = target.closest(`[${DataAttrs.CANCEL_BUTTON}]`);

        if (!isInsideContent || isCloseButton) {
          this.hide();
          this.clear();
        }
      }
    });
  }

  private configureInputs(): void {
    const rows = this.view.querySelectorAll(`[${DataAttrs.ROW}]`);
    const labels = this.view.querySelectorAll(`[${DataAttrs.LABEL}]`);

    ModalInputsOptions.forEach((inputOptions, index) => {
      const localInputOptions = inputOptions;
      const id = labels[index]?.getAttribute('for') || '';

      localInputOptions.id = id;
      localInputOptions.dataAttr = {
        name: 'type',
        value: id,
      };

      const inputObject = new InputView();

      this.inputsObjects.push(inputObject);

      const inputRow = inputObject.buildInputView(localInputOptions);

      rows[index]?.append(inputRow);
    });
  }

  private clear(): void {
    this.inputsObjects.forEach((inputObject) => {
      inputObject.setValue(DEFAULT_INPUT_VALUE);
      inputObject.hideError();
    });
  }
}
