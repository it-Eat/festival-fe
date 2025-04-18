<script setup>
const props = defineProps({
  lost: {
    type: Object,
    required: false,
    default: null,
    validator: (value) => {
      if (value) {
        return ["id", "title", "content", "createdAt", "lossType"].every(
          (key) => key in value
        );
      }
      return true;
    },
  },
  board: {
    type: Object,
    required: false,
    default: null,
    validator: (value) => {
      if (value) {
        return ["id", "title", "content", "createdAt"].every(
          (key) => key in value
        );
      }
      return true;
    },
  },
});

import LostChip from "@/components/common/lostChip.vue";
import { useRouter } from "vue-router";
// 유틸리티 함수 임포트 (경로는 실제 프로젝트에 맞게 수정)
import { dateFormatWithoutTime } from "@/util/dateFormat";

const router = useRouter();

const goToDetail = () => {
  if (props.lost) {
    router.push({
      name: "lostItemDetail",
      params: { id: props.lost.id },
    });
  } else if (props.board) {
    router.push({
      name: "boardDetail",
      params: { id: props.board.id },
    });
  }
};

const formatCreatedAt = (dateStr) => {
  if (!dateStr) return "날짜 없음";
  return dateFormatWithoutTime(dateStr);
};
</script>

<template>
  <div v-if="props.lost || props.board" @click="goToDetail" class="item">
    <LostChip
      v-if="props.lost"
      :lossType="props.lost?.lossType"
      class="lost-chip"
    />

    <div class="title" :class="{ 'board-title': props.board }">
      {{ props.lost?.title || props.board?.title || "제목 없음" }}
    </div>
    <div class="contents">
      {{ props.lost?.content || props.board?.content || "내용 없음" }}
    </div>
    <div class="date">
      {{ formatCreatedAt(props.lost?.createdAt || props.board?.createdAt) }}
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  padding: 14px 4px;
  width: 100%;
  cursor: pointer;
}

.item:hover {
  background-color: #ff6e61b0;
  color: white;
  transition: background-color 0.3s ease;
}

.title {
  font-size: 14px;
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.contents {
  font-size: 14px;
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.date {
  font-size: 14px;
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.board-title {
  margin-left: 3px;
}
</style>
