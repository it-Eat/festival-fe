<script setup>
import { defineProps } from "vue";
import { useRouter /*, useRoute*/ } from "vue-router";
import noImage from "@/assets/noimage.png"; // fallback 이미지 import

// const route = useRoute();
// const festivalId = route.params.festivalId;

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
  width: 150px; /* 기본 크기 */
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
  gap: 12px;
  cursor: pointer;
}

.photo-card img {
  width: 130px;
  aspect-ratio: 1 / 1;
  object-fit: filled;
  border-radius: 8px;
}

.card-name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #000000;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.photo-card:hover {
  transform: translateY(-5px);
}
</style>
