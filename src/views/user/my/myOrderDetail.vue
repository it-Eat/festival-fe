<script setup>
import { useRoute, useRouter } from 'vue-router';
import BackHeader from '@/components/common/backHeader.vue';

const route = useRoute();
const router = useRouter();

// 가게 이름, 메뉴 목록, 총 금액, 결제 방식, 결제 일자
const storeName = route.query.name || '이가네';
const menuItems = [
  {
    id: 1,
    image: 'https://via.placeholder.com/50',
    name: '떡볶이',
    quantity: 1,
    price: '5,000원'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/50',
    name: '순대',
    quantity: 1,
    price: '5,000원'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/50',
    name: '오뎅',
    quantity: 2,
    price: '3,000원'
  }
];

const totalPrice = '13,000원';
const paymentMethod = '카카오 페이';
const paymentDate = '2024-12-09';

// 리뷰 페이지로 이동
const navigateToReviewPage = () => {
  router.push('/user/my/myWriteReview');
};
</script>

<template>
  <div class="home">
    <!-- 상단 헤더 -->
    <div class="header">
      <BackHeader :title="storeName" />
    </div>

    <!-- 메뉴 리스트 영역 -->
    <div class="menu-list">
      <div
        class="menu-item"
        v-for="item in menuItems"
        :key="item.id"
      >
        <img
          :src="item.image"
          alt="메뉴 이미지"
          class="menu-image"
        />
        <div class="menu-text">
          <span class="menu-name">{{ item.name }}</span>
          <span class="menu-quantity">
            수량 : {{ item.quantity }}
          </span>
        </div>
        <span class="menu-price">
          가격 : {{ item.price }}
        </span>
      </div>
    </div>

    <!-- 하단 결제 정보 + 총 금액 + 리뷰 작성하기 버튼 -->
    <div class="footer-container">
      <div class="payment-box">
        <div class="payment-header">
          <div class="payment-title">총 금액</div>
          <div class="payment-amount">{{ totalPrice }}</div>
        </div>
        <hr class="divider" />
        <div class="payment-info">
          <div class="info-text">
            결제 방식 : {{ paymentMethod }}
          </div>
          <div class="info-text">
            결제 일자 : {{ paymentDate }}
          </div>
        </div>
        <button
          class="review-button"
          @click="navigateToReviewPage"
        >
          리뷰 작성하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/****************
 * 전체 컨테이너 *
 ****************/
.home {
  width: 100%;
  max-width: 600px; /* 최대 폭 지정 */
  margin: 0 auto;   /* 수평 중앙정렬 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 95vh;
}

.header {
  /* 상단 여백, 뒤로가기 버튼 등 배치 */
  width: 100%;
  margin-bottom: 20px;
}

/********************
 * 메뉴 리스트 영역 *
 ********************/
 .menu-list {
  /* 페이지 너비에 비해 살짝 좌우 여백 생기도록 */
  width: 90%;
  margin: 40px auto 20px auto; /* 위쪽에 40px, 아래쪽에 20px 여백 */
  border-top: 1px solid #ccc;  /* 상단 구분선 */
  border-bottom: 1px solid #ccc; /* 하단 구분선 */
}


.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none; /* 마지막 아이템은 구분선 제거 */
}

.menu-image {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  margin-right: 10px;
}

.menu-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.menu-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.menu-quantity {
  color: #555;
  font-size: 14px;
}

.menu-price {
  width: 100px;
  text-align: right;
  font-weight: bold;
}

/****************************
 * 결제 정보 및 총 금액 박스 *
 ****************************/
.footer-container {
  margin-top: auto; /* 아래쪽에 고정되도록 */
  width: 100%;
  display: flex;
  justify-content: center;
}

.payment-box {
  position: relative;
  width: 100%;
  background-color: #fff5f5; /* 연한 핑크 배경 */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.payment-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.payment-title {
  font-size: 16px;
  font-weight: bold;
}

.payment-amount {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.divider {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
  margin: 10px 0;
}

.payment-info {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}

.info-text {
  margin-bottom: 4px;
}

.review-button {
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: #ffa5a5;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}

.review-button:hover {
  background-color: #ff7b7b;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }

  .payment-box {
    padding-bottom: 60px; /* 버튼 위치 확보 */
  }

  .review-button {
    position: static;
    margin-top: 10px;
  }
}
</style>
