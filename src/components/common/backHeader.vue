<script setup>
import { ChevronLeft } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';

// Vue Router 사용
const router = useRouter();
const route = useRoute();

// 이전 페이지로 이동
const goBack = () => {
  router.back();
};
</script>

<template>
  <header class="header-container">
    <!-- 이전 페이지로 이동하는 버튼 -->
    <ChevronLeft class="left-icon" @click="goBack" />

    <!-- 페이지명은 현재 라우트의 meta.title 또는 props에서 가져옵니다 -->
    <h1>{{ route.meta.title || '페이지명' }}</h1>

    <!-- 메뉴 아이콘 -->
    <AlignJustify class="right-icon" />
  </header>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px; /* 헤더 높이 */
  background-color: #ff6f61; /* 밝은 배경색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 하단 그림자 */
  padding: 0 16px; /* 좌우 여백 */
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
}

/* 페이지명 스타일 */
.header-container h1 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff; /* 진한 글자 색상 */
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 왼쪽 아이콘 스타일 */
.left-icon,
.right-icon {
  color: #ffffff;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease; /* 부드러운 색상 전환 */
}

.left-icon:hover,
.right-icon:hover {
  color: #bcb4b3; /* 호버 시 색상 변경 */
}
</style>
