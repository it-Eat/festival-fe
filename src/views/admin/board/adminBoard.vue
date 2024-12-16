<script setup>
defineProps({
  myMsg: String,
});
</script>

<template>
  <div>
    <h1>관리자 보드</h1>
    {{ myMsg }}
  </div>
</template>

<style scoped></style>
