import Navigation from '../../../api/Navigation/Navigation';

export default () => ({
  showMobileMenu: false,
  showAccountDropdown: false,
  menu: null,

  init(): void {
    Navigation.menu.then((data): void => {
      this.menu = data;
    });
  },
});
