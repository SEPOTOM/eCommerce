import GenericView from '../../view/GenericView/GenericView';

export default class App {
  private view: GenericView;

  constructor() {
    this.view = new GenericView();
  }

  public build(): void {
    this.view.buildGenericView();
  }
}
