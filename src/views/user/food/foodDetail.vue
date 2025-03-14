<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/axiosInstance"; // axios 인스턴스
import BackHeader from "@/components/common/backHeader.vue";
import MenuItem from "@/components/common/menuItem.vue";

// 1) URL Params: boothId 가져오기
const route = useRoute();
const router = useRouter();
const boothId = route.params.id;
const festivalId = 1; // 예제 값

// 2) 상태값
const storeInfo = ref(null); // 부스 정보
const menus = ref([]); // 메뉴 리스트
const reviews = ref([]); // 리뷰 리스트

// 3) API 호출 (부스 상세)
const fetchBoothDetail = async () => {
  try {
    const res = await api.get(`/booth/${boothId}/${festivalId}`);
    storeInfo.value = res.data;
  } catch (error) {
    console.error("부스 상세 정보 불러오기 실패:", error);
  }
};

// 4) API 호출 (메뉴 목록)
const fetchMenuList = async () => {
  try {
    const res = await api.get(`/menu/${boothId}`);
    menus.value = res.data;
  } catch (error) {
    console.error("메뉴 목록 불러오기 실패:", error);
  }
};

// 5) API 호출 (리뷰 목록)
const fetchReviews = async () => {
  try {
    const res = await api.get("/review", {
      params: {
        boothId: boothId,
        page: 1,
        pageSize: 100, // 최대 개수 설정 (백엔드 협의 가능)
        orderBy: "recent",
      },
    });
    reviews.value = res.data;
  } catch (error) {
    console.error("리뷰 목록 불러오기 실패:", error);
  }
};

// 6) 별점 평균 계산 (computed 속성)
const averageRating = computed(() => {
  if (reviews.value.length === 0) return "0.0"; // 리뷰 없으면 0점
  const total = reviews.value.reduce((sum, r) => sum + r.score, 0);
  return (total / reviews.value.length).toFixed(1); // 소수점 한 자리까지
});

// 7) 리뷰 개수 (computed)
const reviewCount = computed(() => reviews.value.length);

// 8) 리뷰 페이지 이동
const goToReview = () => {
  router.push({
    path: "/user/food/review",
    query: { boothId },
  });
};

// 9) onMounted: 데이터 호출
onMounted(() => {
  fetchBoothDetail();
  fetchMenuList();
  fetchReviews();
});
</script>

<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader :title="storeInfo?.name || '로딩 중...'" />
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
              <!-- ✅ 리뷰 별점 평균 적용 -->
              <span class="star">★ {{ averageRating }}</span>

              <!-- ✅ 리뷰 개수 적용 -->
              <span class="review" @click="goToReview">
                리뷰 {{ reviewCount }}개
              </span>
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

<style scoped>
/* 페이지 기본 스타일 */
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

/* 반응형 */
@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 8px;
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

/* 가게 정보 */
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

/* 위치 텍스트 */
.store-location {
  font-size: 0.9rem;
  color: #666;
}

/* 별점 & 리뷰 개수 */
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

/* 가게 설명 */
.store-desc {
  margin-top: 8px;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;
}

/* 메뉴 목록 */
.menu-list {
  margin-top: 12px;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

/* 로딩 화면 */
.loading {
  text-align: center;
  padding: 20px;
  font-size: 1rem;
  color: #555;
}
</style>
