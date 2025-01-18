<script setup>
import BackHeader from '@/components/common/backHeader.vue';
import { ref } from 'vue';

// 리뷰 데이터 예시
const reviews = ref([
  {
    id: 1,
    userName: "천*윤",
    rating: 5,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: true
  },
  {
    id: 2,
    userName: "천*윤",
    rating: 4,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false
  },
  {
    id: 2,
    userName: "천*윤",
    rating: 4,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false
  },
  {
    id: 2,
    userName: "천*윤",
    rating: 4,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false
  },
  {
    id: 2,
    userName: "천*윤",
    rating: 4,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false
  },
  {
    id: 2,
    userName: "천*윤",
    rating: 4,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false
  },
  {
    id: 2,
    userName: "천*윤",
    rating: 4,
    content: "사장님 치킨 정말 맛있습니다. 감사히 잘 먹었습니다.",
    date: "2024.11.01",
    isMine: false
  },
  // ... 더 많은 리뷰 데이터
]);

const deleteReview = (reviewId) => {
  if (confirm('리뷰를 삭제하시겠습니까?')) {
    reviews.value = reviews.value.filter(review => review.id !== reviewId);
  }
};
</script>

<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="리뷰"/>
      </div>
      <div class="content">
        <div class="review-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <div class="user-info">
                <span class="user-name">{{ review.userName }}</span>
                <div class="star-rating">
                  <span v-for="star in 5" :key="star" class="star">
                    {{ star <= review.rating ? "★" : "☆" }}
                  </span>
                </div>
              </div>
              <div class="review-meta">
                <span class="review-date">날짜 : {{ review.date }}</span>
                <button
                  v-if="review.isMine"
                  class="delete-btn"
                  @click="deleteReview(review.id)"
                >
                  삭제
                </button>
              </div>
            </div>
            <p class="review-content">{{ review.content }}</p>
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

@media (max-width: 900px) {
    .home {
        width: 100%;
    }
}

.header {
    width: 100%;
    margin-bottom: 20px;
}

/* 추가 스타일 */
.content {
    width: 100%;
    padding: 20px; /* content 영역 padding 추가 */
    box-sizing: border-box; /* padding으로 인해 width가 늘어나는 것 방지 */
    overflow-y: auto; /* 내용이 많을 경우 스크롤 생성 */
}
.review-list {
  padding: 16px;
}

.review-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-name {
  font-weight: bold;
  font-size: 16px;
}

.star-rating {
  color: #FFD700;
  font-size: 18px;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.review-date {
  color: #666;
  font-size: 14px;
}

.review-content {
  margin: 0;
  color: #333;
  line-height: 1.5;
}

.delete-btn {
  padding: 4px 8px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #ff5252;
}

.star {
  display: inline-block;
  margin-right: 2px;
}
</style>
