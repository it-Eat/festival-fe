<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader />
      </div>
      <div class="content">
        <h3>상품 및 상점은 어떠셨나요?</h3>
        <StarScore v-model:rating="rating" />
        <textarea v-model="reviewText" placeholder="최대 20자 작성해 주세요." maxlength="20"></textarea>
        <button @click="submitReview">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 추가
import BackHeader from '@/components/common/backHeader.vue';
import StarScore from '@/components/common/starScore.vue';

const router = useRouter(); // useRouter 초기화
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
    display: flex;
    flex-direction: column;
    align-items: center;
}
textarea {
    width: 100%;
    height: 400px;
    margin-bottom: 10px;
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    resize: none; /* textarea 크기 조절 방지 */
}
button {
    padding: 10px 20px;
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
}
</style>
