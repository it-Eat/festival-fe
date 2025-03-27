<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader :title="storeInfo?.name || '로딩 중...'" />
      </div>

      <!-- 컨텐츠 영역 -->
      <div class="content" v-if="storeInfo">
        <!-- 대표 이미지 영역 -->
        <div class="main-image-container">
          <div class="main-image-container-img">
            <img
              :src="storeInfo.image || noimage"
              alt="대표 이미지"
              class="mainImg"
            />

            <!-- 오른쪽 상단 수정 버튼 -->
            <Wrench class="edit-button" @click="goToModify" />
          </div>
        </div>

        <!-- 가게 정보 영역 -->
        <div class="store-info">
          <div class="store-details">
            <h2 class="store-name">{{ storeInfo.name }}</h2>
            <div class="store-rating">
              <span class="star">★ {{ averageRating }}</span>
              <span class="review" @click="goToReview">
                리뷰 {{ reviewCount }}개
              </span>
            </div>
          </div>
          <div class="store-details">
            <span class="store-location">
              위치 : {{ storeInfo.location || "정보 없음" }}
            </span>
          </div>
          <div class="store-desc">{{ storeInfo.content }}</div>
        </div>

        <!-- 메뉴 목록 영역 -->
        <div class="menu-list">
          <MenuItem
            v-for="menu in menus"
            :key="menu.id"
            :menu="menu"
            :showButton="false"
            class="menu-item"
          />
        </div>
      </div>

      <!-- 로딩 화면 -->
      <loadingComponent v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/axiosInstance";
import BackHeader from "@/components/common/backHeader.vue";
import MenuItem from "@/components/common/menuItem.vue";
import { Wrench } from "lucide-vue-next";
import { useCartStore } from "@/stores/cartStores";
import noimage from "@/assets/noimage.png";
import loadingComponent from "@/components/common/loadingComponent.vue";

const router = useRouter();
const cartStore = useCartStore();

// URL 파라미터에서 festivalId와 boothId 가져오기
const festivalId = localStorage.getItem("festivalId");
const boothId = router.currentRoute.value.params.boothId;
const storeInfo = ref(null);
const menus = ref([]);
const reviews = ref([]);
const loading = ref(false);

// 부스 상세 정보 불러오기
const fetchBoothDetail = async () => {
  try {
    loading.value = true;
    const res = await api.get(`/booth/my-booth/${festivalId}`);

    storeInfo.value = res.data;
    if (storeInfo.value?.id) {
      cartStore.setBoothId(storeInfo.value.id);
      fetchMenuList(storeInfo.value.id);
      fetchReviews(storeInfo.value.id);
    }
    if (storeInfo.value?.name) {
      cartStore.setStoreName(storeInfo.value.name);
    }
  } catch (error) {
    console.error("부스 상세 정보 불러오기 실패:", error);
  } finally {
    loading.value = false;
  }
};

// 메뉴 목록 불러오기
const fetchMenuList = async (id) => {
  try {
    loading.value = true;
    const res = await api.get(`/menu/${id}`);
    menus.value = res.data;
  } catch (error) {
    console.error("메뉴 목록 불러오기 실패:", error);
  } finally {
    loading.value = false;
  }
};

// 리뷰 목록 불러오기
const fetchReviews = async (id) => {
  try {
    loading.value = true;
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
  } finally {
    loading.value = false;
  }
};

const averageRating = computed(() => {
  if (!reviews.value.length) return "0.0";
  const total = reviews.value.reduce((sum, r) => sum + r.score, 0);
  return (total / reviews.value.length).toFixed(1);
});

const reviewCount = computed(() => reviews.value.length);

// 수정 페이지로 이동 함수 수정
const goToModify = () => {
  router.push(`/${festivalId}/merchant/modify/${boothId}`);
};

// 리뷰 페이지 이동 함수 수정
const goToReview = () => {
  router.push(`/${festivalId}/food/review?boothId=${boothId}`);
};

onMounted(() => {
  if (boothId) {
    cartStore.setBoothId(boothId);
    fetchBoothDetail();
  }
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
  margin: 10px 0;
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
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
.main-image-container-img {
  width: 450px;
  overflow: hidden;
}
.main-image-container img {
  width: 100%;
  display: block;
  object-fit: fill;
  max-height: 300px;
  border-radius: 8px;
}
/* Wrench 버튼: 대표 이미지의 오른쪽 상단 */
.edit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  width: 30px;
  height: 30px;
}
.store-info {
  margin-bottom: 24px;
}
.store-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}
.store-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  color: #333;
  font-size: 18px;
}
.store-location {
  font-size: 16px;
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
  margin: 18px 0;
}
</style>
