<template>
  <div class="login-page">
    <!-- 왼쪽 섹션(이미지 + 텍스트) -->
    <div class="left-section">
      <img
        src="@/assets/login_logo.png"
        alt="축제 이미지"
        class="login-image"
      />
    </div>

    <!-- 오른쪽 섹션(로그인 폼 + 홈으로 돌아가기) -->
    <div class="right-section">
      <div class="login-container">
        <h2>관리자 로그인</h2>
        <form @submit.prevent="handleLogin" class="login-form">
          <input
            type="text"
            v-model="festivalCode"
            placeholder="축제 코드"
            required
            class="input-field"
          />
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호"
            required
            class="input-field"
          />
          <button type="submit" class="submit-button">로그인</button>
        </form>
      </div>
      <!-- 홈으로 돌아가기 링크(오른쪽 하단) -->
      <div class="home-link">
        <router-link to="/">홈으로 돌아가기 &gt;</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

// 기존 코드와 동일
const emit = defineEmits(["login"]);
const festivalCode = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  const loginUser = {
    festivalCode: festivalCode.value,
    password: password.value,
  };

  try {
    const response = await axios.post(
      "https://festival-be.onrender.com/user/admin",
      loginUser,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // 쿠키 전송 허용
      }
    );

    if (response.status === 200) {
      console.log("로그인 성공");
      const { id, userName, nickname, role, participation } = response.data;
      const user = { id, userName, nickname, role, participation };

      // Pinia 사용자 데이터 저장
      authStore.setUserData(user);

      emit("login");
      router.push({
        name: "admin",
        params: { festivalId: user.participation[0].festivalId },
      });
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  } catch (error) {
    console.error("API 요청 오류", error);
    alert("로그인 실패");
  }
};
</script>

<style scoped>
/* 전체 페이지를 좌우 2단으로 나누는 컨테이너 */
.login-page {
  display: flex;
  width: 100%;
  height: 100vh;
}

/* 왼쪽 섹션(이미지) */
.left-section {
  position: relative;
  width: 50%;
  overflow: hidden;
}

/* 이미지를 화면에 꽉 차게 표시 */
.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 이미지 위에 텍스트를 겹쳐서 배치하기 위한 컨테이너 */
.image-text {
  position: absolute;
  top: 30%;
  left: 10%;
  color: #fff;
  font-weight: 600;
  line-height: 1.4;
}

.image-text p {
  font-size: 24px;
  margin-bottom: 10px;
}

.image-text h1 {
  font-size: 48px;
  margin: 0;
  font-weight: 700;
}

/* 오른쪽 섹션(로그인 폼) */
.right-section {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f9f9f9;
}

/* 로그인 컨테이너 */
.login-container {
  width: 350px;
  height: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-container h2 {
  margin-bottom: 50px;
  text-align: center;
  font-size: 20px;
}

/* 로그인 폼 */
.login-form {
  display: flex;
  flex-direction: column;
}

/* 공통 인풋 스타일 */
.input-field {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.input-field:focus {
  border-color: #ff6f61;
  outline: none;
}

/* 로그인 버튼 스타일 */
.submit-button {
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #ff6f61;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

/* 오른쪽 하단 홈 링크 */
.home-link {
  position: absolute;
  bottom: 30px;
  right: 30px;
}

.home-link a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}

.home-link a:hover {
  text-decoration: underline;
}
</style>
