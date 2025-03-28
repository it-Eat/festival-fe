<template>
  <div class="page">
    <div class="header">
      <BackHeader :title="'부스 신청하기'" />
    </div>
    <!-- 헤더 영역 -->
    <div class="home">
      <!-- 메인 신청 폼 영역 -->
      <div class="container">
        <form class="form" @submit.prevent="handleSubmit">
          <!-- 부스명 -->
          <div class="form-group">
            <label for="name">부스명 <span class="required">*</span></label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="부스명을 입력하세요"
            />
            <p v-if="!nameValidation.valid && name" class="errorText">
              {{ nameValidation.msg }}
            </p>
          </div>

          <!-- 부스 설명 -->
          <div class="form-group">
            <label for="content">내용 <span class="required">*</span></label>
            <input
              type="text"
              id="content"
              v-model="content"
              placeholder="부스 설명을 입력하세요"
            />
            <p v-if="!contentValidation.valid && content" class="errorText">
              {{ contentValidation.msg }}
            </p>
          </div>

          <!-- 유형 -->
          <div class="form-group">
            <label for="boothType">유형 <span class="required">*</span></label>
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
            <p
              v-if="!typeCategoryValidation.valid && typeCategory"
              class="errorText"
            >
              {{ typeCategoryValidation.msg }}
            </p>
          </div>

          <!-- 계좌번호 -->
          <div class="form-group">
            <label for="accountNumber"
              >계좌번호 <span class="required">*</span></label
            >
            <input
              type="text"
              id="accountNumber"
              v-model="accountNumber"
              placeholder="계좌번호를 입력하세요"
            />
            <p
              v-if="!accountNumberValidation.valid && accountNumber"
              class="errorText"
            >
              {{ accountNumberValidation.msg }}
            </p>
          </div>

          <!-- 은행명 -->
          <div class="form-group">
            <label for="bankName">은행명 <span class="required">*</span></label>
            <input
              type="text"
              id="bankName"
              v-model="bankName"
              placeholder="은행명을 입력하세요"
            />
            <p v-if="!bankNameValidation.valid && bankName" class="errorText">
              {{ bankNameValidation.msg }}
            </p>
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

          <!-- 이미지 업로드 필드를 form 안에 추가 -->
          <div class="form-group">
            <label for="image"
              >부스 이미지 <span class="required">*</span></label
            >
            <div class="image-upload-container">
              <input
                type="file"
                id="image"
                @change="handleImageChange"
                accept="image/*"
                class="image-input"
              />
              <!-- 이미지 미리보기 -->
              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" alt="부스 이미지 미리보기" />
                <button type="button" @click="removeImage" class="remove-image">
                  ✕
                </button>
              </div>
              <!-- 이미지 선택 버튼 -->
              <label v-else for="image" class="image-upload-button">
                이미지 선택하기
              </label>
            </div>
            <p v-if="!imageValidation.valid && imageFile" class="errorText">
              {{ imageValidation.msg }}
            </p>
          </div>

          <button
            type="submit"
            :class="
              nameValidation.valid &&
              contentValidation.valid &&
              boothTypeValidation.valid &&
              accountNumberValidation.valid &&
              bankNameValidation.valid &&
              typeCategoryValidation.valid &&
              imageValidation.valid
                ? 'submit-button'
                : 'disabled-button'
            "
          >
            신청하기
          </button>
        </form>
      </div>
    </div>
    <loadingComponent v-if="isLoading" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";
import loadingComponent from "@/components/common/loadingComponent.vue";

const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;
const isLoading = ref(false);

// 입력 필드
const name = ref("");
const content = ref("");
const boothType = ref(""); // 선택 전 빈 문자열
const typeCategory = ref("");
const accountNumber = ref("");
const bankName = ref("");
const businessNumber = ref("");

// 이미지 관련 상태 추가
const imageFile = ref(null);
const imagePreview = ref(null);

// 자음이 3글자 이상 연속되는지 검사 (예: "ㄴㄴㄴ")
const hasInvalidPattern = (text) => {
  return /[ㄱ-ㅎ]{3,}/.test(text);
};

// 실시간 유효성 검사 컴퓨티드

// 부스명: 필수, 15자 이하, invalid pattern 체크
const nameValidation = computed(() => {
  if (!name.value) return { valid: false, msg: "부스명을 입력해주세요." };
  if (hasInvalidPattern(name.value))
    return { valid: false, msg: "올바른 형식으로 입력해주세요." };
  if (name.value.length > 15)
    return { valid: false, msg: "부스 이름은 15자 이하로 입력하세요." };
  return { valid: true, msg: "" };
});

