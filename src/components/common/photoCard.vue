<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({}),
    validator(value) {
      return ["id", "img", "name", "position", "description"].every(
        (key) => key in value
      );
    },
  },
  // 카드 타입을 구분하기 위한 prop 추가
  cardType: {
    type: String,
    required: true,
    validator(value) {
      return ["playing", "food"].includes(value);
    },
  },
});

console.log("Received props:", props.item, props.cardType);

const router = useRouter();

const goToDetail = () => {
  // cardType에 따라 라우팅 대상을 분기처리
  const routeName =
    props.cardType === "playing" ? "playingDetail" : "foodDetail";

  router.push({
    name: routeName,
    params: { id: props.item.id },
  });
};
</script>

<template>
  <div @click="goToDetail" class="photo-card">
    <img :src="item.img" :alt="item.name" />
    <div class="card-name">{{ item.name }}</div>
  </div>
</template>

<style scoped>
.photo-card {
  width: 60px;
  height: 90%;
  display: flex;
  flex-direction: column;
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

.photo-card div {
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
</style>
