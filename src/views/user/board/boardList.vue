<script setup>
import SmallList from "@/components/common/smallList.vue";
import pagination from "@/components/common/pagination.vue";
import { useBoardStore } from "@/stores/board";
import backHeader from "@/components/common/backHeader.vue";

const boardStore = useBoardStore();
</script>

<template>
  <div>
    <div class="container">
      <div>
        <backHeader class="header" />
        <div class="menu">게시판</div>
        <hr style="border: 0; height: 1px; background-color: black" />
        <SmallList
          class="list-item"
          v-for="boardItem in boardStore.boardList"
          :key="boardItem.id"
          :board="boardItem"
        />
      </div>
    </div>
    <pagination />
  </div>
</template>

<style scoped>
.header {
  max-width: 600px;
  width: 600px;
  margin: 0 auto;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 600px;
  margin: 0 auto;
}

.list-item {
  background-color: gray;
  border-radius: 8px;
  padding: 2px 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
}

.menu {
  margin: 10px;
  font-weight: bold; /* 글자 진하게 */
}
</style>
