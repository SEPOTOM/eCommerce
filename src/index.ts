import './style.css';
import Alpine from 'alpinejs';
import App from './components/App/App';

const app = new App();
app.build();

// Alpine.js connection
window.Alpine = Alpine;
Alpine.start();
