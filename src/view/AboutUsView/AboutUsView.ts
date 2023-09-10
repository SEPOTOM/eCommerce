import AboutUsViewHTML from './AboutUsView.html';

// Import images
import imgRSLogo from '../../assets/rs-logo.jpg';
import imgParticipant1 from '../../assets/participant1.jpg';
import imgParticipant2 from '../../assets/participant2.jpg';
import imgParticipant3 from '../../assets/participant3.jpg';
import imgMentor from '../../assets/mentor.jpg';

export default class AboutUsView {
  // A little deception for tests regarding image loading
  rsLogo: string;

  participant1: string;

  participant2: string;

  participant3: string;

  mentor: string;

  constructor() {
    this.rsLogo = imgRSLogo;
    this.participant1 = imgParticipant1;
    this.participant2 = imgParticipant2;
    this.participant3 = imgParticipant3;
    this.mentor = imgMentor;
  }

  public draw(): void {
    const main: HTMLElement = document.querySelector('main')!;
    main.innerHTML = AboutUsViewHTML;
  }
}
