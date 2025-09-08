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
          <div>
            <img
              :src="storeInfo.image || noImage"
              alt="대표 이미지"
              class="mainImg"
            />
          </div>
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
            @updateSelectedMenu="handleMenuUpdate"
            :ref="
              (el) => {
                if (el) menuRefs[menu.id] = el;
              }
            "
          />
        </div>
      </div>

      <!--장바구니 담기 버튼 -->
      <div class="cart-button">
        <button @click="handleAddToCart">장바구니 담기</button>
      </div>
    </div>
    <!-- 로딩 화면 -->
    <loadingComponent v-if="loading" />
    <checkModal
      v-if="isModalOpen"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :confirmText="modalConfig.confirmText"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/axiosInstance";
import BackHeader from "@/components/common/backHeader.vue";
import MenuItem from "@/components/common/menuItem.vue";
import { useCartStore } from "@/stores/cartStores";
import noImage from "@/assets/noimage.png";
import loadingComponent from "@/components/common/loadingComponent.vue";
import { createWishlist } from "@/api/user";
import checkModal from "@/components/common/checkModal.vue";

const loading = ref(false);

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const boothId = route.params.id;
const festivalId = route.params.festivalId;

const storeInfo = ref(null);
const menus = ref([]);
const reviews = ref([]);

// 선택된 메뉴들을 저장할 배열
const selectedMenus = ref([]);
const isModalOpen = ref(false);
const modalConfig = ref({
  title: "",
  message: "",
  confirmText: "",
});

const menuRefs = ref({});

// 부스 상세 정보 API 호출 및 storeName 업데이트
const fetchBoothDetail = async () => {
  try {
    loading.value = true;
    const res = await api.get(`/booth/${boothId}/${festivalId}`);
    storeInfo.value = res.data;
    // 상점명 저장 (cartStore에 저장)
    if (storeInfo.value?.name) {
      cartStore.setStoreName(storeInfo.value.name);
    }
  } catch (error) {
    console.error("부스 상세 정보 불러오기 실패:", error);
  } finally {
    loading.value = false;
  }
};

// 메뉴 목록 API 호출
const fetchMenuList = async () => {
  try {
    loading.value = true;
    const res = await api.get(`/menu/${boothId}`);
    menus.value = res.data;
  } catch (error) {
    console.error("메뉴 목록 불러오기 실패:", error);
  } finally {
    loading.value = false;
  }
};

// 리뷰 목록 API 호출
const fetchReviews = async () => {
  try {
    loading.value = true;
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
  } finally {
    loading.value = false;
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

// 메뉴 수량 업데이트 처리
const handleMenuUpdate = (menuData) => {
  const index = selectedMenus.value.findIndex(
    (item) => item.menuId === menuData.menuId
  );

  if (menuData.cnt > 0) {
    if (index === -1) {
      // 새로운 메뉴 추가
      selectedMenus.value.push(menuData);
    } else {
      // 기존 메뉴 수량 업데이트
      selectedMenus.value[index] = menuData;
    }
  } else {
    // 수량이 0이면 메뉴 제거
    if (index !== -1) {
      selectedMenus.value.splice(index, 1);
    }
  }
};

// 장바구니 담기 처리
const handleAddToCart = async () => {
  if (selectedMenus.value.length === 0) {
    isModalOpen.value = true;
    modalConfig.value = {
      title: "장바구니 담기 실패",
      message: "메뉴를 선택해주세요",
      confirmText: "",
    };
    return;
  }

  const cartData = {
    items: selectedMenus.value.map((menu) => ({
      menuId: menu.menuId,
      cnt: menu.cnt,
      price: menu.price,
    })),
  };

  try {
    // loading.value = true;
    await createWishlist(boothId, festivalId, cartData);
    isModalOpen.value = true;
    modalConfig.value = {
      title: "장바구니 담기 성공",
      message: "장바구니에 담았습니다",
      confirmText: "",
    };
  } catch (error) {
    console.error("장바구니 담기 실패:", error);
    if (error.response?.status === 401) {
      router.push(`/${festivalId}/user/login`);
      return;
    }
    isModalOpen.value = true;
    modalConfig.value = {
      title: "장바구니 담기 실패",
      message: "장바구니 담기에 실패했습니다",
      confirmText: "",
    };
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  isModalOpen.value = false;
  selectedMenus.value = [];
  // 모든 MenuItem 컴포넌트의 수량 초기화
  Object.values(menuRefs.value).forEach((menuItem) => {
    menuItem.resetQuantity();
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
  margin: 16px 0 38px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mainImg {
  width: 100%;
  display: block;
  object-fit: fill;
  max-height: 300px;
  border-radius: 12px;
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

.cart-button {
  width: 100%;
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.cart-button button {
  width: 350px;
  background-color: #ff6f61;
  color: #fff;
  border: none;
  padding: 12px 0;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 24px;
}
.cart-button button:hover {
  background-color: #ef5b4c;
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

@media (max-width: 600px) {
  .home {
    width: 100%;
  }
}
</style>
