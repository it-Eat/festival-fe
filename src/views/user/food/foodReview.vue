<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/axiosInstance";
import BackHeader from "@/components/common/backHeader.vue";
import { dateFormatWithTime } from "@/util/dateFormat"; // 유틸 함수 임포트
import loadingComponent from "@/components/common/loadingComponent.vue";

const route = useRoute();
const boothId = route.query.boothId;
const reviews = ref([]);
const isLoading = ref(false);

// 기존의 formatDate 함수 대신 dateFormatWithTime 함수를 사용합니다.
const formatDate = (isoDate) => {
  return dateFormatWithTime(isoDate);
};

const fetchReviews = async () => {
  try {
    isLoading.value = true;
    const response = await api.get(`/review`, {
      params: {
        boothId: boothId,
        page: 1,
        pageSize: 5,
        orderBy: "recent",
        keyword: "",
        startDate: "",
        endDate: "",
        scoreOrder: "",
      },
    });
    reviews.value = response.data;
  } catch (error) {
    console.error("리뷰 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchReviews();
});
</script>

<template>
  <div class="page">
    <div class="home">
      <!-- 헤더 -->
      <div class="header">
        <BackHeader title="리뷰" />
      </div>

      <div class="content">
        <!-- 리뷰 목록 -->
        <div class="review-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-top">
              <span class="user-name">{{ review.user.nickname }}</span>
              <div class="star-rating">
                <span v-for="star in 5" :key="star" class="star">
                  {{ star <= review.score ? "★" : "☆" }}
                </span>
              </div>
              <!-- dateFormatWithTime 함수를 이용해 작성일 포맷 -->
              <span class="review-date"
                >작성일 : {{ formatDate(review.createdAt) }}</span
              >
            </div>
            <div class="review-content">
              {{ review.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <loadingComponent v-if="isLoading" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 600px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.content {
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.review-list {
  padding: 0 16px;
}

.review-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.review-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.user-name {
  font-weight: bold;
  font-size: 15px;
}

.star-rating {
  color: #ffd700;
  font-size: 16px;
  margin-right: auto;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.review-content {
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.delete-btn {
  padding: 4px 8px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #ff5252;
}
</style>
