import './style.css';
import Alpine from 'alpinejs';
import App from './components/App/App';

App.build();

// Alpine.js connection
window.Alpine = Alpine;
Alpine.start();
