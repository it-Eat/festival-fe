<script setup>
import { defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import noImage from "@/assets/noimage.png"; // fallback 이미지 import

const route = useRoute();
const festivalId = route.params.festivalId;

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({}),
    validator(value) {
      return ["id", "image", "name", "location", "content"].every(
        (key) => key in value
      );
    },
  },
  // 카드 타입 (playing / food)
  cardType: {
    type: String,
    required: true,
    validator(value) {
      return ["playing", "food"].includes(value);
    },
  },
  // 카드 크기 (기본 normal, large 등)
  size: {
    type: String,
    default: "normal", // 다른 페이지는 기본 normal
  },
});

const router = useRouter();

const goToDetail = () => {
  const routeName =
    props.cardType === "playing" ? "playingDetail" : "foodDetail";
  router.push({
    name: routeName,
    params: { id: props.item.id },
  });
};
</script>

<template>
  <div @click="goToDetail" class="photo-card" :class="size">
    <!-- 이미지가 없으면 noImage 사용 -->
    <img :src="item.image || noImage" :alt="item.name" />
    <div class="card-name">{{ item.name }}</div>
  </div>
</template>

<style scoped>
.photo-card {
  width: 60px; /* 기본 크기 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  padding: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.2s;
}

.photo-card img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
}

.card-name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  color: #333;
  font-size: 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.photo-card:hover {
  transform: translateY(-5px);
}

/* 사이즈가 large일 때 */
.photo-card.large {
  width: 120px; /* 원하는 큰 사이즈 */
}

.photo-card.large img {
  /* 필요하다면 이미지를 좀 더 크게 */
}
.photo-card.large .card-name {
  font-size: 14px; /* 텍스트도 좀 더 크게 */
}
</style>
