<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import adminBoard from "./board/adminBoard.vue";

// const router = useRouter();

// const seyoon = ref([1, 2, 3]);

// function moveList() {
//   router.push({ name: "adminBoard", params: { seyoon: seyoon.value } });
// }
</script>

<template>
  <div>
    <h1>관리자 메인 페이지입니다.</h1>
    <!-- <button @click="moveList">게시글 이동</button> -->
    <div class="child-container">
      <!-- <router-view></router-view> -->
      <adminBoard my-msg="메세지" />
    </div>
  </div>
</template>

<style scoped>
.child-container {
  width: 500px;
  height: 300px;
  background-color: #ffcd00;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
