import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    boardDetail: {},
    myBoards: [],
  }),
  persist: {
    enable: true,
    storage: sessionStorage,
  },
  actions: {
    async fetchItems(
      festivalId,
      page = 1,
      pageSize = 50,
      order = "asc",
      keyword = ""
    ) {
      try {
        const response = await api.get(`/board/${festivalId}`, {
          params: {
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 50,
            order: order || "asc",
            keyword: keyword,
          },
        });

        this.boards = response.data;
      } catch (error) {
        console.error("❌ 데이터 가져오기 실패:", error);
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

    async fetchMyItems(
      page = 1,
      pageSize = 50,
      orderBy = "recent",
      boardType = "BOARD"
    ) {
      try {
        const festivalId = localStorage.getItem("festivalId");

        const response = await api.get(`/board/my-board/${festivalId}`, {
          params: {
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 50,
            orderBy: orderBy || "recent",
            boardType: boardType,
          },
        });

        this.myBoards = response.data;
        this.totalItems = response.data.length;
      } catch (error) {
        console.error("❌ 데이터 가져오기 실패:", error);
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
