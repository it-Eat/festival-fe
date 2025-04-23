<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader title="주문하기" />
      </div>

      <!-- 중앙 컨텐츠 -->
      <div class="content">
        <!-- 가게명 표시 -->
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
            <label class="payment-label">결제 수단</label>
            <div class="payment-options">
              <!-- 토스페이 -->
              <div class="option">
                <input
                  type="radio"
                  id="tossPay"
                  name="pay"
                  value="tossPay"
                  v-model="paymentMethod"
                />
                <label for="tossPay">
                  <img
                    src="@/assets/toss-pay.png"
                    alt="토스페이"
                    class="pay-icon"
                  />
                  <span class="payment-text">토스페이</span>
                </label>
              </div>

              <!-- 카카오페이 -->
              <div class="option">
                <input
                  type="radio"
                  id="kakaoPay"
                  name="pay"
                  value="kakaoPay"
                  v-model="paymentMethod"
                />
                <label for="kakaoPay">
                  <img
                    src="@/assets/kakao-pay.png"
                    alt="카카오페이"
                    class="pay-icon"
                  />
                  <span class="payment-text">카카오페이</span>
                </label>
              </div>

              <!-- 네이버페이 -->
              <div class="option">
                <input
                  type="radio"
                  id="naverPay"
                  name="pay"
                  value="naverPay"
                  v-model="paymentMethod"
                />
                <label for="naverPay">
                  <img
                    src="@/assets/naver-pay.png"
                    alt="네이버페이"
                    class="pay-icon"
                  />
                  <span class="payment-text">네이버페이</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 하단 결제 버튼 -->
          <div class="bottom-area">
            <button class="order-button" @click="handlePayment">
              {{ totalPrice.toLocaleString() }}원 결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
    <loadingComponent v-if="isLoading" />
    <checkModal
      v-if="isModalOpen"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :confirmText="modalConfig.confirmText"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import { useCartStore } from "@/stores/cartStores";
import { useRouter } from "vue-router";
// import api from "@/api/axiosInstance";
import loadingComponent from "@/components/common/loadingComponent.vue";
import checkModal from "@/components/common/checkModal.vue";

// Pinia store (가게명, 장바구니 등)
const cartStore = useCartStore();
const storeName = computed(() => cartStore.storeName); // 가게명
const cartItems = computed(() => cartStore.cartItems);
const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;
const isLoading = ref(false);
const isModalOpen = ref(false);
const modalConfig = ref({
  title: "",
  message: ``,
  confirmText: "",
});

// 총 금액 계산
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.menu.price * item.cnt,
    0
  );
});

// 입력 폼
const contact = ref(""); // 주문 연락처
const paymentMethod = ref(""); // 선택한 결제 수단 (tossPay/kakaoPay/naverPay 등)

// 결제 버튼 클릭 시
async function handlePayment() {
  // 1) 폼 검증
  if (!contact.value) {
    modalConfig.value = {
      title: "결제 오류",
      message: "연락처를 입력해주세요.",
      confirmText: "",
    };
    isModalOpen.value = true;
    return;
  }
  if (!paymentMethod.value) {
    modalConfig.value = {
      title: "결제 오류",
      message: "결제 수단을 선택해주세요.",
      confirmText: "",
    };
    isModalOpen.value = true;
    return;
  }
  IMP.init("store-bad0f66f-2cb8-4cf3-a5aa-6564e1e846b3"); // 상점 아이디 확인

  IMP.request_pay(
    {
      pg: "html5.inicis", // PG 코드 확인
      pay_method: "trans", // 카드 결제
      merchant_uid: "order_no_001", // 주문번호
      amount: Number(totalPrice.value), // 결제 금액
      name: "테스트 상품",
      buyer_email: "test@gmail.com",
      buyer_name: "민수",
      buyer_tel: "010-1234-1234",
      buyer_addr: "테스트 주소",
      buyer_postcode: "123-456",
      m_redirect_url: "http://localhost:5173/60/food/foodOrder", // 모바일 리디렉션
    },
    function (rsp) {
      if (rsp.success) {
        alert("결제가 성공적으로 완료되었습니다.");
        console.log("결제 성공:", rsp);
      } else {
        alert("결제 실패: " + rsp.error_msg);
        console.log("결제 실패:", rsp);
      }
    }
  );
}

//테스트 끝

// // 2) wishlistIds(장바구니 ID 리스트) 만들기
// const wishlistIds = cartItems.value.map((item) => item.id);

// // 3) payType 매핑
// //   - BE 요구사항에 맞춰 paymentMethod를 실제 payType으로 변환
// const payTypeMap = {
//   tossPay: "TOSSPAY",
//   kakaoPay: "KAKAOPAY",
//   naverPay: "NAVERPAY",
// };
// const payType = payTypeMap[paymentMethod.value] || "UNKNOWN";

// // 4) POST 요청에 사용할 payload
// const payload = {
//   wishlistIds,
//   totalPrice: totalPrice.value,
//   payType,
// };

// try {
//   isLoading.value = true;
//   // 5) 서버로 결제 정보 전송
//   const response = await api.post("/pay", payload);

//   // 6) 결제 완료 후 장바구니 비우기
//   cartStore.clearCart();
//   modalConfig.value = {
//     title: "결제 완료",
//     message: `‼️화면을 캡쳐해주세요‼️\n주문 번호 : ${response.data.pay.waitingNumber}\n픽업 시간 : ${response.data.waitingTime}`,
//     confirmText: "확인",
//   };
//   isModalOpen.value = true;
// } catch (error) {
//   console.error("결제 오류:", error);
//   modalConfig.value = {
//     title: "결제 오류",
//     message: "결제 중 오류가 발생했습니다. 다시 시도해주세요.",
//     confirmText: "",
//   };
//   isModalOpen.value = true;
// } finally {
//   isLoading.value = false;
// }

const handleConfirm = () => {
  isModalOpen.value = false;
  router.push({
    path: `/${festivalId}/userHome/homeFood`,
  });
};

const handleCancel = () => {
  isModalOpen.value = false;
};
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
  gap: 14px;
}

.header {
  margin: 10px 0;
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
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
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
  margin-bottom: 24px;
}

.contact label {
  display: block;
  font-weight: 700;
  color: #333;
  font-size: 16px;
  margin-bottom: 14px;
}
.payment-label {
  font-size: 16px;
  font-weight: 700;
}

.payment-text {
  display: block;
  font-weight: 400;
  color: #333;
  font-size: 20px;
}

.contact input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ff6f61;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.contact input[type="text"]:focus {
  outline: none;
}
/* 결제 수단 섹션 */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 16px; /* 결제 옵션 사이 간격 */
  margin-top: 14px;
}

/* 각 결제 옵션 */
.option {
  display: flex;
  align-items: center;
}

/* 라벨 안에서 아이콘과 텍스트가 나란히 오도록 */
.option label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 8px; /* 라디오 버튼과 아이콘/텍스트 사이 여백 */
}

.option input[type="radio"] {
  width: 18px;
  height: 18px;
}

/* 결제 아이콘 크기 조절 */
.pay-icon {
  width: 32px;
  height: auto;
  margin-right: 6px;
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
