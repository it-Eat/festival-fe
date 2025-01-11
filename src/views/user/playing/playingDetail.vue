<script setup>
import backHeader from "@/components/common/backHeader.vue";
import { useRoute } from "vue-router";
import { usePlayingStore } from "@/stores/playing";

const route = useRoute();
const playStore = usePlayingStore();
const currentId = Number(route.params.id);
const currentItem = playStore.getPlayingById(currentId);

console.log("Received item.id: ", currentItem.id);
console.log("Received item.name: ", currentItem.name);
</script>

<template>
  <div class="container">
    <backHeader></backHeader>
    <div class="sub-container" v-if="currentItem">
      <div>
        <div class="logo-image">
          <img :src="currentItem.img" :alt="currentItem.name" />
        </div>
      </div>

      <div class="main">
        <div class="booth">
          <div>
            [선택된 놀거리 번호]: <strong>{{ currentItem.id }}</strong>
          </div>
          <div>
            [부스 위치]: <strong>{{ currentItem.position }}</strong>
          </div>
        </div>
        <div class="description">
          <div class="contents">{{ currentItem.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-image {
  background-color: #6b5b95;
  width: 100vw;
  height: 200px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 이미지가 컨테이너를 넘지 않도록 */
}

.logo-image img {
  width: 100%; /* 컨테이너에 맞게 이미지 넓이 조정 */
  height: auto; /* 컨테이너 높이에 맞게 조정 */
  object-fit: contain; /* 비율 유지하면서 전체를 보이도록 */
}

.container {
  height: 95vh;
  display: flex;
  flex-direction: column;
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
  background-color: #a999d4;
  flex: 1;
  margin: 40px 10px;
  border-radius: 15%;
}

.contents {
  background-color: aliceblue;
}
</style>
