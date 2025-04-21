<script setup>
import { useRouter } from "vue-router";
import { joinFestival } from "@/stores/festival";
import { useFestivalInfoStore } from "@/stores/festivalInfo";
import { ref } from "vue";
import loadingComponent from "@/components/common/loadingComponent.vue";
import checkModal from "@/components/common/checkModal.vue";
const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;
const loadingType = ref("none");
const festivalInfoStore = useFestivalInfoStore();
const isModalOpen = ref(false);
const modalConfig = ref({
  title: "축제 참여",
  message: "축제에 참여하시겠습니까?",
  confirmText: "참여",
  cancelText: "취소",
});
const festivalJoin = async () => {
  loadingType.value = "loading";
  await joinFestival(festivalId);
  festivalInfoStore.setFestivalId(festivalId);
  router.push(`/${festivalId}/userHome/homeFood`);
  loadingType.value = "none";
};
</script>

<template>
  <div class="introduction-container">
    <div class="feature-list">
      <div class="feature-item">
        <div class="feature-icon">🔍</div>
        <div class="feature-content">
          <h3>부스 탐색</h3>
          <p>먹거리, 체험, 굿즈 등 다양한 부스를 간편하게 검색 가능</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">💳</div>
        <div class="feature-content">
          <h3>간편 결제</h3>
          <p>빠르고 쉬운 예약 및 주문으로 긴 대기 시간을 없앰</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">💬</div>
        <div class="feature-content">
          <h3>리뷰 및 게시판</h3>
          <p>축제 경험을 공유하고 다른 사용자와 소통할 수 있는 커뮤니티 제공</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">🔔</div>
        <div class="feature-content">
          <h3>실시간 알림</h3>
          <p>축제 정보, 이벤트, 부스 현황에 대한 알림을 즉시 수신 가능</p>
        </div>
      </div>
      <button class="join-button" @click="isModalOpen = true">참여하기</button>
    </div>

    <div class="footer">
      Festival Companion과 함께 기다림 없는 축제와 다양한 정보를 경험하세요! 🎊
    </div>
    <checkModal
      v-if="isModalOpen"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :confirmText="modalConfig.confirmText"
      :cancelText="modalConfig.cancelText"
      @confirm="festivalJoin"
      @cancel="isModalOpen = false"
    />
    <loadingComponent v-if="loadingType === 'loading'" />
  </div>
</template>

<style scoped>
.introduction-container {
  width: 100%;
  margin: 0 auto;
  padding: 25px 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow-x: hidden;
}
.join-button {
  background-color: white;
  color: #ff6e61;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #ff6e61;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
}
.join-button:hover {
  background-color: #ff6e61;
  color: white;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.2s;
}

.feature-item:hover {
  transform: translateX(10px);
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 24px;
  margin-right: 20px;
  padding: 10px 13px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.feature-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #ff6f61;
  margin-bottom: 8px;
}

.feature-content p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.footer {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #eee;
}
</style>
