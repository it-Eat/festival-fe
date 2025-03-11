<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BackHeader from "@/components/common/backHeader.vue";
import Pagination from "@/components/common/pagination.vue";

const router = useRouter();

const items = ref([
  { id: 1, name: "지코바", price: "23,000원" },
  { id: 2, name: "이가네", price: "13,000원" },
  { id: 3, name: "아이스크림", price: "5,000원" },
  { id: 4, name: "떡볶이", price: "13,000원" },
  { id: 5, name: "옛전 호떡", price: "10,000원" },
  { id: 6, name: "향이 상회", price: "8,000원" },
  { id: 7, name: "예림 연잎밥", price: "15,000원" },
  { id: 8, name: "엔비어", price: "10,000원" },
  { id: 9, name: "빅토리아", price: "12,000원" },
  { id: 10, name: "꼬야토야", price: "10,000원" },
  { id: 11, name: "옛날전통호떡", price: "5,000원" },
]);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return items.value.slice(start, start + itemsPerPage);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const navigateToDetail = (item) => {
  router.push({
    name: 'myOrderDetail',
    params: { id: String(item.id) },
    query: { name: item.name, price: item.price },
  });
};
</script>

<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader />
      </div>
      <table class="order-table">
        <thead>
          <tr>
            <th>주문상점</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id" @click="navigateToDetail(item)" class="order-row">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <Pagination
          :total-items="items.length"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.order-table th, .order-table td {
  padding: 10px;
  font-size: 16px;
  border-bottom: 1px solid #000;
  border-top: none;
  border-left: none;
  border-right: none;
}

.order-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.order-row {
  cursor: pointer;
}

.order-row:hover {
  background-color: #f5f5f5;
}

.footer {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
}
</style>
