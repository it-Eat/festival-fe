<script setup>
import { ref, onMounted } from "vue";
import menuComponent from "@/components/admin/menuComponent.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const logOk = ref(false);
const router = useRouter();
const authStore = useAuthStore();

// 페이지 로드 시 로그인 상태 확인
onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  logOk.value = isLoggedIn === "true";
});

// 로그아웃 함수
function logout() {
  logOk.value = false;
  localStorage.removeItem("isLoggedIn");

  // Pinia 상태 초기화
  authStore.setUserData(null);

  router.push({ name: "adminLogin" });
}
</script>

<template>
  <div class="container">
    <div class="menu">
      <menuComponent />
      <button @click="logout">로그아웃</button>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100vh;
  overflow: hidden;
}

.menu {
  background-color: #f0f0f0;
  padding: 20px;
  border-right: 1px solid #ddd;
  overflow: hidden;
}

.content {
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
</style>
