<script setup>
import { useRoute, useRouter } from 'vue-router';
import BackHeader from '@/components/common/backHeader.vue';

// 현재 라우트에서 쿼리 파라미터를 가져옵니다.
const route = useRoute();
const router = useRouter();

// 가게 이름을 쿼리 파라미터에서 받아옵니다.
const storeName = route.query.name || '가게 이름';

// 메뉴 아이템, 총 금액, 결제 방식 등의 데이터 설정
const menuItems = [
{
    id: 1,
    image: 'https://via.placeholder.com/50',
    name: "떡볶이",
    quantity: 2,
    price: '10,000원',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/50',
    name: "오뎅",
    quantity: 1,
    price: '5,000원',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/50',
    name: storeName,
    quantity: 3,
    price: '15,000원',
  },

];
const totalPrice = route.query.price || '0원';
const paymentMethod = '카드 결제';
const paymentDate = '2024-12-22';

const navigateToReviewPage = () => {
  // 리뷰 페이지로 이동
  router.push('/user/my/myWriteReview');
};
</script>

<template>
  <div class="home">
    <!-- 헤더 -->
    <div class="header">
      <BackHeader :title="storeName" />
    </div>
    <!-- 주문한 메뉴 리스트 -->
    <div class="menu-list">
      <div class="menu-item" v-for="item in menuItems" :key="item.id">
        <img :src="item.image" alt="메뉴 이미지" class="menu-image" />
        <span class="menu-name">{{ item.name }}</span>
        <span class="menu-quantity">{{ item.quantity }}개</span>
        <span class="menu-price">{{ item.price }}</span>
      </div>
    </div>

    <!-- 총 금액 -->
    <div class="total-price">
      <span class="total-price-label">총 금액</span>
      <span class="total-price-value">{{ totalPrice }}</span>
    </div>

    <!-- 결제 정보 및 리뷰 버튼 -->
    <div class="payment-info">
      <div class="payment-details">
        <div>결제방식: {{ paymentMethod }}</div>
        <div>결제일자: {{ paymentDate }}</div>
      </div>
      <button class="review-button" @click="navigateToReviewPage">리뷰 작성하기</button>
    </div>
  </div>
</template>

<style scoped>
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

.menu-list {
  width: 100%;
  max-height: 600px; /* 스크롤 가능한 높이 제한 */
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0px;
  flex-grow: 1; /* 메뉴 리스트가 최소한의 공간을 차지하도록 설정 */
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
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

.menu-name {
  flex: 2;
  text-align: left;
}

.menu-quantity {
  flex: 1;
  text-align: center;
}

.menu-price {
  flex: 1;
  text-align: right;
}

.total-price {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.payment-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.payment-details {
  flex: 1;
  text-align: left;
  font-size: 14px;
  line-height: 1.5;
}

.review-button {
  flex: 1;
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

.home > .payment-info {
  margin-top: auto; /* Push payment info to the bottom */
}

</style>
