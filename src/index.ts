import './style.css';
import Alpine from 'alpinejs';
import App from './components/App/App';
import Routers from './components/Routers/Routers';

// Alpine.js connection
window.Alpine = Alpine;
Alpine.start();

const app = new App();
const router = new Routers();

app.build();
router.init();
