<script setup>
import searchBar from "@/components/admin/common/searchBar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import pagination from "@/components/common/pagination.vue";
import { getLostBoards } from "@/api/admin";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import { ref, onMounted } from "vue";

// 분실 선택옵션
const lostOption = ref([
  { value: "lost", text: "분실" },
  { value: "found", text: "습득" },
]);

const booths = ref([]);

const getBooths = async () => {
  try {
    const festivalId = 1;
    const query = {
      page: 1,
      pageSize: 5,
      orderBy: "recent",
      keyword: "",
      type: "",
    };

    const response = await getLostBoards(festivalId, query);
    console.log("API 응답 데이터:", response); // API 응답 전체 확인
    booths.value = response;
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
};

onMounted(() => {
  getBooths();
});
</script>

<template>
  <div>
    <h1>분실물 관리</h1>
    <div class="container-search">
      <selectBar :items="lostOption" />
      <adminCalendar />
      <searchBar />
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
      <adminList :items="booths" />
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
