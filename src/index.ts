import './style.css';
import Alpine from 'alpinejs';
import App from './components/App/App';

// Alpine.js connection
window.Alpine = Alpine;
Alpine.start();

const app = new App();
app.build();
