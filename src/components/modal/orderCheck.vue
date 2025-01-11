<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="showModal = false">&times;</span>
      <h2 class="modal-title">주문 확인</h2>
      <div class="order-details">
        <ul>
          <li v-for="item in menuItems" :key="item.id">
            {{ item.name }} {{ item.count }}개
          </li>
        </ul>
        <p>주문번호: {{ orderNumber }}</p>
        <p>고객명: {{ customerName }}</p>
      </div>
      <div class="message-container">
        <p class="message-label">메시지 선택:</p>
        <div class="button-group">
          <button
            v-for="message in messages"
            :key="message"
            :class="{ selected: message === selectedMessage }"
            @click="selectMessage(message)"
          >
            {{ message }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showModal = ref(true);
const menuItems = ref([
  { id: 1, name: '떡볶이', count: 2 },
  { id: 2, name: '순대', count: 1 },
  { id: 3, name: '오뎅', count: 3 }
]);
const orderNumber = ref('A-03');
const customerName = ref('김*민');
const messages = ref(['바로 가지러 오세요', '5-10분 소요됩니다.', '15-20분 소요됩니다.']);
const selectedMessage = ref('5-10분 소요됩니다.');

const selectMessage = (message) => {
  selectedMessage.value = message;
  showModal.value = false;
};

onMounted(() => {
  // 10초 (1000 milliseconds) 후에 showModal 값을 false로 변경하여 모달 닫기
  setTimeout(() => {
    showModal.value = false;
  }, 10000);
});
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  width: 400px; /* 너비 조정 */
}

.modal-title {
    text-align: center;
    margin-bottom: 20px; /* 제목 아래 간격 추가 */
    color: #333;
}

.order-details {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.order-details ul {
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
}

.order-details li {
    padding: 5px 0;
}

.message-container {
  margin-top: 20px;
}

.message-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.button-group button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #eee;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 부드러운 변화 효과 */
}

.button-group button.selected {
  background-color: #007bff; /* 선택된 버튼 색상 변경 */
  color: white;
}

.button-group button:hover {
    background-color: #ddd;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}
</style>
