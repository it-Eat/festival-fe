<script setup>
import { defineProps } from "vue";
import adminListItem from "./adminListItem.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <!-- <adminListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
    ></adminListItem> -->
  </div>
</template>

<style scoped></style>
