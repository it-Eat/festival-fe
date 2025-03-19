import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index.js";
import axios from "axios";
import piniaPersist from 'pinia-plugin-persistedstate';

// 기본 url설정
axios.defaults.baseURL = import.meta.env.VITE_VUE_API_URL;

const app = createApp(App);
app.config.globalProperties.axios = axios;
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.use(router);
app.mount("#app");
