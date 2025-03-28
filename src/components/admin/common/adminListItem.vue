<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { dateFormatWithoutTime } from "../../../util/dateFormat.js";

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
  <tr class="list-item" @click="goToDetail">
    <!-- 공통 항목 -->
    <td style="flex: 1">{{ item.userName }}</td>
    <!-- LOSS 타입일 경우에만 표시할 항목 -->
    <td style="flex: 1" v-if="item.boardType === 'LOSS'">
      <div>{{ item.lossType === "LOSS" ? "분실" : "습득" }}</div>
    </td>
    <td style="flex: 2">
      {{
        item.title.length > 12 ? item.title.slice(0, 10) + "..." : item.title
      }}
    </td>
    <td style="flex: 3">
      {{
        item.content.length > 12
          ? item.content.slice(0, 16) + "..."
          : item.content
      }}
    </td>
    <td style="flex: 2">
      {{ dateFormatWithoutTime(item.createdAt) }}
    </td>
  </tr>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: space-between;
  width: 100%;
}

.list-item td {
  padding: 17px 12px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.list-item:hover {
  background-color: #fff5f4;
  cursor: pointer;
}
</style>
