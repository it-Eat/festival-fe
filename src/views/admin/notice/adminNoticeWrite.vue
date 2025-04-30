<template>
  <!-- isOpen이 true일 때만 모달 표시 -->
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- 헤더 -->
      <div class="modal-header">
        <h2>공지사항 작성 <span class="edit-icon">🖋</span></h2>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
      <hr />

      <!-- 바디 (textarea) -->
      <div class="modal-body">
        <textarea
          v-model="content"
          class="write-textarea"
          placeholder="공지사항 내용을 입력하세요."
        ></textarea>
      </div>

      <!-- 하단 등록 버튼 -->
      <div class="modal-footer">
        <button class="submit-btn" @click="submitNotice">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import api from "@/api/axiosInstance";
import { useRouter } from "vue-router";

const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;

const props = defineProps({
  // 모달 열림/닫힘 상태
  isOpen: { type: Boolean, default: false },
});

const emits = defineEmits(["close", "write-success"]);

// 작성할 내용
const content = ref("");

// 모달 열릴 때마다 content 초기화
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      content.value = "";
    }
  }
);

// 모달 닫기
const closeModal = () => {
  emits("close");
};

// 작성 API 호출
const submitNotice = async () => {
  try {
    // 내용이 비어있는지 체크
    if (!content.value.trim()) {
      alert("공지사항 내용을 작성해주세요.");
      return;
    }

    // festivalId, API 엔드포인트는 실제 상황에 맞게 수정

    const endpoint = `notice/${festivalId}`;

    await api.post(
      endpoint,
      { content: content.value },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    // 작성 성공 시 부모에게 알림
    emits("write-success");
    // 모달 닫기
    closeModal();
  } catch (error) {
    console.error("공지사항 작성 실패", error);
    alert("공지사항 작성에 실패했습니다.");
  }
};
</script>

<style scoped>
/* 모달 배경(어둡게) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 모달 박스 */
.modal-content {
  background-color: #fff;
  width: 600px;
  height: 600px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 닫기 버튼 */
.close-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
}

/* 구분선 */
.modal-content hr {
  margin: 12px 0;
  border: none;
  border-top: 1px solid #ddd;
}

/* 본문 */
.modal-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}

/* 텍스트에어리어 */
.write-textarea {
  width: 95%;
  height: 80%;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  font-size: 1rem;
  resize: none;
  outline: none;
}

/* 하단 푸터(등록 버튼) */
.modal-footer {
  text-align: center;
}

/* 등록 버튼 */
.submit-btn {
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
}
.submit-btn:hover {
  background-color: #e65d52;
}

/* 아이콘 */
.edit-icon {
  font-size: 1rem;
  margin-left: 8px;
}
</style>
