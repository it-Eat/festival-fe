<script setup>
import { ChevronLeft, AlignJustify, ShoppingCart } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import Hamberger from "../modal/hamberger.vue";

const props = defineProps({
  title: String,
  useUserName: Boolean,
  category: String,
  cartCount: Number, // cartCount prop 추가
});

const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.back();
};

const userName = "천세윤";

const pageTitle = computed(() => {
  if (props.title) {
    if (props.useUserName) {
      return `${userName}님의 ${props.title}`;
    }
    return props.title;
  } else {
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

const goShoppingList = () => {
  router.push("/user/food/foodCart");
};

const closeMenu = (e) => {
  if (e.target === e.currentTarget) {
    isHambergerOpen.value = false;
  }
};
</script>

<template>
  <header class="header-container">
    <ChevronLeft class="left-icon" @click="goBack" />
    <h1>{{ pageTitle }}</h1>
    <ShoppingCart v-if="props.category === 'foodDetail'" class="right-icon" @click="goShoppingList">
      <span v-if="props.cartCount > 0" class="cart-badge">{{ props.cartCount }}</span>
    </ShoppingCart>
    <AlignJustify v-else class="right-icon" @click="toggleMenu" />
    <div v-if="props.category !== 'foodDetail'" :class="{ 'menu-overlay': true, open: isHambergerOpen }" @click="closeMenu">
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
.cart-badge {
    background-color: red;
    color: white;
    padding: 2px 5px;
    border-radius: 50%;
    font-size: 12px;
    position: absolute;
    top: 0;
    right: -5px;
}
</style>
