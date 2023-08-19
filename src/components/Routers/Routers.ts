import Alpine from 'alpinejs';
import RoutersAlpine from './Alpine/RoutersAlpine';

export default class Routers {
  public init(): void {
    this.setAlpineToBody();
    this.initAlpine();
  }

  private initAlpine(): void {
    Alpine.data('Routers', RoutersAlpine);
  }

  private setAlpineToBody(): void {
    document.body.setAttribute('x-data', 'Routers()');
  }
}
