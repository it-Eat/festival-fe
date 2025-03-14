<script setup>
import {
  ChevronLeft,
  AlignJustify,
  ShoppingCart,
  Search,
  Bell,
} from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import Hamberger from "../modal/hamberger.vue";
import { useCartStore } from "@/stores/cartStores"; // store import 추가

const props = defineProps({
  title: String,
  useUserName: Boolean,
  category: String,
});

console.log(props.category);

const cartStore = useCartStore(); // store 사용
const cartTotalCount = computed(() => cartStore.totalCount); // 총 수량 계산

const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.back();
};

const handleNotification = () => {
  console.log("알림 화면으로 이동");
};

// const handleSearch = () => {
//   console.log("검색 기능 실행");
// };

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
    <Bell
      v-if="props.category === 'home'"
      class="left-icon"
      @click="handleNotification"
    />
    <ChevronLeft v-else class="left-icon" @click="goBack" />
    <h1>{{ pageTitle }}</h1>
    <!-- <Search class="right-icon" @click="handleSearch" /> -->
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
      <span v-if="props.category === 'foodList'" class="cart-badge"> </span>
      <!-- foodList 페이지가 아닐 때만 햄버거 메뉴 표시 -->
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px; /* 기존 60px에서 줄임 */
  padding: 8px 12px; /* 패딩 축소 */
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
}

/* 제목 텍스트 스타일 */
.header-container h1 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6f61;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%; /* 긴 제목일 경우 너비 제한 */
}

.left-icon {
  position: absolute;
  left: 16px;
  color: #ff6f61;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.right-icon-container {
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
}

.right-icon {
  color: #ff6f61;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.header-container > div {
  display: flex;
  justify-content: space-between;
}

.left-icon {
  margin-right: auto;
}

.right-icon {
  margin-left: auto;
}

.right-icon:hover,
.left-icon:hover {
  color: #bcb4b3;
}

.menu-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.menu-overlay.open {
  transform: translateX(0);
}

.hamburger-container {
  background-color: #ffffff;
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
