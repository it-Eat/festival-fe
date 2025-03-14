<script setup>
import { ref, onMounted } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import pagination from "@/components/common/pagination.vue";
import { getBoards } from "@/api/admin.js";

const boards = ref([]);

const getBoardList = async () => {
  try {
    const festivalId = 1;
    const query = {
      page: 1,
      pageSize: 4,
      orderBy: "createdAt",
      order: "asc",
      keyword: "",
    };

    const response = await getBoards(festivalId, query);
    console.log("API 응답 데이터:", response);
    boards.value = response;
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
};

onMounted(() => {
  getBoardList();
});
</script>

<template>
  <div>
    <h1>게시판 관리</h1>
    <div class="container-search">
      <adminCalendar />
      <searchBar />
    </div>
    <div class="container-list">
      <hr style="border: solid 1px" />
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
      <hr style="border: solid 0.5px" />
      <adminList :items="boards" routeName="adminBoardDetail" />
    </div>
    <pagination></pagination>
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
