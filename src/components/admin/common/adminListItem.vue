<script setup>
import { defineProps } from "vue";

defineProps({ item: Object });
</script>

<template>
  <div class="list-item">
    <!-- 공통 항목 -->
    <div style="margin-left: 80px; width: 100px">{{ item.userId }}</div>
    <!-- LOSS 타입일 경우에만 표시할 항목 -->
    <div style="width: 100px" v-if="item.boardType === 'LOSS'">
      <div>{{ item.lossType === "LOSS" ? "분실" : "습득" }}</div>
    </div>
    <div style="width: 300px">{{ item.title }}</div>
    <div style="width: 400px">{{ item.content }}</div>
    <div style="width: 250px">
      {{ new Date(item.createdAt).toLocaleString() }}
    </div>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.list-item > div {
  margin-right: 1rem; /* 각 요소 간 간격을 위해 추가 */
}
</style>
