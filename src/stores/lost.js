import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const useLostStore = defineStore("lost", {
  state: () => ({
    losts: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await api.get("/board/board-loss/1");
        this.losts = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },
  },

  getters: {
    getLostById: (state) => (id) => {
      return state.losts.find((item) => item.id === id) || null;
    },
  },
});
