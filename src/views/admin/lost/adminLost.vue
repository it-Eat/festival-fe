<script setup>
import { ref, onMounted } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import pagination from "@/components/common/pagination.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import { getLostBoards } from "@/api/admin";

// selectBar에 전달할 옵션 (분실/습득)
const lostOption = ref([
  { value: "lost", text: "분실" },
  { value: "found", text: "습득" },
]);

// API 호출에 필요한 반응형 변수들
const page = ref(1);
const pageSize = ref(4);
const orderBy = ref("createdAt");
const order = ref("asc");
const selectedType = ref("lost"); // 기본값: 분실
const searchKeyword = ref(""); // 검색어

// API 응답 데이터 저장 변수
const booths = ref([]);

// API 호출 함수 (query 객체에 typeSelect로 담음)
const onSearch = async () => {
  // 선택된 타입에 따라 "분실"이면 "LOSS", "습득"이면 "GET"으로 매핑
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
    typeSelect: typeValue, // 여기서 typeSelect 키로 전달
    keyword: searchKeyword.value || "",
  };

  try {
    const festivalId = 1; // 예시로 festivalId를 1로 고정
    const response = await getLostBoards(festivalId, query);
    console.log("API 응답 데이터:", response);
    booths.value = response;
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
};

// 페이지에 진입했을 때 자동 호출
onMounted(() => {
  onSearch();
});
</script>

<template>
  <div>
    <h1>분실물 관리</h1>
    <div class="container-search">
      <!-- 분실/습득 선택: v-model로 양방향 바인딩 -->
      <selectBar :items="lostOption" v-model="selectedType" />
      <adminCalendar />
      <!-- 검색어 입력: v-model로 양방향 바인딩 -->
      <searchBar v-model="searchKeyword" />
      <!-- 검색 버튼 클릭 시 onSearch 호출 -->
      <button @click="onSearch">검색</button>
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
            <th style="width: 300px">작성일자</th>
          </tr>
        </thead>
      </table>
      <hr style="border: solid 0.5px" />
      <!-- API 응답 데이터 렌더링 -->
      <adminList :items="booths" />
    </div>
    <pagination />
  </div>
</template>

<style scoped>
h1 {
  margin-left: 30px;
  margin-bottom: 40px;
  width: 180px;
  text-align: center;
  text-shadow: 5px 5px rgb(226, 223, 223);
}
.container-search {
  margin-left: 40px;
  margin-bottom: 40px;
  display: flex;
  gap: 16px;
  align-items: center;
}
.container-list {
  margin-left: 30px;
  width: 1300px;
  height: 550px;
}
.custom-table {
  margin-left: 20px;
  border-collapse: separate;
  border-spacing: 10px;
  font-size: 18px;
}
.custom-table th {
  padding-left: 10px;
  text-align: center;
}
</style>
