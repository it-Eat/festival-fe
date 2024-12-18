<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackHeader from '@/components/common/backHeader.vue';

const router = useRouter(); // Vue Router 사용

// 로그인된 사용자 이메일 (예: 토큰에서 가져옴)
const loggedInEmail = "user@example.com"; // 실제 데이터는 서버 또는 JWT에서 가져와야 함

const email = ref(""); // 사용자가 입력한 이메일

// 회원 탈퇴 로직
const handleDelete = () => {
  if (email.value.trim() === loggedInEmail) {
    // 이메일이 일치할 경우
    console.log("회원 탈퇴 성공:", email.value);
    alert("회원 탈퇴가 완료되었습니다.");
    // 이전 페이지로 이동
    router.back();
  } else {
    // 이메일이 일치하지 않을 경우
    alert("입력한 이메일이 로그인된 이메일과 일치하지 않습니다.");
  }
};
</script>

<template>
  <div class="page">
    <!-- 헤더 -->
    <div class="header">
      <BackHeader />
    </div>

    <!-- 컨테이너 -->
    <div class="container">
      <h1>회원 탈퇴</h1>
      <div>탈퇴하시면 모든 데이터가 사라집니다.</div>
      <div>탈퇴하시겠습니까?</div>
      <br />
      <div>탈퇴를 원하시면</div>
      <div>본인 이메일을 기입하십시오.</div>
      <br /><br />

      <!-- 이메일 입력 -->
      <input
        type="email"
        v-model="email"
        class="email-input"
        placeholder="이메일을 입력하세요"
      />

      <!-- 탈퇴하기 버튼 -->
      <button class="delete-button" @click="handleDelete">탈퇴하기</button>
    </div>
  </div>
</template>

<style scoped>
/* 전체 페이지 스타일 */
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 헤더 스타일 */
.header {
  width: 100%;
  max-width: 600px; /* 컨테이너와 동일한 최대 너비 설정 */
  margin: auto;
  display: flex;
  justify-content: center;
}

/* 컨테이너 스타일 */
.container {
  width: 100%;
  max-width: 600px; /* 헤더와 동일한 최대 너비 설정 */
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: center;
  padding: 20px; /* 내부 여백 추가 */
}

/* 이메일 입력 스타일 */
.email-input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 버튼 스타일 */
.delete-button {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #ff6b6b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d9534f;
}

/* 반응형 스타일 */
@media (max-width: 900px) {
  .container,
  .header {
    max-width: 90%; /* 모바일에서 화면 너비에 맞춤 */
  }
}
</style>

