<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 영역: 뒤로가기 버튼 + '소셜 로그인' 텍스트 표시 -->
      <div class="header">
        <BackHeader :title="'소셜 로그인'" />
      </div>

      <!-- 로그인 영역 -->
      <div class="login-container">
        <!-- 회원가입하기 타이틀 -->
        <h1>회원가입하기</h1>

        <!-- 안내 문구 -->
        <p class="description">소셜로그인으로 회원가입을 할 수 있습니다.</p>

        <!-- 구글 로그인 버튼 -->
        <button class="google-button" @click="loginWithGoogle">
          <img
            src="/src/assets/google_logo.png"
            alt="Google Logo"
            class="social-icon"
          />
          Google로 시작하기
        </button>

        <!-- 카카오 로그인 버튼 -->
        <button class="kakao-button" @click="loginWithKakao">
          <img
            src="/src/assets/kakao_logo.png"
            alt="Kakao Logo"
            class="social-icon"
          />
          카카오로 시작하기
        </button>

        <!-- 네이버 로그인 버튼 -->
        <button class="naver-button" @click="loginWithNaver">
          <img
            src="/src/assets/naver_logo.png"
            alt="Naver Logo"
            class="social-icon"
          />
          네이버로 시작하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;
localStorage.setItem("festivalId", festivalId);

const loginWithGoogle = () => {
  const loginURL = import.meta.env.VITE_LOGIN_URL;

  window.location.href = loginURL;
};

const loginWithKakao = () => {
  const loginURL = import.meta.env.VITE_LOGIN_URL;

  window.location.href = loginURL;
};

const loginWithNaver = () => {
  const loginURL = import.meta.env.VITE_LOGIN_URL;

  window.location.href = loginURL;
};
</script>

<style scoped>
/* 전체 페이지(배경 흰색, 수직 수평 가운데 정렬) */
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  min-height: 95vh;
  margin: auto;
  box-sizing: border-box;
}

/* 상단 헤더 */
.header {
  width: 100%;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd; /* 스크린샷처럼 아랫줄 */
}

/* 로그인 컨테이너(흰 배경, 그림자 제거) */
.login-container {
  width: 100%;
  /* text-align: center; */
  background-color: #fff;
  /* 필요하면 padding을 조정하세요 */
  padding: 20px 0;
  justify-content: center;
}

/* '회원가입하기' 큰 글자 */
.login-container h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0 10px;
}

/* 안내 문구 스타일 */
.description {
  color: #555;
  margin-bottom: 20px;
  font-size: 14px;
}

/* 버튼 공통 스타일 */
.google-button,
.kakao-button,
.naver-button {
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

/* 호버 시 살짝 떠오르는 효과 */
.google-button:hover,
.kakao-button:hover,
.naver-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 소셜 아이콘 (구글/카카오/네이버 로고) */
.social-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

/* 구글 버튼 */
.google-button {
  background-color: #fff;
  color: #444;
  border: 1px solid #ddd;
}

/* 카카오 버튼 */
.kakao-button {
  background-color: #fee500;
  color: #3c1e1e;
}

/* 네이버 버튼 */
.naver-button {
  background-color: #2db400;
  color: #fff;
}

/* 화면 폭이 좁을 때(모바일 대응) */
@media (max-width: 600px) {
  .home {
    width: 100%;
    padding: 10px;
  }
}
</style>
