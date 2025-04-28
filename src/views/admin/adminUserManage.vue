<script setup>
import searchBar from "@/components/admin/common/searchBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import pagination from "@/components/common/paginationComponent.vue";
import { ref } from "vue";

// 구분 선택옵션
const selectOption = ref([
  { value: "admin", text: "관리자" },
  { value: "user", text: "사용자" },
  { value: "merchant", text: "상인" },
]);
</script>

<template>
  <div>
    <h1>사용자 관리</h1>
    <div class="container-search">
      <selectBar :items="selectOption" />
      <adminCalendar />
      <searchBar />
    </div>
    <div class="container-list">
      <hr style="border: solid 1px" />
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 150px">이름</th>
            <th style="width: 600px">권한</th>
            <th style="width: 500px">가입일자</th>
          </tr>
        </thead>
      </table>
      <hr style="border: solid 0.5px" />
      <adminList :booths="items" />
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
.custom-table th {
  padding-left: 10px;
  text-align: center;
}
</style>
