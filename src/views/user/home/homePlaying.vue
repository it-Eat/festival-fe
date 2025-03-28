<script setup>
import photoCard from "@/components/common/photoCard.vue";
import { usePlayingStore } from "@/stores/playing";
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const festivalId = route.params.festivalId;

const playingStore = usePlayingStore();

onMounted(() => {
  playingStore.fetchItems(festivalId);
});

// 서버 데이터 + 더미 데이터 합치기
const allPlays = computed(() =>
  Array.isArray(playingStore.plays) ? [...playingStore.plays] : []
);

const goToPlayingList = () => {
  router.push(`/${festivalId}/playing/playingList`);
};
</script>

<template>
  <div class="home-playing">
    <div class="playing-list">
      <photoCard
        v-for="play in allPlays.slice(0, 6)"
        :key="play.id"
        :item="play"
        card-type="playing"
        size="large"
      />
    </div>

    <button class="more-button" @click="goToPlayingList">
      놀거리 보러가기
    </button>
  </div>
</template>

<style scoped>
/* 메인 컨테이너 */
.home-playing {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  overflow-x: hidden;
}
/* 놀거리 목록 그리드 */
.playing-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: minmax(120px, auto);
  gap: 32px;
  width: 100%;
  max-width: 500px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  justify-items: center;
}

/* 카드 스타일 */
.photoCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

/* 더보기 버튼 */
.more-button {
  background-color: #ff6f61;
  color: white;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  width: 180px;
  max-width: 200px;
  margin-top: 32px;
  transition: background 0.3s;
}

.more-button:hover {
  background-color: #e65a50;
}
</style>
