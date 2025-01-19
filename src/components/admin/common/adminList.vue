<script setup>
import { defineProps } from "vue";
import adminListItem from "./adminListItem.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <adminListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
    ></adminListItem>
  </div>
</template>

<style scoped></style>
