<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader title="주문하기" />
      </div>

      <!-- 중앙 컨텐츠 -->
      <div class="content">
        <!-- 가게명 표시 (Pinia storeName) -->
        <h2 class="store-name">{{ storeName }}</h2>

        <!-- 주문 정보 카드 -->
        <div class="order-info">
          <!-- 주문 연락처 -->
          <div class="contact">
            <label for="contact">주문 연락처</label>
            <input
              type="text"
              id="contact"
              v-model="contact"
              placeholder="010-1234-5678"
            />
          </div>

          <!-- 결제 수단 -->
          <div class="payment-methods">
            <label>결제 수단</label>
            <div class="payment-options">
              <input
                type="radio"
                id="tossPay"
                name="pay"
                value="tossPay"
                v-model="paymentMethod"
              />
              <label for="tossPay">토스페이</label>

              <input
                type="radio"
                id="kakaoPay"
                name="pay"
                value="kakaoPay"
                v-model="paymentMethod"
              />
              <label for="kakaoPay">카카오페이</label>

              <input
                type="radio"
                id="naverPay"
                name="pay"
                value="naverPay"
                v-model="paymentMethod"
              />
              <label for="naverPay">네이버페이</label>
            </div>
          </div>

          <!-- 하단 결제 버튼 (카드 내부) -->
          <div class="bottom-area">
            <button class="order-button" @click="handlePayment">
              {{ totalPrice.toLocaleString() }}원 결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import { useCartStore } from "@/stores/cartStores";
import { useRouter } from "vue-router";

// Pinia store (가게명, 장바구니 등)
const cartStore = useCartStore();
const storeName = computed(() => cartStore.storeName); // 가게명
const cartItems = computed(() => cartStore.cartItems);
const router = useRouter();

// 총 금액 계산
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

// 입력 폼
const contact = ref("");
const paymentMethod = ref("");

// 결제 버튼 클릭 시
function handlePayment() {
  // 결제 로직 처리 후 장바구니 비우기
  cartStore.clearCart();
  alert("결제가 완료되었습니다. 장바구니를 비웠습니다.");
  router.push({
    path: "/user",
  });
}
</script>

<style scoped>
/* 페이지 전체 컨테이너 */
.page {
  display: flex;
  justify-content: center;
  font-family: "Arial", sans-serif;
}

.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 600px;
  max-width: 95vw;
  margin: auto;
  box-sizing: border-box;
}

.header {
  margin-bottom: 20px;
}

/* 중앙 영역 */
.content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 상단 가게명 */
.store-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
}

/* 주문 정보 카드 */
.order-info {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: #fff;
}

.contact,
.payment-methods {
  margin-bottom: 16px;
}

.contact label,
.payment-methods label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
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

/* 결제 수단 라디오 */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 하단 결제 버튼 (카드 내부) */
.bottom-area {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

.order-button {
  width: 80%; /* 버튼 너비: 80% */
  padding: 15px;
  background-color: #ff6b6b; /* 핑크/코랄 계열 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.order-button:hover {
  background-color: #ff5252;
  transform: scale(1.02);
}
</style>
