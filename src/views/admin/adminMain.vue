<script setup>
import { ref, onMounted } from "vue";
import menuComponent from "@/components/admin/menuComponent.vue";
import { useRouter } from "vue-router";
import { logout } from "@/api/admin";
const logOk = ref(false);
const router = useRouter();

// 페이지 로드 시 로그인 상태 확인
onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  logOk.value = isLoggedIn === "true";
});

// 로그아웃 함수
function handleLogout() {
  logout();
  router.push({ name: "adminLogin" });
}
</script>

<template>
  <div class="container">
    <div class="menu">
      <menuComponent />
      <button class="logout-btn" @click="handleLogout">로그아웃</button>
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
  border-right: 1px solid #ddd;
  background-color: #f8f9fa;
  padding: 30px;
  overflow: hidden;
}

.content {
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}

.logout-btn {
  margin-top: 10px;
  background-color: #ff6b6b;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #f0675b;
  transform: scale(1.02);
  transition: all 0.3s ease;
}
</style>
