<script setup>
const props = defineProps({
  item: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div v-if="item"></div>
</template>

<style scoped></style>
