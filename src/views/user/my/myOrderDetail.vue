<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";
import noimage from "@/assets/noimage.png";
import loadingComponent from "@/components/common/loadingComponent.vue";

const router = useRouter();

const paymentId = router.currentRoute.value.params.payId;
const paymentDetail = ref(null);
const menuList = ref([]);
const enrichedWishList = ref([]);
const isLoading = ref(false);

// storeName를 헤더에 표시할 부스 이름으로 사용
const storeName = ref("상점 정보 없음");

// 결제 상세 데이터를 받아오는 함수
const fetchPaymentDetail = async () => {
  try {
    isLoading.value = true;
    const res = await api.get(`/pay/${paymentId}`, { withCredentials: true });
    paymentDetail.value = res.data;

    // paymentDetail에 boothId가 있으면 부스 정보를 가져옴
    if (paymentDetail.value?.boothId) {
      fetchBoothInfo(paymentDetail.value.boothId);
      fetchMenuList(paymentDetail.value.boothId);
    }
  } catch (error) {
    console.error("결제 상세 데이터 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

// boothId를 이용하여 부스 정보를 가져와 storeName 업데이트
const fetchBoothInfo = async (boothId) => {
  try {
    isLoading.value = true;
    // URL: /booth/{boothId}/1 (1은 festivalId 혹은 고정값)
    const res = await api.get(`/booth/${boothId}/1`);
    storeName.value = res.data.name;
  } catch (error) {
    console.error("부스 정보 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

// 메뉴 데이터를 받아오는 함수
const fetchMenuList = async (boothId) => {
  try {
    isLoading.value = true;
    const res = await api.get(`/menu/${boothId}`);
    menuList.value = res.data;
    combineWishListWithMenu();
  } catch (error) {
    console.error("메뉴 데이터 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

// wishList와 메뉴 데이터를 결합
const combineWishListWithMenu = () => {
  if (paymentDetail.value?.wishList) {
    enrichedWishList.value = paymentDetail.value.wishList.map((item) => {
      const detailedMenu =
        menuList.value.find((menu) => menu.id === item.menu.id) || null;
      return { ...item, detailedMenu };
    });
  }
};

onMounted(() => {
  fetchPaymentDetail();
});

const paymentMethod = computed(() =>
  paymentDetail.value ? paymentDetail.value.payType : ""
);
const paymentDate = computed(() =>
  paymentDetail.value
    ? new Date(paymentDetail.value.createdAt).toLocaleString()
    : ""
);
</script>

<template>
  <div class="page">
    <!-- 헤더 영역: storeName으로 부스 이름 표시 -->
    <div class="header">
      <BackHeader :title="storeName" />
    </div>

    <!-- 주문 메뉴 리스트 영역 -->
    <div class="menu-list">
      <div class="menu-item" v-for="item in enrichedWishList" :key="item.id">
        <!-- 메뉴 이미지 섹션 -->
        <div class="image-container">
          <img
            class="menu-image"
            :src="item.detailedMenu?.image || noimage"
            :alt="item.detailedMenu?.name || '메뉴 이미지'"
          />
        </div>

        <!-- 메뉴 정보 섹션 -->
        <div class="menu-details">
          <div class="menu-info">
            <h3 class="menu-name">
              {{
                item.detailedMenu?.name || item.menu?.name || "메뉴 정보 없음"
              }}
            </h3>
            <div class="menu-meta">
              <span class="quantity-badge"> {{ item.cnt }}개 </span>
            </div>
          </div>

          <div class="price-tag">
            {{
              item.detailedMenu?.price
                ? item.detailedMenu.price.toLocaleString()
                : item.price.toLocaleString()
            }}원
          </div>
        </div>
      </div>
    </div>

    <!-- 결제 정보 및 리뷰 작성 버튼 영역 -->
    <div class="payment-info">
      <div class="payment-details">
        <div>결제방식: {{ paymentMethod }}</div>
        <div>결제일자: {{ paymentDate }}</div>
      </div>
      <button
        v-if="paymentDetail && !paymentDetail.isReviewed"
        class="reviewButton"
        @click="
          router.push({
            name: 'writeReview',
            query: { boothId: paymentDetail?.boothId },
          })
        "
      >
        리뷰 작성하기
      </button>
    </div>
    <loadingComponent v-if="isLoading" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 600px) {
  .page {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.menu-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
}

.menu-item {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.image-container {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
}

.menu-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background: #f8f8f8;
}

.menu-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.menu-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: #ff6f61;
  color: white;
  font-weight: 600;
  border-radius: 20px;
  font-size: 14px;
}

.price-tag {
  font-size: 18px;
  font-weight: 700;
  color: #ff6f61;
  text-align: right;
  margin-top: 8px;
}

/* 반응형 디자인 */
@media (max-width: 600px) {
  .menu-list {
    padding: 0 8px 24px 8px;
  }
  .menu-item {
    flex-direction: column;
  }

  .menu-name {
    font-size: 16px;
  }

  .image-container {
    width: 100%;
    height: 120px;
  }

  .menu-details {
    padding: 16px;
  }
  .quantity-badge {
    font-size: 12px;
  }

  .price-tag {
    font-size: 16px;
  }
}

.payment-info {
  width: 100%;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #fff;
}

.payment-details {
  font-size: 15px;
  line-height: 1.5;
}

.reviewButton {
  max-width: 150px;
  padding: 10px;
  font-size: 14px;
  background-color: white;
  color: #ff6f61;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.reviewButton:hover {
  background-color: #ff6f61;
  color: white;
}

.reviewButtonDone {
  max-width: 150px;
  padding: 10px;
  font-size: 14px;
  background-color: white;
  color: #ff6f61;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  cursor: not-allowed;
  text-align: center;
}
</style>
