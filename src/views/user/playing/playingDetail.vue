<template>
  <loading v-if="loadingType === 'loading'" />
  <div class="page">
    <div class="container">
      <!-- BackHeader에 부스 이름을 동적으로 전달 -->
      <backHeader :title="booth?.name || '부스 상세'" />
      <div class="sub-container" v-if="booth">
        <div class="main">
          <div>
            <div class="logo-image">
              <img :src="booth.image || noImage" :alt="booth.name" />
            </div>
          </div>
          <div>
            <h3 class="value">장소 : {{ booth.location || "없음" }}</h3>
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
import noImage from "@/assets/noImage.png";
import loading from "@/components/common/loadingComponent.vue";

const route = useRoute();
// route.params에서 boothId와 festivalId를 받아옵니다.
const boothId = Number(route.params.boothId) || Number(route.params.id);
const festivalId = Number(route.params.festivalId) || 1;
const loadingType = ref("none");
const booth = ref(null);

onMounted(async () => {
  try {
    loadingType.value = "loading";
    const data = await getBoothDetail(boothId, festivalId);
    booth.value = data;
  } catch (error) {
    console.error("부스 상세 조회 실패:", error);
  } finally {
    loadingType.value = "none";
  }
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.value {
  color: #ff6f61;
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
  width: 300px;
  height: 300px;
  max-height: 100vh;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.logo-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-fit: fill;
  border-radius: 15%;
}
.sub-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1;
  margin-top: 30px;
}
.main {
  display: flex;
  flex-direction: column;
  /* border: 1px solid #ff6f61; */
  padding: 10px;
  align-items: center;
  flex: 1;
  width: 100%;
  gap: 30px;
}
.booth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
