import { defineStore } from "pinia";
import api from "@/api/axiosInstance.js";

export const useLostStore = defineStore("lost", {
  state: () => ({
    lostDetail: {},
    losts: [], // 전체 데이터를 저장
    totalItems: 0, // 총 데이터 개수
    itemsPerPage: 7, // 한 페이지에 보여줄 개수
    currentPage: 1, // 현재 페이지
    myLosts: [],
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
        const response = await api.get(`/board/board-loss/${festivalId}`, {
          params: {
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 50,
            order: order || "asc",
            keyword: keyword,
          },
        });

        this.losts = response.data;
        this.totalItems = response.data.length;
      } catch (error) {
        console.error("❌ 데이터 가져오기 실패:", error);
      }
    },

    setCurrentPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    async fetchDetailItems(lostItemId, festivalId) {
      try {
        const response = await api.get(`/board/${lostItemId}/${festivalId}`);
        this.lostDetail = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },

    async fetchMyItems(
      page = 1,
      pageSize = 50,
      orderBy = "recent",
      boardType = "LOSS"
    ) {
      try {
        const response = await api.get("/board/my-board/1", {
          params: {
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 50,
            orderBy: orderBy || "recent",
            boardType: boardType,
          },
        });

        this.myLosts = response.data;
        this.totalItems = response.data.length;
      } catch (error) {
        console.error("❌ 데이터 가져오기 실패:", error);
      }
    },
  },

  getters: {
    // 특정 ID로 데이터 찾기
    getLostById: (state) => (id) => {
      return state.losts.find((item) => item.id === id) || null;
    },
    getLostDetail: (state) => () => {
      return state.lostDetail || null;
    },

    // 현재 페이지에서 보여줄 데이터 7개 필터링
    paginatedLosts: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.losts.slice(start, end);
    },

    // 전체 페이지 수 계산
    totalPages: (state) => Math.ceil(state.totalItems / state.itemsPerPage),
  },
});
