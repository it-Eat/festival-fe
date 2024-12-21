<script setup>
const props = defineProps({
  lost: {
    type: Object,
  },
  board: {
    type: Object,
  },
});

import LostChip from "@/components/common/lostChip.vue";
</script>

<template>
  <div class="item">
    <div v-if="lost">
      <LostChip :item="lost.found" />
    </div>
    <span class="title">{{ props.lost.title }}</span>
    <span class="contents">{{ props.lost.contents }}</span>
    <span class="date">{{ props.lost.date }}</span>
  </div>
</template>

<style scoped>
.item {
  font-size: 10px;
  display: flex; /* flexbox로 설정하여 내용을 수평으로 정렬 */
  align-items: center; /* 수직 정렬 */
  text-align: center;
  background-color: white; /* 배경색 흰색 */
  border-radius: 8px; /* 경계 radius */
  padding: 4px 0; /* 패딩 추가 */
  overflow: hidden; /* 넘치는 내용 숨김 처리 */
  box-sizing: border-box; /* 패딩과 마진이 전체 너비에 포함되도록 설정 */
}

.title,
.contents,
.date {
  max-width: 150px; /* 최대 너비 설정 - 필요에 따라 조정 */
  overflow: hidden; /* 넘치는 내용 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용 '...'으로 처리 */
  white-space: nowrap; /* 한 줄로 표시 */
  margin-left: 8px; /* 각 span 사이에 간격 추가 */
}

.b {
  background-color: hsl(191, 56%, 78%);
  padding: 2px;
  margin: 0 3px; /* 좌우 마진 추가하여 간격 조정 */
  white-space: nowrap; /* '습득'이 한 줄로 표시되도록 설정 */
}
</style>
