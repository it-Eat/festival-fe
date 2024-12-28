<script setup>
import { ChevronLeft, AlignJustify } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import Hamberger from "../modal/hamberger.vue";

// props로 전달된 값을 받음
const props = defineProps({
  title: String, // 페이지 제목
  useUserName: Boolean, // 사용자 이름을 포함할지 여부
});

// Vue Router 사용
const router = useRouter();
const route = useRoute();

// 이전 페이지로 이동
const goBack = () => {
  router.back();
};

const userName = "천세윤";

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
    return route.meta.title || "기본 페이지 제목";
  }
});

const isHambergerOpen = ref(false);

const toggleMenu = () => {
  isHambergerOpen.value = !isHambergerOpen.value;
};

const closeMenu = (e) => {
  // 클릭된 영역이 메뉴 외부라면 메뉴를 닫음
  if (e.target === e.currentTarget) {
    isHambergerOpen.value = false;
  }
};
</script>

<template>
  <header class="header-container">
    <!-- 이전 페이지로 이동하는 버튼 -->
    <ChevronLeft class="left-icon" @click="goBack" />

    <!-- 페이지명은 props 또는 meta의 정보에 따라 동적으로 변경 -->
    <h1>{{ pageTitle }}</h1>

    <!-- 메뉴 아이콘 -->
    <AlignJustify class="right-icon" @click="toggleMenu" />

    <div
      :class="{ 'menu-overlay': true, open: isHambergerOpen }"
      @click="closeMenu"
    >
      <Hamberger />
    </div>
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
}

/* 오른쪽 아이콘 스타일 */
.right-icon {
  color: #ffffff;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

/* 왼쪽과 오른쪽 아이콘을 각각 배치하기 위한 설정 */
.header-container > div {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* 왼쪽 아이콘 스타일 */
.left-icon {
  margin-right: auto; /* 왼쪽 끝에 배치 */
}

/* 오른쪽 아이콘 스타일 */
.right-icon {
  margin-left: auto; /* 오른쪽 끝에 배치 */
}

.right-icon:hover,
.left-icon:hover {
  color: #bcb4b3; /* 호버 시 색상 변경 */
}

/* 메뉴 오버레이 (햄버거 메뉴가 열리면 배경을 덮음) */
.menu-overlay {
  position: fixed;
  top: 0;
  right: 0; /* 오른쪽 끝에 고정 */
  width: 50%; /* 메뉴 폭 */
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 1000; /* 햄버거 메뉴가 최상위로 오도록 */
  transform: translateX(100%); /* 초기 상태에서 오른쪽으로 밀어놓기 */
  transition: transform 0.3s ease-in-out;
}

/* 메뉴가 열리면 오른쪽에서 슬라이드로 들어옴 */
.menu-overlay.open {
  transform: translateX(0);
}

/* 햄버거 메뉴의 컨테이너 스타일 */
.hamburger-container {
  background-color: #ffffff; /* 배경색을 흰색으로 설정 */
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
