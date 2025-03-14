<script setup>
import HomeMenu from "@/components/home/homeMenu.vue";
import backHeader from "@/components/common/backHeader.vue";
</script>

<template>
  <div class="home">
    <backHeader
      :title="'불꽃놀이 페스티벌'"
      :useUserName="true"
      :category="'home'"
    />

    <!-- 배너 -->
    <div class="banner">
      <h2>2030.5.4</h2>
      <h1>불꽃놀이 페스티벌</h1>
      <p>화려하게 밤하늘을 물들이는 축제에 여러분을 초대합니다.</p>
    </div>

    <HomeMenu class="menu" />
    <router-view class="content-area" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  width: 100%;
  max-width: 450px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  background: #f9f9f9;
}

.banner {
  width: 100%;
  max-width: 450px; /* 헤더와 동일한 너비 */
  box-sizing: border-box;
  height: auto;
  max-height: 150px;
  background: linear-gradient(to bottom, #4b0082, #ff6f61);
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 0 0 24px 24px;
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 450px; /* 헤더와 동일한 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  box-sizing: border-box; /* 패딩 포함하여 크기 유지 */
}
</style>
