<template>
  <div class="loadingComponent">
    <checkModal
      v-if="isModalOpen"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :confirmText="modalConfig.confirmText"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
    <p class="loadingText">결제 진행중...</p>
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import checkModal from "@/components/common/checkModal.vue";
import api from "@/api/axiosInstance";

const festivalId = ref(null);
const wishlistIds = ref(null);
const totalPrice = ref(0);
const payType = ref("");
const isModalOpen = ref(false);
const mWishlistIds = ref("");

const modalConfig = ref({
  title: "",
  message: ``,
  confirmText: "",
});

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    wishlistIds.value = route.query.wishlistIds; // "1,2,3" 형태의 문자열
    totalPrice.value = route.query.totalPrice; // 숫자로 변환
    payType.value = route.query.payType;
    festivalId.value = route.query.festivalId;
    mWishlistIds.value = wishlistIds.value.split(",").map((id) => Number(id));

    const payload = {
      wishlistIds: mWishlistIds.value,
      totalPrice: totalPrice.value,
      payType: payType.value,
    };
    const response = await api.post("/pay", payload);

    if (response) {
      modalConfig.value = {
        title: "결제 완료",
        message: `‼️화면을 캡쳐해주세요‼️\n주문 번호 : ${response.data.pay.waitingNumber}\n픽업 시간 : ${response.data.waitingTime}`,
        confirmText: "확인",
      };
      isModalOpen.value = true;
    } else {
      modalConfig.value = {
        title: "결제 오류",
        message: "결제 중 오류가 발생했습니다. 다시 시도해주세요.",
        confirmText: "",
      };
      isModalOpen.value = true;
    }
  } catch (error) {
    console.log(error);
    modalConfig.value = {
      title: "결제 오류",
      message: "결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
      confirmText: "",
    };
    isModalOpen.value = true;
  }
});
const handleConfirm = () => {
  isModalOpen.value = false;
  router.push({
    path: `/${festivalId.value}/userHome/homeFood`,
  });
};

const handleCancel = () => {
  isModalOpen.value = false;
};
</script>

<style>
.loadingComponent {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
}
.loadingText {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ff6f61;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;
  margin-bottom: 24px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
