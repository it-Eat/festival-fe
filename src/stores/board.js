import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    boardDetail: {},
  }),
  persist: {
    enable: true,
    storage: sessionStorage,
  },
  actions: {
    async fetchItems(
      page = 1,
      pageSize = 50,
      orderBy = "createdAt",
      order = "asc",
      keyword = ""
    ) {
      try {
        console.log(
          `🔍 API 요청 URL: /board/1?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&order=${order}&keyword=${keyword}`
        );

        const response = await api.get(`/board/1`, {
          params: {
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 50, // ✅ 여기가 실제로 50으로 보내지는지 확인
            // orderBy: orderBy || "createdAt",
            order: order || "asc",
            keyword: keyword,
          },
        });

        console.log("🔄 서버에서 받아온 데이터 개수:", response.data.length);
        console.log("📦 받아온 데이터:", response.data);

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
