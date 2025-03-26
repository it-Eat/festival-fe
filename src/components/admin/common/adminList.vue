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
    default: "",
  },
});
</script>

<template>
  <tbody class="admin-list">
    <adminListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :routeName="routeName"
    ></adminListItem>
  </tbody>
</template>

<style scoped>
.admin-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
