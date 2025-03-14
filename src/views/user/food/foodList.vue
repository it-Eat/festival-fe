<script setup>
import backHeader from "@/components/common/backHeader.vue";
import { useFoodStore } from "@/stores/food";
const foodStore = useFoodStore();
</script>

<template>
  <backHeader :category="foodList"></backHeader>
  <div class="play-gallery">
    <div v-for="food in foodStore.foodList" :key="food.id" class="menu-item">
      <div class="menu-text">
        <strong>{{ food.name }}</strong>
        <p>위치: {{ food.location }}</p>
        <p>별점: {{ food.rating }}</p>
      </div>
      <img :src="food.image" alt="food" class="menu-image" />
    </div>
  </div>
</template>

<style scoped>
.play-gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  justify-items: center;
}

/* 개별 메뉴 아이템 스타일 */
.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 350px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  padding: 10px;
  background: white;
  transition: 0.3s;
}

.menu-item:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* 음식 정보 스타일 */
.menu-text {
  flex-grow: 1;
  font-size: 14px;
  padding-left: 10px;
}

/* 음식 이미지 스타일 */
.menu-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}
</style>
