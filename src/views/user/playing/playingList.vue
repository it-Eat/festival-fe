<script setup>
import backHeader from "@/components/common/backHeader.vue";
import photoCard from "@/components/common/photoCard.vue";
import { usePlayingStore } from "@/stores/playing";

const playStore = usePlayingStore();
</script>

<template>
  <backHeader></backHeader>
  <div class="play-gallery">
    <photoCard
      v-for="play in playStore.playingList"
      :key="play.id"
      :item="play"
    ></photoCard>
  </div>
</template>

<style scoped>
.play-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 5px;
  border-radius: 12px;
  justify-items: center;
  justify-content: center;
}
</style>
