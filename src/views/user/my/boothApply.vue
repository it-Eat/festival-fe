<template>
  <div class="page">
    <!-- 헤더 영역 -->
    <div class="home">
      <div class="header">
        <BackHeader :title="'부스 신청하기'" />
      </div>

      <!-- 메인 신청 폼 영역 -->
      <div class="container">
        <form class="form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="storeName">부스명</label>
            <input
              type="text"
              id="storeName"
              v-model="storeName"
              placeholder="부스명을 입력하세요"
            />
          </div>

          <div class="form-group">
            <label for="applicantName">신청자 성함</label>
            <input
              type="text"
              id="applicantName"
              v-model="applicantName"
              placeholder="신청자 성함을 입력하세요"
            />
          </div>

          <div class="form-group">
            <label for="phoneNumber">전화번호</label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="phoneNumber"
              placeholder="전화번호를 입력하세요"
            />
          </div>

          <div class="form-group">
            <label for="email">이메일</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <!-- 유형 필드 (놀거리/먹거리 중 선택) -->
          <div class="form-group">
            <label for="boothType">유형</label>
            <select id="boothType" v-model="boothType">
              <option value="놀거리">놀거리</option>
              <option value="먹거리">먹거리</option>
            </select>
          </div>

          <button type="submit" class="submit-button">
            신청하기
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackHeader from '@/components/common/backHeader.vue';

// 데이터 바인딩
const storeName = ref('');       // 부스명
const applicantName = ref('');   // 신청자 성함
const phoneNumber = ref('');     // 전화번호
const email = ref('');           // 이메일
const boothType = ref('놀거리'); // 유형 (기본값: 놀거리)

const router = useRouter();

// 신청 폼 제출
const handleSubmit = () => {
  // 필요한 로직 수행(예: API 호출)
  router.back(); // 이전 페이지로 이동
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px; /* 화면에서 좀 더 넓은 폭 */
  margin: 0 auto;
  box-sizing: border-box;
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.container {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

/* input, select 공통 스타일 */
input[type="text"],
input[type="tel"],
input[type="email"],
select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  appearance: none; /* 브라우저 기본 화살표 등 제거(옵션) */
}

.submit-button {
  width: 70%;
  margin: 20px auto 0 auto;
  padding: 14px 0;
  font-size: 1rem;
  color: white;
  background-color: #ff6f61;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #dd5346;
}

@media (max-width: 900px) {
  .home {
    width: 90%;
  }
}
</style>
