import './assets/styles/style.css';
import './assets/styles/dnd-like.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'

const app = createApp(App);
app.use(createPinia());

app.mount('#app');
