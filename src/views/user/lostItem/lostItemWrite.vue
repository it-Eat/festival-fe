<script setup>
import backHeader from "@/components/common/backHeader.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/axiosInstance";
const title = ref("");
const content = ref([]);
const lossType = ref("");
const images = ref([]);
const previewImages = ref([]); // 미리보기용 이미지 URL들

const route = useRoute();
const festivalId = route.params.festivalId;

// 이미지 추가 함수
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);

  if (images.value.length + files.length > 3) {
    alert("최대 3개의 이미지만 업로드할 수 있습니다.");
    return;
  }

  files.forEach((file) => {
    if (images.value.length < 3) {
      images.value.push(file);
      previewImages.value.push(URL.createObjectURL(file)); // 미리보기 이미지 생성
    }
  });
};

// 이미지 삭제 함수
const removeImage = (index) => {
  images.value.splice(index, 1);
  previewImages.value.splice(index, 1);
};

const submitPost = async () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("boardType", "LOSS");
  formData.append("lossType", lossType.value); // "LOSS", "GET" 중 선택

  images.value.forEach((file) => {
    formData.append("images", file);
  });

  try {
    await api.post(`board/${festivalId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    alert("게시글이 등록되었습니다.");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <backHeader title="분실물 작성" />
    <div class="form-wrapper">
      <div class="title-lossType-container">
        <input
          v-model="title"
          type="text"
          placeholder="제목을 입력해주세요"
          class="input-title"
        />
        <select v-model="lossType" class="input-select">
          <option value="" disabled>선택</option>
          <option value="LOSS">분실</option>
          <option value="GET">습득</option>
        </select>
      </div>
      <textarea
        v-model="content"
        placeholder="게시글 내용을 작성해주세요."
        class="content-area"
      ></textarea>
      <div class="image-upload">
        <label class="upload-label" for="imageInput"
          >이미지 추가 (최대 3개)</label
        >
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          multiple
          @change="handleImageUpload"
          class="input-images"
          :disabled="images.length >= 3"
        />
      </div>

      <!-- 이미지 미리보기 -->
      <div class="preview-container">
        <div
          v-for="(preview, index) in previewImages"
          :key="index"
          class="image-preview"
        >
          <button class="remove-btn" @click="removeImage(index)">✕</button>
          <img :src="preview" alt="Uploaded Image" class="preview-img" />
        </div>
      </div>
      <button class="submit-button" @click="submitPost">게시글 등록하기</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.title-lossType-container {
  display: flex;
  gap: 24px;
}

input,
textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  margin: 12px 0;
}

textarea {
  height: 200px;
  resize: none;
}

.input-select {
  width: 120px;
  height: 40px;
  border-radius: 8px;
  padding: 10px 10px 10px 16px;
  margin: 12px 0;
  color: #666;
  font-size: 16px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

.input-select option[value=""] {
  color: #999;
}

.upload-label {
  display: block;
  background-color: #ff6f61;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.input-images {
  display: none;
}

/* 이미지 미리보기 컨테이너 */
.preview-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}

/* 개별 이미지 프리뷰 */
.image-preview {
  position: relative;
  width: 120px;
  height: 120px;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* X 버튼 (이미지 삭제) */
.remove-btn {
  position: absolute;
  background-color: transparent;
  right: 4px;
  top: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ff6f61;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  color: #ff6f61;
}

button {
  background-color: #ff5a5f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-end;
  font-weight: bold;
}

.input-images {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  margin-bottom: 10px;
}

.backHeader {
  margin-bottom: 15px;
}

.submit-button {
  background-color: #ff6f61;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-end;
  font-weight: bold;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #f4685c;
}
</style>
