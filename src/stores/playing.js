import { defineStore } from "pinia";
import api from "@/api/user.js";

export const usePlayingStore = defineStore("itemStore", {
  state: () => ({
    plays: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await api.get("board/board-loss/1");
        this.plays = response.data;
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    },
  },
});

// 다른 컴포넌트에서 사용할 수 있게 export 해주고
// defineStore()에 첫번째 파라미터로 다른 컴포넌트에서 쓸 이름 설정해주고 (= 'counter')
// 두번째 파라미터로 store에 관련된 옵션을 정의해주면 된다.

// export const usePlayingStore = defineStore("playing", () => {
//   const playingList = ref([
//     {
//       id: 1,
//       img: facefainting,
//       name: "페이스 페인팅",
//       position: "1구역",
//       description:
//         "페이스페인팅이란, 화지에 그림을 그리듯 얼굴에 그림을 그려 즐기는 아트입니다.",
//     },
//     {
//       id: 2,
//       img: ceramic,
//       name: "도자기 체험",
//       position: "2구역",
//       description:
//         "도자기 체험이란, 도자기를 체험해 보는 유익한 시간이 될 수 있습니다.",
//     },
//     {
//       id: 3,
//       img: dartgame,
//       name: "다트 게임",
//       position: "3구역",
//       description:
//         "다트게임이란, 화지에 그림을 그리듯 얼굴에 그림을 그려 즐기는 아트입니다.",
//     },
//     {
//       id: 4,
//       img: necklace,
//       name: "목걸이 만들기",
//       position: "4구역",
//       description:
//         "목걸이 만들기는 수제로 자기 자신만의 아름다운 목걸이를 만들 수 있습니다..",
//     },
//     {
//       id: 5,
//       img: photo,
//       name: "즉석 사진 촬영",
//       position: "5구역",
//       description:
//         "즉시 사진을 촬영해주어 면접, 여권, 주민등록증 등의 발급에 사용할 수 있습니다.",
//     },
//     {
//       id: 6,
//       img: personal,
//       name: "퍼스널 컬러 진단",
//       position: "6구역",
//       description:
//         "퍼스널 컬러 진단이란, 각자의 피부톤에 맞는 어울리는 색상을 찾아주고 스타일링해주는 진단입니다.",
//     },

//     {
//       id: 7,
//       img: facefainting,
//       name: "페이스 페인팅",
//       position: "1구역",
//       description:
//         "페이스페인팅이란, 화지에 그림을 그리듯 얼굴에 그림을 그려 즐기는 아트입니다.",
//     },
//     {
//       id: 8,
//       img: ceramic,
//       name: "도자기 체험",
//       position: "2구역",
//       description:
//         "도자기 체험이란, 도자기를 체험해 보는 유익한 시간이 될 수 있습니다.",
//     },
//     {
//       id: 9,
//       img: dartgame,
//       name: "다트 게임",
//       position: "3구역",
//       description:
//         "다트게임이란, 화지에 그림을 그리듯 얼굴에 그림을 그려 즐기는 아트입니다.",
//     },
//     {
//       id: 10,
//       img: necklace,
//       name: "목걸이 만들기",
//       position: "4구역",
//       description:
//         "목걸이 만들기는 수제로 자기 자신만의 아름다운 목걸이를 만들 수 있습니다..",
//     },
//     {
//       id: 11,
//       img: photo,
//       name: "즉석 사진 촬영",
//       position: "5구역",
//       description:
//         "즉시 사진을 촬영해주어 면접, 여권, 주민등록증 등의 발급에 사용할 수 있습니다.",
//     },
//     {
//       id: 12,
//       img: personal,
//       name: "퍼스널 컬러 진단",
//       position: "6구역",
//       description:
//         "퍼스널 컬러 진단이란, 각자의 피부톤에 맞는 어울리는 색상을 찾아주고 스타일링해주는 진단입니다.",
//     },
//   ]);

//   const getPlayingById = (id) => {
//     return playingList.value.find((item) => item.id === id);
//   };

//   return { playingList, getPlayingById };
// });
