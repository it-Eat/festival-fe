import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api/axiosInstance"; // ← 추가
import { useCartStore } from "@/stores/cartStores";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref(null);
    const isAuthenticated = computed(() => !!user.value);
    const userRole = computed(() => (user.value ? user.value.role : null));

    const setUser = (userData) => {
      user.value = {
        id: userData.id,
        userName: userData.userName,
        nickname: userData.nickname,
        role: userData.role,
        createdAt: userData.createdAt,
      };
    };

    const logout = async () => {
      try {
        await api.post("/user/logout");
      } catch (err) {
        console.error("Logout API 호출 실패:", err);
      } finally {
        user.value = null;
        useCartStore().logout();
        document.cookie = "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    };

    return { user, isAuthenticated, userRole, setUser, logout };
  },
  {
    persist: {
      enabled: true,
      paths: ["user"],
    },
  }
);
