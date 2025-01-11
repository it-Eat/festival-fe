<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const emit = defineEmits(["login"]);
const festivalCode = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  const loginUser = {
    festivalCode: festivalCode.value,
    password: password.value,
  };

  try {
    const response = await axios.post(
      "https://festival-be.onrender.com/user/admin",
      loginUser,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      console.log("로그인 성공");
      console.log("로그인 시도:", festivalCode.value, password.value);
      emit("login");

      router.push({ name: "admin" });
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  } catch (error) {
    console.error("API 요청 오류", error);
    alert("로그인 실패");
  }
};
</script>

<template>
  <div class="login-container">
    <h2>관리자 로그인</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <input
        type="text"
        v-model="festivalCode"
        placeholder="축제 코드"
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
