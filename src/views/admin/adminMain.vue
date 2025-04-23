<script setup>
import { ref, onMounted } from "vue";
import menuComponent from "@/components/admin/menuComponent.vue";
import { useRouter } from "vue-router";
import { logout } from "@/api/admin";
import PasswordModal from "@/components/modal/password.vue";
import CheckModal from "@/components/common/checkModal.vue";
import LoadingComponent from "@/components/common/loadingComponent.vue";

const logOk = ref(false);
const router = useRouter();
const isPassModalOpen = ref(false);
const showSuccessModal = ref(false);
const isLoading = ref(false);
const loadingType = ref("none");

// 페이지 로드 시 로그인 상태 확인
onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  logOk.value = isLoggedIn === "true";
});

const handlePassModalOpen = () => {
  isPassModalOpen.value = true;
};
const handleLoading = (loading) => {
  isLoading.value = loading;
};
const handlePasswordChangeSuccess = () => {
  isPassModalOpen.value = false;
  showSuccessModal.value = true;
};

const handlePassModalClose = () => {
  isPassModalOpen.value = false;
};
const handleSuccessModalClose = () => {
  showSuccessModal.value = false;
};

// 로그아웃 함수
function handleLogout() {
  logout();
  sessionStorage.clear();
  localStorage.clear();
  router.push({ name: "adminLogin" });
}
</script>

<template>
  <div class="container">
    <LoadingComponent v-if="isLoading" />
    <PasswordModal
      v-if="isPassModalOpen"
      @close="handlePassModalClose"
      @success="handlePasswordChangeSuccess"
      @loading="handleLoading"
    />
    <CheckModal
      v-if="showSuccessModal"
      title="알림"
      message="비밀번호가 변경되었습니다."
      @confirm="handleSuccessModalClose"
      @cancel="handleSuccessModalClose"
      confirmText=""
    />

    <div class="menu">
      <menuComponent />
      <button class="logout-btn" @click="handleLogout">로그아웃</button>
      <a class="pass-change" @click="handlePassModalOpen">비밀번호 변경</a>
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
  position: relative;
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
.pass-change {
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
