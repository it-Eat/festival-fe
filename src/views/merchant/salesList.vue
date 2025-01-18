<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader />
      </div>
      <div class="content">
        <div class="search-bar">
          <Calender @selected-date-range="handleDateRangeChange" v-model:start-date="calendarStartDate" v-model:end-date="calendarEndDate"/>
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
              <tr v-if="displayedSales.length === 0 && searchQuery !== '' && !filteredByDate">
                <td colspan="5" style="text-align: center;">검색 결과가 없습니다.</td>
              </tr>
              <tr v-else-if="displayedSales.length === 0 && filteredByDate">
                <td colspan="5" style="text-align: center;">해당 날짜에 매출 기록이 없습니다.</td>
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
          :total-items="filteredSales.length"
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
import Calender from '@/components/modal/calender.vue';
import { Search } from 'lucide-vue-next';

const salesData = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedDateRange = ref({ startDate: '', endDate: '' });
const calendarStartDate = ref('');
const calendarEndDate = ref('');
const filteredByDate = ref(false);

const sampleSales = [
    { customerName: '천*윤', orderId: 'A-05', menu: '순대1/떡볶이5', amount: 24500, orderDate: '2024-10-25 17:58:26' },
    { customerName: '김*수', orderId: 'B-12', menu: '치킨/맥주', amount: 35000, orderDate: '2024-10-26 12:30:00' },
    { customerName: '이*진', orderId: 'C-01', menu: '피자/콜라', amount: 28000, orderDate: '2024-10-27 19:00:00' },
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

const filteredSales = computed(() => {
    let filtered = salesData.value;

    if (selectedDateRange.value.startDate && selectedDateRange.value.endDate) {
        filteredByDate.value = true;
        const startDate = new Date(selectedDateRange.value.startDate);
        const endDate = new Date(selectedDateRange.value.endDate);

        filtered = filtered.filter(sale => {
            const saleDate = new Date(sale.orderDate.split(" ")[0]);
            return saleDate >= startDate && saleDate <= endDate;
        });
    } else {
        filteredByDate.value = false; // 날짜 범위가 없으면 필터링 해제
    }

    if (searchQuery.value) {
        filtered = filtered.filter(sale =>
            Object.values(sale).some(value =>
                String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        );
    }
    return filtered;
});

const displayedSales = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSales.value.slice(startIndex, endIndex);
});

const handlePageChange = (page) => {
    currentPage.value = page;
};

const handleDateRangeChange = (dateRange) => {
    selectedDateRange.value = dateRange;
    if (!dateRange.startDate || !dateRange.endDate) {
        filteredByDate.value = false; // 날짜가 지워진 경우 filteredByDate를 false로 설정
    }
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

.sales-table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.sales-table table{
  width: 100%;
}

.sales-table th,
.sales-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
}
</style>
