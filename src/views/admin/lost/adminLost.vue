<template>
  <div class="board-wrapper">
    <h1>분실물 관리</h1>
    <div class="container-search">
      <selectBar :items="lostOption" v-model="selectedType" />
      <adminCalendar />
      <searchBar v-model="searchKeyword" />
    </div>
    <div class="container-list">
      <hr style="border: solid 1px" />
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 120px">작성자</th>
            <th style="width: 100px">구분</th>
            <th style="width: 120px">제목</th>
            <th style="width: 500px">내용</th>
            <th style="width: 200px">작성일자</th>
          </tr>
        </thead>
      </table>
      <hr style="border: solid 0.5px" />
      <adminList :items="lost" routeName="adminLostDetail" />
    </div>

    <!-- 페이지네이션 추가 -->
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import { getLostBoards } from "@/api/admin.js";

const lostOption = ref([
  { value: "lost", text: "분실" },
  { value: "found", text: "습득" },
]);

const currentPage = ref(1);
const pageSize = ref(10); // ✅ 한 페이지당 10개 표시
const totalItems = ref(0);
const orderBy = ref("createdAt");
const order = ref("acs"); // ✅ 최신순 정렬 (내림차순)
const selectedType = ref("lost");
const searchKeyword = ref("");

// 최대 페이지 계산 (전체 항목 수 기반)
const maxPage = computed(() => {
  return Math.ceil(totalItems.value / pageSize.value) || 1;
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

// 데이터 로드 함수
const onSearch = async () => {
  const typeValue =
    selectedType.value === "lost"
      ? "LOSS"
      : selectedType.value === "found"
      ? "GET"
      : "";

  const query = {
    page: currentPage.value,
    pageSize: pageSize.value,
    orderBy: orderBy.value || "createdAt",
    order: order.value || "acs", // ✅ 최신순 정렬 유지
    typeSelect: typeValue,
    keyword: searchKeyword.value || "",
  };

  try {
    const festivalId = 1;
    const response = await getLostBoards(festivalId, query);
    console.log("API 응답 데이터:", response);

    if (response && response.total !== undefined) {
      lost.value = response.items;
      totalItems.value = response.total;
    } else if (Array.isArray(response)) {
      lost.value = response;
      totalItems.value = 50;
    } else {
      lost.value = [];
      totalItems.value = 0;
    }
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
};

onMounted(() => {
  onSearch();
});
</script>

<style scoped>
/* 전체 Wrapper */
.board-wrapper {
  max-width: 2000px;
  margin: 40px;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* 테이블 영역 */
.container-list {
  background-color: #fff;
  padding: 20px;
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
