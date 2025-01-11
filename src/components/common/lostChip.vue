<script setup>
const props = defineProps({
  found: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <!-- lostChip -->
  <div class="status">
    <div class="a" v-if="props.found">습득</div>
    <div class="b" v-else>분실</div>
  </div>
</template>
<style scoped>
.status {
  display: flex; /* flexbox로 설정하여 가로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  font-size: 10px;
  white-space: nowrap; /* 한 줄로 표시 */
}
.a {
  background-color: hsl(191, 56%, 78%);
  margin: 0px 2px; /* 좌우 마진 설정 */
  border-radius: 50%;
  padding: 3px 5px;
}

.b {
  background-color: hsl(18, 58%, 67%);
  margin: 0px 2px; /* 좌우 마진 설정 */
  border-radius: 50%;
  padding: 3px 5px;
}
</style>
