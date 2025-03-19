<script setup>
import backHeader from "@/components/common/backHeader.vue";
import photoCard from "@/components/common/photoCard.vue";
import { usePlayingStore } from "@/stores/playing";
import { onMounted } from "vue";

const playStore = usePlayingStore();

onMounted(() => {
  playStore.fetchItems();
});
</script>


<template>
  <backHeader></backHeader>
  <div class="play-gallery">
    <photoCard
      v-for="play in playStore.plays"
      :key="play.id"
      :item="play"
    ></photoCard>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}

.home {
  display: flex;
  flex-direction: column;
  width: 600px;
  max-height: 100vh;
  margin: auto;
  box-sizing: border-box;
  background-color: #fff;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

/* 기본 3열 그리드 */
.play-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 5px;
  border-radius: 12px;
  justify-items: center;
  justify-content: center;
}

/* 중간 화면 (최대 600px 미만) : 2열 그리드 */
@media (max-width: 600px) {
  .play-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 작은 화면 (최대 400px 미만) : 1열 그리드 */
@media (max-width: 400px) {
  .play-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
