<template>
  <div class="board-wrapper">
    <h1>게시판 관리</h1>

    <!-- 상단 검색/달력 영역 -->
    <div class="container-search">
      <adminCalendar @date-selected="handleDateSelected" />
      <searchBar />
    </div>

    <!-- 목록 테이블 영역 -->
    <div class="container-list">
      <hr class="line-strong" />
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 120px">작성자</th>
            <th style="width: 160px">제목</th>
            <th style="width: 470px">내용</th>
            <th style="width: 200px">작성일자</th>
          </tr>
        </thead>
      </table>
      <hr class="line-light" />
      <!-- 실제 목록은 adminList 컴포넌트가 렌더링 -->
      <adminList :items="boards" routeName="adminBoardDetail" />
      <!-- 이전/다음 버튼을 통한 페이지네이션 -->
      <div class="pagination-nav">
        <button @click="goToPreviousPage" :disabled="currentPage === 1">
          이전
        </button>
        <span>페이지 {{ currentPage }} / {{ maxPage }}</span>
        <button @click="goToNextPage" :disabled="currentPage >= maxPage">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import { getBoards } from "@/api/admin.js";

const boards = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);

const filters = ref({
  startDate: "",
  endDate: "",
  keyword: "",
  typeSelect: "",
});

// 최대 페이지 계산 (전체 항목 수와 페이지당 개수를 기반)
const maxPage = computed(() => {
  return Math.ceil(totalItems.value / pageSize.value) || 1;
});

// 게시판 데이터 가져오기
const getBoardList = async () => {
  try {
    const festivalId = 1;
    const query = {
      page: currentPage.value,
      pageSize: pageSize.value,
      orderBy: "recent",
      order: "asc",
      keyword: filters.value.keyword,
      startDate: filters.value.startDate,
      endDate: filters.value.endDate,
    };
    const response = await getBoards(festivalId, query);

    if (response && response.total !== undefined) {
      boards.value = response.items;
      totalItems.value = response.total;
    } else if (Array.isArray(response)) {
      boards.value = response;
      totalItems.value = 50;
    }
    // 그 외의 경우 기본값 할당
    else {
      boards.value = [];
      totalItems.value = 0;
    }

    console.log("API 응답 데이터:", response);
    boards.value = response;
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
};

// 페이지 이동 함수 추가
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getBoardList();
  }
};

const goToNextPage = () => {
  if (currentPage.value < maxPage.value) {
    currentPage.value++;
    getBoardList();
  }
};

const handleDateSelected = (data) => {
  filters.value.startDate = data.startDate;
  filters.value.endDate = data.endDate;
  currentPage.value = data.page; // 초기화
  getBoardList();
};

onMounted(() => {
  getBoardList();
});
</script>

<style scoped>
/* 전체 Wrapper */
.board-wrapper {
  max-width: 2000px;
  margin: 40px; /* 페이지 가운데 정렬 */
  padding: 0 20px;
}

/* 상단 타이틀 */
h1 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-shadow: 4px 4px rgb(226, 223, 223);
}

/* 검색/날짜 섹션 */
.container-search {
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 배치 */
  align-items: center;
  margin-bottom: 20px;
}

/* 검색 버튼 예시 (원한다면 제거 가능) */
.search-btn {
  padding: 8px 16px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.search-btn:hover {
  background-color: #ee5c5c;
}

/* 테이블 영역 */
.container-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}

/* 진한 선 */
.line-strong {
  border: none;
  border-top: 2px solid #333;
  margin-bottom: 10px;
}
/* 옅은 선 */
.line-light {
  border: none;
  border-top: 1px solid #aaa;
  margin-top: 10px;
}

/* 테이블 스타일 */
.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  text-align: center;
}

/* 테이블 헤더 */
.custom-table thead th {
  border-bottom: 2px solid #333;
  padding: 12px 8px;
  font-weight: 600;
  background-color: #f9f9f9;
}

/* 페이지네이션 */
.pagination-nav {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination-nav button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #ff6f61;
  color: white;
  cursor: pointer;
}

.pagination-nav button:disabled {
  background-color: #ccc;
  cursor: default;
}

.pagination-nav span {
  font-size: 1rem;
  font-weight: bold;
}
</style>
