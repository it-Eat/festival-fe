<template>
  <div class="wrapper">
    <h1>분실물 게시글 상세</h1>
    <!-- 게시글 카드 + 댓글 카드 -->
    <div v-if="board" class="detail-container">
      <div class="board-container">
        <div class="board-card">
          <h2 class="board-title">{{ board?.title || "제목 없음" }}</h2>
          <div class="board-info">
            <p><strong>작성자:</strong> {{ board.userName }}</p>
            <p>
              <strong>작성일자:</strong>
              {{ dateFormatWithTime(board.createdAt) }}
            </p>
          </div>
          <!-- 이미지 영역: 이미지가 여러 개면 좌우 버튼으로 전환 -->
          <div class="image-wrapper">
            <div v-if="board.images.length > 0">
              <div class="image-container">
                <img
                  :src="board.images[currentImageIndex]"
                  alt=""
                  class="board-image"
                />
                <!-- 이미지가 두 개 이상일 때만 네비게이션 버튼 표시 -->
                <div v-if="board.images.length > 1" class="carousel-buttons">
                  <button class="carousel-btn" @click="prevImage">〈</button>
                  <button class="carousel-btn" @click="nextImage">〉</button>
                </div>
              </div>
            </div>
            <div v-else class="no-image">📸 첨부된 이미지가 없습니다.</div>
          </div>
          <div class="board-content">
            <p>{{ board?.content || "내용이 없습니다." }}</p>
          </div>
        </div>
      </div>

      <!-- 댓글 목록 -->
      <div class="comment-container">
        <div class="comment-card">
          <div class="comment-header">
            <h2>💬 댓글 목록</h2>
            <!-- 삭제 버튼: 클릭 시 deleteComment 함수 호출 -->
            <button class="delete-btn" @click="deleteComment">댓글 삭제</button>
          </div>

          <p v-if="comments.length === 0">아직 댓글이 없습니다. ಥ_ಥ</p>

          <table v-else class="comment-table">
            <thead>
              <tr>
                <th></th>
                <th>작성자</th>
                <th>내용</th>
                <th>작성일자</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comment in comments" :key="comment.id">
                <td>
                  <!-- 라디오 버튼 사용: 하나의 댓글만 선택 -->
                  <input
                    type="radio"
                    name="selectedComment"
                    :value="comment.id"
                    v-model="selectedCommentId"
                  />
                </td>
                <td class="comment-user-name">
                  {{ comment?.user?.userName || "익명" }}
                </td>
                <td class="comment-content">
                  {{
                    comment.content.length > 12
                      ? comment.content.slice(0, 12) + "..."
                      : comment.content
                  }}
                </td>
                <td class="comment-date">
                  {{ dateFormatWithoutTime(comment?.createdAt) || "-" }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 페이지네이션 (추후 로직 추가 가능) -->
          <div class="pagination">
            <button class="page-btn">〈</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">〉</button>
          </div>
        </div>
      </div>
    </div>
    <div class="back-btn-container">
      <button
        @click="router.push(`/admin/${festivalId}/adminLost`)"
        class="back-btn"
      >
        ← 목록으로 돌아가기
      </button>
      <button @click="deleteBoardHandler" class="del-btn">
        게시글 삭제하기
      </button>
    </div>
    <loadingComponent v-if="loadingType === 'loading'" />
    <checkModal
      v-if="isModalOpen"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :confirmText="modalConfig.confirmText"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getComments, deleteBoard } from "@/api/admin";
import api from "@/api/axiosInstance";
import loadingComponent from "@/components/common/loadingComponent.vue";
import { dateFormatWithTime, dateFormatWithoutTime } from "@/util/dateFormat";
import checkModal from "@/components/common/checkModal.vue";

const route = useRoute();
const router = useRouter();
const board = ref(null);
const comments = ref([]);
// 이미지 캐러셀을 위한 현재 이미지 인덱스
const currentImageIndex = ref(0);
// 삭제할 댓글의 id를 단일 선택으로 관리
const selectedCommentId = ref(null);
const festivalId = router.currentRoute.value.params.festivalId;
const loadingType = ref("none");
const isModalOpen = ref(false);
const modalType = ref("");
const modalConfig = ref({
  title: "",
  message: "",
  confirmText: "삭제",
});

// 댓글 목록 조회 함수
const fetchComments = async () => {
  try {
    loadingType.value = "loading";
    const { boardId, festivalId } = route.params;
    const response = await getComments(boardId, festivalId);
    comments.value = response || [];
  } catch (error) {
    console.error("댓글 API 호출 실패:", error);
  } finally {
    loadingType.value = "none";
  }
};

