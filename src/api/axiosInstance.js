import axios from "axios";

const api = axios.create({
  baseURL: "https://festival-be.onrender.com",
  withCredentials: true, // 모든 요청에 쿠키 포함
});

// 쿠키에서 access-token 가져오기
const getAccessTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("access-token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

// 요청마다 Authorization 헤더에 access-token 추가
api.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
