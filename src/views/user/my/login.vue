<template>
  <div class="page">
    <div class="home">
      <div class="login-container">
        <h1>소셜 로그인</h1>
        <div class="social-buttons">
          <p class="description">소셜로그인으로 회원가입을 할 수 있습니다.</p>
          <button class="google-button" @click="loginWithGoogle">
            <img src="/src/assets/google_logo.png" alt="Google Logo" class="social-icon"> Google로 시작하기
          </button>
          <button class="kakao-button" @click="loginWithKakao">
            <img src="/src/assets/kakao_logo.png" alt="Kakao Logo" class="social-icon"> 카카오로 시작하기
          </button>
          <button class="naver-button" @click="loginWithNaver">
            <img src="/src/assets/naver_logo.png" alt="Naver Logo" class="social-icon"> 네이버로 시작하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loginWithGoogle = () => {
  console.log("Google Login");
};

const loginWithKakao = () => {
  const loginURL = import.meta.env.VITE_LOGIN_URL;
  window.location.href = loginURL;
};

const loginWithNaver = () => {
  console.log("Naver Login");
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
}

.home {
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: white;
}

.login-container h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  color: #555;
  margin-bottom: 20px;
  font-size: 14px;
}

.social-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.social-buttons button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.social-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.google-button {
  background-color: white;
  color: #444;
  border: 1px solid #ddd;
}

.kakao-button {
  background-color: #fee500;
  color: #3c1e1e;
}

.naver-button {
  background-color: #2db400;
  color: white;
}

@media (max-width: 900px) {
  .home {
    width: 90%;
  }
}
</style>
