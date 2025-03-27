<template>
  <div class="modal">
    <div class="modal-content">
      <h1 class="modal-title">공지사항 알림</h1>
      <div class="modal-message">
        <p>{{ message }}</p>
      </div>
      <button class="modal-close" @click="cancel">닫기</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["cancel"]);
defineProps({
  message: {
    type: String,
    required: true,
  },
});
const cancel = () => {
  emit("cancel");
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 16px;
  border-radius: 10px;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ff6f61 transparent;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
}

.modal-message {
  font-size: 16px;
}

.modal-close {
  cursor: pointer;
  background-color: #fff;
  color: #ff6f61;
  border: 1px solid #ff6f61;
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 14px;
  font-size: 16px;
}
</style>
