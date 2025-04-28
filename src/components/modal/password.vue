<script setup>
import { ref } from "vue";
import { passChange } from "@/api/admin";

const currentPassword = ref("");
const newPassword = ref("");
const emit = defineEmits(["close", "success", "loading"]);
const errorMessage = ref("");

const onClose = () => {
  emit("close");
};

const handleSubmit = async () => {
  try {
    emit("loading", true);
    await passChange(currentPassword.value, newPassword.value);
    emit("success");
  } catch {
    errorMessage.value = "비밀번호 변경에 실패했습니다.";
  } finally {
    emit("loading", false);
  }
};
</script>

<template>
  <div class="modal-overlay">
    <div class="password-modal">
      <h2>비밀번호 변경</h2>
      <button class="close-button" @click="onClose">×</button>

      <form @submit.prevent="handleSubmit" class="password-form">
        <div class="input-group">
          <label for="current-password">현재 비밀번호</label>
          <input
            id="current-password"
            type="password"
            v-model="currentPassword"
            placeholder="현재 비밀번호를 입력하세요"
            required
          />
        </div>

        <div class="input-group">
          <label for="new-password">새 비밀번호</label>
          <input
            id="new-password"
            type="password"
            v-model="newPassword"
            placeholder="새 비밀번호를 입력하세요"
            required
          />
        </div>

        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>

        <div class="button-group">
          <button type="submit" class="submit-button">변경하기</button>
          <button type="button" @click="$emit('close')" class="cancel-button">
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
}

.password-modal {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  position: relative;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.button-group {
  display: flex;
  gap: 30px;
  justify-content: center;
}

label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #ff6f61;
}

.submit-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}
.error-message {
  color: #ff6f61;
}

.submit-button:hover {
  background-color: #e65d52;
}

.cancel-button {
  background-color: #ddd;
  color: #666;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.cancel-button:hover {
  background-color: #ccc;
}

/* 반응형 디자인 */
@media (max-width: 480px) {
  .password-modal {
    padding: 20px;
  }

  h2 {
    font-size: 20px;
  }

  input,
  .submit-button,
  .cancel-button {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
