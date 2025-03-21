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
            <p :class="nameValidation.valid ? 'valid-text' : 'error-text'">
              {{ nameValidation.msg }}
            </p>
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
            <p :class="contentValidation.valid ? 'valid-text' : 'error-text'">
              {{ contentValidation.msg }}
            </p>
          </div>

          <!-- 유형 -->
          <div class="form-group">
            <label for="boothType">유형</label>
            <select id="boothType" v-model="boothType">
              <option value="">선택하세요</option>
              <option value="PLAY">PLAY</option>
              <option value="EAT">EAT</option>
              <option value="ETC">ETC</option>
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
            <p :class="typeCategoryValidation.valid ? 'valid-text' : 'error-text'">
              {{ typeCategoryValidation.msg }}
            </p>
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
            <p :class="accountNumberValidation.valid ? 'valid-text' : 'error-text'">
              {{ accountNumberValidation.msg }}
            </p>
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
            <p :class="bankNameValidation.valid ? 'valid-text' : 'error-text'">
              {{ bankNameValidation.msg }}
            </p>
          </div>

          <!-- 사업자 번호 (선택) -->
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";

const router = useRouter();

// 입력 필드
const name = ref("");
const content = ref("");
const image = ref("");
const boothType = ref(""); // 선택 전 빈 문자열
const typeCategory = ref("");
const accountNumber = ref("");
const bankName = ref("");
const businessNumber = ref("");

// 자음이 3글자 이상 연속되는지 검사 (예: "ㄴㄴㄴ")
const hasInvalidPattern = (text) => {
  return /[ㄱ-ㅎ]{3,}/.test(text);
};

// 실시간 유효성 검사 컴퓨티드

// 부스명: 필수, 15자 이하, invalid pattern 체크
const nameValidation = computed(() => {
  if (!name.value) return { msg: "필수 필드를 채워주세요.", valid: false };
  if (hasInvalidPattern(name.value))
    return { msg: "필수 필드를 채워주세요.", valid: false };
  if (name.value.length > 15)
    return { msg: "부스 이름은 15자 이하로 입력하세요.", valid: false };
  return { msg: "사용 가능", valid: true };
});

// 부스 설명: 필수, 10자 이상 30자 이하, invalid pattern 체크
const contentValidation = computed(() => {
  if (!content.value) return { msg: "필수 필드를 채워주세요.", valid: false };
  if (hasInvalidPattern(content.value))
    return { msg: "필수 필드를 채워주세요.", valid: false };
  if (content.value.length < 10 || content.value.length > 30)
    return { msg: "부스 설명은 10자 이상 30자 이하로 입력하세요.", valid: false };
  return { msg: "사용 가능", valid: true };
});

// boothType: 필수, EAT/PLAY/ETC 중 선택
const boothTypeValidation = computed(() => {
  if (!boothType.value)
    return { msg: "필수 필드를 채워주세요.", valid: false };
  const validTypes = ["EAT", "PLAY", "ETC"];
  if (!validTypes.includes(boothType.value))
    return {
      msg: "부스 타입을 EAT, PLAY, ETC 중에서 선택하세요.",
      valid: false,
    };
  return { msg: "사용 가능", valid: true };
});

// 카테고리: 10자 이하 (빈 값은 허용)
const typeCategoryValidation = computed(() => {
  if (typeCategory.value && typeCategory.value.length > 10)
    return {
      msg: "부스타입의 카테고리는 10자 이하로 입력하세요.",
      valid: false,
    };
  return { msg: "사용 가능", valid: true };
});

// 계좌번호: 필수
const accountNumberValidation = computed(() => {
  if (!accountNumber.value)
    return { msg: "필수 필드를 채워주세요.", valid: false };
  return { msg: "사용 가능", valid: true };
});

// 은행명: 필수
const bankNameValidation = computed(() => {
  if (!bankName.value)
    return { msg: "필수 필드를 채워주세요.", valid: false };
  return { msg: "사용 가능", valid: true };
});

// 신청 폼 제출 시 (전체 유효성 검사)
const handleSubmit = async () => {
  if (
    !nameValidation.value.valid ||
    !contentValidation.value.valid ||
    !boothTypeValidation.value.valid ||
    !accountNumberValidation.value.valid ||
    !bankNameValidation.value.valid ||
    !typeCategoryValidation.value.valid
  ) {
    // 하나라도 유효하지 않으면 제출 중단
    return;
  }

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
    await api.post("booth/1", payload);
    router.back(); // 성공 후 이전 페이지로 이동
  } catch (error) {
    console.error("부스 신청 실패:", error);
    alert("부스 신청 중 오류가 발생했습니다.");
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

/* 유효하지 않은 경우 빨간색, 유효한 경우 파란색 */
.error-text {
  color: red;
  font-size: 0.9rem;
  margin-top: 4px;
}
.valid-text {
  color: blue;
  font-size: 0.9rem;
  margin-top: 4px;
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
