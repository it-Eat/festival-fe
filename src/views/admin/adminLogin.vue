<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // router import 추가

const emit = defineEmits(["login"]); // emit 함수 정의
const username = ref("");
const password = ref("");
const router = useRouter(); // router 인스턴스 생성

function handleLogin() {
  console.log("로그인 시도:", username.value, password.value); // 로그인 시도 로그
  if (username.value === "admin" && password.value === "1234") {
    emit("login"); // 부모에게 로그인 이벤트 전달
    console.log("로그인 성공"); // 로그인 성공 로그
    // 로그인 성공 시 admin 페이지로 리다이렉트
    router.push({ name: "admin" });
  } else {
    alert("로그인 실패");
  }
}
</script>

<template>
  <div class="login-container">
    <h2>관리자 로그인</h2>
    <form @submit.prevent="handleLogin" class="login-form">
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
