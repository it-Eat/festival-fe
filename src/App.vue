<script setup>
import { RouterView } from "vue-router";
import socketModal from "./components/common/socketModal.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { socket } from "@/main";
const message = ref(null);
const title = ref(null);
const isModalOpen = ref(false);
// 소켓 이벤트 핸들러

onMounted(() => {
  // 소켓 연결 확인
  socket.on("connect", () => {
    console.log("소켓 연결됨");
  });

  // 에러 확인
  socket.on("connect_error", (error) => {
    console.error("소켓 연결 에러:", error);
  });

  // 알림 이벤트 리스너
  socket.on("new_notification", (data) => {
    title.value = "공지사항 알림";
    message.value = data.message;
    isModalOpen.value = true;
  });

  //댓글 알림
  socket.on("new_userNotification", (data) => {
    title.value = "댓글 알림";
    message.value = data.message;
    isModalOpen.value = true;
  });
});

onUnmounted(() => {
  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  socket.off("connect");
  socket.off("connect_error");
  socket.off("new_notification");
  socket.off("new_userNotification");
});

const closeModal = () => {
  isModalOpen.value = false;
  message.value = null;
  title.value = null;
};
</script>

<template>
  <RouterView />
  <socketModal
    v-if="isModalOpen"
    :message="message"
    :title="title"
    @cancel="closeModal"
  />
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
