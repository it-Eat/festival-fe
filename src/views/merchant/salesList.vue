<template>
  <Loading v-if="loadingType !== 'none'" />
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
          총 {{ salesData.totalPrice || 0 }}원
        </div>
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
                <th>주문메뉴</th>
                <th>주문금액</th>
                <th>주문일자</th>
              </tr>
            </thead>
            <tbody>
              <!-- 데이터 렌더링 -->
              <tr v-for="sale in salesData.payData" :key="sale.orderId">
                <td>{{ sale.user?.nickname }}</td>
                <td>{{ sale.wishList[0]?.menu?.name || "-" }}</td>
                <td>{{ sale.wishList[0]?.menu?.price || "-" }}원</td>
                <td>{{ dateFormatWithoutTime(sale.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 페이지네이션 -->
        <Pagination
          :total-items="1"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import Pagination from "@/components/common/paginationComponent.vue";
import api from "@/api/axiosInstance";
import { useCartStore } from "@/stores/cartStores";
import { dateFormatWithoutTime } from "@/util/dateFormat";
import Calender from "@/components/modal/calenderModal.vue"; // 위에서 만든 Calender
import Loading from "@/components/common/loadingComponent.vue";
// Pinia store
const cartStore = useCartStore();
const loadingType = ref("none");

// (1) 상태 변수들
const salesData = ref({ payData: [], totalPrice: 0 }); // 테이블에 뿌릴 전체 데이터
const currentPage = ref(1); // 현재 페이지
const itemsPerPage = 10; // 페이지당 아이템 수

// (2) 날짜 범위: Calender.vue와 v-model로 연결
const calendarStartDate = ref("");
const calendarEndDate = ref("");

// (3) 컴포넌트 마운트 시 API 호출
onMounted(() => {
  if (cartStore.boothId) {
    fetchWishlistData(cartStore.boothId);
  }
});
const handleDateRangeChange = async (range) => {
  calendarStartDate.value = range.startDate;
  calendarEndDate.value = range.endDate;
  try {
    loadingType.value = "loading";
    const response = await api.get(
      `/pay/seller/${cartStore.boothId}?startDate=${calendarStartDate.value}&endDate=${calendarEndDate.value}`
    );
    const data = response.data;
    salesData.value = data;
  } catch (error) {
    console.error("매출 데이터 불러오기 실패:", error);
  } finally {
    loadingType.value = "none";
  }
};

/**
 * (4) pay/seller/{boothId} 호출 -> salesData 변환
 */
async function fetchWishlistData(boothId) {
  try {
    loadingType.value = "loading";
    const response = await api.get(`/pay/seller/${boothId}`);
    const data = response.data;

    salesData.value = data;
    // salesData 변환
  } catch (error) {
    console.error("매출 데이터 불러오기 실패:", error);
  } finally {
    loadingType.value = "none";
  }
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

@media (max-width: 600px) {
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

.sales-table table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.sales-table thead {
  padding: 12px;
  font-weight: 600;
  background-color: #fff5f4;
  color: #fe6f61;
}

.sales-table th {
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
  padding: 12px;
  text-align: center;
}

.sales-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.sales-table th,
.sales-table td {
  vertical-align: middle;
}

.sales-table tr:hover {
  background-color: #fff5f4;
}
</style>
