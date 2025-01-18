<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="장바구니" />
      </div>
        <div class="content">
          <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" />
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p>{{ item.price }}</p>
              <p>수량: {{ item.quantity }}</p>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStores'
import BackHeader from '@/components/common/backHeader.vue';
import { computed } from 'vue';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  font-family: sans-serif;
}

.home {
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 95vh;
  box-sizing: border-box;
}

.header {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

.content {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
  display: flex; /* Flexbox 활성화 */
    flex-direction: column; /* 아이템들을 세로로 배치 (기존 정렬 유지) */
    align-items: center; /* 가로 방향 중앙 정렬 */
}

.cart-items {
  margin-top: 20px;
  width: 100%;
}

.cart-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 16px;
}

.item-details {
  flex: 1;
}
</style>
