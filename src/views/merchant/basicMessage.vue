<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const selectedMessage = ref(null);
const minTime = ref(5);
const maxTime = ref(10);
const router = useRouter();

const messages = ["바로 가지러 오세욥.", "5분에서 10분 소요됩니다."];

const selectMessage = (message) => {
  selectedMessage.value = message;
};

const incrementTime = (timeType) => {
  if (timeType === "min") {
    minTime.value = Math.min(minTime.value + 1, 59); // 최대 59분
  } else if (timeType === "max") {
    maxTime.value = Math.min(maxTime.value + 1, 59); // 최대 59분
  }
};

const decrementTime = (timeType) => {
  if (timeType === "min") {
    minTime.value = Math.max(minTime.value - 1, 1); // 최소 1분
  } else if (timeType === "max") {
    maxTime.value = Math.max(maxTime.value - 1, 1); // 최소 1분
  }
};

const confirm = () => {
  if (selectedMessage.value) {
    alert("선택된 메세지: " + selectedMessage.value);
    router.back();
  } else {
    alert("메세지를 선택해주세요.");
  }
};
</script>

<template>
  <div class="page">
    <div class="home">
      <BackHeader />
      <div class="content">
        <div class="message-selection-container">
          <p>기본 주문 알림으로 사용할 메세지를 선택하세요.</p>

          <div class="message-options">
            <button
              v-for="(message, index) in messages"
              :key="index"
              :class="{ selected: selectedMessage === message }"
              @click="selectMessage(message)"
            >
              <template v-if="index === 1">
                {{ minTime }}분에서 {{ maxTime }}분 소요됩니다.
              </template>
              <template v-else>
                {{ message }}
              </template>
            </button>
          </div>

          <div class="time-adjusters" v-if="selectedMessage === messages[1]">
            <div class="time-adjuster">
              <label for="min-time">최소 시간:</label>
              <div class="time-input">
                <button @click="decrementTime('min')">▼</button>
                <span>{{ minTime }}</span>
                <button @click="incrementTime('min')">▲</button>
              </div>
            </div>

            <div class="time-adjuster">
              <label for="max-time">최대 시간:</label>
              <div class="time-input">
                <button @click="decrementTime('max')">▼</button>
                <span>{{ maxTime }}</span>
                <button @click="incrementTime('max')">▲</button>
              </div>
            </div>
          </div>

          <button class="confirm-button" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.message-selection-container {
  background-color: #f8f8f8; /* 아주 옅은 회색 배경 */
  padding: 30px; /* 패딩 증가 */
  border-radius: 15px; /* 더 둥근 테두리 */
  text-align: center;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1); /* 그림자 조정 */
  width: 100%; /* 너비 지정 */
}

.message-selection-container p {
  margin-bottom: 25px; /* 문단 아래 여백 증가 */
  font-size: 1.1em; /* 약간 더 큰 글꼴 */
  color: #555; /* 약간 어두운 글자색 */
}

.message-options {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 버튼 간 간격 증가 */
  margin-bottom: 30px; /* 버튼 그룹 아래 여백 증가 */
}

.message-options button {
  background-color: #40c7b4;
  color: white;
  padding: 15px 25px; /* 패딩 증가 */
  border: none;
  border-radius: 10px; /* 둥근 테두리 증가 */
  cursor: pointer;
  font-size: 1.1em; /* 약간 더 큰 글꼴 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* 버튼 그림자 추가 */
  transition: background-color 0.3s, transform 0.2s; /* 변환 효과 추가 */
}

.message-options button:hover {
  background-color: #26a69a;
  transform: translateY(-2px); /* 호버 시 살짝 위로 이동 */
}

.message-options button.selected {
  background-color: #009688;
  transform: translateY(0); /* 선택된 버튼은 이동하지 않음 */
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2); /* 내부 그림자 추가 */
}

.time-adjusters {
  display: flex;
  justify-content: center;
  gap: 30px; /* 시간 조절기 사이 간격 증가 */
  margin-bottom: 30px;
}

.time-adjuster {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-adjuster label {
  margin-bottom: 10px; /* 레이블 아래 여백 추가 */
  color: #777; /* 레이블 색상 조정 */
}

.time-input {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px; /* 둥근 테두리 조정 */
  padding: 8px; /* 패딩 조정 */
  background-color: white; /* 흰색 배경 */
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1); /* 내부 그림자 추가 */
}

.time-input button {
  background-color: #eee;
  border: none;
  padding: 8px 12px; /* 패딩 조정 */
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2em; /* 화살표 크기 조정 */
  line-height: 1; /* 화살표 세로 정렬 조정 */
  transition: background-color 0.2s; /* 배경색 전환 효과 */
}

.time-input button:hover {
  background-color: #ddd;
}

.time-input span {
  margin: 0 15px; /* 숫자 간 간격 조정 */
  min-width: 30px; /* 숫자 최소 너비 조정 */
  text-align: center;
  font-size: 1.2em; /* 숫자 크기 조정 */
  color: #333; /* 숫자 색상 조정 */
}

.confirm-button {
  background-color: #4287f5;
  color: white;
  padding: 15px 30px; /* 패딩 조정 */
  border: none;
  border-radius: 10px; /* 둥근 테두리 조정 */
  cursor: pointer;
  font-size: 1.1em; /* 글꼴 크기 조정 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* 버튼 그림자 추가 */
  transition: background-color 0.3s, transform 0.2s;
}

.confirm-button:hover {
  background-color: #357ae8;
  transform: translateY(-2px);
}
</style>
