<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="장바구니" />
      </div>
      <div class="content">
        <div class="cart-items">
          <div v-for="item in res" :key="item.id" class="cart-item-container">
            <img
              :src="item.menu.image || noimage"
              alt="메뉴 이미지"
              class="cart-item-image"
            />
            <div class="cart-item-info">
              <p class="cart-item-name">{{ item.menu.name }}</p>
              <p class="cart-item-price">
                {{ priceFormat(item.menu.price) }}원
              </p>
            </div>
            <div class="cart-item-quantity">
              <span class="quantity-label">수량</span>
              <span class="quantity-value">{{ item.cnt }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-area">
        <div class="payment-info">
          <div>결제 금액 확인</div>
          <div>총 수량 : {{ totalCount }}</div>
        </div>
        <button class="order-button" @click="handleOrder">
          {{ priceFormat(totalPrice) }}원 주문하기
        </button>
      </div>
    </div>
    <loadingComponent v-if="isLoading" />
  </div>
</template>

<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getCart } from "@/api/user";
import noimage from "@/assets/noimage.png";
import loadingComponent from "@/components/common/loadingComponent.vue";
import { useCartStore } from "@/stores/cartStores";
const router = useRouter();
const boothId = router.currentRoute.value.params.boothId;
const festivalId = router.currentRoute.value.params.festivalId;
let res = ref([]);
let isLoading = ref(false);

const handleOrder = () => {
  router.push({
    name: "foodOrder",
  });
};

const cartStore = useCartStore();

const fetchCart = async () => {
  isLoading.value = true;
  const cart = await getCart(boothId, festivalId);
  res.value = cart.data;
  cartStore.cartItems = res.value;
  isLoading.value = false;
};

const priceFormat = (price) => {
  return price.toLocaleString("ko-KR");
};

const totalCount = computed(() => {
  return res.value.reduce((sum, item) => sum + item.cnt, 0);
});

const totalPrice = computed(() => {
  return res.value.reduce((sum, item) => sum + item.menu.price * item.cnt, 0);
});

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}
.home {
  display: flex;
  flex-direction: column;
  min-height: 95vh;
  width: 600px;
  max-width: 100vw;
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .home {
    width: 100%;
  }
}
.header {
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.content {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}
.cart-items {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 20px auto;
  padding: 16px;
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
.cart-item-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 16px;
  margin-bottom: 16px;
  background-color: white;
  border-radius: 12px;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
}
.cart-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cart-item-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}
.cart-item-price {
  font-size: 15px;
  color: #ff6f61;
  font-weight: 500;
  margin: 0;
}
.cart-item-quantity {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 80px;
}
.quantity-label {
  font-size: 12px;
  color: #666;
}
.quantity-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  background-color: #f5f5f5;
  padding: 4px 12px;
  border-radius: 12px;
}
</style>
