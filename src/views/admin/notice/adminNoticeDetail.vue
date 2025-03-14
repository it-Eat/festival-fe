<template>
  <!-- 모달이 열려있을 때만 표시 -->
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- 상단 타이틀 영역 -->
      <div class="modal-header">
        <h2>공지사항</h2>
        <div class="button-group">
          <!-- 수정 버튼 -->
          <button class="edit-btn" @click="editNotice">수정</button>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>
      </div>
      <hr />

      <!-- 실제 공지사항 내용 -->
      <div class="modal-body">
        <!-- 제목이 따로 없으므로 바로 content를 표시하거나, 원하는 형식대로 -->
        <p>{{ notice?.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  notice: { type: Object, default: () => ({}) },
});

const emits = defineEmits(["close"]);

const closeModal = () => {
  emits("close");
};
</script>

<style scoped>
/* 모달 바깥 어둡게 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 모달 박스 */
.modal-content {
  background-color: #fff;
  width: 600px;
  height: 700px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: relative;
}

/* 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 버튼 그룹 (수정/닫기) */
.button-group {
  display: flex;
  gap: 8px;
}

/* 수정 버튼 스타일 */
.edit-btn {
  background-color: #835af1; /* 원하는 색상 */
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}
.edit-btn:hover {
  background-color: #6c42e1;
}

/* 닫기 버튼 */
.close-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
}

/* 구분선 */
.modal-content hr {
  margin: 12px 0;
  border: none;
  border-top: 1px solid #ddd;
}

/* 바디(내용 스크롤 가능) */
.modal-body {
  max-height: 60vh;
  overflow-y: auto;
  white-space: pre-wrap;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
