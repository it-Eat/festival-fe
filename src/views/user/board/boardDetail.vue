<script setup>
import backHeader from "@/components/common/backHeader.vue";
import commentList from "@/components/common/commentList.vue";
import { computed, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { useCommentStore } from "@/stores/comment";

import api from "@/api/axiosInstance.js";

const route = useRoute();
const boardStore = useBoardStore();
const commentStore = useCommentStore();
const currentId = Number(route.params.id);
const festivalId = 1;

const currentItem = ref(null);

const loadBoardDetail = async () => {
  await boardStore.fetchDetailItems(currentId, festivalId);
};

onMounted(loadBoardDetail);

watch(
  () => boardStore.boardDetail,
  (newVal) => {
    currentItem.value = newVal;
  },
  { immediate: true }
);

const newComment = ref("");

const createComment = async () => {
  await commentStore.createComment(currentId, newComment.value, festivalId);
  newComment.value = "";
  await loadBoardDetail();
};

const editComment = async (commentId, content) => {
  await commentStore.editComment(commentId, content, currentId, festivalId);
  await loadBoardDetail();
};

const deleteComment = async (commentId) => {
  await commentStore.deleteComment(commentId, currentId, festivalId);
  await loadBoardDetail();
};

const currentImageIndex = ref(0);

const nextImage = () => {
  if (currentItem.value.images.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % currentItem.value.images.length;
  }
  console.log(2);
};

const prevImage = () => {
  if (currentItem.value.images.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + currentItem.value.images.length) %
      currentItem.value.images.length;
  }
  console.log(1);
};
</script>

<template>
  <div v-if="currentItem">
    <backHeader class="header" />
    <div class="a">
      <hr />
      <div class="title">{{ currentItem?.title || "제목 없음" }}</div>
      <hr />

      <div class="meta-data-bar">
        <div>{{ currentItem?.userName || "이름 없음" }}</div>
        <div>{{ currentItem?.createdAt || "날짜 없음" }}</div>
      </div>

      <div
        class="main-contents"
        v-if="currentItem?.images && currentItem.images.length"
      >
        <button @click="prevImage" class="nav-button left">◀</button>

        <img
          :src="currentItem.images[currentImageIndex]"
          :alt="currentItem?.title || '이미지 없음'"
          class="slider-image"
        />

        <button @click="nextImage" class="nav-button right">▶</button>
      </div>

      <div class="content">{{ currentItem?.content || "내용 없음" }}</div>
      <hr />

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
  <div v-else>Loading...</div>
  <!-- 데이터가 없을 때 로딩 메시지 표시 -->
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
  position: relative;
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

.slider-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  transition: opacity 0.3s ease-in-out;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 50%;
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}
</style>
