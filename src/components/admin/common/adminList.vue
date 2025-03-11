<script setup>
import { defineProps } from "vue";
import adminListItem from "./adminListItem.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  routeName: {
    type: String,
    default: "", // 기본값을 빈 문자열로 설정
  },
});
</script>

<template>
  <div>
    <adminListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :routeName="routeName"
    ></adminListItem>
  </div>
</template>

<style scoped></style>
