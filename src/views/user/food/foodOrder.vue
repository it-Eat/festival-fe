<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="주문하기" />
      </div>
      <div class="content">
        <div class="order-info">
          <div class="contact">
            <label for="contact">내 연락처</label>
            <input
              type="text"
              id="contact"
              v-model="contact"
              placeholder="010-1234-5678"
              required
            />
          </div>

          <div class="payment-methods">
            <label>간편 결제</label>
            <div class="payment-options">
              <input
                type="radio"
                id="tossPay"
                name="paymentMethod"
                v-model="paymentMethod"
                value="tossPay"
              />
              <label for="tossPay">토스 페이</label>

              <input
                type="radio"
                id="naverPay"
                name="paymentMethod"
                v-model="paymentMethod"
                value="naverPay"
              />
              <label for="naverPay">네이버 페이</label>

              <input
                type="radio"
                id="kakaoPay"
                name="paymentMethod"
                v-model="paymentMethod"
                value="kakaoPay"
              />
              <label for="kakaoPay">카카오 페이</label>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <div class="total-price">{{ totalPrice.toLocaleString() }}원</div>
          <button class="order-button" @click="showModal = true">
            결제하기
          </button>
        </div>
      </div>
    </div>

    <OrderComplete v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import { useCartStore } from "@/stores/cartStores";
import { computed, ref } from "vue";
import OrderComplete from "@/components/modal/orderComplete.vue";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);

const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

const contact = ref(""); // 연락처
const paymentMethod = ref(""); // 선택된 결제 방식
const showModal = ref(false); // 모달 표시 여부
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
  min-height: 100vh; /* 화면 크기에 따라 전체 높이를 채움 */
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order-info {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
}

.payment-methods {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.contact,
.payment-methods {
  width: 100%;
  margin-bottom: 15px;
}

.contact label,
.payment-methods label {
  display: block;
  font-weight: 500;
  color: #333;
}

.contact input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.contact input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
}

.payment-options {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.payment-options label {
  font-weight: normal;
  color: #555;
}

.order-summary {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}

.total-price {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
}

.order-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-button:hover {
  background-color: #0056b3;
  transform: scale(1.02);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}
</style>
