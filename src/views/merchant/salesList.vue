<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader />
      </div>
      <div class="content">
        <h1>매출확인</h1>

        <div class="search-bar">
          <input type="text" placeholder="Search" v-model="searchQuery">
          <button @click="searchSales">
            <Search/>
            <!-- 달력 구현해야함 -->
          </button>
        </div>

        <div class="sales-table">
          <table>
            <thead>
              <tr>
                <th>주문자명</th>
                <th>주문ID</th>
                <th>주문메뉴</th>
                <th>주문금액</th>
                <th>주문일자</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedSales[0]?.noResults">
                <td colspan="5" style="text-align: center;">검색 결과가 없습니다.</td>
              </tr>
              <tr v-else v-for="sale in displayedSales" :key="sale.orderId">
                <td>{{ sale.customerName }}</td>
                <td>{{ sale.orderId }}</td>
                <td>{{ sale.menu }}</td>
                <td>{{ sale.amount }}원</td>
                <td>{{ sale.orderDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination
          :total-items="searchedSales.length"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BackHeader from '@/components/common/backHeader.vue';
import Pagination from '@/components/common/pagination.vue';
import { Search } from 'lucide-vue-next';

const salesData = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const sampleSales = [
    { customerName: '천*윤', orderId: 'A-05', menu: '순대1/떡볶이5', amount: 24500, orderDate: '2024-10-25 17:58:26' },
    // ... 더 많은 데이터
    { customerName: '김*수', orderId: 'B-12', menu: '치킨/맥주', amount: 35000, orderDate: '2024-10-26 12:30:00' },
    { customerName: '이*진', orderId: 'C-01', menu: '피자/콜라', amount: 28000, orderDate: '2024-10-27 19:00:00' },
    // 총 50개 데이터 추가
    ...Array.from({ length: 47 }, (_, i) => ({
        customerName: `고객${i+3}`,
        orderId: `D-${i+3}`,
        menu: `메뉴${i+3}`,
        amount: (i+3)*1000,
        orderDate: `2024-10-${i+3} 10:00:00`
    }))

];

onMounted(() => {
    salesData.value = sampleSales;
});

const searchedSales = computed(() => {
    if (!searchQuery.value) {
        return salesData.value;
    }
    return salesData.value.filter(sale => {
        return Object.values(sale).some(value => String(value).toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
});

const displayedSales = computed(() => {
  if (searchedSales.value.length === 0) {
    return [{ noResults: true }];
  }
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return searchedSales.value.slice(startIndex, endIndex);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const searchSales = () => {
    currentPage.value = 1;
};
</script>

<style scoped>
/* 기존 스타일 */
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

/* 추가 스타일 */
.content {
    width: 100%;
    padding: 20px; /* content 영역 padding 추가 */
    box-sizing: border-box; /* padding으로 인해 width가 늘어나는 것 방지 */
    overflow-y: auto; /* 내용이 많을 경우 스크롤 생성 */
}

.search-bar {
    display: flex;
    margin-bottom: 20px;
}

.search-bar input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
}

.search-bar button {
    padding: 8px 12px;
    border: 1px solid #ccc;
    cursor: pointer;
}

.sales-table {
    width: 100%; /* 테이블 너비 100% */
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.sales-table th,
.sales-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
}
</style>
