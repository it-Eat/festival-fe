<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="장바구니" />
      </div>
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
      <div class="bottom-area">
        <div class="payment-info">
          <div>결제 금액 확인</div>
          <div>총 수량 : {{ totalCount }}</div>
        </div>
        <button class="order-button" @click="handleOrder">
          {{ totalPrice.toLocaleString() }}원 주문하기
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
  router.push({
    name: "foodOrder",
    query: {
      // 쿼리 대신 storeName은 cartStore에서 참조
      payDate: "2024-12-09",
    },
  });
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  font-family: "Arial", sans-serif;
}
.home {
  display: flex;
  flex-direction: column;
  min-height: 95vh;
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
.content {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}
.cart-items {
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.bottom-area {
  margin-bottom: 40px;
  text-align: center;
  padding: 20px 0;
  width: 100%;
}
.payment-info {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: center;
  gap: 30px;
}
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
