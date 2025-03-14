<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import { ref, computed } from "vue";

// (데모용) 스토어 이름
const storeName = "지코바";

// 리뷰 데이터 예시
const reviews = ref([
  {
    id: 1,
    userName: "천*윤",
    rating: 5,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: true,
  },
  {
    id: 2,
    userName: "천*윤",
    rating: 5,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false,
  },
  {
    id: 3,
    userName: "천*윤",
    rating: 5,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false,
  },
  {
    id: 4,
    userName: "천*윤",
    rating: 5,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false,
  },
  {
    id: 5,
    userName: "천*윤",
    rating: 5,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false,
  },
]);

// (옵션) 별점 평균을 계산하고 싶다면 이렇게도 가능
// const avgRating = computed(() => {
//   if (reviews.value.length === 0) return 0;
//   const sum = reviews.value.reduce((acc, cur) => acc + cur.rating, 0);
//   return (sum / reviews.value.length).toFixed(1);
// });

// 리뷰 삭제 함수
const deleteReview = (reviewId) => {
  if (confirm("리뷰를 삭제하시겠습니까?")) {
    reviews.value = reviews.value.filter((review) => review.id !== reviewId);
  }
};
</script>

<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 (지코바) -->
      <div class="header">
        <BackHeader :title="storeName" />
      </div>

      <div class="content">
        <!-- 리뷰 요약 영역 -->
        <div class="review-summary">
          <span>리뷰 : {{ reviews.length }}개</span>
          <!-- 예시로 고정 5점, 필요에 따라 평균 별점 활용 가능 -->
          <span>총점 : 5점</span>
        </div>

        <!-- 실제 리뷰 목록 -->
        <div class="review-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <!-- 상단(이름, 별점, 작성일, 삭제 버튼) -->
            <div class="review-top">
              <span class="user-name">{{ review.userName }}</span>
              <div class="star-rating">
                <span v-for="star in 5" :key="star" class="star">
                  {{ star <= review.rating ? "★" : "☆" }}
                </span>
              </div>
              <span class="review-date">작성일 : {{ review.date }}</span>
              <button
                v-if="review.isMine"
                class="delete-btn"
                @click="deleteReview(review.id)"
              >
                삭제
              </button>
            </div>

            <!-- 리뷰 내용 -->
            <div class="review-content">
              {{ review.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
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

/* 원본 미디어쿼리 유지 */
@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

/* content 영역 스타일 */
.content {
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

/* 리뷰 요약 (상단) */
.review-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

/* 리뷰 목록 */
.review-list {
  padding: 0 16px;
}

/* 개별 리뷰 아이템 */
.review-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.review-item:last-child {
  border-bottom: none;
}

/* 리뷰 상단 영역 */
.review-top {
  display: flex;
  align-items: center;
  gap: 8px; /* 요소 간격 */
  margin-bottom: 4px;
}

.user-name {
  font-weight: bold;
  font-size: 15px;
}

.star-rating {
  color: #ffd700;
  font-size: 16px;
  margin-right: auto; /* 오른쪽에 다른 요소 밀어내기 */
}

.review-date {
  font-size: 14px;
  color: #999;
}

/* 리뷰 내용 */
.review-content {
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

/* 삭제 버튼 */
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

/* 별점 표시 간격 */
.star {
  margin-right: 1px;
}
</style>
