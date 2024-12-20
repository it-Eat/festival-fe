<script setup>
import HomeMenu from "@/components/home/homeMenu.vue";
import homeHeader from "@/components/home/homeHeader.vue";
import backHeader from "@/components/common/backHeader.vue";
</script>

<template>
  <div class="home">
    <div class="head">
      <homeHeader />
    </div>

    <div class="logo-image">로고이미지부분</div>

    <div class="menu-bar">
      <HomeMenu />
    </div>

    <div class="content-area">
      <router-view />
    </div>
  </div>

  <div class="other"></div>
</template>

<style scoped>
.home {
  background-color: #dcdbdb;
  padding: 10px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 100%;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 90%;
  }
}

.head {
  height: 30px;
  background-color: #ff6f61;
  width: 100%;
  text-align: center;
  padding: 10px;
  margin-top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-image {
  height: 180px;
  background-color: #6b5b95;
  width: 100%;
  text-align: center;
  padding: 10px;
}

.menu-bar {
  height: 50px;
  width: 100%;
  text-align: center;
  padding: 10px;
}

.content-area {
  background-color: #ffcd00;
  width: 100%;
  height: 287px;
  text-align: center;
  padding: 10px;
  overflow: auto;
  box-sizing: border-box;
}
</style>
