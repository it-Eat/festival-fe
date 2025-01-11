<script setup>
defineProps({
  food: Object,
});
</script>

<template>
  <div class="photo-card">
    <img :src="food.img" :alt="food.name" />
    <p>{{ food.name }}</p>
  </div>
</template>

<style scoped>
.photo-card {
  width: 150px;
  text-align: center;
  background-color: #fff;
  padding: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.2s;
}

.photo-card img {
  width: 80px;
  height: 80px;
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
