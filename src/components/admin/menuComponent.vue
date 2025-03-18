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

function goToBooth() {
  router.push({ name: "adminBooth" });
}

function goToNotice() {
  router.push({ name: "adminNotice" });
}
</script>

<template>
  <div>
    <h2>진해군항제 축제 관리자님</h2>
    <div>
      <h3 @click="goToBooth">상점 관리</h3>
    </div>
    <div>
      <p class="board-h3">게시판 관리</p>
      <ul>
        <li @click="goToLost">분실물</li>
        <li @click="goToBoard">게시판</li>
      </ul>
    </div>
    <h3 @click="goToNotice">공지사항</h3>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 50px;
}

h3 {
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  margin-bottom: 10px;
}

h3:hover {
  background-color: #f0f0f0; /* 호버 시 배경색 변화 */
  color: rgb(127, 129, 127);
}

.board-h3 {
  margin-top: 25px;
  margin-bottom: 5px;
}

li {
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}
li:hover {
  background-color: #f0f0f0; /* 호버 시 배경색 변화 */
  color: rgb(127, 129, 127);
}

p {
  font-size: 18px;
  font-weight: bold;
}
</style>
