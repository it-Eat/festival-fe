<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader :title="storeName" />
      </div>

      <!-- 구분선 -->
      <hr class="divider" />

      <!-- 메인 콘텐츠 영역 -->
      <div class="content">
        <h3 class="title">상품 및 상점은 어떠셨나요?</h3>

        <!-- 별점 컴포넌트 (별점 선택) -->
        <div class="star-wrapper">
          <StarScore v-model:rating="rating" />
        </div>

        <!-- 구분선 -->
        <hr class="divider" />

        <!-- 리뷰 입력 textarea -->
        <textarea
          v-model="reviewText"
          class="review-textarea"
          placeholder="최대 20자 작성해 주세요."
          maxlength="20"
        ></textarea>

        <!-- 등록 버튼 -->
        <button class="submit-button" @click="submitReview">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import StarScore from "@/components/common/starScore.vue";
import api from "@/api/axiosInstance";

const router = useRouter();
const route = useRoute();

// query로 넘어온 boothId, boothName (안전하게 기본값 지정)
const boothId = route.query.boothId || null;
const boothName = route.query.boothName || "상점 이름";

// 기본 storeName은 boothName으로 설정
const storeName = ref(boothName);
const festivalId = route.params.festivalId;

// 부스 정보를 API로 업데이트 (선택 사항)
const fetchBoothInfo = async () => {
  try {
    const res = await api.get(`/booth/${boothId}/${festivalId}`);
    storeName.value = res.data.name;
  } catch (error) {
    console.error("부스 정보 불러오기 실패:", error);
  }
};

onMounted(() => {
  if (boothId) {
    fetchBoothInfo();
  }
});

// 별점과 리뷰 내용을 관리할 ref
const rating = ref(0);
const reviewText = ref("");

// 리뷰 등록 함수
const submitReview = async () => {
  try {
    const scoreValue = parseInt(rating.value, 10);
    if (!boothId) {
      console.error("boothId가 없습니다.");
      return;
    }
    await api.post(`/review/${boothId}`, {
      content: reviewText.value,
      score: scoreValue,
    });
    router.back();
  } catch (error) {
    console.error("리뷰 작성 실패:", error);
  }
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
  background-color: #fff;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
    margin: 0;
  }
}

.header {
  width: 100%;
  margin-bottom: 0px;
}

.divider {
  width: 90%;
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.star-wrapper {
  margin-bottom: 10px;
}

.review-textarea {
  width: 90%;
  height: 200px;
  margin: 20px auto;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 12px 40px;
  background-color: #839cf8;
  border: none;
  color: white;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 20px;
}

.submit-button:hover {
  background-color: #5c7ff0;
}
</style>
