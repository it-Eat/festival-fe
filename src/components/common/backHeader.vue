<script setup>
import { ChevronLeft, AlignJustify, ShoppingCart } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import Hamberger from "../modal/hamberger.vue";
import { useCartStore } from '@/stores/cartStores'; // store import 추가

const props = defineProps({
  title: String,
  useUserName: Boolean,
  category: String,
});

const cartStore = useCartStore(); // store 사용
const cartTotalCount = computed(() => cartStore.totalCount); // 총 수량 계산

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
    <div class="right-icon-container">
      <!-- foodDetail 페이지일 때는 ShoppingCart -->
      <ShoppingCart
        v-if="props.category === 'foodDetail'"
        class="right-icon"
        @click="goShoppingList"
      />
      <span
        v-if="props.category === 'foodDetail' && cartTotalCount > 0"
        class="cart-badge"
      >
        {{ cartTotalCount }}
      </span>
      <!-- foodDetail 페이지가 아닐 때만 햄버거 메뉴 표시 -->
      <template v-if="props.category !== 'foodDetail'">
        <AlignJustify class="right-icon" @click="toggleMenu" />
        <div
          :class="{ 'menu-overlay': true, open: isHambergerOpen }"
          @click="closeMenu"
        >
          <Hamberger />
        </div>
      </template>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: center; /* 변경: space-between에서 center로 */
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #ff6f61;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  margin: 0;
}


.right-icon-container {
  position: absolute; /* 변경: 절대 위치로 */
  right: 16px; /* 오른쪽 패딩만큼 */
  display: flex;
  align-items: center;
}


.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 8px;
  min-width: 8px;
  height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 페이지명 스타일 */
.header-container h1 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60%; /* 추가: 제목이 너무 길 경우를 대비 */
}

/* 왼쪽 아이콘 스타일 */
.left-icon {
  position: absolute; /* 변경: 절대 위치로 */
  left: 16px; /* 왼쪽 패딩만큼 */
  color: #ffffff;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
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
