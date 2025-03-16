<script setup>
// 공통페이지
import { useRouter } from "vue-router";
const router = useRouter();

import { ref } from "vue";

const festivalItems = ref(
  Array(9)
    .fill()
    .map((_, index) => ({
      name: `축제 이름 ${index + 1}`,
      date: "2025.03.16 ~ 2025.03.17",
      location: `축제 장소 ${index + 1}`,
    }))
);
</script>

<template>
  <div class="mainpage">
    <!-- <div class="header"></div> -->
    <div class="body">
      <div class="body-header">
        <input
          class="body-header-input"
          type="text"
          placeholder="검색어를 입력해주세요."
        />
        <button class="body-header-button">검색</button>
      </div>
      <div class="body-content">
        <div
          class="body-content-item"
          v-for="item in festivalItems"
          :key="item.id"
        >
          <img
            class="body-content-item-img"
            src="@/assets/naver_logo.png"
            alt="logo"
          />
          <p>{{ item.name }}</p>
          <p>{{ item.date }}</p>
          <p>{{ item.location }}</p>
        </div>
      </div>
    </div>
    <h1>공통 페이지 입니다.</h1>
    <RouterLink to="/adminLogin" class="router-link">관리자로그인</RouterLink
    ><br />
    <RouterLink to="/user" class="router-link">사용자</RouterLink><br />
  </div>
</template>

<style scoped>
.mainpage {
  display: flex;
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.body {
  display: flex;
  max-width: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.body-header {
  display: flex;
  width: 100%;
  gap: 10px;
}
.body-header-input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.body-header-button {
  width: 100px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.body-content {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.body-content-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 33%;
}
.body-content-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.body-content-item p {
  margin: 0;
  font-size: 12px;
  color: #666;
}
</style>
