<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackHeader from '@/components/common/backHeader.vue';

// 데이터 바인딩
const storeName = ref('');      // 가게 이름
const phoneNumber = ref('');    // 전화번호
const email = ref('');          // 이메일
const file = ref(null);         // 신청서 파일

const router = useRouter();

// 파일 업로드 핸들러
const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const handleSubmit = () => {
  // 필요한 로직 수행 후 이전 페이지로 이동
  //console.log('부스 신청 완료:', { storeName: storeName.value, phoneNumber: phoneNumber.value, email: email.value, file: file.value });
  router.back(); // 이전 페이지로 이동
};
</script>

<template>
  <div class="page">
  <!-- 헤더 -->
   <div class="home">
  <div class="header">
    <BackHeader />
  </div>
  <!-- 신청 폼 -->
  <div class="container">
    <h1 class="title">부스 신청</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <!-- 가게 이름 입력 -->
      <div class="form-group">
        <label for="storeName">가게 이름</label>
        <input
          type="text"
          id="storeName"
          v-model="storeName"
          placeholder="가게 이름을 입력하세요"
        />
      </div>

      <!-- 전화번호 입력 -->
      <div class="form-group">
        <label for="phoneNumber">전화번호</label>
        <input
          type="tel"
          id="phoneNumber"
          v-model="phoneNumber"
          placeholder="전화번호를 입력하세요"
        />
      </div>

      <!-- 이메일 입력 -->
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="이메일을 입력하세요"
        />
      </div>

      <!-- 신청서 파일 첨부 -->
      <div class="form-group">
        <label for="file">신청서 파일 첨부</label>
        <input
          type="file"
          id="file"
          @change="handleFileUpload"
          accept=".pdf,.doc,.docx"
        />
      </div>

      <!-- 제출 버튼 -->
      <div class="form-group">
        <button type="submit" class="submit-button">신청하기</button>
      </div>
    </form>
  </div>
  </div>
</div>
</template>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.home{
  flex-direction: column;
  align-items: center;
  justify-content: flex;
  width: 600px;
  height: 100vh;
  box-sizing: border-box;
  margin: auto;
}

/* 헤더 스타일 */
.header {
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
}

/* 컨테이너 스타일 */
.container {
  flex:0.5;
  width: 100%;
  margin: 0px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


/* 제목 스타일 */
.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

/* 폼 그룹 스타일 */
.form-group {
  margin-bottom: 15px;
  margin : 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="file"] {
  padding: 5px;
}

/* 제출 버튼 스타일 */
.submit-button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #ff6f61;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #dd5346;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}
</style>
