<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { dateFormatWithoutTime } from "@/util/dateFormat";
const props = defineProps({
  item: Object,
  routeName: {
    type: String,
    default: "",
  },
});

const router = useRouter();

const goToDetail = () => {
  if (!props.routeName) return;

  if (props.routeName === "adminLostDetail") {
    // adminLostDetail로 이동할 때만 데이터를 함께 넘김
    router.push({
      name: props.routeName,
      params: { boardId: props.item.id, festivalId: props.item.festivalId },
      state: { item: JSON.stringify(props.item) }, // 데이터를 state로 전달
    });
  } else {
    // 일반적인 페이지 이동 (state 없이 params만 전달)
    router.push({
      name: props.routeName,
      params: { boardId: props.item.id, festivalId: props.item.festivalId },
    });
  }
};
</script>

<template>
  <div class="list-item" @click="goToDetail">
    <div class="item-cell user-name">
      <div class="text-wrapper">{{ item.userName }}</div>
    </div>
    <div class="item-cell loss-type" v-if="item.boardType === 'LOSS'">
      <div class="text-wrapper">
        {{ item.lossType === "LOSS" ? "분실" : "습득" }}
      </div>
    </div>
    <div class="item-cell title">
      <div class="text-wrapper">{{ item.title }}</div>
    </div>
    <div class="item-cell content">
      <div class="text-wrapper">{{ item.content }}</div>
    </div>
    <div class="item-cell date">
      <div class="text-wrapper">
        {{ dateFormatWithoutTime(item.createdAt) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.list-item:hover {
  background-color: #fff5f4;
  cursor: pointer;
}

.item-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.user-name {
  width: 20%;
}

.loss-type {
  width: 25%;
}

.title {
  width: 25%;
}

.content {
  width: 35%;
}

.date {
  width: 20%;
}

/* 텍스트 래퍼에 말줄임표 스타일 적용 */
.text-wrapper {
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
