<script setup>
import { useRouter } from "vue-router";
import photoCard from "@/components/common/photoCard.vue";
import { useFoodStore } from "@/stores/food";
import { onMounted, computed } from "vue";

const router = useRouter();

const foodStore = useFoodStore();

onMounted(() => {
  foodStore.fetchItems();
});

const allFoods = computed(() => [...foodStore.foods]);

const goToFoodList = () => {
  router.push("/user/food/FoodList");
};
</script>

<template>
  <div class="home-food">
    <div class="food-list">
      <photoCard
        v-for="food in allFoods.slice(0, 6)"
        :key="food.id"
        :item="food"
        card-type="food"
        size="large"
      />
    </div>

    <button class="more-button" @click="goToFoodList">먹거리 보러가기</button>
  </div>
</template>

<style scoped>
/* 홈 푸드 컨테이너 */
.home-food {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  overflow-x: hidden;
}

.food-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: minmax(120px, auto);
  gap: 16px;
  width: 100%;
  max-width: 450px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.photoCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

/* 먹거리 목록 스타일 (3행 2열) */
.food-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 구성 */
  grid-auto-rows: minmax(120px, auto); /* 행 크기 자동 조정 */
  gap: 16px; /* 여백 증가 */
  width: 100%;
  max-width: 500px; /* 부모 요소와 일치 */
  padding: 10px;
  justify-content: space-between; /* 카드 간격 균등 배분 */
  justify-items: center;
}

.more-button {
  background-color: #ff6f61;
  color: white;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  width: 180px;
  max-width: 200px;
  margin-top: 20px;
  transition: background 0.3s;
}

.more-button:hover {
  background-color: #e65a50;
}
</style>
