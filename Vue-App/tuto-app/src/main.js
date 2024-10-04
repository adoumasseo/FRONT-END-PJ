import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';


// Set up axios as the default HTTP client for your application
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; // Replace with your API URL
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const app = createApp(App);

// Use router
app.use(router);


// Mount the app
app.mount('#app');
