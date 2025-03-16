<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackHeader from '@/components/common/backHeader.vue';
import api from '@/api/axiosInstance';

const route = useRoute();
const router = useRouter();

const paymentId = route.params.id;
const paymentDetail = ref(null);
const menuList = ref([]);
const enrichedWishList = ref([]);

// storeName를 헤더에 표시할 부스 이름으로 사용
const storeName = ref('상점 정보 없음');

// 결제 상세 데이터를 받아오는 함수
const fetchPaymentDetail = async () => {
  try {
    const res = await api.get(`/pay/${paymentId}`, { withCredentials: true });
    paymentDetail.value = res.data;

    // paymentDetail에 boothId가 있으면 부스 정보를 가져옴
    if (paymentDetail.value?.boothId) {
      fetchBoothInfo(paymentDetail.value.boothId);
      fetchMenuList(paymentDetail.value.boothId);
    }
  } catch (error) {
    console.error("결제 상세 데이터 불러오기 실패:", error);
  }
};

// boothId를 이용하여 부스 정보를 가져와 storeName 업데이트
const fetchBoothInfo = async (boothId) => {
  try {
    // URL: /booth/{boothId}/1 (1은 festivalId 혹은 고정값)
    const res = await api.get(`/booth/${boothId}/1`);
    storeName.value = res.data.name;
  } catch (error) {
    console.error("부스 정보 불러오기 실패:", error);
  }
};

// 메뉴 데이터를 받아오는 함수
const fetchMenuList = async (boothId) => {
  try {
    const res = await api.get(`/menu/${boothId}`);
    menuList.value = res.data;
    combineWishListWithMenu();
  } catch (error) {
    console.error("메뉴 데이터 불러오기 실패:", error);
  }
};

// wishList와 메뉴 데이터를 결합
const combineWishListWithMenu = () => {
  if (paymentDetail.value?.wishList) {
    enrichedWishList.value = paymentDetail.value.wishList.map(item => {
      const detailedMenu = menuList.value.find(menu => menu.id === item.menu.id) || null;
      return { ...item, detailedMenu };
    });
  }
};

onMounted(() => {
  fetchPaymentDetail();
});

const totalPrice = computed(() => paymentDetail.value ? paymentDetail.value.price : 0);
const paymentMethod = computed(() => paymentDetail.value ? paymentDetail.value.payType : '');
const paymentDate = computed(() => paymentDetail.value ? new Date(paymentDetail.value.createdAt).toLocaleString() : '');
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
        <img
          class="menu-image"
          :src="item.detailedMenu?.image || 'https://via.placeholder.com/50'"
          alt="메뉴 이미지"
        />
        <div class="menu-details">
          <div class="menu-name">
            {{ item.detailedMenu?.name || item.menu?.name || '메뉴 정보 없음' }}
          </div>
          <div class="menu-quantity">{{ item.cnt }}개</div>
          <div class="menu-price">
            {{ item.detailedMenu?.price ? item.detailedMenu.price + '원' : item.price + '원' }}
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
      <button class="review-button" @click="router.push({ name: 'writeReview', query: { boothId: paymentDetail?.boothId, boothName: storeName } })">
        리뷰 작성하기
      </button>
    </div>
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

@media (max-width: 900px) {
  .page {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.menu-list {
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 10px;
}

.menu-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.menu-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.menu-quantity,
.menu-price {
  font-size: 14px;
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
  font-size: 14px;
  line-height: 1.5;
}

.review-button {
  max-width: 150px;
  padding: 10px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.review-button:hover {
  background-color: #0056b3;
}
</style>
