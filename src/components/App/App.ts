import GenericView from '../../view/GenericView/GenericView';

export default class App {
  public build(): void {
    const genericView = new GenericView();
    genericView.buildGenericView();
  }
}
