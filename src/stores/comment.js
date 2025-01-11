import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommentStore = defineStore("comment", () => {
  const commentList = ref([
    {
      id: 1,
      type: 1, // 분실물 : 1, 게시물 : 2
      writingId: 1,
      writer: "정영한",
      contents: "인정이요 ㅋㅋㅋ",
      date: "2024.11.23",
    },
    {
      id: 2,
      type: 2,
      writingId: 1,
      writer: "박수민",
      contents: "진짜 좋은거 같아요~",
      date: "2024.12.11",
    },
    {
      id: 3,
      type: 2,
      writingId: 1,
      writer: "천세윤",
      contents: "저번에 갔을때도 좋았어요 ㅋㅋ",
      date: "2024.12.14",
    },
    {
      id: 4,
      type: 1,
      writingId: 1,
      writer: "서성우",
      contents: "뭐라카노 ㅋㅋ",
      date: "2024.12.18",
    },
    {
      id: 5,
      type: 1,
      writingId: 1,
      writer: "도경록",
      contents: "맞아요 그거 배달시키려면 쭉 나가서 받아야해요",
      date: "2024.12.21",
    },
    {
      id: 6,
      type: 1,
      writingId: 1,
      writer: "김한민",
      contents: "그건 좀 아닌듯..",
      date: "2024.12.23",
    },
    {
      id: 7,
      type: 1,
      writingId: 1,
      writer: "허준수",
      contents: "믿고 있었다구",
      date: "2024.12.23",
    },
    {
      id: 8,
      type: 1,
      writingId: 1,
      writer: "이수환",
      contents: "내가 만들어줄게 ㅋㅋ",
      date: "2024.12.24",
    },
  ]);

  const getCommentById = (id) => {
    return commentList.value.find((item) => item.id === id);
  };

  const getCommentByWritingId = (id, type) => {
    return commentList.value.filter(
      (item) => item.writingId === id && item.type === Number(type)
    );
  };

  return { commentList, getCommentById, getCommentByWritingId };
});
