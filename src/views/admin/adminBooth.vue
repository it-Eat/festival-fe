<script setup>
import searchBar from "@/components/admin/common/searchBar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import adminList from "@/components/admin/common/adminList.vue";
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import pagination from "@/components/common/pagination.vue";
import { ref } from "vue";

const boothOption = ref([
  { value: "EAT", text: "먹거리" },
  { value: "PLAY", text: "놀거리" },
]);
</script>

<template>
  <div>
    <h1>상점 관리</h1>
    <div class="container-search">
      <selectBar :items="boothOption" />
      <adminCalendar />
      <searchBar />
    </div>
    <div class="container-list">
      <hr style="border: solid 1px" />
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 120px">부스명</th>
            <th style="width: 100px">유형</th>
            <th style="width: 600px">전화번호</th>
            <th style="width: 200px">이메일</th>
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
