<script setup>
import backHeader from "@/components/common/backHeader.vue";
import { watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { useCommentStore } from "@/stores/comment";
import { useUserStore } from "@/stores/userStore"; // New import
// 날짜 포맷 함수 임포트 (경로는 실제 프로젝트 구조에 맞게 조정)
import { dateFormatWithTime, getRelativeTime } from "@/util/dateFormat";
import loadingComponent from "@/components/common/loadingComponent.vue";

const route = useRoute();
const boardStore = useBoardStore();
const commentStore = useCommentStore();
const userStore = useUserStore(); // New initialization
const currentId = Number(route.params.id);
const festivalId = Number(route.params.festivalId);
const currentItem = ref(null);
const isLoading = ref(false);

const loadBoardDetail = async () => {
  try {
    isLoading.value = true;
    await boardStore.fetchDetailItems(currentId, festivalId);
    await commentStore.fetchComments(currentId, festivalId);
    currentItem.value = boardStore.getBoardDetail();
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadBoardDetail);

watch(
  () => boardStore.getBoardDetail(),
  (newVal) => {
    currentItem.value = newVal;
  },
  { immediate: true }
);

const newComment = ref("");

const createComment = async () => {
  isLoading.value = true;
  await commentStore.createComment(currentId, newComment.value, festivalId);
  newComment.value = "";
  await loadBoardDetail();
  isLoading.value = false;
};

const currentImageIndex = ref(0);

const nextImage = () => {
  if (currentItem.value.images.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % currentItem.value.images.length;
  }
};

const prevImage = () => {
  if (currentItem.value.images.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + currentItem.value.images.length) %
      currentItem.value.images.length;
  }
};

// util의 dateFormatWithTime 함수를 사용하여 날짜를 포맷
const formatDate = (dateString) => {
  return dateString ? dateFormatWithTime(dateString) : "";
};

const deleteComment = async (commentId) => {
  try {
    isLoading.value = true;
    // New method
    await commentStore.deleteComment(commentId, currentId, festivalId);
    await loadBoardDetail();
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div v-if="currentItem">
    <backHeader class="header" title="게시글 상세" />
    <div class="a">
      <div class="title">
        <span class="title-text">{{ currentItem?.title || "제목 없음" }}</span>
      </div>

      <div class="meta-data-bar">
        <div>작성자 : {{ currentItem?.userName || "이름 없음" }}</div>
        <div>{{ formatDate(currentItem?.createdAt) || "날짜 없음" }}</div>
      </div>

      <div
        class="main-contents"
        v-if="currentItem?.images && currentItem.images.length"
      >
        <div class="image-container">
          <button
            v-if="currentImageIndex > 0"
            @click="prevImage"
            class="nav-button left"
          >
            ◀
          </button>

          <img
            :src="currentItem.images[currentImageIndex]"
            :alt="currentItem?.title || '이미지 없음'"
            class="slider-image"
          />

          <button
            v-if="currentImageIndex < currentItem.images.length - 1"
            @click="nextImage"
            class="nav-button right"
          >
            ▶
          </button>
        </div>
      </div>
      <div class="content">{{ currentItem?.content || "내용 없음" }}</div>

      <div class="comment-section">
        <textarea
          v-model="newComment"
          placeholder="댓글을 입력하세요"
        ></textarea>
        <button class="comment-button" @click="createComment">댓글 작성</button>
      </div>

      <div class="comment-list-container">
        <p class="comment-header">
          댓글 수 : {{ commentStore.commentList.length }}
        </p>
        <div class="comment-list" v-if="commentStore.commentList.length > 0">
          <div
            v-for="(comment, index) in commentStore.commentList"
            :key="index"
            class="comment-item"
          >
            <span class="comment-user">{{ comment.userName }}</span>
            <span class="comment-content">{{ comment.content }}</span>
            <span class="comment-date">
              {{ getRelativeTime(comment.createdAt) }}
            </span>
            <button
              v-if="comment.userName === userStore.user?.userName"
              @click="deleteComment(comment.id)"
              class="comment-delete-button"
            >
              삭제
            </button>
          </div>
        </div>
        <p v-else>등록된 댓글이 없습니다.</p>
      </div>
    </div>
  </div>
  <loadingComponent v-if="isLoading" />
</template>

<style scoped>
.a {
  max-width: 600px;
  margin: 32px auto;
  padding: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  max-width: 600px;
  margin: 15px auto;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 0;
  color: #333333;
}

.title-text {
  flex-grow: 1;
}

.meta-data-bar {
  padding: 18px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-top: 10px;
}

.content {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  word-break: break-word;
  line-height: 1.5;
}
.main-contents {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 350px;
  height: 250px;
  position: relative;
  margin: 10px 0;
}

.main-contents img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: fill;
}

.comment-section {
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.comment-section textarea {
  width: 100%;
  height: 37px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 8px;
  resize: none;
}
.comment-section textarea:focus {
  outline: none;
}

.comment-button {
  background-color: white;
  color: #ff6f61;
  border: 1px solid #ff6f61;
  border-radius: 5px;
  padding: 0 16px;
  white-space: nowrap;
  height: 35px;
}
.comment-button:hover {
  background-color: #ff6f61;
  color: white;
}
.comment-list {
  padding: 10px 0;
  border: none;
}

.comment-list div {
  padding: 8px 0;
  margin-bottom: 8px;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: flex-end;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}

.comment-list-container {
  margin-top: 12px;
  border: none;
}

.comment-header {
  font-size: 14px;
}

.comment-item {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 10px;
}

.comment-user {
  color: #ff6f61;
  font-size: 16px;
}

.comment-content {
  flex: 1;
  margin-left: 15px;
  font-size: 16px;
}

.comment-date {
  font-size: 14px;
  color: #777;
  white-space: nowrap;
}

.comment-delete-button {
  background-color: white;
  color: #ff6f61;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  margin-left: 10px;
}

.comment-delete-button:hover {
  color: #e06156;
}
</style>
