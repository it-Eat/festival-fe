<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader :title="'이가네'"/>
      </div>

      <!-- 구분선 -->
      <hr class="divider" />

      <!-- 메인 콘텐츠 영역 -->
      <div class="content">
        <h3 class="title">상품 및 상점은 어떠셨나요?</h3>
        <div class="star-wrapper">
          <StarScore v-model:rating="rating" />
        </div>

        <!-- 구분선 -->
        <hr class="divider" />

        <textarea
          v-model="reviewText"
          class="review-textarea"
          placeholder="최대 20자 작성해 주세요."
          maxlength="20"
        ></textarea>

        <button class="submit-button" @click="submitReview">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 추가
import BackHeader from '@/components/common/backHeader.vue';
import StarScore from '@/components/common/starScore.vue';

const router = useRouter();
const rating = ref(0);
const reviewText = ref('');

const submitReview = () => {
  console.log('별점:', rating.value);
  console.log('리뷰 내용:', reviewText.value);

  // 리뷰 제출 로직 (예: API 호출)

  router.back(); // 이전 페이지로 이동
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
  resize: none; /* textarea 크기 조절 방지 */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 12px 40px;
  background-color: #839cf8;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 20px;
}

.submit-button:hover {
  background-color: #5c7ff0;
}
</style>
