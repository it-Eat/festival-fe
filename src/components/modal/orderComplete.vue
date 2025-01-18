<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isModalVisible = ref(true); // 모달 표시 여부
const router = useRouter();

const closeModal = () => {
  isModalVisible.value = false;
  router.push('/user');
};

const customerNumber = 'A-24'; // 고객 번호
</script>

<template>
  <div>
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal">
        <h2>주문 완료</h2>
        <p>{{ customerNumber }}번 손님</p>
        <p>지금 바로 와주세요</p>
        <button @click="closeModal">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed; /* 화면 전체를 덮도록 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.modal {
  background-color: #f0dcdc; /* 연한 분홍색 배경 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center; /* 텍스트 중앙 정렬 */
}

.modal h2 {
    margin-top: 0; /* h2 상단 마진 제거 */
}

.modal button {
    background-color: #ddd;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
