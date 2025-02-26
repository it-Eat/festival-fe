<script setup>
import { ref, onMounted } from "vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import pagination from "@/components/common/pagination.vue";
import { getNotice } from "@/api/admin";

const notices = ref([]); // 공지사항 데이터를 저장할 상태 변수

const getNoticeList = async () => {
  try {
    const festivalId = 1;
    const query = {
      page: 1,
      pageSize: 5,
      orderBy: "recent",
    };

    const response = await getNotice(festivalId, query);
    console.log("공지사항 데이터:", response); // 콘솔에 응답 출력

    notices.value = response; // 공지사항 목록 업데이트
  } catch (error) {
    console.error("공지사항 API 호출 실패:", error);
  }
};

onMounted(() => {
  getNoticeList();
});
</script>

<template>
  <div>
    <h1>공지사항 관리</h1>
    <div class="container-search">
      <adminCalendar />
      <searchBar />
    </div>
    <div class="container-list">
      <hr style="border: solid 1px" />
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 120px">ID</th>
            <th style="width: 300px">내용</th>
            <th style="width: 200px">작성일자</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notice in notices" :key="notice.id">
            <td>{{ notice.id }}</td>
            <td>{{ notice.content }}</td>
            <td>{{ new Date(notice.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
      <hr style="border: solid 0.5px" />
    </div>
    <pagination></pagination>
  </div>
</template>

<style scoped>
h1 {
  margin-left: 30px;
  margin-bottom: 40px;
  width: 220px;
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
  height: 650px;
  background-color: rgb(198, 238, 238);
}
.custom-table {
  margin-left: 20px;
  border-collapse: separate;
  border-spacing: 10px;
  font-size: 18px;
}
.custom-table th,
.custom-table td {
  padding-left: 10px;
  text-align: center;
}
</style>
