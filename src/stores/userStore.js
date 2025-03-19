import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(null); // 유저 정보 저장
  const isAuthenticated = computed(() => !!user.value); // 로그인 여부 확인
  const userRole = computed(() => (user.value ? user.value.role : null)); // 역할 ('USER' 또는 'MERCHANT')

  // 유저 정보 저장
  const setUser = (userData) => {
    user.value = {
      id: userData.id,
      userName: userData.userName,
      nickname: userData.nickname,
      role: userData.role,
      createdAt: userData.createdAt,
    };
  };

  // 로그아웃 (유저 정보 삭제 & 쿠키 삭제)
  const logout = () => {
    user.value = null;
    document.cookie =
      "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return {
    user,
    isAuthenticated,
    userRole,
    setUser,
    logout,
  };
});
