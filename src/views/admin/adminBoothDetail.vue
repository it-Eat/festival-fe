<template>
  <div class="wrapper">
    <!-- 좌우 카드 배치 -->
    <div class="detail-container">
      <!-- 왼쪽 카드: 부스 정보 + 메뉴 -->
      <div class="board-container">
        <div class="board-card">
          <!-- 부스명 및 부스 ID (필요 시) -->
          <h2 class="board-title">
            {{ booth?.name || "부스명 없음" }}
            <span v-if="booth?.id" class="booth-id">[ID: {{ booth.id }}]</span>
          </h2>

          <!-- 신청자 & 승인여부 -->
          <div class="board-info">
            <p>
              <strong>신청자:</strong>
              {{ booth?.user?.userName || "알 수 없음" }}
            </p>
            <p>
              <strong>승인여부:</strong>
              <span
                v-if="booth?.accept === 'ACCEPT'"
                class="status-badge status-accept"
              >
                승인
              </span>
              <span
                v-else-if="booth?.accept === 'WAITING'"
                class="status-badge status-waiting"
              >
                미승인
              </span>
              <span v-else class="status-badge status-reject">거절</span>
            </p>
          </div>

          <hr />

          <!-- 부스 내용 -->
          <div class="board-content">
            <p>{{ booth?.content || "내용이 없습니다." }}</p>
          </div>

          <hr />

          <!-- 메뉴 목록 -->
          <div class="menu-list">
            <h3>메뉴</h3>
            <table class="menu-table">
              <thead>
                <tr>
                  <th>메뉴명</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="menu in menus" :key="menu.id">
                  <td>{{ menu.name }}</td>
                  <td>{{ formatPrice(menu.price) }}원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 오른쪽 카드: 리뷰 목록 -->
      <div class="comment-container">
        <div class="comment-card">
          <div class="comment-header">
            <h2>리뷰 목록</h2>
          </div>

          <!-- 리뷰 없으면 안내 문구 -->
          <p v-if="reviews.length === 0">아직 리뷰가 없습니다.</p>
          <!-- 리뷰 테이블 -->
          <table v-else class="comment-table">
            <thead>
              <tr>
                <th>작성자</th>
                <th>내용</th>
                <th>작성일자</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in reviews" :key="review.id">
                <td>{{ review.user?.userName || "익명" }}</td>
                <td class="comment-content">{{ review.content }}</td>
                <td>{{ formatDate(review.createdAt) }}</td>
              </tr>
            </tbody>
          </table>

          <!-- 페이지네이션 (간단) -->
          <div class="pagination" v-if="totalReviews > pageSize">
            <button
              class="page-btn"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              〈
            </button>
            <span>{{ currentPage }} / {{ maxPage }}</span>
            <button
              class="page-btn"
              @click="nextPage"
              :disabled="currentPage >= maxPage"
            >
              〉
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 목록 버튼 -->
    <div class="back-btn-container">
      <button @click="goBack" class="back-btn">📌 목록으로 돌아가기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBoothDetail, getMenuList, getReviews } from "@/api/admin";

const route = useRoute();
const router = useRouter();

// 1) 부스 상세 정보
const booth = ref(null);
// 2) 메뉴 목록
const menus = ref([]);
// 3) 리뷰 목록
const reviews = ref([]);

// 리뷰 페이지네이션
const currentPage = ref(1);
const pageSize = ref(5);
const totalReviews = ref(0);
const maxPage = computed(
  () => Math.ceil(totalReviews.value / pageSize.value) || 1
);

// 날짜 포맷 함수
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleString("ko-KR");
};

// 가격 포맷 함수
const formatPrice = (price) => {
  if (price == null) return "-";
  return price.toLocaleString("ko-KR");
};

// 부스 상세 API 호출
const fetchBoothDetail = async () => {
  try {
    const { boothId, festivalId } = route.params;
    const res = await getBoothDetail(boothId, festivalId);
    booth.value = res;
  } catch (err) {
    console.error("부스 상세 조회 실패:", err);
  }
};

// 메뉴 목록 API 호출
const fetchMenuList = async () => {
  try {
    const { boothId } = route.params;
    const data = await getMenuList(boothId);
    menus.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("메뉴 목록 조회 실패:", err);
  }
};

// 리뷰 목록 API 호출
const fetchReviews = async () => {
  try {
    const { boothId } = route.params;
    const query = {
      page: currentPage.value,
      pageSize: pageSize.value,
      orderBy: "recent",
      boothId, // 선택된 부스의 ID
      keyword: "", // 유저 닉네임 검색 (비어있으면 전체)
      startDate: "",
      endDate: "",
      scoreOrder: "",
    };
    const response = await getReviews(query);
    if (response && response.items && typeof response.total === "number") {
      reviews.value = response.items;
      totalReviews.value = response.total;
    } else {
      reviews.value = Array.isArray(response) ? response : [];
      totalReviews.value = reviews.value.length;
    }
  } catch (err) {
    console.error("리뷰 목록 조회 실패:", err);
  }
};

// 페이지네이션 - 이전 페이지
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchReviews();
  }
};
// 페이지네이션 - 다음 페이지
const nextPage = () => {
  if (currentPage.value < maxPage.value) {
    currentPage.value++;
    fetchReviews();
  }
};

// "목록으로 돌아가기" 버튼 클릭 시 라우터 이동
const goBack = () => {
  router.push("/admin/adminBooth");
};

onMounted(() => {
  fetchBoothDetail();
  fetchMenuList();
  fetchReviews();
});
</script>

<style scoped>
/* 전체 래퍼 */
.wrapper {
  max-width: 1500px;
  margin: 40px auto;
  padding: 0 20px;
}
/* 좌우 카드 배치 */
.detail-container {
  display: flex;
  gap: 20px;
}
/* 왼쪽 카드 (부스 정보 + 메뉴) */
.board-container {
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}
.board-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.board-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.booth-id {
  font-size: 0.8rem;
  color: #777;
  margin-left: 8px;
}
.board-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
.board-content {
  font-size: 1rem;
  line-height: 1.5;
}
.menu-list h3 {
  margin-bottom: 8px;
}
.menu-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
.menu-table th,
.menu-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.menu-table th {
  background-color: #f9f9f9;
}
/* 승인여부 배지 */
.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
}
.status-accept {
  background-color: #4caf50;
}
.status-waiting {
  background-color: #f44336;
}
.status-reject {
  background-color: #9e9e9e;
}
/* 오른쪽 카드 (리뷰 목록) */
.comment-container {
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}
.comment-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.comment-table th,
.comment-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.comment-table th {
  background-color: #f9f9f9;
}
.comment-content {
  text-align: left;
  word-break: break-word;
}
/* 리뷰 페이지네이션 */
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
.page-btn:hover {
  background-color: #ff6b6b;
  color: #fff;
}
/* 하단 "목록으로 돌아가기" 버튼 */
.back-btn-container {
  margin-top: 20px;
}
.back-btn {
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
