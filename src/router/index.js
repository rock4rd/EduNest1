import { createRouter, createWebHistory } from 'vue-router';

// Import the components for each route
import Home from '../components/HelloWorld.vue';  // Adjust the paths if needed
import RegisterForm from '../components/Registerform.vue';
import MainPage from '../components/MainPage.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home  // The component to load for the Home route
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm  // The component to load for the Register route
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage // The component to load for the Register route
  }
  
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  // Uses HTML5 history mode
  routes  // The routes we just defined
});

export default router;
