<template>
  <div class="page">
    <div class="home">
      <div class="login-container">
        <h1>소셜 로그인</h1>
        <div class="social-buttons">
          <button class="google-button" @click="loginWithGoogle">
            <img src="/src/assets/google_logo.png" alt="Google Logo" class="social-icon">Google로 시작하기
          </button>
          <button class="kakao-button" @click="loginWithKakao">
            <img src="/src/assets/kakao_logo.png" alt="Kakao Logo" class="social-icon">Kakao로 시작하기
          </button>
          <button class="naver-button" @click="loginWithNaver">
            <img src="/src/assets/naver_logo.png" alt="Naver Logo" class="social-icon">Naver로 시작하기
          </button>
        </div>
        <router-link to="" class="admin-link">관리자임?</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const loginWithGoogle = () => {
  console.log("Google Login");
};

const loginWithKakao = () => {
  console.log("Kakao Login");
};

const loginWithNaver = () => {
  console.log("Naver Login");
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center; /* page에도 추가 */
  min-height: 95vh; /* 최소 높이를 100vh로 설정 */
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content 제거 또는 주석 처리 */
  width: 600px;
  /* height: 95vh; 제거 */
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.content {
  width: 100%;
  display: flex;
  justify-content: center;
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

.social-buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}

.social-buttons button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
}

.social-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.google-button {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ddd;
}

.google-button:hover {
  background-color: #f5f5f5;
}

.kakao-button {
  background-color: #FEE500;
  color: #000000;
}

.kakao-button:hover {
  background-color: #f7dc6f;
}

.naver-button {
  background-color: #03C75A;
  color: #ffffff;
}

.naver-button:hover {
  background-color: #03a84a;
}

.admin-link {
  color: blue;
  text-decoration: none;
}
</style>
