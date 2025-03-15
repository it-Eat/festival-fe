<script setup>
import SmallList from "@/components/common/smallList.vue";
import { useLostStore } from "@/stores/lost";
import { useBoardStore } from "@/stores/board";

const lostStore = useLostStore();
const boardStore = useBoardStore();
</script>

<template>
  <div class="content-area">
    <div class="container">
      <div class="section">
        <div class="menu">분실물</div>
        <hr class="divider" />
        <SmallList
          class="list-item"
          v-for="lostItem in lostStore.lostList.slice(0, 3)"
          :key="lostItem.id"
          :lost="lostItem"
          v-show="lostStore.lostList.length > 0"
        />
        <div class="more-button-container">
          <button class="more-button">
            <router-link to="/user/lostItem/list">더보기</router-link>
          </button>
        </div>
      </div>

      <div class="section">
        <div class="menu">게시판</div>
        <hr class="divider" />
        <SmallList
          class="list-item"
          v-for="boardItem in boardStore.boardList.slice(0, 3)"
          :key="boardItem.id"
          :board="boardItem"
        />
        <div class="more-button-container">
          <button class="more-button">
            <router-link to="/user/board/list">더보기</router-link>
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
}

.content-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  height: auto; /* 높이 자동 조정 */
  min-height: 60vh; /* 최소 높이 조정 */
  overflow: hidden; /* 스크롤 제거 */
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
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
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
  margin: 4px 0; /* Reduced margin for spacing */
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
