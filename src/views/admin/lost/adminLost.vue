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
    <pagination />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import pagination from "@/components/common/pagination.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import { getLostBoards } from "@/api/admin.js";

const lostOption = ref([
  { value: "lost", text: "분실" },
  { value: "found", text: "습득" },
]);

const page = ref(1);
const pageSize = ref(4);
const orderBy = ref("createdAt");
const order = ref("asc");
const selectedType = ref("lost");
const searchKeyword = ref("");

const lost = ref([]);

const onSearch = async () => {
  const typeValue =
    selectedType.value === "lost"
      ? "LOSS"
      : selectedType.value === "found"
      ? "GET"
      : "";

  const query = {
    page: parseInt(page.value) || 1,
    pageSize: parseInt(pageSize.value) || 4,
    orderBy: orderBy.value || "createdAt",
    order: order.value || "asc",
    typeSelect: typeValue,
    keyword: searchKeyword.value || "",
  };

  try {
    const festivalId = 1;
    const response = await getLostBoards(festivalId, query);
    console.log("API 응답 데이터:", response);
    lost.value = response;
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
  border-collapse: separate; /* 셀 간격/분리 스타일 */
  border-spacing: 0; /* 셀 사이 간격 없애기 (필요시 변경) */
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
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
