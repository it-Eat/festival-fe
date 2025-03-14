<script setup>
import HomeComponent from "./homeComponent.vue"; // 중괄호 제거
</script>

<template>
  <div class="container">
    <HomeComponent />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 450px; /* 최대 너비 설정 */
  height: 100vh;
  margin: 0 auto; /* 중앙 정렬 */
  padding: 5px;
}

html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
