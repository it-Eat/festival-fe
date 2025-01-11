<script setup>
import SmallList from "@/components/common/smallList.vue";
import { useLostStore } from "@/stores/lost";
import { useBoardStore } from "@/stores/board";

const lostStore = useLostStore();
const boardStore = useBoardStore();
</script>

<template>
  <div class="container">
    <div>
      <div class="menu">분실물</div>
      <hr style="border: 0; height: 1px; background-color: black" />
      <SmallList
        class="list-item"
        v-for="lostItem in lostStore.lostList.slice(0, 4)"
        :key="lostItem.id"
        :lost="lostItem"
      />
      <div style="display: flex; justify-content: center">
        <button
          style="margin: auto; padding: 2px 4px; background-color: #2fffff"
        >
          <router-link style="text-decoration: none" to="/user/lostItem/list"
            >더보기</router-link
          >
        </button>
      </div>
    </div>

    <div>
      <div class="menu">게시판</div>
      <hr style="border: 0; height: 1px; background-color: black" />
      <SmallList
        class="list-item"
        v-for="boardItem in boardStore.boardList.slice(0, 4)"
        :key="boardItem.id"
        :board="boardItem"
      />
      <div style="display: flex; justify-content: center">
        <button
          style="margin: auto; padding: 2px 4px; background-color: #2fffff"
        >
          <router-link style="text-decoration: none" to="/user/board/list"
            >더보기</router-link
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.list-item {
  background-color: white;
  border-radius: 8px;
  padding: 2px 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
}

.menu {
  margin-bottom: 10px;
}
</style>
