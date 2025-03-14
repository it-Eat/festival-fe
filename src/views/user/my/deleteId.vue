<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BackHeader from '@/components/common/backHeader.vue'
import { Trash2 } from 'lucide-vue-next' // 루시드 아이콘

const router = useRouter()

// 로그인된 사용자 이메일 (예: 토큰 등에서 가져옴)
const loggedInEmail = 'user@example.com'
const email = ref('')

// 회원 탈퇴 로직
const handleDelete = () => {
  if (email.value.trim() === loggedInEmail) {
    console.log('회원 탈퇴 성공:', email.value)
    alert('회원 탈퇴가 완료되었습니다.')
    router.back()
  } else {
    alert('입력한 이메일이 로그인된 이메일과 일치하지 않습니다.')
  }
}
</script>

<template>
  <div class="page">
    <!-- 헤더 (상단에 딱 붙도록 마진 최소화) -->

    <!-- 메인 컨테이너 -->
    <div class="container">
      <!-- 아이콘 -->
      <div class="header">
        <BackHeader />
      </div>
      <div class="icon-circle">
        <Trash2 class="trash-icon" />
      </div>

      <!-- 큰 제목 -->
      <h2 class="title">정말 탈퇴하시겠어요?</h2>

      <!-- 안내 문구 -->
      <p class="guide-text">
        탈퇴하시면 모든 데이터가 사라집니다.
        <br />
        탈퇴하시겠습니까?
      </p>
      <p class="guide-text">
        탈퇴를 원하시면
        <br />
        본인 이메일을 기입하십시오.
      </p>

      <!-- 이메일 입력 -->
      <input
        type="email"
        v-model="email"
        class="email-input"
        placeholder="이메일을 입력하세요"
      />

      <!-- 탈퇴 버튼 -->
      <button class="delete-button" @click="handleDelete">
        탈퇴하기
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 전체 페이지: 화면을 세로로 늘려 header를 상단에 배치 */
.page {
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background-color: #fff;
}

/* 헤더: 상단에 딱 붙음 */
.header {
  width: 100%;
  max-width: 600px;
  margin: 0 auto; /* 좌우 가운데 정렬, 위아래 여백은 없음 */
}

/* 메인 컨테이너: 가운데 배치 */
.container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto; /* 헤더 아래 약간 떨어짐 */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

/* 아이콘 원형 영역 */
.icon-circle {
  width: 80px;
  height: 80px;
  margin: 20px auto;
  margin-top: 100px;
  border-radius: 50%;
  background-color: #ff6b6b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trash-icon {
  width: 32px;
  height: 32px;
  color: #fff;
}

/* 큰 제목 */
.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 안내 문구 */
.guide-text {
  margin: 0 0 10px 0;
  color: #333;
  line-height: 1.4;
  font-size: 0.95rem;
}

/* 이메일 입력 */
.email-input {
  width: 60%;
  padding: 10px;
  margin: 20px auto;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
}

/* 탈퇴 버튼 */
.delete-button {
  width: 60%;
  padding: 12px;
  font-size: 1rem;
  box-sizing: content-box;
  color: #fff;
  background-color: #ff6b6b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.delete-button:hover {
  background-color: #d9534f;
}

/* 반응형 */
@media (max-width: 900px) {
  .container {
    max-width: 100%;
  }
}
</style>
