<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader :title="storeName" />
      </div>

      <!-- 컨텐츠 영역 -->
      <div class="content">
        <!-- 대표 이미지 (클릭 시 파일 선택) -->
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
          <!-- 위치, 카테고리 (필요 시) -->
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
          <!-- 메뉴 관리 페이지 이동 -->
          <router-link to="/merchant/menuManage" class="menu-button"
            >메뉴 관리 ></router-link
          >
          <!-- 수정 완료 버튼 -->
          <button class="save-button" @click="saveChanges">수정 완료</button>
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

// 예: 상태 관리(필요시)
import { useMerchantStore } from "@/stores/merchant";

// 라우트에서 boothId를 가져온다고 가정
const route = useRoute();
const router = useRouter();
const boothId = route.params.id || 1; // 파라미터가 없으면 임의로 1

// storeName, location, description, imageUrl 등 폼 데이터
const storeName = ref("");
const location = ref("");
const description = ref("");
const imageUrl = ref(""); // 미리보기용

// Merchant Store 예시
const merchantStore = useMerchantStore();

// 이미지 클릭 시 파일 선택 창 열기
const onImageClick = () => {
  document.getElementById("image-upload-input").click();
};

// 파일이 변경되면 미리보기 업데이트
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 브라우저 미리보기용
    imageUrl.value = URL.createObjectURL(file);

    // 실제 서버로 전송 시 파일 자체 또는 Base64로 변환하여 보내야 할 수 있음
    // 예: const reader = new FileReader();
    // reader.onload = () => {
    //   const base64String = reader.result;
    //   // base64String을 서버에 전송
    // };
    // reader.readAsDataURL(file);
  }
};

// 수정 완료 시 서버에 PATCH 요청 (booth/{boothId}/1)
const saveChanges = async () => {
  try {
    // 수정할 데이터 (name, content, image) - 필요에 따라 key 추가
    const payload = {
      name: storeName.value,
      content: description.value,
      // image는 백엔드 요구사항에 맞춰 전송
      image: imageUrl.value, // 단순 미리보기 URL이 아니라, 실제 파일 업로드 로직 필요할 수 있음
    };

    await api.patch(`/booth/${boothId}/1`, payload);
    console.log("수정 완료:", payload);

    // 필요한 경우, merchantStore 업데이트
    merchantStore.setStoreName(storeName.value);

    // 이전 페이지 혹은 다른 페이지로 이동
    router.back();
  } catch (error) {
    console.error("부스 수정 실패:", error);
  }
};

// onMounted 시 부스 정보를 불러와 폼에 세팅 (선택)
const fetchBoothInfo = async () => {
  try {
    const res = await api.get(`/booth/${boothId}/1`);
    // 받아온 데이터를 폼에 반영
    storeName.value = res.data.name || "";
    description.value = res.data.content || "";
    imageUrl.value = res.data.image || "";
    // location 등도 받아왔다면 세팅
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
  height: 250px; /* 원하는 높이 */
  object-fit: cover;
  display: block;
  cursor: pointer; /* 이미지에 클릭 커서 표시 */
  border: 1px solid #ddd;
  border-radius: 4px;
}

.image-upload-input {
  display: none; /* 실제 파일 인풋 숨김 */
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
  width: 80%; /* 버튼 너비 */
  max-width: 300px; /* 최대 너비 제한 */
  padding: 8px 16px; /* 패딩 조정 */
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem; /* 글자 크기 */
  box-sizing: border-box; /* 패딩, 테두리 포함 크기 계산 */
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
