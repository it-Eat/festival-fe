<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
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
  <div class="list-item" @click="goToDetail" style="cursor: pointer">
    <!-- 공통 항목 -->
    <div style="margin-left: 80px; width: 100px">{{ item.userName }}</div>
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
