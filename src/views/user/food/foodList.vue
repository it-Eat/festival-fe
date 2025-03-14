<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

// 음식 목록 예시 데이터
const foodList = ref([
  {
    id: 1,
    name: "지코바",
    location: "A-11",
    rating: 4.1,
    img: "https://via.placeholder.com/600x300",
  },
  {
    id: 2,
    name: "영한김밥",
    location: "A-13",
    rating: 4.8,
    img: "https://via.placeholder.com/600x300",
  },
  {
    id: 3,
    name: "삼공주 분식",
    location: "A-14",
    rating: 5.0,
    img: "https://via.placeholder.com/600x300",
  },
  {
    id: 4,
    name: "곱네",
    location: "A-15",
    rating: 4.2,
    img: "https://via.placeholder.com/600x300",
  },
]);

// 라우터 이동 함수
const router = useRouter();
const goToDetail = (foodId) => {
  // 이동할 때 params로 id를 넘김: /user/food/foodDetail/:id
  // router/index.js 등에 { path: "/user/food/foodDetail/:id", name: "foodDetail" } 형태로 설정되어 있어야 함
  router.push({
    name: "foodDetail",
    params: { id: foodId },
  });
};
</script>

<template>
  <!-- 최상위: page -->
  <div class="page">
    <!-- home -->
    <div class="home">
      <!-- header -->
      <div class="header">
        <BackHeader title="먹거리" />
      </div>

      <!-- content -->
      <div class="content">
        <!-- 음식 목록 -->
        <div class="food-list">
          <!-- 음식 아이템 (빨간 테두리, 왼쪽 텍스트 / 오른쪽 이미지) -->
          <div
            v-for="food in foodList"
            :key="food.id"
            class="food-item"
            @click="goToDetail(food.id)"
          >
            <div class="food-info">
              <div class="food-name">{{ food.name }}</div>
              <div class="food-location">위치 : {{ food.location }}</div>
              <div class="food-rating">별점 : {{ food.rating.toFixed(1) }}</div>
            </div>
            <div class="food-img">
              <img :src="food.img" alt="음식 이미지" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 페이지 전체 컨테이너 */
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}

/* home: 세로 배치 */
.home {
  display: flex;
  flex-direction: column;
  width: 600px; /* 중앙 고정 폭 */
  min-height: 100vh;
  margin: auto;
  box-sizing: border-box;
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

.content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
}

/* 음식 목록 래퍼 */
.food-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 각각의 음식 아이템 박스 */
.food-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f66; /* 빨간 테두리 */
  padding: 12px;
  box-sizing: border-box;
  cursor: pointer; /* 포인터 커서로 변경 */
}

/* 호버 시 약간의 배경색 변경 (옵션) */

.food-item:hover {
  background-color: #f9f9f9;
}

/* 왼쪽 텍스트 영역 */
.food-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.food-name {
  font-weight: bold;
  font-size: 16px;
}

.food-location,
.food-rating {
  font-size: 14px;
  color: #333;
}

/* 오른쪽 이미지 영역 */
.food-img img {
  width: 80px;
  height: 80px;
  object-fit: cover; /* 이미지가 영역에 맞게 잘림 */
  border-radius: 4px; /* 모서리를 조금 둥글게 */
}
</style>