// 부스 설명: 필수, 10자 이상 30자 이하, invalid pattern 체크
const contentValidation = computed(() => {
  if (!content.value) return { valid: false, msg: "부스 설명을 입력해주세요." };
  if (hasInvalidPattern(content.value))
    return { valid: false, msg: "올바른 형식으로 입력해주세요." };
  if (content.value.length < 10 || content.value.length > 30)
    return {
      valid: false,
      msg: "부스 설명은 10자 이상 30자 이하로 입력하세요.",
    };
  return { valid: true, msg: "" };
});

// boothType: 필수, EAT/PLAY/ETC 중 선택
const boothTypeValidation = computed(() => {
  if (!boothType.value)
    return { valid: false, msg: "부스 타입을 선택해주세요." };
  const validTypes = ["EAT", "PLAY", "ETC"];
  if (!validTypes.includes(boothType.value))
    return {
      valid: false,
      msg: "부스 타입을 EAT, PLAY, ETC 중에서 선택하세요.",
    };
  return { valid: true, msg: "" };
});

// 카테고리: 10자 이하 (빈 값은 허용)
const typeCategoryValidation = computed(() => {
  if (typeCategory.value && typeCategory.value.length > 10)
    return {
      valid: false,
      msg: "부스타입의 카테고리는 10자 이하로 입력하세요.",
    };
  return { valid: true, msg: "" };
});

// 계좌번호: 필수
const accountNumberValidation = computed(() => {
  if (!accountNumber.value)
    return { valid: false, msg: "계좌번호를 입력해주세요." };
  return { valid: true, msg: "" };
});

// 은행명: 필수
const bankNameValidation = computed(() => {
  if (!bankName.value) return { valid: false, msg: "은행명을 입력해주세요." };
  return { valid: true, msg: "" };
});

// 이미지 유효성 검사
const imageValidation = computed(() => {
  if (!imageFile.value) return { valid: false, msg: "이미지를 선택해주세요." };

  // 파일 크기 제한 (5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (imageFile.value.size > maxSize) {
    return { valid: false, msg: "이미지 크기는 5MB 이하여야 합니다." };
  }

  return { valid: true, msg: "" };
});

// 이미지 선택 핸들러
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 이미지 제거 핸들러
const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
  // input 필드 초기화
  const input = document.getElementById("image");
  if (input) input.value = "";
};

// 신청 폼 제출 시 (전체 유효성 검사)
const handleSubmit = async () => {
  if (
    !nameValidation.value.valid ||
    !contentValidation.value.valid ||
    !boothTypeValidation.value.valid ||
    !accountNumberValidation.value.valid ||
    !bankNameValidation.value.valid ||
    !typeCategoryValidation.value.valid ||
    !imageValidation.value.valid
  ) {
    // 하나라도 유효하지 않으면 제출 중단
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("content", content.value);
  formData.append("boothType", boothType.value);
  formData.append("typeCategory", typeCategory.value);
  formData.append("accountNumber", accountNumber.value);
  formData.append("bankName", bankName.value);
  formData.append("businessNumber", businessNumber.value);
  if (imageFile.value) {
    formData.append("image", imageFile.value);
  }

  try {
    isLoading.value = true;
    await api.post(`/booth/${festivalId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    router.back(); // 성공 후 이전 페이지로 이동
  } catch (error) {
    console.error("부스 신청 실패:", error);
    alert("부스 신청 중 오류가 발생했습니다.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 15px auto;
  box-sizing: border-box;
  width: 100%;
}

.home {
  width: 600px;
  margin: 12px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  width: 100%;
  margin: 15px auto;
}

.container {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  border-radius: 8px;
  box-sizing: border-box;
  appearance: none;
}

input[type="text"]:focus,
input[type="tel"]:focus,
input[type="email"]:focus,
select:focus {
  outline: none;
}

/* 유효하지 않은 경우 빨간색, 유효한 경우 파란색 */
.errorText {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.submit-button {
  width: 100%;
  margin: 20px auto 14px auto;
  padding: 14px 0;
  font-size: 1rem;
  color: white;
  background-color: white;
  color: #ff6f61;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #ff6f61;
  color: white;
}

.disabled-button {
  width: 100%;
  margin: 20px auto 14px auto;
  padding: 14px 0;
  font-size: 1rem;
  background-color: #ccc;
  color: #666;
  border: 1px solid #ccc;
  cursor: not-allowed;
  border-radius: 8px;
}

.required {
  color: #ff6f61;
}

.image-upload-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.image-input {
  display: none;
}

.image-upload-button {
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #ff6f61;
  border: 1px dashed #ff6f61;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.image-upload-button:hover {
  background-color: #fff1f0;
}

.image-preview {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
}

.image-preview img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ff6f61;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.remove-image:hover {
  background-color: #dd5346;
}

@media (max-width: 900px) {
  .home {
    width: 90%;
  }
}
</style>
