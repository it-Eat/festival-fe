import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index.js";
import axios from "axios";
import piniaPersist from "pinia-plugin-persistedstate";
import { io } from "socket.io-client";

// 기본 url설정
axios.defaults.baseURL = import.meta.env.VITE_VUE_API_URL;

// 소켓 연결 설정
export const socket = io(import.meta.env.VITE_VUE_API_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

// 소켓 이벤트 리스너
socket.on("connect", () => {});

socket.on("connect_error", (error) => {
  console.error("소켓 연결 실패:", error);
});

const app = createApp(App);
app.config.globalProperties.axios = axios;
app.config.globalProperties.$socket = socket; // 전역에서 소켓 사용 가능하도록 설정

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.use(router);
app.mount("#app");
