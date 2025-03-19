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
  justify-content: flex-start; /* 상단 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 100%;
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
}


html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
