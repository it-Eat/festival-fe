<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader
          :title="storeInfo?.name || '로딩 중...'"
          category="foodDetail"
        />
      </div>

      <!-- 컨텐츠 영역 -->
      <div class="content" v-if="storeInfo">
        <!-- 대표 이미지 -->
        <div class="main-image-container">
          <img
            :src="storeInfo.image || 'https://via.placeholder.com/600x300'"
            alt="대표 이미지"
            class="mainImg"
          />
        </div>

        <!-- 가게 정보 -->
        <div class="store-info">
          <h2 class="store-name">{{ storeInfo.name }}</h2>
          <div class="store-details">
            <span class="store-location"
              >위치 : {{ storeInfo.location || "정보 없음" }}</span
            >
            <div class="store-rating">
              <span class="star">★ {{ averageRating }}</span>
              <span class="review" @click="goToReview"
                >리뷰 {{ reviewCount }}개</span
              >
            </div>
          </div>
          <div class="store-desc">{{ storeInfo.content }}</div>
        </div>

        <!-- 메뉴 목록 -->
        <div class="menu-list">
          <MenuItem
            v-for="menu in menus"
            :key="menu.id"
            :menu="menu"
            :showButton="true"
            class="menu-item"
          />
        </div>
      </div>

      <!-- 로딩 화면 -->
      <div v-else class="loading">
        <p>가게 정보를 불러오는 중...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/axiosInstance";
import BackHeader from "@/components/common/backHeader.vue";
import MenuItem from "@/components/common/menuItem.vue";
import { useCartStore } from "@/stores/cartStores";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const boothId = route.params.id;
const festivalId = route.params.festivalId;

const storeInfo = ref(null);
const menus = ref([]);
const reviews = ref([]);

// 부스 상세 정보 API 호출 및 storeName 업데이트
const fetchBoothDetail = async () => {
  try {
    const res = await api.get(`/booth/${boothId}/${festivalId}`);
    storeInfo.value = res.data;
    // 상점명 저장 (cartStore에 저장)
    if (storeInfo.value?.name) {
      cartStore.setStoreName(storeInfo.value.name);
    }
  } catch (error) {
    console.error("부스 상세 정보 불러오기 실패:", error);
  }
};

// 메뉴 목록 API 호출
const fetchMenuList = async () => {
  try {
    const res = await api.get(`/menu/${boothId}`);
    menus.value = res.data;
  } catch (error) {
    console.error("메뉴 목록 불러오기 실패:", error);
  }
};

// 리뷰 목록 API 호출
const fetchReviews = async () => {
  try {
    const res = await api.get("/review", {
      params: {
        boothId: boothId,
        page: 1,
        pageSize: 100,
        orderBy: "recent",
      },
    });
    reviews.value = res.data;
  } catch (error) {
    console.error("리뷰 목록 불러오기 실패:", error);
  }
};

const averageRating = computed(() => {
  if (reviews.value.length === 0) return "0.0";
  const total = reviews.value.reduce((sum, r) => sum + r.score, 0);
  return (total / reviews.value.length).toFixed(1);
});

const reviewCount = computed(() => reviews.value.length);

const goToReview = () => {
  router.push({
    path: "/user/food/review",
    query: { boothId },
  });
};

onMounted(() => {
  fetchBoothDetail();
  fetchMenuList();
  fetchReviews();
});
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
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
@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}
.header {
  width: 100%;
  margin-bottom: 8px;
}
.content {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}
.main-image-container {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}
.main-image-container img {
  width: 100%;
  display: block;
  object-fit: cover;
  max-height: 300px;
}
.store-info {
  margin-bottom: 20px;
}
.store-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px;
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
  margin-right: 6px;
  font-weight: bold;
  color: #f66;
  font-size: 1rem;
}
.store-rating .review {
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;
}
.store-rating .review:hover {
  text-decoration: underline;
}
.store-desc {
  margin-top: 8px;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;
}
.menu-list {
  margin-top: 12px;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
.loading {
  text-align: center;
  padding: 20px;
  font-size: 1rem;
  color: #555;
}
</style>
