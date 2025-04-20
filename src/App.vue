<script setup>
import { RouterView } from "vue-router";
import socketModal from "./components/common/socketModal.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore"; // 사용자 스토어
import { storeToRefs } from "pinia";
import { socket } from "@/main";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const message = ref(null);
const isModalOpen = ref(false);
// 소켓 이벤트 핸들러

onMounted(() => {
  // 소켓 연결 확인
  socket.on("connect", () => {
    // 연결 후 인증
    if (user.value?.id) {
      socket.emit("authenticate", `user_${user.value.id}`);
    }
  });

  // 에러 확인
  socket.on("connect_error", (error) => {
    console.error("소켓 연결 에러:", error);
  });

  // 알림 이벤트 리스너
  socket.on("new_notification", (data) => {
    message.value = data.message;
    isModalOpen.value = true;
  });
});

onUnmounted(() => {
  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  socket.off("new_notification");
});

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <RouterView />
  <socketModal v-if="isModalOpen" :message="message" @cancel="closeModal" />
</template>

<style>
* {
  font-family: "Pretendard";
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scrollbar-width: thin;
  scrollbar-color: #ff6f61 transparent;
}
</style>
