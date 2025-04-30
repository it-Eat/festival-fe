<script setup>
import backHeader from "@/components/common/backHeader.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/api/axiosInstance";

const title = ref("");
const content = ref("");
const images = ref([]); // 업로드할 이미지 파일들
const previewImages = ref([]); // 미리보기용 이미지 URL들
const router = useRouter();

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

const route = useRoute();
const festivalId = route.params.festivalId;

const submitPost = async () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("boardType", "BOARD");
  formData.append("lossType", "NULL");

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
    router.push(`/${festivalId}/board/list`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <backHeader title="게시글 작성" />
    <div class="form-wrapper">
      <input
        v-model="title"
        type="text"
        placeholder="제목을 입력해주세요"
        class="input-title"
      />
      <textarea
        v-model="content"
        placeholder="게시글 내용을 작성해주세요."
        class="content-area"
      ></textarea>

      <!-- 이미지 업로드 -->
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
          <img :src="preview" alt="Uploaded Image" class="preview-img" />
          <button class="remove-btn" @click="removeImage(index)">✕</button>
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
  gap: 10px;
}

input,
textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 12px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

textarea {
  height: 200px;
  resize: none;
}

/* 이미지 업로드 버튼 */
.upload-label {
  display: block;
  background-color: #ff6f61;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
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
