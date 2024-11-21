import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Import the router instance

// Create the Vue app and use the router
createApp(App)
  .use(router)  // Tell Vue to use the router
  .mount('#app');
