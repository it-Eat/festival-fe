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

// {
//   "id": 20,
//   "userId": 30,
//   "festivalId": 1,
//   "title": "아이폰 X 습득했어요",
//   "content": "B구역에서 보관중입니다. 찾아가세요",
//   "images": [
//       "https://festivals3ss.s3.us-east-1.amazonaws.com/profiles/1741705489923_KakaoTalk_Photo_2024-10-17-16-27-26.png",
//       "https://festivals3ss.s3.us-east-1.amazonaws.com/profiles/1741705489923_KakaoTalk_Photo_2024-10-17-16-27-26.png"
//   ],
//   "boardType": "LOSS",
//   "lossType": "GET",
//   "createdAt": "2025-03-14T11:22:35.619Z",
//   "updatedAt": "2025-03-14T11:19:13.617Z",
//   "userName": "박수민",
//   "nickname": "박수민"
// },
