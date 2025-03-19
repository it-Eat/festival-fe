<script setup>
import SmallList from "@/components/common/smallList.vue";
import pagination from "@/components/common/pagination.vue";
import { useLostStore } from "@/stores/lost";
import backHeader from "@/components/common/backHeader.vue";
import { onMounted } from "vue";

const lostStore = useLostStore();

for (let i = 1; i < 5; i++) {
  const lostItem = lostStore.getLostById(i);
  console.log(lostItem);
}

onMounted(() => {
  lostStore.fetchItems();
});
</script>

<template>
  <div class="container">
    <div>
      <backHeader class="header" />
      <div class="menu">분실물</div>
      <hr style="border: 0; height: 1px; background-color: black" />
      <SmallList
        class="list-item"
        v-for="lostItem in lostStore.lostList"
        :key="lostItem.id"
        :lost="lostItem"
      />
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

.menu {
  margin: 10px;
  font-weight: bold; /* 글자 진하게 */
}
</style>
