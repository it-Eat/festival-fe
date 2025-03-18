<template>
  <div class="page">
    <div class="container">
      <!-- BackHeader에 부스 이름을 동적으로 전달 -->
      <backHeader :title="booth?.name || '부스 상세'" />
      <div class="sub-container" v-if="booth">
        <div>
          <div class="logo-image">
            <img :src="booth.image" :alt="booth.name" />
          </div>
        </div>

        <div class="main">
          <div class="booth">
            <div>
              [선택된 놀거리 번호]: <strong>{{ booth.id }}</strong>
            </div>
            <div>
              [부스 위치]: <strong>{{ booth.location || "없음" }}</strong>
            </div>
          </div>
          <div class="description">
            <div class="contents">
              {{ booth.content || "내용이 없습니다." }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBoothDetail } from "@/api/admin"; // 위에서 작성한 API 함수
import backHeader from "@/components/common/backHeader.vue";

const route = useRoute();
// route.params에서 boothId와 festivalId를 받아옵니다.
const boothId = Number(route.params.boothId) || Number(route.params.id);
const festivalId = Number(route.params.festivalId) || 1;

const booth = ref(null);

onMounted(async () => {
  try {
    const data = await getBoothDetail(boothId, festivalId);
    booth.value = data;
  } catch (error) {
    console.error("부스 상세 조회 실패:", error);
  }
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.container {
  display: flex;
  flex-direction: column;
  width: 600px;
  max-height: 100vh;
  margin: auto;
  box-sizing: border-box;
  background-color: #fff;
}
.logo-image {
  background-color: #6b5b95;
  width: 600px;
  height: 400px;
  max-height: 100vh;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.logo-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.sub-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}
.description {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 40px 10px;
  border-radius: 15%;
}
.contents {
  background-color: aliceblue;
  padding: 10px;
}
</style>
