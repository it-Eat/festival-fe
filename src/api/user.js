import axios from "axios";

const api = axios.create({
  baseURL: "https://festival-be.onrender.com", // 백엔드 API 기본 주소
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // JWT 토큰이 있다면 추가

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 중 에러 발생:", error.response);
    return Promise.reject(error);
  }
);

export default api;
