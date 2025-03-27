<template>
  <div class="check-modal">
    <div class="check-modal-content">
      <h3>{{ title }}</h3>
      <p v-for="(line, index) in messageLines" :key="index">
        {{ line }}
      </p>
      <div class="button-container">
        <button v-if="confirmText" @click="confirm">{{ confirmText }}</button>
        <button v-if="title !== '결제 완료' && confirmText" @click="cancel">
          취소
        </button>
        <button v-if="!confirmText" @click="cancel">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: "확인",
  },
});

const emit = defineEmits(["confirm", "cancel"]);
const confirm = () => {
  emit("confirm");
};
const cancel = () => {
  emit("cancel");
};

const messageLines = computed(() => {
  return props.message.split("\n");
});
</script>

<style scoped>
.check-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.check-modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 300px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 16px;
}

.button-container button {
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ff6b6b;
  background-color: #fff;
  color: #000;
  cursor: pointer;
}

.button-container button:hover {
  background-color: #ff6b6b;
  color: #fff;
}

p {
  text-align: center;
}
</style>
