import { defineStore } from "pinia";
import { ref } from "vue";
import board1 from "@/assets/board/board1.jpeg";
import board2 from "@/assets/board/board2.jpeg";
import board3 from "@/assets/board/board3.jpeg";
import board4 from "@/assets/board/board4.jpeg";
import board5 from "@/assets/board/board5.jpeg";
import board6 from "@/assets/board/board6.jpeg";
import board7 from "@/assets/board/board7.jpeg";
import board8 from "@/assets/board/board8.jpeg";

export const useBoardStore = defineStore("board", () => {
  const boardList = ref([
    {
      id: 1,
      name: "정영한",
      img: board1,
      title: "음악분수쇼 너무 예뻐요.",
      contents:
        "올해는 작년보다 더 규모가 커진 것 같아요! 특히 음악분수쇼랑 같이 하는 레이저쇼 완전 강추입니다 👍",
      date: "2024.11.01",
      found: true,
    },
    {
      id: 2,
      name: "박수민",
      img: board2,
      title: "게임 너무 재밌어요 ㅠ",
      contents:
        "근처 카페들도 야경 보이는 자리는 예약 필수더라구요. 빛축제 보면서 따뜻한 음료 한잔하고 싶으신 분들 참고하세요~",
      date: "2024.11.01",
      found: false,
    },
    {
      id: 3,
      name: "정영한",
      img: board3,
      title: "여러분 2구역 먹거리 부스 가보셨나요?",
      contents:
        "드디어 시작된 빛축제! 저번 주말에 다녀왔는데 진짜 예쁘더라구요. 인생샷 건지고 왔습니다 📸 다들 언제 가실 계획이세요?",
      date: "2024.11.01",
      found: true,
    },
    {
      id: 4,
      name: "박수민",
      img: board4,
      title: "힘들어요",
      contents:
        "주말에는 인생샷 건지기 힘들어요ㅠㅠ 사람이 너무 많아서... 평일 저녁이나 밤에 가시는 걸 추천드려요!",
      date: "2024.11.01",
      found: true,
    },
    {
      id: 5,
      name: "천세윤",
      img: board5,
      title: "가야금의 매력",
      contents:
        "가야금 연주 체험을 통해 전통 악기의 매력을 느꼈습니다. 처음에는 어려웠지만, 선생님의 도움으로 멋진 멜로디를 만들 수 있었습니다.",
      date: "2024.11.01",
      found: true,
    },
    {
      id: 6,
      name: "정영한",
      img: board6,
      title: "민속 공연의 즐거움",
      contents:
        "민속 공연에서 전통 춤을 배웠습니다. 관객 모두가 함께 참여하여 더욱 즐거운 분위기를 만들어냈습니다. 정말 잊지 못할 경험이었습니다!",
      date: "2024.11.01",
      found: false,
    },
    {
      id: 7,
      name: "천세윤",
      img: board7,
      title: "맛있는 가을 음식",
      contents:
        "축제에서 가을 한정 메뉴인 밤죽과 호박전도 맛보았습니다. 따뜻하고 고소한 맛이 가을의 정취를 더욱 느끼게 해주었습니다.",
      date: "2024.11.01",
      found: true,
    },
    {
      id: 8,
      name: "박수민",
      img: board8,
      title: "아름다운 단풍 구경",
      contents:
        "축제 기간 동안 아름다운 단풍을 감상할 수 있었습니다. 나무들이 화려한 색으로 물들어 있는 모습이 정말 멋졌습니다. 사진도 많이 찍었습니다!",
      date: "2024.11.01",
      found: true,
    },
  ]);

  const getLostById = (id) => {
    return boardList.value.find((item) => item.id === id);
  };

  return { boardList, getLostById };
});
