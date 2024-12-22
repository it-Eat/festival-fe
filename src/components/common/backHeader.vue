<script setup>
import { ChevronLeft } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

// props로 전달된 값을 받음
const props = defineProps({
  title: String, // 페이지 제목
  useUserName: Boolean // 사용자 이름을 포함할지 여부
});

// Vue Router 사용
const router = useRouter();
const route = useRoute();

// 이전 페이지로 이동
const goBack = () => {
  router.back();
};

const userName = '천세윤';

// 페이지 제목 계산
const pageTitle = computed(() => {
  // props가 있으면 props 값 사용, 없으면 라우트의 meta 정보를 사용
  if (props.title) {
    // props.title과 props.useUserName을 기준으로 페이지 제목 설정
    if (props.useUserName) {
      return `${userName}님의 ${props.title}`;
    }
    return props.title;
  } else {
    // props가 없으면 meta.title과 meta.useUserName을 기준으로 제목 설정
    if (route.meta.title && route.meta.useUserName) {
      return `${userName}님의 ${route.meta.title}`;
    }
    return route.meta.title || '기본 페이지 제목';
  }
});
</script>

<template>
  <header class="header-container">
    <!-- 이전 페이지로 이동하는 버튼 -->
    <ChevronLeft class="left-icon" @click="goBack" />

    <!-- 페이지명은 props 또는 meta의 정보에 따라 동적으로 변경 -->
    <h1>{{ pageTitle }}</h1>

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
  height: 50px; /* 헤더 높이 */
  background-color: #ff6f61; /* 밝은 배경색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 하단 그림자 */
  padding: 0 16px; /* 좌우 여백 */
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  margin: 0;
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
  text-align: center; /* 중앙 정렬 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 왼쪽 아이콘 스타일 */
.left-icon {
  color: #ffffff;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease; /* 부드러운 색상 전환 */
  position: absolute;
  left: 16px; /* 왼쪽 여백 */
  top: 50%;
  transform: translateY(-50%);
}

.left-icon:hover {
  color: #bcb4b3; /* 호버 시 색상 변경 */
}

/* 오른쪽 아이콘 스타일 */
.right-icon {
  color: #ffffff;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.right-icon:hover {
  color: #bcb4b3; /* 호버 시 색상 변경 */
}
</style>
