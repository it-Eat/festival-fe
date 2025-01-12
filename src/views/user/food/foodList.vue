<script setup>
import backHeader from "@/components/common/backHeader.vue";
import menuItem from "@/components/common/menuItem.vue";
import { useFoodStore } from "@/stores/food";
const foodStore = useFoodStore();
</script>

<template>
  <backHeader></backHeader>
  <div class="play-gallery">
    <menuItem v-for="food in foodStore.foodList" :key="food.id" :menu="food" />
  </div>
</template>

<style scoped>
.play-gallery {
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 5px;
  border-radius: 12px;
  justify-items: center;
  justify-content: center;
}
</style>
