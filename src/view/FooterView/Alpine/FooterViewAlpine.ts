import Navigation from '../../../api/Navigation/Navigation';
import imgFooterBackground from '../../../assets/footer-background.jpg';

export default () => ({
  menu: null,
  footerBaclground: `url(${imgFooterBackground})`,

  init(): void {
    Navigation.menu.then((data): void => {
      this.menu = data;
    });
  },
});
