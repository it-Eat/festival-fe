<script setup>
import ListItem from "@/components/common/listItem.vue";
import { ref } from "vue";

import phone1 from "@/assets/lost/phone1.jpeg";

const lostItemList = ref([
  {
    id: 1,
    name: "phone1",
    img: phone1,
    title: "아이폰 11프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 11프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: true,
  },
  {
    id: 2,
    name: "phone2",
    img: phone1,
    title: "아이폰 12프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 12프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: false,
  },
  {
    id: 3,
    name: "phone3",
    img: phone1,
    title: "아이폰 13프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 13프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: true,
  },
  {
    id: 4,
    name: "phone4",
    img: phone1,
    title: "아이폰 14프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 14프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: true,
  },
]);
</script>

<template>
  <div class="container">
    <div style="margin: 10px">게시판</div>
    <div class="list-item">
      <div>분실물</div>
      <ListItem
        v-for="lostitem in lostItemList"
        :key="lostitem.id"
        :lost="lostitem"
      />
    </div>
    <div class="list-item">
      <div>게시판</div>
      <ListItem
        v-for="lostitem in lostItemList"
        :key="lostitem.id"
        :board="lostitem"
      />
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

.lost-item {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.lost-item .lost-chip {
  margin-bottom: 8px;
}
</style>
