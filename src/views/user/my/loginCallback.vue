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

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const API_URL = import.meta.env.VITE_VUE_API_URL; // ✅ 환경변수 불러오기

onMounted(async () => {
  const code = route.query.code;
  if (code) {
    try {
      console.log("🔍 로그인 코드:", code);

      const response = await axios.get(`${API_URL}/user/auth/kakao/callback?code=${code}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ 서버 응답:", response.data);

      const { user } = response.data;
      userStore.setUser(user);

      // 약간의 지연을 주어 쿠키 저장이 완료될 시간을 확보합니다.
      setTimeout(() => {
        router.push("/");
      }, 150);
    } catch (error) {
      console.error("❌ 유저 정보 가져오기 실패:", error);
      router.push("/user/login");
    }
  } else {
    console.warn("⚠ 카카오 로그인 코드가 없음. 로그인 페이지로 이동합니다.");
    router.push("/user/login");
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
