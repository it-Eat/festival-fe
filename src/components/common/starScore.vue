<template>
  <div class="star-rating">
    <span
      v-for="n in props.maxRating"
      :key="n"
      class="star"
      :class="{ active: n <= props.rating }"
      @click="setRating(n)"
    >
      ★
    </span>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  maxRating: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:rating"]);

const setRating = (newRating) => {
  emit("update:rating", newRating);
};
</script>

<style scoped>
.star-rating {
  display: flex;
  justify-content: center; /* 별 중앙 정렬 */
  margin-bottom: 20px; /* 하단 여백 추가 */
}

.star {
  font-size: 3em; /* 별 크기 조절 */
  color: gray;
  cursor: pointer;
  margin: 0 10px; /* 좌우 간격 조절 */
  transition: transform 0.2s; /* 클릭 시 애니메이션 효과 추가 */
}

.star:hover {
  transform: scale(1.2); /* 마우스 오버시 확대 효과 */
}

.star.active {
  color: gold;
}
</style>
