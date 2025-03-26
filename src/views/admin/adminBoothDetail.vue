<template>
  <div class="wrapper">
    <h2 class="wrapper-title">상세 페이지</h2>
    <!-- 좌우 카드 배치 -->
    <div class="detail-container">
      <!-- 왼쪽 카드: 부스 정보 + 메뉴 -->
      <div class="board-container">
        <div class="board-card">
          <!-- 부스명 및 부스 ID (필요 시) -->
          <h2 class="board-title">
            {{ booth?.name || "부스명 없음" }}
          </h2>

          <!-- 신청자 & 승인여부 -->
          <div class="board-info">
            <div class="status-container">
              <strong>신청자:</strong>
              <p>{{ booth?.user?.userName || "알 수 없음" }}</p>
            </div>
            <div class="status-container2">
              <strong>승인여부:</strong>
              <p
                v-if="booth?.accept === 'ACCEPT'"
                class="status-badge status-accept"
              >
                승인
              </p>
              <p
                v-else-if="booth?.accept === 'WAITING'"
                class="status-badge status-waiting"
              >
                미승인
              </p>
              <p v-else class="status-badge status-reject">거절</p>
            </div>
          </div>

          <!-- 부스 내용 -->
          <div class="board-content">
            <p>{{ booth?.content || "내용이 없습니다." }}</p>
          </div>

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
                <tr v-if="menus.length === 0">
                  <td colspan="2">아직 메뉴가 없습니다. ಥ_ಥ</td>
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
          <button class="delete-btn" @click="deleteSelectedReview">
            리뷰 삭제
          </button>

          <!-- 리뷰 없으면 안내 문구 -->
          <p v-if="reviews.length === 0">아직 리뷰가 없습니다. ಥ_ಥ</p>
          <!-- 리뷰 테이블 -->
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
              <tr v-for="review in reviews" :key="review.id">
                <td>
                  <input
                    type="radio"
                    name="selectedReview"
                    :value="review.id"
                    v-model="selectedReviewId"
                  />
                </td>
                <td>{{ review.user?.userName || "익명" }}</td>
                <td class="comment-content">
                  {{
                    review.content.length > 12
                      ? review.content.slice(0, 12) + "..."
                      : review.content
                  }}
                </td>
                <td>{{ dateFormatWithoutTime(review.createdAt) }}</td>
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
      <button @click="goBack" class="back-btn">← 목록으로 돌아가기</button>
    </div>
    <loadingComponent v-if="loadingType !== 'none'" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getBoothDetail,
  getMenuList,
  getReviews,
  deleteReview,
} from "@/api/admin";
import { dateFormatWithoutTime } from "@/util/dateFormat";
import loadingComponent from "@/components/common/loadingComponent.vue";

const route = useRoute();
const router = useRouter();
const loadingType = ref("none"); // 로딩 타입

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

// 가격 포맷 함수
const formatPrice = (price) => {
  if (price == null) return "-";
  return price.toLocaleString("ko-KR");
};

// 부스 상세 API 호출
const fetchBoothDetail = async () => {
  try {
    loadingType.value = "boothDetail";
    const { boothId, festivalId } = route.params;
    const res = await getBoothDetail(boothId, festivalId);
    booth.value = res;
  } catch (err) {
    console.error("부스 상세 조회 실패:", err);
  } finally {
    loadingType.value = "none";
  }
};

const selectedReviewId = ref(null); // 선택된 리뷰 ID

// 메뉴 목록 API 호출
const fetchMenuList = async () => {
  try {
    loadingType.value = "menuList";
    const { boothId } = route.params;
    const data = await getMenuList(boothId);
    menus.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("메뉴 목록 조회 실패:", err);
  } finally {
    loadingType.value = "none";
  }
};

// 리뷰 목록 API 호출
const fetchReviews = async () => {
  try {
    loadingType.value = "reviewList";
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
  } finally {
    loadingType.value = "none";
  }
};

// 리뷰 삭제
const deleteSelectedReview = async () => {
  if (!selectedReviewId.value) {
    alert("삭제할 리뷰를 선택해주세요.");
    return;
  }

  try {
    loadingType.value = "deleteReview";
    const response = await deleteReview(selectedReviewId.value);

    if (response.status === 204) {
      // ✅ 화면에서도 삭제
      reviews.value = reviews.value.filter(
        (review) => review.id !== selectedReviewId.value
      );

      // ✅ 선택 해제
      selectedReviewId.value = null;

      window.location.reload();

      // ✅ 현재 페이지에 리뷰가 없다면 이전 페이지로
      if (reviews.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
        await fetchReviews();
      }
    }
  } catch (error) {
    console.error("리뷰 삭제 실패:", error);
  } finally {
    loadingType.value = "none";
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
  const festivalId = router.currentRoute.value.params.festivalId;
  router.push(`/admin/${festivalId}/adminBooth`);
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
  padding: 0 20px;
}
.wrapper-title {
  font-size: 2rem;
  margin-bottom: 30px;
}
/* 좌우 카드 배치 */
.detail-container {
  display: flex;
  gap: 20px;
  margin: 24px 0;
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
  font-size: 18px;
  gap: 30px;
}
.board-content {
  font-size: 18px;
}
.menu-list h3 {
  margin-bottom: 18px;
  font-size: 20px;
}
.menu-table {
  width: 100%;
  font-size: 18px;
  border-collapse: separate;
  border-spacing: 0;
}
.menu-table td {
  border-bottom: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}
.menu-table th {
  padding: 12px;
  font-weight: 600;
  background-color: #fff5f4;
  color: #fe6f61;
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
  text-align: center;
}
.status-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
}
.status-container strong {
  white-space: nowrap;
}
.status-container p {
  width: 100px;
  white-space: nowrap;
}
.status-container2 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
}
.status-container2 strong {
  white-space: nowrap;
}
.status-container2 p {
  width: 100px;
  white-space: nowrap;
}

/* 승인여부 배지 */
.status-badge {
  padding: 4px;
  width: 100%;
  border-radius: 12px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
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
  gap: 24px;
}
.comment-card p {
  font-size: 18px;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}
.comment-table th,
.comment-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}
.comment-table th {
  padding: 8px;
  background-color: #fff5f4;
  color: #fe6f61;
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
  text-align: center;
}
.comment-content {
  max-width: 200px; /* 필요한 경우 너비 조정 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  border-radius: 8px;
  cursor: pointer;
}
.back-btn:hover {
  background-color: #ee5c5c;
}
</style>
