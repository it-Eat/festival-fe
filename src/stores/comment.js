import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/axiosInstance.js";

export const useCommentStore = defineStore(
  "comment",
  () => {
    const commentList = ref([]);

    const fetchComments = async (currentId, festivalId) => {
      try {
        const response = await api.get(`comment/${currentId}/${festivalId}`);

        commentList.value = response.data.map((comment) => ({
          id: comment.id, // 댓글 아이디
          userName: comment.user.userName, // 사용자 이름
          content: comment.content, // 댓글 내용
          createdAt: comment.createdAt, // 생성 날짜
        }));
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    const createComment = async (currentId, content, festivalId) => {
      try {
        await api.post(`comment/${currentId}/${festivalId}`, {
          content,
        });
        await fetchComments(currentId, festivalId);
      } catch (error) {
        console.error("댓글 작성 실패:", error);
      }
    };

    const editComment = async (commentId, content, currentId, festivalId) => {
      try {
        await api.put(`comment/${commentId}/${festivalId}`, {
          content,
        });
        await fetchComments(currentId, festivalId);
      } catch (error) {
        console.error("댓글 수정 실패:", error);
      }
    };

    const deleteComment = async (commentId, currentId, festivalId = 1) => {
      try {
        await api.delete(`comment/${commentId}/${festivalId}`);
        await fetchComments(currentId, festivalId);
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
      }
    };

    const getCommentById = (id) => {
      return commentList.value.find((item) => item.id === id);
    };

    const getCommentByWritingId = (id, type) => {
      return commentList.value.filter(
        (item) => item.writingId === id && item.type === Number(type)
      );
    };

    return {
      commentList,
      getCommentById,
      getCommentByWritingId,
      fetchComments,
      createComment,
      editComment,
      deleteComment,
    };
  },
  {
    persist: {
      enabled: true,
      paths: ["comment"],
      storage: sessionStorage,
    },
  }
);
