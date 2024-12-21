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
  <div class="item" v-if="props.lost">
    <LostChip v-if="props.lost" :found="props.lost.found" />
    <span class="title-lost"
      ><strong>{{ props.lost.title }}</strong></span
    >
    <span class="contents-lost">{{ props.lost.contents }}</span>
    <span class="date-lost">{{ props.lost.date }}</span>
  </div>

  <div class="item" v-else>
    <span class="title-board"
      ><strong>{{ props.board.title }}</strong></span
    >
    <span class="contents-board">{{ props.board.contents }}</span>
    <span class="date-board">{{ props.board.date }}</span>
  </div>
  <hr style="border: 0; height: 1px; background-color: black" />
</template>

<style scoped>
.item {
  font-size: 10px;
  display: flex; /* flexbox로 설정하여 내용을 수평으로 정렬 */
  align-items: center; /* 수직 정렬 */
  text-align: center;
  background-color: white; /* 배경색 흰색 */
  border-radius: 8px; /* 경계 radius */
  overflow: hidden; /* 넘치는 내용 숨김 처리 */
  box-sizing: border-box; /* 패딩과 마진이 전체 너비에 포함되도록 설정 */
}

.title-lost,
.contents-lost,
.date-lost {
  max-width: 120px; /* 최대 너비 설정 - 필요에 따라 조정 */
  overflow: hidden; /* 넘치는 내용 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용 '...'으로 처리 */
  white-space: nowrap; /* 한 줄로 표시 */
  margin-left: 8px; /* 각 span 사이에 간격 추가 */
}

.title-board,
.contents-board,
.date-board {
  max-width: 150px; /* 최대 너비 설정 - 필요에 따라 조정 */
  overflow: hidden; /* 넘치는 내용 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용 '...'으로 처리 */
  white-space: nowrap; /* 한 줄로 표시 */
  margin-left: 8px; /* 각 span 사이에 간격 추가 */
}
</style>
