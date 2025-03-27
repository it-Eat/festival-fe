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
          <div class="main-image-container-img">
            <img
              :src="imageUrl || noimage"
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
            readonly
            disabled
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
          <button class="save-button" @click="saveChanges">수정 완료</button>
        </div>
      </div>
    </div>
    <loadingComponent v-if="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";
import { useMerchantStore } from "@/stores/merchant";
import noimage from "@/assets/noimage.png";
import loadingComponent from "@/components/common/loadingComponent.vue";

const router = useRouter();
// merchantHome에서 boothId를 params로 넘겨줬다고 가정
const boothId = router.currentRoute.value.params.boothId;
const loading = ref(false);

const storeName = ref("");
const location = ref("");
const description = ref("");
const imageUrl = ref("");
const selectedFile = ref(null); // 선택한 이미지 파일을 저장

const merchantStore = useMerchantStore();

// 이미지 클릭 시 파일 선택 창 열기
const onImageClick = () => {
  document.getElementById("image-upload-input").click();
};

// 파일 변경 시 미리보기 업데이트 및 파일 객체 저장
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

// 수정 완료: 이미지 파일이 있다면 FormData로 보내고, 그 외 정보는 함께 PATCH 요청
const saveChanges = async () => {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("name", storeName.value);
    formData.append("content", description.value);
    // formData.append("location", location.value);
    // 이미지 파일이 선택되었으면 FormData에 파일로 추가
    if (selectedFile.value) {
      formData.append("image", selectedFile.value);
    } else {
      // 파일이 선택되지 않았다면 기존 이미지 URL 전송
      formData.append("image", imageUrl.value);
    }
    // 기존 api 경로 그대로 사용하여 부스 정보를 업데이트 (PATCH)
    await api.patch(`/booth/${boothId}/1`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("수정 완료:", formData);
    merchantStore.setStoreName(storeName.value);
    router.back();
  } catch (error) {
    console.error("부스 수정 실패:", error);
  } finally {
    loading.value = false;
  }
};

// 부스 정보 불러오기 (수정 전 기본값 세팅)
const fetchBoothInfo = async () => {
  try {
    loading.value = true;
    const res = await api.get(`/booth/${boothId}/1`);
    storeName.value = res.data.name || "";
    description.value = res.data.content || "";
    imageUrl.value = res.data.image || "";
    location.value = res.data.location || "";
  } catch (error) {
    console.error("부스 정보 불러오기 실패:", error);
  } finally {
    loading.value = false;
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
  margin: 10px 0;
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
.main-image-container-img {
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainImg {
  width: 450px;
  object-fit: fill;
  display: block;
  cursor: pointer;
  border-radius: 8px;
  max-height: 300px;
}
.image-upload-input {
  display: none;
}
.info-container {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 14px;
}
.info-input,
.description-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  box-sizing: border-box;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  font-size: 16px;
}
.info-input:focus,
.description-input:focus {
  outline: none;
}
.info-input:disabled {
  background-color: #f0f0f0;
}
.description-input {
  height: 100px;
  resize: none;
}
.button-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  gap: 18px;
}
.menu-button,
.save-button {
  width: 100%;
  max-width: 300px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;
  text-align: center;
}
.menu-button {
  background-color: white;
  color: #ff6f61;
  text-decoration: none;
  border: 1px solid #ff6f61;
}
.save-button {
  background-color: #ff6f61;
  color: white;
}

.save-button:hover,
.menu-button:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}
</style>
