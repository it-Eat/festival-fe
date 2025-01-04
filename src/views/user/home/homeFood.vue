<script setup>
import { useRouter } from "vue-router";
import photoCard from "@/components/common/photoCard.vue";

import { useFoodStore } from "@/stores/food";

const foodStore = useFoodStore();

// for (let i = 1; i < 5; i++) {
//   const foodItem = foodStore.getFoodById(i);
//   console.log(foodItem);
// }

const router = useRouter();

const goToFoodList = () => {
  router.push("/user/food/FoodList");
};
</script>

<template>
  <div>
    <photoCard
      v-for="food in foodStore.foodList.slice(0, 6)"
      :key="food.id"
      :item="food"
      card-type="food"
    ></photoCard>
    <button class="button1" @click="goToFoodList">더보기</button>
  </div>
</template>

<style scoped>
.button1 {
  grid-column: 1 / -1; /* 버튼이 전체 너비를 차지하도록 */
  justify-self: center;
}
</style>
