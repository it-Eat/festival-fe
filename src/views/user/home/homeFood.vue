<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import photoCard from "@/components/common/photoCard.vue";
import charryice from "@/assets/food/charryice.jpg";
import chicken from "@/assets/food/chicken.jpg";
import crepe from "@/assets/food/crepe.jpg";
import fishcake from "@/assets/food/fishcake.jpg";
import leegane from "@/assets/food/leegane.jpg";
import sausage from "@/assets/food/sausage.jpg";

const foodList = ref([
  {
    id: 1,
    img: charryice,
    name: "벚꽃아이스",
    position: "1구역",
    description:
      "봄을 맞아 피어난 벚꽃을 테마로 한 달콤하고 시원한 아이스 디저트입니다. 부드러운 질감과 상큼한 맛이 특징입니다.",
  },
  {
    id: 2,
    img: chicken,
    name: "닭꼬치",
    position: "1구역",
    description:
      "신선한 닭고기를 사용하여 구운 꼬치 요리로, 간장 소스와 함께 제공되어 풍미가 가득합니다. 간편하게 즐길 수 있는 인기 간식입니다.",
  },
  {
    id: 3,
    img: crepe,
    name: "크레페",
    position: "1구역",
    description:
      "얇고 부드러운 팬케이크로, 다양한 속재료를 넣어 만든 디저트입니다. 과일, 아이스크림, 초콜릿 소스 등으로 다양하게 변형 가능합니다.",
  },
  {
    id: 4,
    img: fishcake,
    name: "오뎅",
    position: "1구역",
    description:
      "일본식 어묵으로, 다양한 재료가 들어간 국물과 함께 제공됩니다. 따뜻한 국물 속에서 쫄깃한 식감을 즐길 수 있습니다.",
  },
  {
    id: 5,
    img: leegane,
    name: "이가네",
    position: "1구역",
    description:
      "전통적인 한국식 간식으로, 고소한 맛의 재료가 가득한 떡입니다. 간편하게 먹을 수 있어 남녀노소에게 사랑받고 있습니다.",
  },
  {
    id: 6,
    img: sausage,
    name: "소세지",
    position: "1구역",
    description:
      "부드럽고 풍미가 가득한 소시지로, 다양한 조리법으로 즐길 수 있습니다. 바삭하게 구워서 간편한 간식으로 제격입니다.",
  },
]);

const router = useRouter();

const goToFoodList = () => {
  router.push("/user/food/FoodList");
};
</script>

<template>
  <div>
    <photoCard
      v-for="food in foodList"
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
