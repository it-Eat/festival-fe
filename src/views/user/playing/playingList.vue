<script setup>
import backHeader from "@/components/common/backHeader.vue";
import photoCard from "@/components/common/photoCard.vue";
import { ref } from "vue";

// import facefainting from "@/assets/play/facefainting.jpeg";
// import dartgame from "@/assets/play/dart.png";
// import necklace from "@/assets/play/necklace.jpeg";
// import photo from "@/assets/play/photo.jpeg";
// import ceramic from "@/assets/play/ceramic.jpeg";
// import personal from "@/assets/play/personalcolor.jpeg";

import { usePlayingStore } from "@/stores/playing";

const playStore = usePlayingStore();
</script>

<template>
  <backHeader></backHeader>
  <div class="play-gallery">
    <photoCard
      v-for="play in playStore.playList"
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
