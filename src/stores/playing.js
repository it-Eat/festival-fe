import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const usePlayingStore = defineStore("playingStore", {
  state: () => ({
    plays: [],
  }),
  persist: {
    enable : true,
    storage: sessionStorage,
  },
  actions: {
    async fetchItems() {
      try {
        const response = await api.get(
          "booth/1?page=1&pageSize=50&type=PLAY, ETC"
        );
        this.plays = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },
    // getPlayingById 함수 추가
    getPlayingById(id) {
      return this.plays.find((play) => play.id === id);
    },
  },
});