// 이미지 다음/이전 전환 함수
const nextImage = () => {
  if (board.value && board.value.images && board.value.images.length > 1) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % board.value.images.length;
  }
};

const prevImage = () => {
  if (board.value && board.value.images && board.value.images.length > 1) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + board.value.images.length) %
      board.value.images.length;
  }
};

// 선택된 댓글 삭제 함수 (DELETE comment/{commentId}/{festivalId})
const deleteComment = async () => {
  if (!selectedCommentId.value) {
    modalType.value = "comment";
    modalConfig.value = {
      title: "댓글 삭제",
      message: "삭제할 댓글을 선택해 주세요.",
      confirmText: "",
    };
    isModalOpen.value = true;
    return;
  }
  modalType.value = "comment";
  modalConfig.value = {
    title: "댓글 삭제",
    message: "선택한 댓글을 삭제하시겠습니까?",
    confirmText: "삭제",
  };
  isModalOpen.value = true;
};

// 게시글 삭제 함수
const deleteBoardHandler = async () => {
  modalType.value = "loss";
  modalConfig.value = {
    title: "분실물 게시글 삭제",
    message: "분실물 게시글을 삭제하시겠습니까?",
    confirmText: "삭제",
  };
  isModalOpen.value = true;
};

onMounted(() => {
  // 이전 페이지에서 전달된 board 데이터를 사용
  if (history.state.item) {
    board.value = JSON.parse(history.state.item);
  } else {
    router.push(`/admin/${festivalId}/adminLost`);
  }
  fetchComments();
});

const handleConfirm = async () => {
  try {
    isModalOpen.value = false;
    loadingType.value = "loading";
    if (modalType.value === "loss") {
      await deleteBoard(board.value.id, festivalId);
      router.push(`/admin/${festivalId}/adminLost`);
    } else if (modalType.value === "comment") {
      const response = await api.delete(
        `comment/${selectedCommentId.value}/${festivalId}`
      );
      if (response.status === 204) {
        comments.value = comments.value.filter(
          (comment) => comment.id !== selectedCommentId.value
        );
        selectedCommentId.value = null;
      }
    }
  } catch (error) {
    console.error("삭제 실패:", error);
    modalConfig.value = {
      title: "삭제 실패",
      message: "삭제에 실패했습니다.",
      confirmText: "",
    };
    isModalOpen.value = true;
  } finally {
    loadingType.value = "none";
    isModalOpen.value = false;
  }
};

// 모달 취소 처리
const handleCancel = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
/* 전체 페이지 중앙 정렬 및 상하 여백 */
.wrapper {
  max-width: 1800px;
  padding: 0 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 24px;
}

/* 게시글(왼쪽) & 댓글(오른쪽)을 가로로 배치 */
.detail-container {
  display: flex;
  gap: 20px;
  margin: 24px 0;
}

/* 게시글 카드와 댓글 카드의 기본 스타일 */
.board-container,
.comment-container {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
}

.board-container {
  flex: 1;
}

.comment-container {
  flex: 1.5;
}

/* 게시글 카드 */
.board-card {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.board-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.board-info {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  gap: 12px;
}

/* 이미지 영역 */
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  max-width: 700px;
  max-height: 700px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 6px;
  margin: 0 auto;
  position: relative;
}

.board-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.no-image {
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 8px;
  padding: 70px;
}

.board-content {
  font-size: 18px;
}

/* 댓글 카드 */
.comment-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-header h2 {
  font-size: 24px;
}

.delete-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ff6b6b;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100px;
  height: 40px;
  font-size: 15px;
}

.delete-btn:hover {
  background-color: #ff6b6b;
  color: white;
}

/* 댓글 테이블 */
.comment-table {
  width: 100%;
  font-size: 18px;
  border-collapse: separate;
  border-spacing: 0;
}

.comment-table td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.comment-table th {
  padding: 8px;
  font-weight: 600;
  font-size: 17px;
  background-color: #fff5f4;
  color: #fe6f61;
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
  text-align: center;
}

.comment-content {
  text-align: left;
  word-break: break-word;
  font-size: 16px;
}

.comment-user-name,
.comment-date {
  font-size: 16px;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 10px;
}

.page-btn {
  border: 1px solid #ddd;
  background: #fff;
  color: #555;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.page-btn.active,
.page-btn:hover {
  background-color: #ff6b6b;
  color: #fff;
}

/* 목록 버튼 */
.back-btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  gap: 24px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.del-btn:hover,
.back-btn:hover {
  background-color: #ee5c5c;
  color: #fff;
}

.del-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #fff;
  color: black;
  border: 1px solid #ff6b6b;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

/* Carousel 버튼 스타일 */
.carousel-buttons {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 10px;
}

.carousel-btn {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
