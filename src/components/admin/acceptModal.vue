<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>부스 승인 관리</h2>
      <p>부스명: {{ booth?.name }}</p>
      <p>신청자: {{ booth?.user?.userName }}</p>
      <p>부스 위치:</p>
      <input
        v-model="location"
        type="text"
        class="booth-location"
        placeholder="부스 위치를 입력해주세요."
      />
      <div class="button-group">
        <button @click="onAccept" class="accept-btn">승인</button>
        <button @click="onReject" class="reject-btn">거절</button>
        <button @click="onClose" class="close-btn">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  isVisible: Boolean,
  booth: Object,
});

const emit = defineEmits(["accept", "reject", "close"]);
const location = ref("");

const onAccept = () => {
  if (!location.value) {
    alert("부스 위치를 입력해주세요.");
    return;
  }
  emit("accept", location.value);
};
const onReject = () => emit("reject");
const onClose = () => emit("close");
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.modal-content h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.modal-content p {
  font-size: 16px;
  margin: 0;
}

.button-group {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
}

.accept-btn {
  width: 100%;
  border: 1px solid #ff6f61;
  color: black;
  background: white;
}
.reject-btn {
  width: 100%;
  background: #ff6f61;
  color: white;
}
.close-btn {
  width: 100%;
  background: #9e9e9e;
  color: white;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.booth-location-container {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.booth-location {
  width: 100%;
  padding: 12px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
}
</style>
