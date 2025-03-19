<template>
  <div class="page">
    <div class="home">
      <BackHeader />
      <div class="content">
        <div class="message-selection-container">
          <p>기본 주문 알림으로 사용할 메세지를 선택하세요.</p>

          <!-- 메시지 선택 버튼들 -->
          <div class="message-options">
            <button
              v-for="(message, index) in messages"
              :key="index"
              :class="{ selected: selectedMessage === message }"
              @click="selectMessage(message)"
            >
              <!-- 두 번째 메시지는 minTime, maxTime을 동적으로 표시 -->
              <template v-if="index === 1">
                {{ minTime }}분에서 {{ maxTime }}분 소요됩니다.
              </template>
              <template v-else>
                {{ message }}
              </template>
            </button>
          </div>

          <!-- 시간 설정 파트(두 번째 메시지를 선택했을 때만 표시) -->
          <div class="time-adjusters" v-if="selectedMessage === messages[1]">
            <div class="time-adjuster">
              <label for="min-time">최소 시간</label>
              <div class="time-input">
                <input
                  id="min-time"
                  type="number"
                  v-model.number="minTime"
                  min="1"
                  max="59"
                />
              </div>
            </div>

            <div class="time-adjuster">
              <label for="max-time">최대 시간</label>
              <div class="time-input">
                <input
                  id="max-time"
                  type="number"
                  v-model.number="maxTime"
                  min="1"
                  max="59"
                />
              </div>
            </div>
          </div>

          <!-- 확인 버튼 -->
          <button class="confirm-button" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStores"; // cartStore 가져오기
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";

// cartStore 사용
const cartStore = useCartStore();
const router = useRouter();

// boothId는 cartStore에서, festivalId는 1로 고정
const boothId = cartStore.boothId;
const festivalId = 1;

// 선택된 메시지
const selectedMessage = ref(null);

// 최소/최대 시간 (기본값 5, 10)
const minTime = ref(5);
const maxTime = ref(10);

// 메시지 목록
const messages = ["바로 가지러 오세요.", "5분에서 10분 소요됩니다."];

// 메시지 선택
const selectMessage = (message) => {
  selectedMessage.value = message;
};

// 범위 보정 + 최대시간이 최소시간 이상 되도록 처리
watch(minTime, (newVal) => {
  if (newVal < 1) {
    minTime.value = 1;
  } else if (newVal > 59) {
    minTime.value = 59;
  }
  if (maxTime.value < newVal) {
    maxTime.value = newVal;
  }
});
watch(maxTime, (newVal) => {
  if (newVal < 1) {
    maxTime.value = 1;
  } else if (newVal > 59) {
    maxTime.value = 59;
  }
  if (newVal < minTime.value) {
    minTime.value = newVal;
  }
});

// 확인 버튼 클릭 시 실행
const confirm = async () => {
  if (!selectedMessage.value) {
    alert("메세지를 선택해주세요.");
    return;
  }

  try {
    // FormData 생성
    const formData = new FormData();

    // 두 번째 메시지를 선택했을 경우에는 minTime, maxTime 값으로 문자열을 조합
    if (selectedMessage.value === messages[1]) {
      formData.append(
        "waitingTime",
        `${minTime.value}분에서 ${maxTime.value}분 소요됩니다.`
      );
    } else {
      formData.append("waitingTime", selectedMessage.value);
    }

    // 서버에 POST 요청
    const response = await api.patch(`/booth/${boothId}/${festivalId}`, formData);

    console.log("서버 응답:", response.data);
    alert("전송 성공!");

    // 이전 화면으로 돌아가기
    router.back();
  } catch (error) {
    console.error("전송 실패:", error);
    alert("전송 실패!");
  }
};
</script>

<style scoped>
/* 페이지 레이아웃 */
.page {
  display: flex;
  justify-content: center;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

/* 컨테이너 스타일 */
.message-selection-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}
.message-selection-container p {
  margin-bottom: 25px;
  font-size: 1.1em;
  color: #555;
}

/* 메시지 버튼 스타일 */
.message-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}
.message-options button {
  background-color: #fff;
  color: #FF6F61;
  padding: 15px 25px;
  border: 2px solid #FF6F61;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s, transform 0.2s;
}
.message-options button:hover {
  background-color: #ffeae7;
  transform: translateY(-2px);
}
.message-options button.selected {
  background-color: #FF6F61;
  color: #fff;
  transform: none;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2);
}

/* 시간 조절 영역 스타일 */
.time-adjusters {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}
.time-adjuster {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time-adjuster label {
  margin-bottom: 10px;
  color: #777;
}
.time-input {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  background-color: white;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1);
}
.time-input input {
  width: 60px;
  font-size: 1.2em;
  text-align: center;
  border: none;
  outline: none;
}

/* 확인 버튼 스타일 */
.confirm-button {
  background-color: #FF6F61;
  color: #fff;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s, transform 0.2s;
}
.confirm-button:hover {
  background-color: #e55c50;
  transform: translateY(-2px);
}
</style>
