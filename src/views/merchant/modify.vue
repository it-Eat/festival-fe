<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader />
      </div>
      <div class="content">
        <div class="main-image-container">
          <img
            :src="imageUrl"
            alt="대표 이미지"
            class="mainImg"
            @click="onImageClick"
          />
          <input
            type="file"
            id="image-upload-input"
            @change="onFileChange"
            accept="image/*"
            class="image-upload-input"
          />
        </div>
        <div class="info-container">
          <input
            type="text"
            v-model="storeName"
            placeholder="가게 이름"
            class="info-input"
          />
          <input
            type="text"
            v-model="location"
            placeholder="위치 : 카테고리"
            class="info-input"
          />
          <textarea
            v-model="description"
            placeholder="소개글"
            class="description-input"
          ></textarea>
        </div>
        <div class="button-container">
          <router-link to="/merchant/menuManage" class="menu-button"
            >메뉴관리 ></router-link
          >
          <button class="save-button" @click="saveChanges">수정 완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/common/backHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { BackHeader },
  setup() {
    const imageUrl = ref("https://via.placeholder.com/600x300");
    const storeName = ref("");
    const location = ref("");
    const description = ref("");
    const router = useRouter();

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageUrl.value = URL.createObjectURL(file);
      }
    };

    const onImageClick = () => {
      document.getElementById("image-upload-input").click();
    };

    const saveChanges = () => {
      // 수정 완료 로직 (예: 서버에 데이터 전송)
      console.log(
        "저장:",
        storeName.value,
        location.value,
        description.value,
        imageUrl.value
      );
    };

    return {
      imageUrl,
      storeName,
      location,
      description,
      onFileChange,
      saveChanges,
      router,
      onImageClick,
    };
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.page {
  display: flex;
  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.content {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
}

/* 추가 스타일 */
.info-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.info-input,
.description-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.description-input {
  height: 100px; /* 소개글 입력 영역 높이 */
  resize: vertical; /* 세로 크기 조절 가능 */
}

.button-container {
  display: flex;
  flex-direction: column; /* 버튼 세로 배치 */
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  align-items: center; /* 버튼 가운데 정렬 */
}

.menu-button,
.save-button {
  width: 80%; /* 버튼 너비 축소 */
  max-width: 300px; /* 최대 너비 제한 */
  padding: 8px 16px; /* 패딩 조정 */
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem; /* 글자 크기 약간 줄임 */
  box-sizing: border-box; /* 패딩, 테두리 포함 크기 계산 */
}

.menu-button {
  background-color: #eee;
  color: #333;
  text-decoration: none;
  text-align: center;
}

.save-button {
  background-color: #007bff;
  color: white;
}

.main-image-container {
  position: relative;
  width: 100%;
}

.mainImg {
  width: 100%;
  display: block;
  cursor: pointer; /* 이미지에 클릭 커서 표시 */
}

.image-upload-input {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
