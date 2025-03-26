<script setup>
import { useRouter } from "vue-router";
import { joinFestival } from "@/stores/festival";
import { useFestivalInfoStore } from "@/stores/festivalInfo";
import { ref } from "vue";
import loading from "@/components/common/loadingComponent.vue";
const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;
const loadingType = ref("none");
const festivalInfoStore = useFestivalInfoStore();
const festivalJoin = async () => {
  loadingType.value = "loading";
  await joinFestival(festivalId);
  festivalInfoStore.setFestivalId(festivalId);
  router.push(`/${festivalId}/userHome/homeFood`);
  loadingType.value = "none";
};
</script>

<template>
  <div v-if="loadingType === 'loading'" class="introduction-container">
    <loading />
  </div>
  <div v-else class="introduction-container">
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
      <button class="join-button" @click="festivalJoin">참여하기</button>
    </div>

    <div class="footer">
      Festival Companion과 함께 기다림 없는 축제와 다양한 정보를 경험하세요! 🎊
    </div>
  </div>
</template>

<style scoped>
.introduction-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.join-button {
  background-color: #ff6e61b0;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
}
.join-button:hover {
  background-color: #ff6e61;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  padding: 12px;
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
  margin-top: 40px;
  padding: 20px;
  font-size: 16px;
  color: #666;
  border-top: 1px solid #eee;
}
</style>
