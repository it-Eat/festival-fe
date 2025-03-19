<script setup>
import SmallList from "@/components/common/smallList.vue";
import pagination from "@/components/common/pagination.vue";
import { useBoardStore } from "@/stores/board";
import { onMounted, computed } from "vue";
import backHeader from "@/components/common/backHeader.vue";

const boardStore = useBoardStore();

onMounted(() => {
  boardStore.fetchItems();
});

const allBoards = computed(() =>
  Array.isArray(boardStore.boards) ? [...boardStore.boards] : []
);
</script>

<template>
  <div class="container">
    <backHeader title="게시판 목록" />
    <div class="menu">게시판</div>
    <hr class="divider" />
    <div class="list-wrapper">
      <SmallList
        class="list-item"
        v-for="boardItem in allBoards"
        :key="boardItem.id"
        :board="boardItem"
      />
    </div>
    <div class="button-wrapper">
      <RouterLink to="/user/board/write">
        <button class="write-button">게시글 작성하기</button>
      </RouterLink>
    </div>
    <pagination />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.write-button {
  padding: 10px 20px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.menu {
  font-size: 18px;
  font-weight: bold;
  margin: 15px auto;
}

.divider {
  border: 0;
  height: 1px;
  background-color: black;
  margin-bottom: 10px;
}
</style>
