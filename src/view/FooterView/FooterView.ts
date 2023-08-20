import Alpine from 'alpinejs';
import Converter from '../../components/Converter/Converter';
import FooterViewAlpine from './Alpine/FooterViewAlpine';
import FooterViewHTML from './FooterView.html';

// Import images to Home page
import imgFooterBackground from './../../assets/footer-background.jpg';

export default class FooterView {
  public draw(): void {
    Alpine.data('Footer', FooterViewAlpine);
    document.body.append(Converter.htmlToElement(FooterViewHTML)!);

    // Insert images
    const footerBg: HTMLElement = document.querySelector('[data-element="footer-background-image"]')!;
    footerBg.setAttribute('style', `background-image: url('${imgFooterBackground}')`);
  }
}
