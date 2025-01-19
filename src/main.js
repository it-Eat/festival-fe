import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index.js";
import axios from "axios";
import { createHead } from "@vueuse/head";

// 기본 url설정
axios.defaults.baseURL = import.meta.env.VITE_VUE_API_URL;

const app = createApp(App);
app.config.globalProperties.axios = axios;
const pinia = createPinia();
app.use(pinia);
app.use(router);
const head = createHead(); // head 인스턴스를 생성합니다.
app.use(head);
app.mount("#app");
