import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const useFoodStore = defineStore("itemStore", {
  state: () => ({
    foods: [],
  }),
  persist: {
    enable: true,
    storage: sessionStorage,
  },
  actions: {
    async fetchItems(festivalId) {
      try {
        const response = await api.get(
          `booth/${festivalId}?page=1&pageSize=6&type=EAT`
        );
        this.foods = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },
  },
});
