<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
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
    <div class="card-name">{{ item.name }}</div>
  </div>
</template>

<style scoped>
.photo-card {
  width: 60px;
  height: 90%;
  display: flex;
  flex-direction: column;
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
