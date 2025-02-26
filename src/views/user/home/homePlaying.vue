<script setup>
import { useRouter } from "vue-router";
import photoCard from "@/components/common/photoCard.vue";
import { usePlayingStore } from "@/stores/playing";
import { onMounted } from "vue";

const router = useRouter();

const playingStore = usePlayingStore();

const goToPlayingList = () => {
  router.push("/user/playing/playingList");
};

onMounted(() => {
  playingStore.fetchItems();
});
</script>

<template>
  <div>
    <photoCard
      v-for="play in playingStore.plays.slice(0, 6)"
      :key="play.id"
      :item="play"
      card-type="playing"
    ></photoCard>
    <button class="button1" @click="goToPlayingList">더보기</button>
  </div>
</template>

<style scoped>
.container {
  max-height: 450px;
}

.button1 {
  grid-column: 1 / -1; /* 버튼이 전체 너비를 차지하도록 */
  justify-self: center;
}
</style>
