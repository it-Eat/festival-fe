<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

function login() {
  if (username.value === "admin" && password.value === "1234") {
    router.push({ name: "admin" });
  } else {
    alert("로그인 실패");
  }
}
</script>

<template>
  <div class="login-container">
    <h2>관리자 로그인</h2>
    <form @submit.prevent="login" class="login-form">
      <input
        type="text"
        v-model="username"
        placeholder="사용자 이름"
        required
        class="input-field"
      />
      <input
        type="password"
        v-model="password"
        placeholder="비밀번호"
        required
        class="input-field"
      />
      <button type="submit" class="submit-button">로그인</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.input-field {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
