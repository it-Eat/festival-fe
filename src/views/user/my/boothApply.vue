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
          <!-- 부스명 -->
          <div class="form-group">
            <label for="name">부스명</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="부스명을 입력하세요"
            />
          </div>

          <!-- 부스 설명 -->
          <div class="form-group">
            <label for="content">내용</label>
            <input
              type="text"
              id="content"
              v-model="content"
              placeholder="부스 설명을 입력하세요"
            />
          </div>

          <!-- 유형 -->
          <div class="form-group">
            <label for="boothType">유형</label>
            <select id="boothType" v-model="boothType">
              <option value="PLAY">PLAY</option>
              <option value="EAT">EAT</option>
              <!-- 필요 시 다른 옵션 추가 -->
            </select>
          </div>

          <!-- 카테고리 -->
          <div class="form-group">
            <label for="typeCategory">카테고리</label>
            <input
              type="text"
              id="typeCategory"
              v-model="typeCategory"
              placeholder="예: 페이스 페인팅"
            />
          </div>

          <!-- 계좌번호 -->
          <div class="form-group">
            <label for="accountNumber">계좌번호</label>
            <input
              type="text"
              id="accountNumber"
              v-model="accountNumber"
              placeholder="계좌번호를 입력하세요"
            />
          </div>

          <!-- 은행명 -->
          <div class="form-group">
            <label for="bankName">은행명</label>
            <input
              type="text"
              id="bankName"
              v-model="bankName"
              placeholder="은행명을 입력하세요"
            />
          </div>

          <!-- 사업자 번호 -->
          <div class="form-group">
            <label for="businessNumber">사업자 번호</label>
            <input
              type="text"
              id="businessNumber"
              v-model="businessNumber"
              placeholder="사업자 번호를 입력하세요"
            />
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
import api from '@/api/axiosInstance';

const router = useRouter();

// 새로 받아야 할 필드들
const name = ref('');
const content = ref('');
const image = ref('');
const boothType = ref('PLAY'); // 기본값: PLAY
const typeCategory = ref('');
const accountNumber = ref('');
const bankName = ref('');
const businessNumber = ref('');

// 신청 폼 제출 시 payload 생성 후 POST 요청
const handleSubmit = async () => {
  const payload = {
    name: name.value,
    content: content.value,
    image: image.value,
    boothType: boothType.value,
    typeCategory: typeCategory.value,
    accountNumber: accountNumber.value,
    bankName: bankName.value,
    businessNumber: businessNumber.value,
  };

  try {
    await api.post('booth/1', payload);
    router.back(); // 성공 후 이전 페이지로 이동
  } catch (error) {
    console.error('부스 신청 실패:', error);
    alert('부스 신청 중 오류가 발생했습니다.');
  }
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
  width: 600px;
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
  appearance: none;
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
