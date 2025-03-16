<script setup>
import backHeader from "@/components/common/backHeader.vue";
import { ref } from "vue";
import axios from "axios";

const title = ref("");
const content = ref("");
const festivalId = 1; // 실제 festivalId로 변경 필요

const submitPost = async () => {
  try {
    await axios.post(`https://festival-be.onrender.com/board/${festivalId}`, {
      title: title.value,
      content: content.value,
      boardType: "BOARD",
      lossType: "NULL",
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
    <h1>게시글 작성 페이지입니다.</h1>
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
      <button class="submit-button" @click="submitPost">
        게시글 등록하기>
      </button>
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
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

textarea {
  height: 200px;
  resize: none;
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

.backHeader {
  margin-bottom: 15px;
}
</style>
