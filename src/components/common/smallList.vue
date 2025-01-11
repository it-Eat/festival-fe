<script setup>
const props = defineProps({
  lost: {
    type: Object,
    required: false,
    validator: (value) => {
      if (value) {
        return ["id", "title", "contents", "date", "found"].every(
          (key) => key in value
        );
      }
      return true;
    },
  },
  board: {
    type: Object,
    required: false,
    validator: (value) => {
      if (value) {
        return ["id", "title", "contents", "date"].every((key) => key in value);
      }
      return true;
    },
  },
});

import LostChip from "@/components/common/lostChip.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToDetail = () => {
  if (props.lost) {
    router.push({
      name: "lostItemDetail",
      params: { id: props.lost.id },
    });
  } else {
    router.push({
      name: "boardDetail",
      params: { id: props.board.id },
    });
  }
};
</script>

<template>
  <div @click="goToDetail" class="item">
    <LostChip v-if="props.lost" :found="props.lost.found" />

    <div class="title">
      <strong>{{ (props.lost || props.board).title }}</strong>
    </div>
    <div class="contents">{{ (props.lost || props.board).contents }}</div>
    <div class="date">{{ (props.lost || props.board).date }}</div>
  </div>
  <hr class="divider" />
</template>

<style scoped>
.item {
  font-size: 0.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: rgb(222, 213, 213);
  border-radius: 0.25rem;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0.1875rem 0.25rem;
  width: 100%;
}

.title,
.contents,
.date {
  max-width: 9.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0.5rem;
}

.title {
  max-width: 120px;
}

.divider {
  border: 0;
  height: 1px;
  background-color: black;
}
</style>
