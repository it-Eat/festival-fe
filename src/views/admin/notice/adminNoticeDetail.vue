<template>
  <!-- 모달이 열려있을 때만 표시 -->
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- 상단 타이틀 영역 -->
      <div class="modal-header">
        <h2>공지사항</h2>
        <div class="button-group">
          <template v-if="!isEditing">
            <button class="edit-btn" @click="editNotice">수정</button>
          </template>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>
      </div>

      <!-- 모달 본문 -->
      <div class="modal-body">
        <!-- 수정 모드 -->
        <template v-if="isEditing">
          <textarea v-model="editedContent" class="edit-textarea"></textarea>
          <div class="edit-buttons">
            <button class="update-btn" @click="updateNotice">수정 완료</button>
            <button class="cancel-btn" @click="cancelEdit">취소</button>
          </div>
        </template>
        <!-- 읽기 모드 -->
        <template v-else>
          <p>{{ notice?.content }}</p>
        </template>
      </div>
    </div>
    <loadingComponent v-if="loadingType !== 'none'" />
    <checkModal
      v-if="isModalOpen"
      :modalType="modalType"
      :modalConfig="modalConfig"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import api from "@/api/axiosInstance";
import { useRouter } from "vue-router";
import checkModal from "@/components/common/checkModal.vue";
import loadingComponent from "@/components/common/loadingComponent.vue";

const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  notice: { type: Object, default: () => ({}) },
});
const emits = defineEmits(["close", "update-success"]);

const isEditing = ref(false);
const editedContent = ref("");
const isModalOpen = ref(false);
const modalType = ref("");
const modalConfig = ref({
  title: "",
  message: "",
  confirmText: "",
});
const loadingType = ref("none");
// notice 값이 바뀔 때마다 편집용 내용을 초기화
watch(
  () => props.notice,
  (newNotice) => {
    if (newNotice && newNotice.content) {
      editedContent.value = newNotice.content;
    }
  },
  { immediate: true }
);

// 수정 모드 진입
const editNotice = () => {
  isEditing.value = true;
};

// 수정 취소
const cancelEdit = () => {
  isEditing.value = false;
  editedContent.value = props.notice.content;
};

// 수정 API 호출
const updateNotice = async () => {
  try {
    loadingType.value = "loading";
    const noticeId = props.notice.id;
    const endpoint = `notice/${noticeId}/${festivalId}`;
    await api.patch(
      endpoint,
      { content: editedContent.value },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    // 성공 시 이벤트 emit 후 모달 닫기
    emits("update-success");
    closeModal();
  } catch (error) {
    console.error("공지사항 수정 실패", error);
    isModalOpen.value = true;
    modalType.value = "notice";
    modalConfig.value = {
      title: "공지사항 수정 실패",
      message: "공지사항 수정에 실패했습니다.",
      confirmText: "",
    };
  } finally {
    loadingType.value = "none";
  }
};

const handleCancel = () => {
  isModalOpen.value = false;
  isEditing.value = false;
};

// 모달 닫기
const closeModal = () => {
  emits("close");
  isEditing.value = false;
};
</script>

<style scoped>
/* 모달 바깥 어둡게 */
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
  height: 700px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: relative;
}

/* 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

/* 버튼 그룹 (수정/닫기) */
.button-group {
  display: flex;
  gap: 24px;
}

/* 수정 버튼 스타일 */
.edit-btn {
  background-color: #fff;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}
.edit-btn:hover {
  background-color: #ff6b6b;
  color: white;
}

/* 닫기 버튼 */
.close-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
}

/* 모달 바디 */
.modal-body {
  max-height: 90%;
  /* 세로 스크롤은 유지, 가로 스크롤은 숨김 */
  overflow-y: auto;
  overflow-x: hidden;

  /* 긴 문자열 자동 줄바꿈 */
  white-space: pre-wrap;
  word-wrap: break-word; /* 또는 overflow-wrap: break-word; */

  font-size: 16px;
  line-height: 1.5;
  scrollbar-width: thin;
  scrollbar-color: #ff6b6be0 transparent;
}

/* 고정 사이즈의 수정 모드 textarea */
.edit-textarea {
  width: 100%;
  max-height: 500px;
  min-height: 500px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none; /* 사용자가 크기 조절 불가 */

  /* 세로 스크롤은 자동, 가로 스크롤은 숨김 */
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;

  /* 긴 문자열 자동 줄바꿈 */
  white-space: pre-wrap;
  word-wrap: break-word;
}

.edit-textarea:focus {
  outline: none;
}

/* 수정 모드 버튼 그룹 */
.edit-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.update-btn {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.update-btn:hover {
  background-color: #e96161;
  color: white;
}
.cancel-btn {
  background-color: #ccc;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-btn:hover {
  background-color: #b8b8b8;
  color: white;
}
</style>
