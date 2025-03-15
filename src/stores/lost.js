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
});

// export const useLostStore = defineStore("lost", () => {
//   const lostList = ref([
//     {
//       id: 1,
//       name: "정영한",
//       img: iphone11,
//       title: "아이폰 11프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 11프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: true,
//     },
//     {
//       id: 2,
//       name: "박수민",
//       img: iphone12,
//       title: "아이폰 12프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 12프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: false,
//     },
//     {
//       id: 3,
//       name: "천세윤",
//       img: iphone13,
//       title: "아이폰 13프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 13프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: true,
//     },
//     {
//       id: 4,
//       name: "박수민",
//       img: iphone14,
//       title: "아이폰 14프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 14프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: true,
//     },
//     {
//       id: 5,
//       name: "박수민",
//       img: iphone15,
//       title: "아이폰 15프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 11프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: true,
//     },
//     {
//       id: 6,
//       name: "천세윤",
//       img: iphone16,
//       title: "아이폰 16프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 12프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: false,
//     },
//     {
//       id: 7,
//       name: "천세윤",
//       img: iphone17,
//       title: "아이폰 17프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 13프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: true,
//     },
//     {
//       id: 8,
//       name: "정영한",
//       img: iphone18,
//       title: "아이폰 18프로 맥스 찾아요",
//       contents: "XX 구역에서 아이폰 14프로 맥스 보신분 계신가요?",
//       date: "2024.11.01",
//       found: true,
//     },
//   ]);

//   const getLostById = (id) => {
//     return lostList.value.find((item) => item.id === id);
//   };

//   return { lostList, getLostById };
// });
