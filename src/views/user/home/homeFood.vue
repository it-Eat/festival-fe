<script setup>
import { useRouter } from "vue-router";
import photoCard from "@/components/common/photoCard.vue";
import { useFoodStore } from "@/stores/food";
import { onMounted, computed, ref } from "vue";
import loadingComponent from "@/components/common/loadingComponent.vue";

const isLoading = ref(false);

const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;

const foodStore = useFoodStore();

onMounted(() => {
  isLoading.value = true;
  foodStore.fetchItems(festivalId);
  isLoading.value = false;
});

const allFoods = computed(() => [...foodStore.foods]);

const goToFoodList = () => {
  router.push(`/${festivalId}/food/FoodList`);
};
</script>

<template>
  <loadingComponent v-if="isLoading" />
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
  gap: 32px;
  width: 100%;
  max-width: 500px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  justify-items: center;
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
  margin-top: 32px;
  transition: background 0.3s;
}

.more-button:hover {
  background-color: #e65a50;
}
</style>
