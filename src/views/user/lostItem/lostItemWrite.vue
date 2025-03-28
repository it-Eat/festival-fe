<script setup>
import backHeader from "@/components/common/backHeader.vue";
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const title = ref("");
const content = ref([]);
const lossType = ref([]);
const images = ref([]);

const route = useRoute();
const festivalId = route.params.festivalId;
const baseUrl = import.meta.env.VITE_VUE_API_URL;
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
    await axios.post(`${baseUrl}/board/${festivalId}`, formData, {
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
    <backHeader title="게시글 작성" />
    <div class="form-wrapper">
      <div class="title-lossType-container">
        <input
          v-model="title"
          type="text"
          placeholder="제목을 입력해주세요"
          class="input-title"
        />
        <select v-model="lossType" class="input-select">
          <option value="LOSS">분실</option>
          <option value="GET">습득</option>
        </select>
      </div>
      <textarea
        v-model="content"
        placeholder="게시글 내용을 작성해주세요."
        class="content-area"
      ></textarea>
      <input
        type="file"
        multiple
        @change="images = Array.from($event.target.files)"
        class="input-images"
      />
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
  padding: 10px;
  margin: 12px 0;
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
  margin-top: 20px;
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
</style>
