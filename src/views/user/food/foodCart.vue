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
        <div class="order-summary">
          <div class="total-price">
            <span class="label">총 금액:</span> {{ totalPrice }}원
          </div>
          <div class="total-quantity">
            <span class="label">총 수량:</span> {{ totalCount }}
          </div>
          <router-link to="/user/food/foodOrder" class="order-button">
            주문하기
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStores';
import BackHeader from '@/components/common/backHeader.vue';
import MenuItem from '@/components/common/menuItem.vue';
import { computed } from 'vue';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const totalCount = computed(() => cartStore.totalCount);
const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  font-family: 'Arial', sans-serif;
}

.home {
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 95vw;
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
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-items {
  width: 100%;
  margin-top: 20px;
}

.order-summary {
  width: 100%;
  margin-top: 20px;
  text-align: right; /* 가격과 수량을 오른쪽 정렬 */
}

.order-summary .label {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

.total-price {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 10px;
}

.total-quantity {
  font-size: 18px;
  color: #555;
}

.order-button {
  display: inline-block;
  margin-top: 20px;
  padding: 15px 0px;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 50px;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.order-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
