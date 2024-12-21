<script setup>
import { ref } from "vue";
import photoCard from "@/components/common/photoCard.vue";
import charryice from "@/assets/food/charryice.jpg";
import chicken from "@/assets/food/chicken.jpg";
import crepe from "@/assets/food/crepe.jpg";
import fishcake from "@/assets/food/fishcake.jpg";
import leegane from "@/assets/food/leegane.jpg";
import sausage from "@/assets/food/sausage.jpg";

const foodList = ref([
  { foodNum: 1, img: charryice, name: "벚꽃아이스" },
  { foodNum: 2, img: chicken, name: "닭꼬치" },
  { foodNum: 3, img: crepe, name: "크레페" },
  { foodNum: 4, img: fishcake, name: "오뎅" },
  { foodNum: 5, img: leegane, name: "이가네" },
  { foodNum: 6, img: sausage, name: "소세지" },
]);
</script>

<template>
  <div>
    <photoCard
      v-for="food in foodList"
      :key="food.foodNum"
      :item="food"
    ></photoCard>
    <button class="button1">자세히보기</button>
  </div>
</template>

<style scoped>
.button1 {
  grid-column: 1 / -1; /* 버튼이 전체 너비를 차지하도록 */
  justify-self: center;
}
</style>
