//Paquetes de Vue
import { createApp } from 'vue';

//Importamos nuestra "template como App automáticamente"
import App from './login.vue';

//Importamos los assets de Tailwind
import './assets/tailwind.css';

//Montamos la aplicación
const app = createApp(App).mount('#app')

