<template>
  <div class="board-wrapper">
    <h1>게시판 관리</h1>

    <div class="container-search">
      <adminCalendar @date-selected="handleDateSelected" />
      <searchBar v-model="filters.keyword" @search="handleSearch" />
    </div>

    <div class="container-list">
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 20%">작성자</th>
            <th style="width: 25%">제목</th>
            <th style="width: 35%">내용</th>
            <th style="width: 20%">작성일자</th>
          </tr>
        </thead>
      </table>

      <adminList :items="boards" routeName="adminBoardDetail" />

      <div class="pagination-nav">
        <button @click="goToPreviousPage" :disabled="currentPage === 1">
          이전
        </button>
        <span>{{ currentPage }} / {{ maxPage }}</span>
        <button @click="goToNextPage" :disabled="currentPage >= maxPage">
          다음
        </button>
      </div>
    </div>
    <loadingComponent v-if="loadingType === 'loading'" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import { getBoards } from "@/api/admin.js";
import { useRouter } from "vue-router";
import loadingComponent from "@/components/common/loadingComponent.vue";

const router = useRouter();
const boards = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const festivalId = router.currentRoute.value.params.festivalId;
const maxPage = ref(0);
const loadingType = ref("none");
const filters = ref({
  startDate: "",
  endDate: "",
  keyword: "",
  typeSelect: "",
});

const handleSearch = () => {
  currentPage.value = 1; // 검색 시 첫 페이지로
  getBoardList();
};

// 게시판 데이터 가져오기
const getBoardList = async () => {
  try {
    loadingType.value = "loading";
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

    maxPage.value = response.totalPage;
    boards.value = response.data;

    console.log("API 응답 데이터:", response);
  } catch (error) {
    console.error("API 호출 실패:", error);
  } finally {
    loadingType.value = "none";
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
  padding: 0 20px;
}

/* 상단 타이틀 */
h1 {
  font-size: 2rem;
  margin-bottom: 30px;
}

/* 검색/날짜 섹션 */
.container-search {
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 배치 */
  align-items: center;
  margin-bottom: 20px;
}

/* 테이블 영역 */
.container-list {
  background-color: #fff;
  border-radius: 8px;
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
  padding: 12px;
  font-weight: 600;
  background-color: #fff5f4;
  color: #fe6f61;
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
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
  border: 1px solid #fe6f61;
  border-radius: 4px;
  background-color: white;
  color: #fe6f61;
  cursor: pointer;
}

.pagination-nav button:hover:not(:disabled) {
  background-color: #fe6f61;
  color: white;
}
.pagination-nav button:disabled {
  border-color: #ddd;
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.pagination-nav span {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
</style>
