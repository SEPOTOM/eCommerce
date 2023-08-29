import Navigation from '../../../api/Navigation/Navigation';

export default () => ({
  menu: null,

  init(): void {
    Navigation.links.then((data): void => {
      this.menu = data;
    });
  },
});
