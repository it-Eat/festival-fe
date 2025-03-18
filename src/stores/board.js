import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    boardDetail: {},
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await api.get("/board/1");
        this.boards = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },

    async fetchDetailItems(boardId, festivalId) {
      try {
        const response = await api.get(`/board/${boardId}/${festivalId}`);
        this.boardDetail = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },
  },


  getters: {
    getBoardById: (state) => (id) => {
      return state.boards.find((item) => item.id === id) || null;
    },
    getBoardDetail: (state) => () => {
      return state.boardDetail || null;
    },
  },
});
