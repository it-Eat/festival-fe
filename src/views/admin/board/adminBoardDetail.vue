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
            <div
              v-if="board?.images && board.images.length > 0"
              class="image-container"
            >
              <img :src="board.images" class="board-image" />
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

    // 만약 data.images가 문자열이나 객체 배열 등으로 넘어올 수 있다면, 여기서 배열로 가공
    if (data?.images) {
      // 1) JSON 문자열인지 체크(ex: "[\"url1\", \"url2\"]")
      if (typeof data.images === "string") {
        try {
          data.images = JSON.parse(data.images);
        } catch (error) {
          console.error("images JSON 파싱 실패:", error);
          data.images = [];
        }
      }

      // 2) 객체 배열 형태라면(ex: [{ url: "..." }, { url: "..." }])
      if (Array.isArray(data.images)) {
        data.images = data.images.map((item) => {
          // 이미 문자열이면 그대로 사용
          if (typeof item === "string") {
            return item;
          }
          // 객체에 url 속성이 있다면 그걸로 대체
          if (item.url) {
            return item.url;
          }
          // 그 외는 빈 문자열 처리
          return "";
        });
      }
    }

    board.value = data;
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

const goBack = () => {
  router.push("/admin/adminBoard");
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
  margin: 40px auto; /* 화면 중앙 정렬 & 상단 여백 */
  padding: 0 20px;
}

/* 게시글(왼쪽) & 댓글(오른쪽)을 가로로 나란히 배치 */
.detail-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

/* 각각의 카드(왼쪽 게시글, 오른쪽 댓글) 기본 스타일 */
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

/* 게시글 제목 */
.board-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

/* 작성자 & 작성일 섹션 */
.board-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555;
  font-size: 0.9rem;
}

/* 구분선 */
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

/* 실제 이미지가 들어가는 컨테이너 */
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
}

/* 이미지가 화면에 맞춰서 보이도록 */
.board-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}
/* 이미지가 없을 때 */
.no-image {
  text-align: center;
  font-size: 0.95rem;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 6px;
  padding: 20px;
}

/* 게시글 내용 */
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

/* 댓글 헤더(타이틀 & 삭제 버튼) */
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 댓글 목록 타이틀 */
.comment-header h2 {
  font-size: 1.2rem;
  margin: 0;
}

/* 상단 우측 삭제 버튼 */
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

/* 댓글 내용 열은 왼쪽 정렬 */
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

/* 목록 버튼 컨테이너 (아래쪽 왼쪽 정렬) */
.back-btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
}

/* 목록으로 돌아가기 버튼 */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px; /* 아이콘과 글자 간격을 벌리려면 사용 */
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
</style>
