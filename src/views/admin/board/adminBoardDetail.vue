<template>
  <div class="wrapper">
    <!-- 게시글 카드 + 댓글 카드 -->
    <div class="detail-container">
      <!-- 게시글 카드 -->
      <div class="board-container">
        <div class="board-card">
          <div class="board-header">
            <h2 class="board-title">{{ board?.title || "제목 없음" }}</h2>
            <button class="delete-btn" @click="handleDeleteBoard">
              🗑 삭제
            </button>
          </div>

          <div class="board-info">
            <p>
              <strong>작성자:</strong> {{ board?.userName || "알 수 없음" }}
            </p>
            <p>
              <strong>작성일:</strong> {{ formatDate(board?.createdAt) || "-" }}
            </p>
          </div>

          <hr />

          <!-- 이미지 -->
          <div class="image-wrapper">
            <div
              v-if="board?.images && board.images.length > 0"
              class="image-container"
            >
              <img :src="board.images[currentImageIndex]" class="board-image" />
              <!-- 이미지가 두 개 이상일 경우 좌우 버튼 표시 -->
              <div v-if="board.images.length > 1" class="carousel-buttons">
                <button @click="prevImage" class="carousel-btn">〈</button>
                <button @click="nextImage" class="carousel-btn">〉</button>
              </div>
            </div>
            <div v-else class="no-image">📸 첨부된 이미지가 없습니다.</div>
          </div>
          <!-- 게시글 내용 -->
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
                  <!-- 라디오 버튼을 사용하여 하나만 선택되도록 함 -->
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

          <!-- 페이지네이션 -->
          <div class="pagination">
            <button class="page-btn">〈</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">〉</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 목록으로 돌아가기 버튼 -->
    <div class="back-btn-container">
      <button @click="goBack" class="back-btn">📌 목록으로 돌아가기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBoardDetail, getComments, deleteBoard } from "@/api/admin";
import api from "@/api/axiosInstance";

const route = useRoute();
const router = useRouter();
const board = ref(null);
const comments = ref([]);
// 현재 이미지 인덱스
const currentImageIndex = ref(0);
const selectedCommentId = ref(null);
const festivalId = router.currentRoute.value.params.festivalId;
// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR");
};

// 게시글 상세 조회
const fetchBoardDetail = async () => {
  try {
    const { boardId, festivalId } = route.params;
    const response = await getBoardDetail(boardId, festivalId);
    const data = Array.isArray(response) ? response[0] : response;

    // data.images가 문자열이면 JSON 파싱 후 배열로 변환
    if (data?.images) {
      if (typeof data.images === "string") {
        try {
          data.images = JSON.parse(data.images);
        } catch (error) {
          console.error("images JSON 파싱 실패:", error);
          data.images = [];
        }
      }
      if (Array.isArray(data.images)) {
        data.images = data.images.map((item) => {
          if (typeof item === "string") {
            return item;
          }
          if (item.url) {
            return item.url;
          }
          return "";
        });
      }
    }

    board.value = data;
    // 게시글이 로드되면 현재 이미지 인덱스 초기화
    currentImageIndex.value = 0;
  } catch (error) {
    console.error("게시글 상세 API 호출 실패:", error);
  }
};

// 댓글 목록 조회
const fetchComments = async () => {
  try {
    const { boardId, festivalId } = route.params;
    const response = await getComments(boardId, festivalId);
    comments.value = response || [];
  } catch (error) {
    console.error("댓글 API 호출 실패:", error);
  }
};
const handleDeleteBoard = async () => {
  try {
    const response = await deleteBoard(board.value.id, festivalId);
    if (response) {
      router.push(`/admin/${festivalId}/adminBoard`);
    }
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
  }
};
// 선택된 댓글 삭제 처리 함수
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
      // 삭제 성공 시 목록에서 해당 댓글 제거
      comments.value = comments.value.filter(
        (comment) => comment.id !== selectedCommentId.value
      );
      // 선택값 초기화
      selectedCommentId.value = null;
    }
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  }
};

const goBack = () => {
  router.push(`/admin/${festivalId}/adminBoard`);
};

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

// 페이지 로드시 데이터 조회
onMounted(() => {
  fetchBoardDetail();
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
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 게시글(왼쪽) & 댓글(오른쪽)을 가로로 나란히 배치 */
.detail-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.board-container,
.comment-container {
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}

/* -- 게시글 카드 -- */
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

/* 이미지 래퍼 */
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

/* -- 댓글 카드 -- */
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

/* 목록 버튼 컨테이너 */
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

/* 캐러셀 버튼 스타일 */
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
