<script setup>
import HomeMenu from "@/components/home/homeMenu.vue";
import backHeader from "@/components/common/backHeader.vue";
import { getFestivalDetail } from "@/stores/festival";
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import loadingComponent from "@/components/common/loadingComponent.vue";
import { dateFormat } from "@/util/dateFormat";

const route = useRoute();
const festivalId = route.params.festivalId;
const festivalInfo = ref(null);
const loading = ref("none");

// 포맷된 날짜를 계산하는 computed 속성들
const formattedStartDate = computed(() => {
  if (!festivalInfo.value?.eventStartDate) return "날짜 미정";
  return dateFormat(festivalInfo.value.eventStartDate)
    .toLocaleString()
    .split("오")[0];
});

const formattedEndDate = computed(() => {
  if (!festivalInfo.value?.eventEndDate) return "날짜 미정";
  return dateFormat(festivalInfo.value.eventEndDate)
    .toLocaleString()
    .split("오")[0];
});

// festival 정보를 가져오는 함수
const fetchFestivalInfo = async () => {
  try {
    loading.value = "block";
    const response = await getFestivalDetail(festivalId);
    festivalInfo.value = response;
  } catch (error) {
    console.error("Festival 정보 로드 실패:", error);
  } finally {
    loading.value = "none";
  }
};

onMounted(() => {
  fetchFestivalInfo();
});
</script>

<template>
  <backHeader
    class="header"
    :title="festivalInfo?.festivalName || '축제'"
    :useUserName="false"
    :category="'home'"
  />
  <div class="home">
    <!-- 배너 -->
    <div class="banner">
      <h4>축제 기간</h4>
      <h2 v-if="festivalInfo">
        {{ formattedStartDate }} ~ {{ formattedEndDate }}
      </h2>
      <h2 v-else>날짜 미정</h2>
      <h1>{{ festivalInfo?.festivalName || "축제 이름" }}</h1>
    </div>

    <!-- 📌 homeMenu가 존재하는지 확인 -->
    <HomeMenu class="menu" />

    <!-- 📌 Router-view는 homeMenu 아래에 위치해야 합니다 -->
    <router-view class="content-area" />
    <loadingComponent v-if="loading === 'block'" />
  </div>
</template>

<style scoped>
.header {
  max-width: 600px; /* Adjusted for responsive design */
  margin: 0 auto;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 정렬 */
  width: 100%;
  max-width: 600px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  background: #f9f9f9;
}

.banner {
  width: 100%;
  box-sizing: border-box;
  height: auto;
  max-height: 150px;
  background-image: url("@/assets/festivalBanner.jpg");
  background-size: cover;
  background-position: center 92%;
  background-repeat: no-repeat;
  color: #fff;
  padding: 24px;
  text-align: center;
  border-radius: 0 0 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.banner h2 {
  font-size: 18px; /* 글씨 크기 축소 */
  margin: 0;
}

.banner h1 {
  font-size: 22px; /* 글씨 크기 축소 */
  margin: 5px 0;
}

.banner p {
  font-size: 14px; /* 글씨 크기 축소 */
  opacity: 0.9;
}

/* 콘텐츠 영역 */
.content-area {
  background-color: #f9f9f9; /* 회색 배경 적용 */
  min-height: calc(
    100vh - 50px - 180px
  ); /* 헤더(50px) + 배너(180px) 제외한 높이 설정 */
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%; /* Ensured alignment with header and menu */
  max-width: 600px; /* Adjusted max width to align */
  margin: 0 auto; /* 중앙 정렬 */
  box-sizing: border-box; /* 패딩 포함하여 크기 유지 */
  overflow: hidden; /* Prevent content from overflowing */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  box-sizing: border-box;
}

.section {
  width: 100%;
  min-height: 200px; /* Ensuring equal height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-item {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.list-item .title {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
