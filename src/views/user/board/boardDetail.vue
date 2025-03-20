<script setup>
import backHeader from "@/components/common/backHeader.vue";
import lostChip from "@/components/common/lostChip.vue";
import { watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useLostStore } from "@/stores/lost";
import { useCommentStore } from "@/stores/comment";
// 날짜 포맷 함수 임포트 (경로는 실제 프로젝트 구조에 맞게 조정)
import { dateFormatWithTime } from "@/util/dateFormat";

const route = useRoute();
const lostStore = useLostStore();
const commentStore = useCommentStore();

const currentId = Number(route.params.id);
const festivalId = 1;
const currentItem = ref(null);

const loadLostItemDetail = async () => {
  try {
    await lostStore.fetchDetailItems(currentId, festivalId);
    await commentStore.fetchComments(currentId, festivalId);
    currentItem.value = lostStore.getLostDetail();
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

onMounted(loadLostItemDetail);

watch(
  () => lostStore.getLostDetail(),
  (newVal) => {
    currentItem.value = newVal;
  },
  { immediate: true }
);

const newComment = ref("");

const createComment = async () => {
  await commentStore.createComment(currentId, newComment.value, festivalId);
  newComment.value = "";
  await loadLostItemDetail();
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
</script>

<template>
  <div v-if="currentItem">
    <backHeader class="header" />
    <div class="a">
      <hr />
      <div class="title">
        <lostChip
          v-if="currentItem?.lossType"
          :type="currentItem.lossType"
          class="left-chip"
        />
        <span class="title-text">{{ currentItem?.title || "제목 없음" }}</span>
      </div>
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
            <span class="comment-user">{{ comment.userName }}</span>
            <span class="comment-content">{{ comment.content }}</span>
            <span class="comment-date">
              {{ formatDate(comment.createdAt) }}
            </span>
          </div>
        </div>
        <p v-else>등록된 댓글이 없습니다.</p>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 0;
  color: #333333;
}

.left-chip {
  position: absolute;
  left: 0;
}

.title-text {
  flex-grow: 1;
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
  margin-top: 20px;
}

.comment-section textarea {
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 8px;
}

.comment-list {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
}

.comment-list div {
  background-color: #ffffff;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
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
