<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader />
      </div>

      <!-- 내용 영역 -->
      <div class="content">
        <!-- (옵션) 총 매출 금액 표시 -->
        <div style="margin-bottom: 10px; font-weight: bold">
          총 {{ totalSales.toLocaleString() }}원
        </div>

        <!-- 날짜 선택 컴포넌트 (Calender.vue) -->
        <!-- v-model:start-date="calendarStartDate" 등으로 부모-자식 바인딩 가능 -->
        <div class="search-bar" style="margin-bottom: 20px">
          <Calender
            @selected-date-range="handleDateRangeChange"
            v-model:start-date="calendarStartDate"
            v-model:end-date="calendarEndDate"
          />
        </div>

        <!-- 매출 테이블 -->
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
              <!-- 날짜 필터 X, 데이터도 없을 때 -->
              <tr v-if="displayedSales.length === 0 && !filteredByDate">
                <td colspan="5" style="text-align: center">
                  매출 기록이 없습니다.
                </td>
              </tr>
              <!-- 날짜 필터 O, 해당 데이터 없을 때 -->
              <tr v-else-if="displayedSales.length === 0 && filteredByDate">
                <td colspan="5" style="text-align: center">
                  해당 날짜에 매출 기록이 없습니다.
                </td>
              </tr>
              <!-- 데이터 렌더링 -->
              <tr v-else v-for="sale in displayedSales" :key="sale.orderId">
                <td>{{ sale.customerName }}</td>
                <td>{{ sale.orderId }}</td>
                <td>{{ sale.menu }}</td>
                <td>{{ sale.amount.toLocaleString() }}원</td>
                <td>{{ sale.orderDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 페이지네이션 -->
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
import { ref, computed, onMounted } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import Pagination from "@/components/common/pagination.vue";
import Calender from "@/components/modal/calender.vue"; // 위에서 만든 Calender
import api from "@/api/axiosInstance";
import { useCartStore } from "@/stores/cartStores";

// Pinia store
const cartStore = useCartStore();

// (1) 상태 변수들
const salesData = ref([]); // 테이블에 뿌릴 전체 데이터
const currentPage = ref(1); // 현재 페이지
const itemsPerPage = 10; // 페이지당 아이템 수
const totalSales = ref(0); // 총 매출 금액 (옵션)

// (2) 날짜 범위: Calender.vue와 v-model로 연결
const calendarStartDate = ref("");
const calendarEndDate = ref("");
const filteredByDate = ref(false);

// (3) 컴포넌트 마운트 시 API 호출
onMounted(() => {
  if (cartStore.boothId) {
    fetchWishlistData(cartStore.boothId);
  } else {
    console.warn("boothId가 설정되지 않았습니다.");
  }
});

/**
 * (4) wishlist/{boothId}/1 호출 -> salesData 변환
 */
async function fetchWishlistData(boothId) {
  try {
    const response = await api.get(`/wishlist/${boothId}/1`);
    const data = response.data;

    // 총 매출 금액 (옵션)
    const sum = data.reduce((acc, item) => acc + item.price, 0);
    totalSales.value = sum;

    // salesData 변환
    salesData.value = data.map((item) => ({
      customerName: `유저${item.userId}`,
      orderId: `ORDER-${item.id}`,
      menu: `${item.menu.name} x ${item.cnt}`,
      amount: item.price,
      orderDate: formatDate(item.createdAt),
    }));
  } catch (error) {
    console.error("매출 데이터 불러오기 실패:", error);
  }
}

/**
 * (5) 날짜 포맷 함수 (ISO -> "YYYY-MM-DD HH:mm:ss")
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * (6) 날짜 범위 + 필터
 */
const filteredSales = computed(() => {
  let filtered = salesData.value;

  if (calendarStartDate.value && calendarEndDate.value) {
    filteredByDate.value = true;

    const startDate = new Date(calendarStartDate.value);
    const endDate = new Date(calendarEndDate.value);

    filtered = filtered.filter((sale) => {
      const saleDate = new Date(sale.orderDate.split(" ")[0]);
      return saleDate >= startDate && saleDate <= endDate;
    });
  } else {
    filteredByDate.value = false;
  }

  return filtered;
});

/**
 * (7) 페이지네이션 적용
 */
const displayedSales = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredSales.value.slice(startIndex, endIndex);
});

/**
 * (8) 페이지 변경 핸들러
 */
function handlePageChange(page) {
  currentPage.value = page;
}

/**
 * (9) Calender에서 날짜 범위가 선택되었을 때
 */
function handleDateRangeChange(range) {
  // range = { startDate, endDate }
  calendarStartDate.value = range.startDate;
  calendarEndDate.value = range.endDate;
  currentPage.value = 1;
}
</script>

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

.content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.sales-table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.sales-table table {
  width: 100%;
}

.sales-table th,
.sales-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
</style>
