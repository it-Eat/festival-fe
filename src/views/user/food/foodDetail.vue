<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 영역 -->
      <div class="header">
        <BackHeader
          :title="storeInfo.name"
          :category="ctg"
          :cartCount="cartCount"
        />
      </div>

      <!-- 컨텐츠 영역 -->
      <div class="content">
        <!-- 대표 이미지 -->
        <div class="main-image-container">
          <img
            src="https://via.placeholder.com/600x300"
            alt="대표 이미지"
            class="mainImg"
          />
        </div>

        <!-- 가게 정보 -->
        <div class="store-info">
          <h2 class="store-name">{{ storeInfo.name }}</h2>
          <div class="store-details">
            <span class="store-location">위치 : {{ storeInfo.location }}</span>
            <div class="store-rating">
              <span class="star">★ {{ storeInfo.rating }}</span>
              <span class="review" @click="goToReview"
                >리뷰 {{ storeInfo.reviewCount }}개</span
              >
            </div>
          </div>
          <div class="store-desc">{{ storeInfo.information }}</div>
        </div>

        <!-- 메뉴 목록 -->
        <div class="menu-list">
          <MenuItem
            v-for="menu in menus"
            :key="menu.id"
            :menu="menu"
            :showButton="isFoodDetail"
            @add-to-cart="addToCart"
            class="menu-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStores";
import BackHeader from "@/components/common/backHeader.vue";
import MenuItem from "@/components/common/menuItem.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const cartItems = ref([]);
const router = useRouter();

const goToReview = () => {
  router.push("/user/food/review");
};

const ctg = "foodDetail";

// 예시로 스크린샷 내용을 일부 반영한 데이터
const storeInfo = {
  name: "삼공주 분식집",
  location: "A-11",
  category: "",
  rating: 4.8,
  reviewCount: 4,
  information: "맛있는 분식집이에요.",
};

const menus = [
  {
    id: 1,
    image: "https://via.placeholder.com/80",
    name: "매콤달콤 떡볶이",
    price: "9000",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80",
    name: "쫄깃쫄깃 순대",
    price: "8000",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/80",
    name: "속이 꽉찬 김밤",
    price: "5000",
  },
];

const addToCart = (menu) => {
  cartItems.value.push(menu);
};

const isFoodDetail = true;

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalCount);
</script>

<style scoped>
/* 페이지 기본 레이아웃 */
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  min-height: 95vh;
  margin: auto;
  box-sizing: border-box;
}

/* 반응형(미디어쿼리)은 원본 그대로 유지 */
@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

/* 헤더 */
.header {
  width: 100%;
  margin-bottom: 20px;
}

/* 컨텐츠 */
.content {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

/* 대표 이미지 */
.main-image-container {
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 16px;
}

.main-image-container img {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* 가게 정보 섹션 */
.store-info {
  margin-bottom: 20px;
}

.store-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.store-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #333;
}

.store-location {
  font-size: 0.9rem;
  color: #666;
}

.store-rating {
  display: flex;
  align-items: center;
}

.store-rating .star {
  margin-right: 8px;
  font-weight: bold;
  color: #f66;
}

.store-rating .review {
  color: #666;
  cursor: pointer;
}

.store-rating .review:hover {
  text-decoration: underline;
}

.store-desc {
  font-size: 0.95rem;
  color: #333;
}

/* 메뉴 목록 */
.menu-list {
  margin-top: 12px;
}

/* MenuItem 컴포넌트 예시 스타일 (실제 menuItem.vue에서 조정 가능) */
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
</style>
