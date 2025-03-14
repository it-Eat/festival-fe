<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 알림 및 메뉴 클릭 이벤트
const goToNotifications = () => {
  console.log("알림 클릭!");
};

const toggleMenu = () => {
  console.log("메뉴 클릭!");
};
</script>

<template>
  <header class="home-header">
    <!-- 알림 아이콘 -->
    <button class="icon-button" @click="goToNotifications">
      <span class="icon">🔔</span>
    </button>

    <!-- 중앙 제목 -->
    <h1 class="title">진해 군항제</h1>

    <!-- 햄버거 메뉴 아이콘 -->
    <button class="icon-button" @click="toggleMenu">
      <span class="icon">☰</span>
    </button>
  </header>
</template>

<style scoped>
/* 헤더 스타일 */
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: white;
  padding: 0 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* 아이콘 버튼 */
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
}

/* 아이콘 스타일 */
.icon {
  font-size: 24px;
  color: #ff6f61;
}

/* 제목 스타일 */
.title {
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: center;
}
</style>
