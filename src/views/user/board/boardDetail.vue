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
  await commentStore.fetchComments(currentId, festivalId);
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

const currentImageIndex = ref(0);

const nextImage = () => {
  if (currentItem.value.images.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % currentItem.value.images.length;
  }
  console.log(2);
};

const formatDate = (dateString) => {
  if (!dateString) return ""; // 날짜가 없으면 빈 문자열 반환
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
        <div>{{ formatDate(currentItem?.createdAt) || "날짜 없음" }}</div>
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

      <div class="comment-list-container">
        <p class="comment-header">
          댓글 수: {{ commentStore.commentList.length }}
        </p>
        <div class="comment-list" v-if="commentStore.commentList.length > 0">
          <div
            v-for="(comment, index) in commentStore.commentList"
            :key="index"
            class="comment-item"
          >
            <span class="comment-user">{{ comment.user.userName }}</span>
            <span class="comment-content">{{ comment.content }}</span>
            <span class="comment-date">
              {{ new Date(comment.createdAt).toLocaleString("ko-KR") }}
            </span>
          </div>
        </div>
        <p v-else>등록된 댓글이 없습니다.</p>
      </div>
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

.comment-list-container {
  margin-top: 20px;
}

.comment-header {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.comment-list {
  border-top: 1px solid #000;
  margin-top: 10px;
}

.comment-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #000;
}

.comment-user {
  font-weight: bold;
  font-size: 16px;
}

.comment-content {
  flex: 1;
  margin-left: 15px;
  font-size: 15px;
}

.comment-date {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}
</style>
