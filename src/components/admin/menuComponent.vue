<script setup>
// 관리자 메뉴 부분

import { useRouter } from "vue-router";

const router = useRouter();

function goToBoard() {
  router.push({ name: "adminBoard" });
}

function goToLost() {
  router.push({ name: "adminLost" });
}
</script>

<template>
  <div>
    <h2>진해군항제 축제 관리자님</h2>
    <h3 @click="goToBoard">게시판 관리</h3>
    <h3 @click="goToLost">분실물 관리</h3>
  </div>
</template>

<style scoped>
h3 {
  cursor: pointer; /* 클릭 가능하게 표시 */
  padding: 10px;
  transition: background-color 0.3s;
}

h3:hover {
  background-color: #f0f0f0; /* 호버 시 배경색 변화 */
}
</style>
