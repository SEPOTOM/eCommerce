import './style.css';
import Alpine from 'alpinejs';
import App from './components/App/App';
import Tokens from './components/Tokens/Tokens';

// Alpine.js connection
window.Alpine = Alpine;
Alpine.start();

const app = new App();

// Get access token once when app loading
Tokens.getClientAccessToken().then((token) => {
  app.loadDefaultPage();
  app.runRoute(token);
});
