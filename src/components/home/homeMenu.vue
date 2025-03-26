<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const festivalId = route.params.festivalId;
const menuItems = [
  { name: "먹거리", path: `/${festivalId}/userHome/homeFood`, icon: "🍽️" },
  { name: "놀거리", path: `/${festivalId}/userHome/homePlaying`, icon: "🎡" },
  { name: "게시판", path: `/${festivalId}/userHome/homeBoard`, icon: "📝" },
  {
    name: "축제 참여하기",
    path: `/${festivalId}/userHome/homeIntroduction`,
    icon: "👀",
  },
];
</script>

<template>
  <div class="menu-component">
    <router-link
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.path"
      class="menu-button"
      :class="{ active: route.path === item.path }"
    >
      <span class="icon">{{ item.icon }}</span>
      {{ item.name }}
    </router-link>
  </div>
</template>

<style scoped>
.menu-component {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 5px 0;
  background-color: white;
  border-bottom: 2px solid #ddd;
}

/* 메뉴 버튼 스타일 */
.menu-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  color: #777;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
  cursor: pointer;
}

/* 아이콘 스타일 */
.icon {
  font-size: 22px;
  margin-bottom: 4px;
}

/* 활성화된 메뉴 스타일 */
.menu-button.active {
  color: #ff6f61;
  border-bottom: 3px solid #ff6f61;
}

/* 버튼 호버 효과 */
.menu-button:hover {
  color: #ff6f61;
}
</style>
