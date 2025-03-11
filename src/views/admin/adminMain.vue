<script setup>
import { ref, onMounted } from "vue";
import menuComponent from "@/components/admin/menuComponent.vue";
import { useRouter } from "vue-router"; // router import 추가
import { useAuthStore } from "@/stores/auth"; // Pinia 상태 관리

const logOk = ref(false); // 로그인 상태 변수
const router = useRouter(); // router 인스턴스 생성
const authStore = useAuthStore(); // Pinia 상태 사용

// 페이지 로드 시 로그인 상태 확인
onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  logOk.value = isLoggedIn === "true"; // localStorage에서 로그인 상태 가져오기
});

// 로그아웃 함수
function logout() {
  logOk.value = false; // 로그아웃 시 false로 설정
  localStorage.removeItem("isLoggedIn"); // localStorage에서 로그인 상태 삭제

  // Pinia 상태 초기화
  authStore.setUserData(null); // 사용자 데이터 초기화

  router.push({ name: "adminLogin" }); // 로그아웃 후 로그인 페이지로 이동
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
