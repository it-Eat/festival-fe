<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <!-- storeInfo가 아직 로드되지 않았다면 '로딩 중...' 표시 -->
        <BackHeader :title="storeInfo?.name || '로딩 중...'" category="foodDetail" />
      </div>

      <!-- 컨텐츠 영역 -->
      <div class="content" v-if="storeInfo">
        <!-- 대표 이미지 영역 -->
        <div class="main-image-container">
          <img
            :src="storeInfo.image || 'https://via.placeholder.com/600x300'"
            alt="대표 이미지"
            class="mainImg"
          />
          <!-- 오른쪽 상단에 위치한 수정 버튼 -->
          <Wrench class="edit-button" @click="goToModify" />
        </div>

        <!-- 가게 정보 영역 -->
        <div class="store-info">
          <h2 class="store-name">{{ storeInfo.name }}</h2>
          <div class="store-details">
            <span class="store-location">위치 : {{ storeInfo.location || "정보 없음" }}</span>
            <div class="store-rating">
              <span class="star">★ {{ averageRating }}</span>
              <span class="review" @click="goToReview">리뷰 {{ reviewCount }}개</span>
            </div>
          </div>
          <div class="store-desc">{{ storeInfo.content }}</div>
        </div>

        <!-- 메뉴 목록 영역 -->
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
import { Wrench } from "lucide-vue-next";
import { useCartStore } from "@/stores/cartStores";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

// 만약 URL 파라미터로 boothId를 전달하지 않는다면 기본값 1로 사용
const boothId = route.params.id || 1;
const festivalId = 1;

const storeInfo = ref(null);
const menus = ref([]);
const reviews = ref([]);

// 부스 상세 정보 API 호출 (새로운 API: /booth/my-booth/{boothId})
const fetchBoothDetail = async () => {
  try {
    const res = await api.get(`/booth/my-booth/${boothId}`);
    storeInfo.value = res.data;
    // cartStore에 상점명 저장 (원하는 경우)
    if (storeInfo.value?.name) {
      cartStore.setStoreName(storeInfo.value.name);
    }
    // 부스 id를 이용해 메뉴 목록과 리뷰 목록을 불러옴
    fetchMenuList(storeInfo.value.id);
    fetchReviews(storeInfo.value.id);
  } catch (error) {
    console.error("부스 상세 정보 불러오기 실패:", error);
  }
};

// 메뉴 목록 API 호출 (기존과 동일)
const fetchMenuList = async (id) => {
  try {
    const res = await api.get(`/menu/${id}`);
    menus.value = res.data;
  } catch (error) {
    console.error("메뉴 목록 불러오기 실패:", error);
  }
};

// 리뷰 목록 API 호출 (예시)
const fetchReviews = async (id) => {
  try {
    const res = await api.get("/review", {
      params: {
        boothId: id,
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
  if (!reviews.value.length) return "0.0";
  const total = reviews.value.reduce((sum, r) => sum + r.score, 0);
  return (total / reviews.value.length).toFixed(1);
});

const reviewCount = computed(() => reviews.value.length);

// 리뷰 페이지로 이동하는 함수
const goToReview = () => {
  router.push({
    path: "/user/food/review",
    query: { boothId: storeInfo.value.id },
  });
};

// 수정 페이지로 이동하는 함수 (원하는 페이지로 변경)
const goToModify = () => {
  router.push("/merchant/modify");
};

onMounted(() => {
  fetchBoothDetail();
});
</script>

<style scoped>
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
  position: relative;
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
/* Wrench 버튼 스타일: 대표 이미지의 오른쪽 상단에 위치 */
.edit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
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
.loading {
  text-align: center;
  padding: 20px;
  font-size: 1rem;
  color: #555;
}
</style>
