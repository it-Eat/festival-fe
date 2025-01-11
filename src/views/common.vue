<script setup>
// 공통페이지
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div>
    <h1>공통 페이지 입니다.</h1>
    <RouterLink to="/adminLogin" class="router-link">관리자로그인</RouterLink
    ><br />
    <RouterLink to="/user" class="router-link">사용자</RouterLink><br />
  </div>
</template>

<style scoped></style>
