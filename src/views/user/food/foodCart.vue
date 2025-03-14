<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader title="장바구니" />
      </div>

      <!-- 중앙 컨텐츠 -->
      <div class="content">
        <div class="cart-items">
          <MenuItem
            v-for="item in cartItems"
            :key="item.id"
            :menu="item"
            :showButton="true"
          />
        </div>
      </div>

      <!-- 하단 결제 영역 (조금 아래쪽) -->
      <div class="bottom-area">
        <div class="payment-info">
          <div>결제 금액 확인</div>
          <div>총 수량 : {{ totalCount }}</div>
        </div>
        <button class="order-button" @click="handleOrder">
          {{ totalPrice }}원 주문하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import MenuItem from "@/components/common/menuItem.vue";
import { useCartStore } from "@/stores/cartStores";
import { computed } from "vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const totalCount = computed(() => cartStore.totalCount);
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

const router = useRouter();
const handleOrder = () => {
  router.push("/user/food/foodOrder");
};
</script>

<style scoped>
/* 전체 페이지 컨테이너 */
.page {
  display: flex;
  justify-content: center;
  font-family: "Arial", sans-serif;
}

/* 세로 방향 flex + 화면 전체 높이 확보 */
.home {
  display: flex;
  flex-direction: column;
  min-height: 95vh; /* 화면 크기에 따라 전체 높이를 채움 */
  width: 600px;
  max-width: 100vw;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

/* 중앙 컨텐츠: 나머지 공간을 차지하는 flex */
.content {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

/* 장바구니 아이템 목록 */
.cart-items {
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

/*
  하단 영역: 내용 아래쪽에 자연스럽게 위치
  화면 맨 아래에 바짝 붙지 않도록 margin-bottom을 추가
*/
.bottom-area {
  margin-bottom: 40px; /* 너무 아래 붙지 않도록 40px 여백 */
  text-align: center;
  padding: 20px 0;
  width: 100%;
}

/* 결제 금액, 총 수량 */
.payment-info {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: center;
  gap: 30px;
}

/* 주문하기 버튼 */
.order-button {
  background-color: #ff6b6b;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 14px 0;
  width: 80%;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-button:hover {
  background-color: #ff5252;
}
</style>
