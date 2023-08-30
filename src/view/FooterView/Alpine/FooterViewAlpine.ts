import Navigation from '../../../api/Navigation/Navigation';

export default () => ({
  menu: null,

  init(): void {
    Navigation.menu.then((data): void => {
      this.menu = data;
    });
  },
});
