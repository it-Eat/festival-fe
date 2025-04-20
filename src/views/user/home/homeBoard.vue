<script setup>
import SmallList from "@/components/common/smallList.vue";
import { useLostStore } from "@/stores/lost";
import { useBoardStore } from "@/stores/board";
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import loadingComponent from "@/components/common/loadingComponent.vue";

const route = useRoute();
const festivalId = route.params.festivalId;

const lostStore = useLostStore();
const boardStore = useBoardStore();
const loadingType = ref("none");
onMounted(() => {
  loadingType.value = "loading";
  lostStore.fetchItems(festivalId);
  boardStore.fetchItems(festivalId);
  loadingType.value = "none";
});

const allLosts = computed(() =>
  Array.isArray(lostStore.losts) ? [...lostStore.losts] : []
);

const allBoards = computed(() =>
  Array.isArray(boardStore.boards) ? [...boardStore.boards] : []
);

const router = useRouter();
const handleMoreClick = () => {
  router.push(`/${festivalId}/lostItem/list`);
};
</script>

<template>
  <loadingComponent v-if="loadingType === 'loading'" />
  <div class="content-area">
    <div class="container">
      <div class="section">
        <div class="menu">분실물</div>

        <SmallList
          class="list-item"
          v-for="lostItem in allLosts.slice(0, 3)"
          :key="lostItem.id"
          :lost="lostItem"
          v-show="allLosts.length > 0"
        />
        <div class="more-button-container">
          <button class="more-button" @click="handleMoreClick">더보기</button>
        </div>
      </div>

      <div class="section">
        <div class="menu">게시판</div>

        <SmallList
          class="list-item"
          v-for="boardItem in allBoards.slice(0, 3)"
          :key="boardItem.id"
          :board="boardItem"
          v-show="allBoards.length > 0"
        />
        <div class="more-button-container">
          <button class="more-button">
            <RouterLink :to="`/${festivalId}/board/list`">더보기</RouterLink>
          </button>
        </div>
      </div>
      <div class="section"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  box-sizing: border-box;
  gap: 24px;
  height: 100%;
}

.content-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  overflow-x: hidden;
}

.section {
  flex: 1; /* 동일한 크기를 유지하도록 설정 */
  min-height: 100px; /* 최소 높이 유지 */
  width: 100%;
  min-height: auto; /* 기존 min-height 제거 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-item {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}

.menu {
  margin-bottom: 8px; /* Reduced margin for spacing */
  font-weight: bold;
  font-size: 18px; /* Reduced font size for consistency */
}

.divider {
  border: none;
  height: 1px;
  background-color: black;
  margin-bottom: 20px;
}

.more-button-container {
  display: flex;
  justify-content: center;
  margin-top: 8px; /* Reduced margin for spacing */
}

.more-button {
  background-color: #e74c3c;
  color: white;
  padding: 8px 16px; /* Reduced padding for consistency */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Reduced font size for consistency */
}

.more-button a {
  text-decoration: none;
  color: white;
}
</style>
