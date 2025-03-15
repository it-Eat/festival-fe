import axios from "axios";

const api = axios.create({
  baseURL: "https://festival-be.onrender.com",
  withCredentials: true, // 모든 요청에 쿠키 포함
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401 에러 발생 시 토큰 갱신 시도 (단, 이미 재시도한 경우는 피함)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refreshToken API 호출
        await api.post('/user/refreshToken');
        // refreshToken 호출 후, 원래 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리 등 추가
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
