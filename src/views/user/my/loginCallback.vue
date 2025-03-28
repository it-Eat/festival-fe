<template>
  <div class="page">
    <div class="home">
      <div class="login-container">
        <h1>로그인 중...</h1>
        <p>잠시만 기다려 주세요.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import api from "@/api/axiosInstance";
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const API_URL = import.meta.env.VITE_VUE_API_URL; // 환경변수 불러오기
const festivalId = localStorage.getItem("festivalId");

onMounted(async () => {
  const code = route.query.code;
  if (code) {
    try {
      const response = await axios.get(
        `${API_URL}/user/auth/kakao/callback?code=${code}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // 서버 응답에서 user 정보 추출
      const { user } = response.data;
      userStore.setUser(user);

      // role 체크
      const userRole = user.role;

      setTimeout(async () => {
        // role이 SELLER면 merchantHome으로 이동할 때 boothId도 함께 전달
        if (userRole === "SELLER") {
          // user 정보에서 boothId를 가져온다고 가정
          const booth = await api.get(`/booth/my-booth/${festivalId}`);
          localStorage.setItem("boothId", booth.data.id);
          const boothId = booth.data.id; // 실제 응답에서 받는 필드명으로 수정 필요
          router.replace(`/${festivalId}/merchant/merchantHome/${boothId}`);
        } else {
          router.go(-2);
        }
      }, 150);
    } catch (error) {
      console.error("❌ 유저 정보 가져오기 실패:", error);
      router.replace("/user/login");
    }
  }
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
}
</style>
