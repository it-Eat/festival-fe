import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: {
      id: "",
      userName: "",
      nickname: null,
      role: "",
      participation: [
        {
          festivalId: "",
        },
      ],
    },
  }),
  persist: {
    enable : true,
    storage: sessionStorage,
  },
  actions: {
    setUserData(userData) {
      console.log("User data received:", userData);
      this.user = userData;
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = {
        id: "",
        userName: "",
        nickname: null,
        role: "",
        participation: [
          {
            festivalId: "",
          },
        ],
      };
    },
  },
});
