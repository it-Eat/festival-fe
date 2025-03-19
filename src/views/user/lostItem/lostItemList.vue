<script setup>
import SmallList from "@/components/common/smallList.vue";
import pagination from "@/components/common/pagination.vue";
import { useLostStore } from "@/stores/lost";
import backHeader from "@/components/common/backHeader.vue";
import { onMounted, computed } from "vue";

const lostStore = useLostStore();

onMounted(() => {
  lostStore.fetchItems();
});

const allLosts = computed(() =>
  Array.isArray(lostStore.losts) ? [...lostStore.losts] : []
);
</script>

<template>
  <div class="container">
    <backHeader class="header" title="분실물 목록" />
    <div class="menu">분실물</div>
    <hr
      class="divider"
      style="border: 0; height: 1px; background-color: black"
    />
    <div class="list-wrapper">
      <SmallList
        class="list-item"
        v-for="lostItem in allLosts"
        :key="lostItem.id"
        :lost="lostItem"
        :board="boardItem"
      />
    </div>
    <div class="button-wrapper">
      <RouterLink to="/user/lostItem/write">
        <button class="write-button">분실물 작성하기</button>
      </RouterLink>
    </div>
    <pagination />
  </div>
</template>

<style scoped>
.header {
  max-width: 600px; /* Adjusted for responsive design */
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
  margin: 10px;
  font-weight: bold; /* 글자 진하게 */
}
</style>
