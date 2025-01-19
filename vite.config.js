import { fileURLToPath, URL } from "node:url";
// import fs from "fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  // https 로 바꿔주는 코드

  // server: {
  //   https: {
  //     key: fs.readFileSync("server.key"), // SSL 키 파일 경로
  //     cert: fs.readFileSync("server.crt"), // SSL 인증서 파일 경로
  //   },
  //   port: 5173, // 원하는 포트 설정
  //   open: true, // 개발 서버 실행 시 브라우저 자동 열기
  // },
});
