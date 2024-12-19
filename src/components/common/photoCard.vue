<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  item: {
    type: Number,
    required: true,
  },
});

const router = useRouter();

const goToDetail = () => {
  router.push({
    name: "playingDetail",
    params: { playNum: props.item.playNum },
  });
};
</script>

<template>
  <div @click="goToDetail" class="photo-card">
    <img :src="item.img" :alt="item.name" />
    <p>{{ item.name }}</p>
  </div>
</template>

<style scoped>
.photo-card {
  width: 100%;
  /* flex-basis 계산 제거 */
  text-align: center;
  background-color: #fff;
  padding: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.2s;
}

.photo-card img {
  width: 100%; /* 그리드 셀 내에서 반응형 이미지 */
  aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
  object-fit: cover;
  border-radius: 8px;
}

.photo-card p {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}

.photo-card:hover {
  transform: translateY(-5px);
}
</style>
