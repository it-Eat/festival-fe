<template>
  <div class="board-wrapper">
    <h1>분실물 관리</h1>
    <div class="container-search">
      <selectBar
        :items="lostOption"
        placeholder="분실물 타입을 선택해주세요"
        v-model="selectedType"
        @onKeySelect="handleTypeSelect"
      />
      <adminCalendar @date-selected="handleDateSelected" />
      <searchBar v-model="filters.keyword" @search="handleSearch" />
    </div>
    <div class="container-list">
      <table class="custom-table">
        <thead>
          <tr class="custom-table-header">
            <th style="flex: 1">작성자</th>
            <th style="flex: 1">구분</th>
            <th style="flex: 2">제목</th>
            <th style="flex: 3">내용</th>
            <th style="flex: 2">작성일자</th>
          </tr>
        </thead>
      </table>
      <adminList :items="lost" routeName="adminLostDetail" />
    </div>

    <!-- 페이지네이션 추가 -->
    <div class="pagination-nav">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">
        이전
      </button>
      <span>{{ currentPage }} / {{ maxPage }}</span>
      <button @click="goToNextPage" :disabled="currentPage >= maxPage">
        다음
      </button>
    </div>
    <loadingComponent v-if="loadingType === 'loading'" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import { getLostBoards } from "@/api/admin.js";
import { useRouter } from "vue-router";
import loadingComponent from "@/components/common/loadingComponent.vue";

const router = useRouter();
const lostOption = ref([
  { value: "", text: "전체" },
  { value: "LOSS", text: "분실" },
  { value: "GET", text: "습득" },
]);

const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const orderBy = ref("recent");
const order = ref("acs");
const selectedType = ref("");
const loadingType = ref("none");

const filters = ref({
  startDate: "",
  endDate: "",
  keyword: "",
  typeSelect: "",
});

// 최대 페이지 계산 (전체 항목 수 기반)
const maxPage = computed(() => {
  return totalItems.value;
});

const lost = ref([]);

// 페이지네이션 이동 함수
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    onSearch();
  }
};
const goToNextPage = () => {
  if (currentPage.value < maxPage.value) {
    currentPage.value++;
    onSearch();
  }
};

const handleSearch = () => {
  currentPage.value = 1; // 검색 시 첫 페이지로
  onSearch();
};

// 데이터 로드 함수
const onSearch = async () => {
  const query = {
    page: currentPage.value,
    pageSize: pageSize.value,
    orderBy: orderBy.value || "recent",
    order: order.value || "acs",
    typeSelect: selectedType.value,
    keyword: filters.value.keyword || "",
    startDate: filters.value.startDate,
    endDate: filters.value.endDate,
  };

  try {
    loadingType.value = "loading";
    const festivalId = router.currentRoute.value.params.festivalId;
    const response = await getLostBoards(festivalId, query);
    console.log("API 응답 데이터:", response);
    lost.value = response.data;
    totalItems.value = response.totalPage;
  } catch (error) {
    console.error("API 호출 실패:", error);
  } finally {
    loadingType.value = "none";
  }
};

const handleDateSelected = (data) => {
  filters.value.startDate = data.startDate;
  filters.value.endDate = data.endDate;
  currentPage.value = data.page; // 초기화
  onSearch();
};

// 타입 선택 처리 함수 추가
const handleTypeSelect = (type) => {
  selectedType.value = type;
  currentPage.value = 1; // 첫 페이지로 초기화
  onSearch(); // 검색 실행
};

onMounted(() => {
  onSearch();
});
</script>

<style scoped>
/* 전체 Wrapper */
.board-wrapper {
  max-width: 1800px;
  padding: 0 20px;
}

/* 상단 타이틀 */
h1 {
  font-size: 2rem;
  margin-bottom: 24px;
}

/* 검색/날짜 섹션 */
.container-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
}

/* 테이블 영역 */
.container-list {
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  height: 100%;
}

/* 테이블 스타일 */
.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  text-align: center;
  height: 100%;
}

.custom-table-header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
/* 테이블 헤더 */
.custom-table thead tr th {
  padding: 12px;
  font-weight: 600;
  background-color: #fff5f4;
  color: #fe6f61;
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
  width: 100%;
}

.pagination-nav {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.pagination-nav button {
  padding: 8px 20px;
  border: 1px solid #fe6f61;
  border-radius: 8px;
  background-color: white;
  color: #fe6f61;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
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
