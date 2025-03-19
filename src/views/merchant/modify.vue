<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <!-- 부스 이름을 헤더에 표시 -->
        <BackHeader :title="storeName" />
      </div>

      <!-- 컨텐츠 영역 -->
      <div class="content">
        <!-- 대표 이미지 영역 (클릭 시 파일 선택) -->
        <div class="main-image-container">
          <img
            :src="imageUrl || 'https://via.placeholder.com/600x300'"
            alt="대표 이미지"
            class="mainImg"
            @click="onImageClick"
          />
          <input
            type="file"
            id="image-upload-input"
            accept="image/*"
            class="image-upload-input"
            @change="onFileChange"
          />
        </div>

        <!-- 부스 정보 입력 폼 -->
        <div class="info-container">
          <!-- 가게 이름 -->
          <input
            type="text"
            v-model="storeName"
            placeholder="가게 이름"
            class="info-input"
          />
          <!-- 위치/카테고리 (필요 시) -->
          <input
            type="text"
            v-model="location"
            placeholder="A-12 : 먹거리"
            class="info-input"
          />
          <!-- 소개글 -->
          <textarea
            v-model="description"
            placeholder="소개글"
            class="description-input"
          ></textarea>
        </div>

        <!-- 버튼 영역 -->
        <div class="button-container">
          <!-- 메뉴 관리 페이지로 이동 -->
          <router-link
            :to="{ name: 'menuManage', params: { id: boothId } }"
            class="menu-button"
          >
            메뉴 관리 &gt;
          </router-link>
          <!-- 수정 완료 버튼 -->
          <button class="save-button" @click="saveChanges">
            수정 완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";
import { useMerchantStore } from "@/stores/merchant";

const route = useRoute();
const router = useRouter();
// merchantHome에서 boothId를 params로 넘겨줬다고 가정
const boothId = route.params.id;

const storeName = ref("");
const location = ref("");
const description = ref("");
const imageUrl = ref("");

const merchantStore = useMerchantStore();

// 이미지 클릭 시 파일 선택 창 열기
const onImageClick = () => {
  document.getElementById("image-upload-input").click();
};

// 파일 변경 시 미리보기 업데이트
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
    // 실제 파일 업로드는 FormData나 Base64 등으로 구현 필요
  }
};

// 수정 완료: PATCH 요청으로 부스 정보 업데이트
const saveChanges = async () => {
  try {
    const payload = {
      name: storeName.value,
      content: description.value,
      image: imageUrl.value, // 실제 파일 업로드 로직에 맞게 조정
    };
    await api.patch(`/booth/${boothId}/1`, payload);
    console.log("수정 완료:", payload);
    merchantStore.setStoreName(storeName.value);
    router.back();
  } catch (error) {
    console.error("부스 수정 실패:", error);
  }
};

// 부스 정보 불러오기 (수정 전 기본값 세팅)
const fetchBoothInfo = async () => {
  try {
    const res = await api.get(`/booth/${boothId}/1`);
    storeName.value = res.data.name || "";
    description.value = res.data.content || "";
    imageUrl.value = res.data.image || "";
    location.value = res.data.location || "";
  } catch (error) {
    console.error("부스 정보 불러오기 실패:", error);
  }
};

onMounted(() => {
  fetchBoothInfo();
});
</script>

<style scoped>
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
.main-image-container {
  position: relative;
  width: 100%;
  margin-bottom: 16px;
}
.mainImg {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.image-upload-input {
  display: none;
}
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
  height: 100px;
  resize: vertical;
}
.button-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
}
.menu-button,
.save-button {
  width: 80%;
  max-width: 300px;
  padding: 8px 16px;
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  box-sizing: border-box;
  text-align: center;
}
.menu-button {
  background-color: #eee;
  color: #333;
  text-decoration: none;
}
.save-button {
  background-color: #007bff;
  color: white;
}
</style>
