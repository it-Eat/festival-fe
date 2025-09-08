import axios from "axios";

const api = axios.create({
  // baseURL: "/api", // 프록시 설정에 맞게 수정
  baseURL: "http://localhost:3001", // 프록시 설정에 맞게 수정
  withCredentials: true, // 모든 요청에 쿠키 포함
});

export default api;
