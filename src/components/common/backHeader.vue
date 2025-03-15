<script setup>
import {
  ChevronLeft,
  AlignJustify,
  ShoppingCart,
  Bell,
} from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import Hamberger from "../modal/hamberger.vue";
import { useCartStore } from "@/stores/cartStores";
import { useUserStore } from "@/stores/userStore";  // Pinia 스토어 임포트

const props = defineProps({
  title: String,
  useUserName: Boolean,
  category: String,
});

const userStore = useUserStore();  // 사용자 정보 불러오기

// 사용자 가게(store) 관련
const cartStore = useCartStore();
const cartTotalCount = computed(() => cartStore.totalCount);

const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.back();
};

const handleNotification = () => {
  console.log("알림 화면으로 이동");
};

// 페이지 제목: 로그인 상태이면 userStore.user.nickname 사용, 아니면 기본값("손님")
const pageTitle = computed(() => {
  const name = userStore.isAuthenticated ? userStore.user.nickname : "손님";
  if (props.title) {
    if (props.useUserName) {
      return `${name}님의 ${props.title}`;
    }
    return props.title;
  } else {
    if (route.meta.title && route.meta.useUserName) {
      return `${name}님의 ${route.meta.title}`;
    }
    return route.meta.title || "기본 페이지 제목";
  }
});

// 햄버거 메뉴 열림 여부
const isHambergerOpen = ref(false);
const toggleMenu = () => {
  isHambergerOpen.value = !isHambergerOpen.value;
};

// 장바구니 이동
const goShoppingList = () => {
  router.push("/user/food/foodCart");
};

// 오버레이 클릭 시 닫기 (메뉴 내부 클릭은 무시)
const closeMenu = (e) => {
  if (e.target === e.currentTarget) {
    isHambergerOpen.value = false;
  }
};
</script>

<template>
  <!-- ① 전체를 감싸는 래퍼 -->
  <div class="header-wrapper">
    <!-- ② 상단 헤더 영역 -->
    <header class="header-container">
      <!-- 카테고리가 home이면 알림 아이콘, 아니면 뒤로가기 아이콘 -->
      <Bell
        v-if="props.category === 'home'"
        class="left-icon"
        @click="handleNotification"
      />
      <ChevronLeft v-else class="left-icon" @click="goBack" />

      <!-- 가운데 제목 -->
      <h1>{{ pageTitle }}</h1>

      <!-- 오른쪽 아이콘 영역 -->
      <div class="right-icon-container">
        <!-- foodDetail 페이지일 때 장바구니 -->
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

        <!-- foodDetail 페이지가 아닐 때 햄버거 아이콘 -->
        <template v-if="props.category !== 'foodDetail'">
          <AlignJustify class="right-icon" @click="toggleMenu" />
        </template>
      </div>
    </header>

    <!-- ③ 햄버거 메뉴 오버레이 (백헤더 내부에서만 보이도록) -->
    <div
      v-if="isHambergerOpen"
      class="menu-overlay"
      @click="closeMenu"
    >
      <!-- 실제 햄버거 메뉴 -->
      <Hamberger />
    </div>
  </div>
</template>

<style scoped>
/* (A) 백헤더 전체 래퍼 */
.header-wrapper {
  position: relative;  /* 자식 .menu-overlay를 이 래퍼 기준으로 absolute 배치 */
  width: 100%;
}

/* (B) 헤더 컨테이너 기본 스타일 */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 8px 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
}

/* 가운데 제목 */
.header-container h1 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6f61;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

/* 왼쪽 아이콘 */
.left-icon {
  position: absolute;
  left: 16px;
  color: #ff6f61;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

/* 오른쪽 아이콘 래퍼 */
.right-icon-container {
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
}

/* 오른쪽 아이콘 */
.right-icon {
  color: #ff6f61;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.right-icon:hover,
.left-icon:hover {
  color: #bcb4b3;
}

/* (C) 오버레이: header-wrapper 내부에서만 절대 위치 */
.menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

/* 장바구니 배지 */
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
