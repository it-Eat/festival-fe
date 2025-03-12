<template>
  <div class="wrapper">
    <!-- 게시글 카드 + 댓글 카드 -->
    <div class="detail-container">
      <!-- 게시글 카드 -->
      <div class="board-container">
        <div class="board-card">
          <h2 class="board-title">{{ board?.title || "제목 없음" }}</h2>
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
            <!-- <div
              v-if="board?.images && board.images.length > 0"
              class="image-container"
            >
              <img
                v-for="(img, index) in board.images"
                :key="index"
                :src="img"
                alt="첨부 이미지"
                class="board-image"
              />
            </div> -->
            <div class="no-image">📸 첨부된 이미지가 없습니다.</div>
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
            <button class="delete-btn">🗑 삭제</button>
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
                <td><input type="checkbox" /></td>
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
import { getBoardDetail, getComments } from "@/api/admin";

const route = useRoute();
const router = useRouter();
const board = ref(null);
const comments = ref([]);

const fetchBoardDetail = async () => {
  try {
    const { boardId, festivalId } = route.params;
    const response = await getBoardDetail(boardId, festivalId);
    board.value = Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error("게시글 상세 API 호출 실패:", error);
  }
};

const fetchComments = async () => {
  try {
    const { boardId, festivalId } = route.params;
    const response = await getComments(boardId, festivalId);
    comments.value = response || [];
  } catch (error) {
    console.error("댓글 API 호출 실패:", error);
  }
};

const goBack = () => {
  router.push("/admin/adminBoard");
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR");
};

onMounted(() => {
  fetchBoardDetail();
  fetchComments();
});
</script>

<style scoped>
/* 전체 화면을 감싸는 컨테이너 */
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  min-height: 100vh;
}

/* 게시글 & 댓글 카드가 같은 층에 가로로 정렬 */
.detail-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 90%;
  max-width: 1400px;
}

/* 게시글 & 댓글 공통 스타일 */
.board-container,
.comment-container {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
}

/* 게시글 제목 */
.board-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

/* 작성자 & 작성일 */
.board-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

/* 이미지 */
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.image-container {
  width: 100%;
  max-width: 550px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.board-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.no-image {
  font-size: 14px;
  color: #888;
  text-align: center;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;
  border-radius: 10px;
}

/* 댓글 카드 */
.comment-card {
  width: 100%;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.comment-content {
  max-width: 300px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.comment-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.comment-table th,
.comment-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.comment-table th {
  background-color: #ffebe6;
  color: #333;
}

.comment-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.page-btn {
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.page-btn.active {
  background: #ff6b6b;
  color: white;
}

/* 목록 버튼을 왼쪽 끝으로 이동 */
.back-btn-container {
  display: flex;
  justify-content: flex-start;
  width: 90%;
  max-width: 1400px;
  margin-top: 20px;
}

/* 목록으로 돌아가기 버튼 */
.back-btn {
  display: block;
  width: 220px;
  height: 50px;
  font-size: 16px;
  color: white;
  background: #ff6b6b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn:hover {
  background: #e74c3c;
}
</style>
