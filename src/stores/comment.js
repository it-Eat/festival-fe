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
      commentList.value = response.data;
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const createComment = async (currentId, content, festivalId = 1) => {
    try {
      await api.post(
        `https://festival-be.onrender.com/comment/${currentId}/${festivalId}`,
        {
          withCredentials: true,
          content,
        }
      );
      await fetchComments(currentId, festivalId);
    } catch (error) {
      console.error("댓글 작성 실패:", error);
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
  };
});
