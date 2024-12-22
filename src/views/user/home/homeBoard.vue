<script setup>
import SmallList from "@/components/common/smallList.vue";

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
const listItemList = ref([
  {
    id: 1,
    name: "phone5",
    img: phone1,
    title: "아이폰 15프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 11프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: true,
  },
  {
    id: 2,
    name: "phone6",
    img: phone1,
    title: "아이폰 16프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 12프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: false,
  },
  {
    id: 3,
    name: "phone7",
    img: phone1,
    title: "아이폰 17프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 13프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: true,
  },
  {
    id: 4,
    name: "phone8",
    img: phone1,
    title: "아이폰 18프로 맥스 찾아요",
    contents: "XX 구역에서 아이폰 14프로 맥스 보신분 계신가요?",
    date: "2024.11.01",
    found: true,
  },
]);
</script>

<template>
  <div class="container">
    <div>
      <div class="menu">분실물</div>
      <hr style="border: 0; height: 1px; background-color: black" />
      <SmallList
        class="list-item"
        v-for="lostitem in lostItemList"
        :key="lostitem.id"
        :lost="lostitem"
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
        v-for="listitem in listItemList"
        :key="listitem.id"
        :board="listitem"
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
