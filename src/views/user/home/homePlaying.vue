<script setup>
import { useRouter } from "vue-router";
import photoCard from "@/components/common/photoCard.vue";
import { usePlayingStore } from "@/stores/playing";
import { onMounted, ref, computed } from "vue";

const router = useRouter();

const playingStore = usePlayingStore();

onMounted(() => {
  playingStore.fetchItems();
});

// 서버 데이터 + 더미 데이터 합치기
const allPlays = computed(() => Array.isArray(playingStore.plays) ? [...playingStore.plays] : []);

const goToPlayingList = () => {
  router.push("/user/playing/playingList");
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
      />
    </div>

    <button class="more-button" @click="goToPlayingList">더보기</button>
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
  gap: 12px;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  justify-items: center;
}

/* 카드 스타일 */
.photoCard {
  width: 100%;
  max-width: 120px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
  margin-top: 15px;
  transition: background 0.3s;
  display: flex;
  justify-content: center;
}

.more-button:hover {
  background-color: #e65a50;
}
</style>
