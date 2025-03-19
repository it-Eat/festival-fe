import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/axiosInstance.js";

export const useCommentStore = defineStore("comment", () => {
  const commentList = ref([]);

  const fetchComments = async (currentId, festivalId = 1) => {
    try {
      const response = await api.get(
        `https://festival-be.onrender.com/comment/${currentId}/${festivalId}`
      );

      commentList.value = response.data.map((comment) => ({
        userName: comment.user.userName, // 사용자 이름
        content: comment.content, // 댓글 내용
        createdAt: comment.createdAt, // 생성 날짜
      }));

      console.log("가공된 댓글 리스트:", commentList.value); // 콘솔에서 확인
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const createComment = async (currentId, content, festivalId = 1) => {
    try {
      await api.post(
        `https://festival-be.onrender.com/comment/${currentId}/${festivalId}`,
        { content }
      );
      await fetchComments(currentId, festivalId);
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  const editComment = async (commentId, content, currentId, festivalId = 1) => {
    try {
      await api.put(`https://festival-be.onrender.com/comments/${commentId}`, {
        content,
      });
      await fetchComments(currentId, festivalId);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const deleteComment = async (commentId, currentId, festivalId = 1) => {
    try {
      await api.delete(
        `https://festival-be.onrender.com/comments/${commentId}`
      );
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
});
