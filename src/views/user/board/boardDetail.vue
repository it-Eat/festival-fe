<script setup>
import backHeader from "@/components/common/backHeader.vue";
import commentList from "@/components/common/commentList.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "@/stores/board";
import api from "@/api/axiosInstance.js";

const route = useRoute();
const boardStore = useBoardStore();
const currentId = Number(route.params.id);
const currentItem = computed(() => boardStore.getBoardById(currentId));

const newComment = ref("");

const createComment = async () => {
  const festivalId = 1; // 현재 사용하는 festivalId 값으로 변경하세요
  try {
    await api.post(
      `https://festival-be.onrender.com/comment/${currentId}/${festivalId}`,
      {
        content: newComment.value,
      }
    );
    newComment.value = "";
    boardStore.fetchItems();
  } catch (error) {
    console.error("댓글 작성 실패:", error);
  }
};

const editComment = async (commentId, content) => {
  try {
    await api.put(`/comments/${commentId}`, { content });
    boardStore.fetchItems();
  } catch (error) {
    console.error("댓글 수정 실패:", error);
  }
};

const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`);
    boardStore.fetchItems();
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  }
};
</script>

<template>
  <div>
    <backHeader class="header" />
    <div class="a">
      <hr />
      <div class="title">{{ currentItem.title }}</div>
      <hr />

      <div class="meta-data-bar">
        <div>{{ currentItem.name }}</div>
        <div>{{ currentItem.date }}</div>
      </div>

      <div class="main-contents">
        <img :src="currentItem.img" :alt="currentItem.title" />
        <div>{{ currentItem.contents }}</div>
      </div>

      <div class="comment-section">
        <textarea
          v-model="newComment"
          placeholder="댓글을 입력하세요"
        ></textarea>
        <button @click="createComment">댓글 작성</button>
      </div>

      <commentList
        :type="2"
        :writingId="currentId"
        class="comment-list"
        @edit-comment="editComment"
        @delete-comment="deleteComment"
      />
    </div>
  </div>
</template>

<style scoped>
.a {
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  max-width: 600px;
  margin: 0 auto 15px auto;
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 0;
  color: #333333;
}

.meta-data-bar {
  background-color: #f5f7fa;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  color: #555555;
  margin-top: 10px;
}

.main-contents {
  padding: 20px;
  text-align: center;
}

.main-contents img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 20px auto;
}

.comment-section {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}

.comment-section textarea {
  resize: vertical;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.comment-section button {
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  align-self: flex-end;
}

.comment-list {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
}
</style>
