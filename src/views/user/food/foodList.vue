<script setup>
import backHeader from "@/components/common/backHeader.vue";
import photoCard from "@/components/common/photoCard.vue";
import { ref } from "vue";

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

  { foodNum: 7, img: charryice, name: "벚꽃아이스" },
  { foodNum: 8, img: chicken, name: "닭꼬치" },
  { foodNum: 9, img: crepe, name: "크레페" },
  { foodNum: 10, img: fishcake, name: "오뎅" },
  { foodNum: 11, img: leegane, name: "이가네" },
  { foodNum: 12, img: sausage, name: "소세지" },
]);
</script>

<template>
  <backHeader></backHeader>
  <div class="play-gallery">
    <photoCard
      v-for="food in foodList"
      :key="food.foodNum"
      :item="food"
    ></photoCard>
  </div>
</template>

<style scoped>
.play-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 5px;
  border-radius: 12px;
  justify-items: center;
  justify-content: center;
}
</style>
