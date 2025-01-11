<script setup>
import HomeMenu from "@/components/home/homeMenu.vue";
import homeHeader from "@/components/home/homeHeader.vue";
</script>

<template>
  <div class="home">
    <homeHeader class="head" />
    <div class="logo-image">로고이미지부분</div>
    <HomeMenu class="menu-button" />
    <router-view class="content-area" />
  </div>
</template>

<style scope>
.logo-image {
  background-color: #6b5b95;
}

.head {
  background-color: #ff6f61;
}

.menu-bar {
  flex: 0.5;
  width: 100%;
  text-align: center;
  padding: 10px;
  
.content-area {
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
  border-radius: 12px;
  justify-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.menu-button {
  background-color: #f5985e;
}
</style>
