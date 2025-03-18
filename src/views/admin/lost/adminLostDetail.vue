<template>
  <div class="wrapper">
    <!-- 게시글 카드 + 댓글 카드 -->
    <div v-if="board" class="detail-container">
      <div class="board-container">
        <div class="board-card">
          <h2 class="board-title">{{ board?.title || "제목 없음" }}</h2>
          <div class="board-info">
            <p><strong>작성자:</strong> {{ board.userName }}</p>
            <p>
              <strong>작성일자:</strong>
              {{ new Date(board.createdAt).toLocaleString("ko-KR") }}
            </p>
          </div>
          <hr />
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
            <div v-else class="no-image">
              <p>📸 첨부된 이미지가 없습니다.</p>
            </div>
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
            <button class="delete-btn" @click="deleteComment">🗑 삭제</button>
          </div>

          <p v-if="comments.length === 0">아직 댓글이 없습니다.</p>

          <table v-else class="comment-table">
            <thead>
              <tr>
                <th>✔</th>
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
                <td>{{ comment?.user?.userName || "익명" }}</td>
                <td class="comment-content">{{ comment?.content || "-" }}</td>
                <td>{{ formatDate(comment?.createdAt) || "-" }}</td>
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
      <button @click="router.push('/admin/adminLost')" class="back-btn">
        목록으로 돌아가기
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getComments } from "@/api/admin";
import api from "@/api/axiosInstance";

const route = useRoute();
const router = useRouter();
const board = ref(null);
const comments = ref([]);
// 이미지 캐러셀을 위한 현재 이미지 인덱스
const currentImageIndex = ref(0);
// 삭제할 댓글의 id를 단일 선택으로 관리
const selectedCommentId = ref(null);

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR");
};

// 댓글 목록 조회 함수
const fetchComments = async () => {
  try {
    const { boardId, festivalId } = route.params;
    const response = await getComments(boardId, festivalId);
    comments.value = response || [];
  } catch (error) {
    console.error("댓글 API 호출 실패:", error);
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
    alert("삭제할 댓글을 선택해 주세요.");
    return;
  }
  try {
    const { festivalId } = route.params;
    const response = await api.delete(
      `comment/${selectedCommentId.value}/${festivalId}`
    );
    if (response.status === 204) {
      // 삭제 성공하면 목록에서 삭제한 댓글 제거
      comments.value = comments.value.filter(
        (comment) => comment.id !== selectedCommentId.value
      );
      selectedCommentId.value = null;
    }
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  }
};

onMounted(() => {
  // 이전 페이지에서 전달된 board 데이터를 사용
  if (history.state.item) {
    board.value = JSON.parse(history.state.item);
  } else {
    console.error("데이터 없음");
    router.push("/admin/lost");
  }
  fetchComments();
});
</script>

<style scoped>
/* 전체 페이지 중앙 정렬 및 상하 여백 */
.wrapper {
  max-width: 1500px;
  margin: 40px auto;
  padding: 0 20px;
}

/* 게시글(왼쪽) & 댓글(오른쪽)을 가로로 배치 */
.detail-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

/* 게시글 카드와 댓글 카드의 기본 스타일 */
.board-container,
.comment-container {
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}

/* 게시글 카드 */
.board-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.board-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.board-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555;
  font-size: 0.9rem;
}

.board-info + hr {
  margin: 8px 0;
  border: none;
  border-top: 1px solid #eee;
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
  text-align: center;
  font-size: 0.95rem;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 6px;
  padding: 20px;
}

.board-content {
  font-size: 1rem;
  line-height: 1.5;
}

/* 댓글 카드 */
.comment-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #fff;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-header h2 {
  font-size: 1.2rem;
  margin: 0;
}

.delete-btn {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

/* 댓글 테이블 */
.comment-table {
  width: 100%;
  border-collapse: collapse;
}

.comment-table th,
.comment-table td {
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 0.9rem;
  text-align: center;
}

.comment-table th {
  background-color: #f9f9f9;
  font-weight: 600;
}

.comment-table tr:nth-child(even) {
  background-color: #fcfcfc;
}

.comment-content {
  text-align: left;
  word-break: break-word;
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

.back-btn:hover {
  background-color: #ee5c5c;
}

/* Carousel 버튼 스타일 */
.carousel-buttons {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 20px;
}

.carousel-btn {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}
</style>
