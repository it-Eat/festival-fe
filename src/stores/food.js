import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const useFoodStore = defineStore("itemStore", {
  state: () => ({
    foods: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await api.get("booth/1?page=1&pageSize=6&type=EAT");
        this.foods = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },
  },
});
