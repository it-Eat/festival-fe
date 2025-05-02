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
                  id="tosspay"
                  name="pay"
                  value="tosspay"
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
                  id="kakaopay"
                  name="pay"
                  value="kakaopay"
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
import { computed, ref, onMounted } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import { useCartStore } from "@/stores/cartStores";
import { useRouter } from "vue-router";
import api from "@/api/axiosInstance";
import loadingComponent from "@/components/common/loadingComponent.vue";
import checkModal from "@/components/common/checkModal.vue";
import { useUserStore } from "@/stores/userStore";

const user = useUserStore();
const userName = user.userName;
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

// 아임포트 스크립트 로드 함수
const loadIamport = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.onload = () => resolve(window.IMP);
    script.onerror = () => reject(new Error("아임포트 스크립트 로드 실패"));
    document.head.appendChild(script);
  });
};

// 컴포넌트 마운트 시 아임포트 초기화
onMounted(async () => {
  try {
    const IMP = await loadIamport();
    // 테스트 모드로 초기화
    IMP.init("imp10391932"); // 아임포트 가맹점 식별코드
  } catch (error) {
    console.error("아임포트 초기화 실패:", error);
  }
});

// 결제 버튼 클릭 시
async function handlePayment() {
  const timestamp = Date.now(); // 현재 시간 (밀리초)
  const random = Math.floor(Math.random() * 100000); // 0~99999 난수
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

  try {
    const IMP = window.IMP;
    if (!IMP) {
      throw new Error("아임포트가 초기화되지 않았습니다.");
    }
    isLoading.value = true;
    const userCode = import.meta.env.VITE_PORTONE_INIT;
    IMP.init(userCode);

    // 2) wishlistIds(장바구니 ID 리스트) 만들기
    const wishlistIds = cartItems.value.map((item) => item.id);

    // 3) payType 매핑
    const payTypeMap = {
      tosspay: "TOSSPAY",
      kakaopay: "KAKAOPAY",
    };
    const payType = payTypeMap[paymentMethod.value] || "UNKNOWN";

    // 4) POST 요청에 사용할 payload
    const payload = {
      wishlistIds,
      totalPrice: totalPrice.value,
      payType,
    };

    // 반응형 객체를 일반 값으로 변환
    const paymentData = {
      channelKey: import.meta.env.VITE_PORTONE_CHANNEL_ID,
      merchant_uid: `order_id_${timestamp}_${random}_${cartItems.value[0].id}`,
      name: storeName.value,
      pay_method: paymentMethod.value,
      escrow: false,
      amount: totalPrice.value,
      tax_free: 0,
      buyer_name: userName,
      buyer_tel: contact.value,
      m_redirect_url: `https://iteat.netlify.app/${festivalId}/food/mobileFoodOrder?wishlistIds=${wishlistIds}&totalPrice=${totalPrice.value}&payType=${payType}/&festivalId=${festivalId}`,
      notice_url: "https://helloworld.com/api/v1/payments/notice",
      confirm_url: "https://helloworld.com/api/v1/payments/confirm",
      currency: "KRW",
      locale: "ko",
      custom_data: { userId: user.user.id },
    };

    IMP.request_pay(paymentData, async () => {
      try {
        isLoading.value = true;
        // 5) 서버로 결제 정보 전송
        const response = await api.post("/pay", payload);

        // 6) 결제 완료 후 장바구니 비우기
        cartStore.clearCart();
        modalConfig.value = {
          title: "결제 완료",
          message: `‼️화면을 캡쳐해주세요‼️\n주문 번호 : ${response.data.pay.waitingNumber}\n픽업 시간 : ${response.data.waitingTime}`,
          confirmText: "확인",
        };
        isModalOpen.value = true;
      } catch (error) {
        console.error("결제 오류:", error);
        modalConfig.value = {
          title: "결제 오류",
          message: "결제 중 오류가 발생했습니다. 다시 시도해주세요.",
          confirmText: "",
        };
        isModalOpen.value = true;
      } finally {
        isLoading.value = false;
      }
    });
  } catch (error) {
    console.error("결제 오류:", error);
    modalConfig.value = {
      title: "결제 오류",
      message: "결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
      confirmText: "",
    };
    isModalOpen.value = true;
  } finally {
    isLoading.value = false;
  }
}

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
  gap: 16px /* 결제 옵션 사이 간격 */;
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
  margin-left: 8px /* 라디오 버튼과 아이콘/텍스트 사이 여백 */;
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
  width: 80% /* 버튼 너비: 80% */;
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
